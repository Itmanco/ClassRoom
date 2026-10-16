
const assert = require("node:assert/strict");

const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
  "../../functions/node_modules/firebase-functions-test"
);

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Firestore emulator is required.");
}

const PROJECT_ID = "classroom-b81c6";
const SCHOOL_ID = "room-availability-test-school";
const ROOM_ID = "test-room-1";

const test = functionsTest({projectId: PROJECT_ID});

const {saveRoomAvailability} = require("../../functions/index.js");
const wrapped = test.wrap(saveRoomAvailability);
const db = admin.firestore();

const schoolRef = db.collection("schools").doc(SCHOOL_ID);
const availabilityRef = schoolRef
    .collection("roomAvailability")
    .doc(ROOM_ID);

function validAvailability() {
  return {
    weeklyHours: {
      monday: [
        {start: "09:00", end: "12:00"},
        {start: "13:00", end: "18:00"},
      ],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  };
}

async function seedUser(uid, role, systemRole = null) {
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

async function callSave(uid, availability, roomId = ROOM_ID) {
  return wrapped({
    data: {
      schoolId: SCHOOL_ID,
      roomId,
      availability,
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

async function run() {
  await schoolRef.set({
    name: "Room Availability Test School",
    country: "Japan",
    city: "Sapporo",
    active: true,
    timeZone: "Asia/Tokyo",
  });

  await seedUser("room-admin", "school-admin");
  await seedUser("room-system-admin", null, "system-admin");
  await seedUser("room-teacher", "teacher");
  await seedUser("room-student", "student");

  await schoolRef.collection("rooms").doc(ROOM_ID).set({
    name: "Test Room",
    active: true,
  });

  await availabilityRef.delete();

  console.log("Test 1: School Admin saves valid availability");

  const result = await callSave("room-admin", validAvailability());

  assert.equal(result.success, true);
  assert.equal(result.roomId, ROOM_ID);

  const saved = await availabilityRef.get();

  assert.equal(saved.exists, true);
  assert.deepEqual(
      saved.data().weeklyHours.monday,
      validAvailability().weeklyHours.monday,
  );
  assert.equal(
      Object.hasOwn(saved.data(), "timezone"),
      false,
  );

  console.log("✓ School Admin save successful");

  console.log("Test 2: System Admin can save");

  await callSave("room-system-admin", validAvailability());

  console.log("✓ System Admin save successful");

  console.log("Test 3: Teacher denied");

  await expectError(
      () => callSave("room-teacher", validAvailability()),
      "permission-denied",
  );

  console.log("✓ Teacher denied");

  console.log("Test 4: Student denied");

  await expectError(
      () => callSave("room-student", validAvailability()),
      "permission-denied",
  );

  console.log("✓ Student denied");

  console.log("Test 5: Unauthenticated denied");

  await expectError(
      () => callSave(null, validAvailability()),
      "unauthenticated",
  );

  console.log("✓ Unauthenticated denied");

  console.log("Test 6: Overlapping hours rejected");

  const overlapping = validAvailability();

  overlapping.weeklyHours.monday = [
    {start: "09:00", end: "12:00"},
    {start: "11:00", end: "14:00"},
  ];

  await expectError(
      () => callSave("room-admin", overlapping),
      "invalid-argument",
  );

  console.log("✓ Overlapping hours rejected");

  console.log("Test 7: Invalid time rejected");

  const invalidTime = validAvailability();

  invalidTime.weeklyHours.monday = [
    {start: "25:00", end: "26:00"},
  ];

  await expectError(
      () => callSave("room-admin", invalidTime),
      "invalid-argument",
  );

  console.log("✓ Invalid time rejected");

  console.log("Test 8: Missing room rejected");

  await expectError(
      () => callSave(
          "room-admin",
          validAvailability(),
          "nonexistent-room",
      ),
      "failed-precondition",
  );

  console.log("✓ Missing room rejected");

  console.log("Test 9: Rejected saves preserve existing data");

  const beforeRejectedSave = await availabilityRef.get();

  await expectError(
      () => callSave("room-teacher", validAvailability()),
      "permission-denied",
  );

  const afterRejectedSave = await availabilityRef.get();

  assert.deepEqual(
      afterRejectedSave.data(),
      beforeRejectedSave.data(),
  );

  console.log("✓ Rejected save preserved existing data");

  console.log("Test 10: Inactive School Admin denied");

  await db.collection("users").doc("room-admin").update({
    active: false,
  });

  await expectError(
      () => callSave("room-admin", validAvailability()),
      "permission-denied",
  );

  await db.collection("users").doc("room-admin").update({
    active: true,
  });

  console.log("✓ Inactive School Admin denied");

  console.log("Test 11: Audit log created");

  const auditSnapshot = await schoolRef
      .collection("auditLogs")
      .where("action", "==", "roomAvailability.updated")
      .get();

  assert.ok(
      auditSnapshot.docs.some((doc) =>
        doc.data().entityId === ROOM_ID &&
        doc.data().actorUid === "room-admin"
      ),
      "Expected School Admin audit entry",
  );

  console.log("✓ Audit log created");

  console.log("All room availability callable tests passed.");
}

run()
    .then(() => test.cleanup())
    .catch((error) => {
      console.error(error);
      test.cleanup();
      process.exitCode = 1;
    });
