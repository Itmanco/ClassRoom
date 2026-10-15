
const assert = require("node:assert/strict");

const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
  "../../functions/node_modules/firebase-functions-test"
);

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Firestore emulator is required.");
}

const PROJECT_ID = "classroom-b81c6";
const SCHOOL_ID = "timezone-test-school";
const OTHER_SCHOOL_ID = "timezone-other-school";

const test = functionsTest({projectId: PROJECT_ID});

const {updateSchoolTimeZone} = require("../../functions/index.js");
const wrapped = test.wrap(updateSchoolTimeZone);
const db = admin.firestore();

const schoolRef = db.collection("schools").doc(SCHOOL_ID);
const otherSchoolRef = db.collection("schools").doc(OTHER_SCHOOL_ID);

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

async function callUpdate(
  uid,
  timeZone,
  schoolId = SCHOOL_ID
) {
  return wrapped({
    data: {
      schoolId,
      timeZone,
    },
    auth: uid ? {uid} : undefined,
  });
}

async function expectError(action, code) {
  await assert.rejects(action, (error) => {
    assert.equal(error.code, code);
    return true;
  });
}

async function getTimeZoneAudits() {
  const snapshot = await schoolRef
    .collection("auditLogs")
    .where("action", "==", "school.timeZone.updated")
    .get();

  return snapshot.docs.map((doc) => doc.data());
}

async function run() {
  // Reset only the dedicated test schools.
  await schoolRef.set({
    name: "Time Zone Test School",
    country: "Japan",
    city: "Sapporo",
    active: true,
  });

  await otherSchoolRef.set({
    name: "Other Test School",
    country: "Colombia",
    city: "Bogota",
    active: true,
    timeZone: "America/Bogota",
  });

  await seedUser("tz-system-admin", null, "system-admin");
  await seedUser("tz-school-admin", "school-admin");
  await seedUser("tz-teacher", "teacher");
  await seedUser("tz-student", "student");
  await seedUser("tz-inactive-admin", "school-admin");

  await db.collection("users").doc("tz-inactive-admin").update({
    active: false,
  });

  console.log("Test 1: System Admin updates time zone");

  const systemResult = await callUpdate(
    "tz-system-admin",
    "America/Bogota"
  );

  assert.equal(systemResult.success, true);
  assert.equal(systemResult.timeZone, "America/Bogota");

  let school = await schoolRef.get();
  assert.equal(school.data().timeZone, "America/Bogota");

  console.log("✓ System Admin update successful");

  console.log("Test 2: School Admin updates own school");

  const schoolResult = await callUpdate(
    "tz-school-admin",
    "Asia/Tokyo"
  );

  assert.equal(schoolResult.success, true);

  school = await schoolRef.get();
  assert.equal(school.data().timeZone, "Asia/Tokyo");

  console.log("✓ School Admin update successful");

  console.log("Test 3: School Admin denied for another school");

  await expectError(
    () => callUpdate(
      "tz-school-admin",
      "Europe/London",
      OTHER_SCHOOL_ID
    ),
    "permission-denied"
  );

  console.log("✓ Cross-school update denied");

  console.log("Test 4: Teacher denied");

  await expectError(
    () => callUpdate("tz-teacher", "Europe/London"),
    "permission-denied"
  );

  console.log("✓ Teacher denied");

  console.log("Test 5: Student denied");

  await expectError(
    () => callUpdate("tz-student", "Europe/London"),
    "permission-denied"
  );

  console.log("✓ Student denied");

  console.log("Test 6: Unauthenticated denied");

  await expectError(
    () => callUpdate(null, "Europe/London"),
    "unauthenticated"
  );

  console.log("✓ Unauthenticated denied");

  console.log("Test 7: Invalid time zone rejected");

  await expectError(
    () => callUpdate("tz-school-admin", "Mars/Olympus"),
    "invalid-argument"
  );

  console.log("✓ Invalid time zone rejected");

  console.log("Test 8: Missing school rejected");

  await expectError(
    () => callUpdate(
      "tz-system-admin",
      "Europe/London",
      "timezone-nonexistent-school"
    ),
    "not-found"
  );

  console.log("✓ Missing school rejected");

  console.log("Test 9: Inactive School Admin denied");

  await expectError(
    () => callUpdate("tz-inactive-admin", "Europe/London"),
    "permission-denied"
  );

  console.log("✓ Inactive School Admin denied");

  console.log("Test 10: Rejected updates preserve school data");

  const before = (await schoolRef.get()).data();

  await expectError(
    () => callUpdate("tz-teacher", "America/New_York"),
    "permission-denied"
  );

  const after = (await schoolRef.get()).data();

  assert.deepEqual(after, before);

  console.log("✓ Rejected update preserved school data");

  console.log("Test 11: Audit log records time-zone changes");

  const audits = await getTimeZoneAudits();

  assert.ok(
    audits.some((entry) =>
      entry.actorUid === "tz-system-admin" &&
      entry.details.previousTimeZone === "Asia/Tokyo" &&
      entry.details.timeZone === "America/Bogota"
    ),
    "Expected System Admin audit entry"
  );

  assert.ok(
    audits.some((entry) =>
      entry.actorUid === "tz-school-admin" &&
      entry.details.previousTimeZone === "America/Bogota" &&
      entry.details.timeZone === "Asia/Tokyo"
    ),
    "Expected School Admin audit entry"
  );

  console.log("✓ Audit logging successful");

  console.log("Test 12: Unchanged time zone creates no new audit");

  const auditCountBefore = (await getTimeZoneAudits()).length;

  await callUpdate("tz-school-admin", "Asia/Tokyo");

  const auditCountAfter = (await getTimeZoneAudits()).length;

  assert.equal(auditCountAfter, auditCountBefore);

  console.log("✓ No duplicate audit created");

  console.log("Test 13: Unrelated school fields preserved");

  school = await schoolRef.get();

  assert.equal(school.data().name, "Time Zone Test School");
  assert.equal(school.data().country, "Japan");
  assert.equal(school.data().city, "Sapporo");
  assert.equal(school.data().active, true);

  console.log("✓ Unrelated school fields preserved");

  console.log("All school time-zone callable tests passed.");
}

run()
  .then(() => test.cleanup())
  .catch((error) => {
    console.error(error);
    test.cleanup();
    process.exitCode = 1;
  });
