
const assert = require("node:assert/strict");

const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
    "../../functions/node_modules/firebase-functions-test",
);

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Firestore emulator is required.");
}

const PROJECT_ID = "classroom-b81c6";
const RUN_ID = `${Date.now()}-${process.pid}`;
const SCHOOL_ID = `operating-hours-test-${RUN_ID}`;
const OTHER_SCHOOL_ID = `operating-hours-other-${RUN_ID}`;

const test = functionsTest({projectId: PROJECT_ID});
const {saveSchoolOperatingHours} = require("../../functions/index.js");
const wrapped = test.wrap(saveSchoolOperatingHours);
const db = admin.firestore();

const schoolRef = db.collection("schools").doc(SCHOOL_ID);
const otherSchoolRef = db.collection("schools").doc(OTHER_SCHOOL_ID);

function validHours() {
  return {
    monday: [
      {startTime: "08:00", endTime: "12:00"},
      {startTime: "13:00", endTime: "21:00"},
    ],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
}

function allDayHours() {
  return Object.fromEntries(
      Object.keys(validHours()).map((day) => [
        day,
        [{startTime: "00:00", endTime: "23:59"}],
      ]),
  );
}

async function seedUser(uid, role = null, systemRole = null) {
  await db.collection("users").doc(uid).set({
    active: true,
    systemRole,
  });

  if (role) {
    await schoolRef.collection("members").doc(uid).set({
      role,
      active: true,
    });
  }
}

async function callSave(uid, operatingHours, schoolId = SCHOOL_ID) {
  return wrapped({
    data: {schoolId, operatingHours},
    auth: uid ? {uid} : undefined,
  });
}

async function expectError(action, code) {
  await assert.rejects(action, (error) => {
    assert.equal(error.code, code);
    return true;
  });
}

async function getAudits() {
  const snapshot = await schoolRef.collection("auditLogs")
      .where("action", "==", "school.operatingHours.updated")
      .get();

  return snapshot.docs;
}

async function run() {
  await schoolRef.set({
    name: "Operating Hours Test School",
    active: true,
    timeZone: "Asia/Tokyo",
  });

  await otherSchoolRef.set({
    name: "Other Operating Hours Test School",
    active: true,
    timeZone: "Asia/Tokyo",
  });

  await seedUser("oh-school-admin", "school-admin");
  await seedUser("oh-system-admin", null, "system-admin");
  await seedUser("oh-teacher", "teacher");
  await seedUser("oh-student", "student");
  await seedUser("oh-inactive-admin", "school-admin");

  await db.collection("users").doc("oh-inactive-admin")
      .update({active: false});

  // Use unique reservation IDs to avoid touching previous test runs.
  const reservationRef = schoolRef.collection("roomReservations").doc();

  console.log("Test 1: School Admin saves valid operating hours");
  const result = await callSave("oh-school-admin", validHours());
  assert.equal(result.success, true);

  let school = await schoolRef.get();
  assert.deepEqual(school.data().operatingHours, validHours());
  console.log("✓ School Admin update successful");

  console.log("Test 2: System Admin can update operating hours");
  await callSave("oh-system-admin", allDayHours());
  school = await schoolRef.get();
  assert.deepEqual(school.data().operatingHours, allDayHours());
  console.log("✓ System Admin update successful");

  console.log("Test 3: Teacher denied");
  await expectError(
      () => callSave("oh-teacher", validHours()),
      "permission-denied",
  );
  console.log("✓ Teacher denied");

  console.log("Test 4: Student denied");
  await expectError(
      () => callSave("oh-student", validHours()),
      "permission-denied",
  );
  console.log("✓ Student denied");

  console.log("Test 5: Unauthenticated denied");
  await expectError(
      () => callSave(null, validHours()),
      "unauthenticated",
  );
  console.log("✓ Unauthenticated denied");

  console.log("Test 6: Cross-school update denied");
  await expectError(
      () => callSave("oh-school-admin", validHours(), OTHER_SCHOOL_ID),
      "permission-denied",
  );
  console.log("✓ Cross-school update denied");

  console.log("Test 7: Inactive admin denied");
  await expectError(
      () => callSave("oh-inactive-admin", validHours()),
      "permission-denied",
  );
  console.log("✓ Inactive admin denied");

  console.log("Test 8: Invalid overlapping hours rejected");
  const invalidHours = validHours();
  invalidHours.monday.push({
    startTime: "11:00",
    endTime: "14:00",
  });

  await expectError(
      () => callSave("oh-school-admin", invalidHours),
      "invalid-argument",
  );
  console.log("✓ Overlapping hours rejected");

  console.log("Test 9: Closed days are supported");
  const closedHours = Object.fromEntries(
      Object.keys(validHours()).map((day) => [day, []]),
  );
  await callSave("oh-school-admin", closedHours);
  school = await schoolRef.get();
  assert.deepEqual(school.data().operatingHours, closedHours);
  console.log("✓ Closed days supported");

  console.log("Test 10: Future reservation conflict is rejected");

  // Choose a future Monday in the school's local time zone.
  const {DateTime} = require("../../functions/node_modules/luxon");
  const now = DateTime.now().setZone("Asia/Tokyo");
  let futureMonday = now.plus({days: 14}).startOf("day");
  while (futureMonday.weekday !== 1) {
    futureMonday = futureMonday.plus({days: 1});
  }

  const start = futureMonday.set({hour: 9});
  const end = futureMonday.set({hour: 10});

  await reservationRef.set({
    status: "active",
    localDate: futureMonday.toISODate(),
    localStartTime: "09:00",
    localEndTime: "10:00",
    startsAt: admin.firestore.Timestamp.fromDate(start.toJSDate()),
    endsAt: admin.firestore.Timestamp.fromDate(end.toJSDate()),
    timeZone: "Asia/Tokyo",
  });

  const auditsBeforeConflict = (await getAudits()).length;

  await expectError(
      () => callSave("oh-school-admin", closedHours),
      "failed-precondition",
  );

  school = await schoolRef.get();
  assert.deepEqual(school.data().operatingHours, closedHours);
  assert.equal((await getAudits()).length, auditsBeforeConflict);
  console.log("✓ Conflict rejected without changing settings or audit");

  console.log("Test 11: Compatible hours preserve the reservation");
  await callSave("oh-school-admin", validHours());

  school = await schoolRef.get();
  assert.deepEqual(school.data().operatingHours, validHours());
  assert.equal((await reservationRef.get()).data().status, "active");
  console.log("✓ Compatible schedule saved");

  console.log("Test 12: Audit log records the administrator");
  const audits = await getAudits();
  assert.ok(audits.some((doc) => {
    const audit = doc.data();
    return audit.actorUid === "oh-school-admin" &&
        audit.action === "school.operatingHours.updated";
  }));
  console.log("✓ Audit log verified");

  console.log("All operating-hours callable tests passed.");
}

run()
    .then(() => test.cleanup())
    .catch((error) => {
      console.error(error);
      test.cleanup();
      process.exitCode = 1;
    });

