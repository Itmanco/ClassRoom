
const assert = require("node:assert/strict");

const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
  "../../functions/node_modules/firebase-functions-test"
);
const {
  reservationFitsAvailability,
} = require("../../functions/lib/reservationAvailability");

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Firestore emulator is required.");
}

const PROJECT_ID = "classroom-b81c6";
const SCHOOL_ID = "reservation-test-school";
const CLASS_ID = "TEST_CLASS_A";
const ROOM_ID = "test-room-101";

const test = functionsTest({projectId: PROJECT_ID});

const {
  createRoomReservation,
  updateSchoolTimeZone,
  saveRoomAvailability,
} = require("../../functions/index.js");

const createReservation = test.wrap(createRoomReservation);
const updateTimeZone = test.wrap(updateSchoolTimeZone);
const saveAvailability = test.wrap(saveRoomAvailability);

const db = admin.firestore();
const schoolRef = db.collection("schools").doc(SCHOOL_ID);

const availability = {
  monday: [{start: "08:00", end: "18:00"}],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

function callCreate(uid, overrides = {}) {
  return createReservation({
    data: {
      schoolId: SCHOOL_ID,
      classId: CLASS_ID,
      roomId: ROOM_ID,
      localDate: "2026-11-02",
      startTime: "09:00",
      endTime: "10:30",
      ...overrides,
    },
    auth: uid ? {uid} : undefined,
  });
}

function callSaveAvailability(uid, weeklyHours) {
  return saveAvailability({
    data: {
      schoolId: SCHOOL_ID,
      roomId: ROOM_ID,
      availability: {weeklyHours},
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

async function seedFixtures() {
  await schoolRef.set({
    name: "Reservation Test School",
    active: true,
    timeZone: "Asia/Tokyo",
  });

  await schoolRef.collection("classes").doc(CLASS_ID).set({
    name: "Test Class A",
    roomId: ROOM_ID,
    active: true,
  });

  await schoolRef.collection("rooms").doc(ROOM_ID).set({
    name: "Test Room 101",
    active: true,
  });

  await schoolRef.collection("roomAvailability").doc(ROOM_ID).set({
    weeklyHours: availability,
  });

  await db.collection("users").doc("reservation-admin").set({
    active: true,
    systemRole: null,
  });

  await schoolRef.collection("members")
    .doc("reservation-admin").set({
      role: "school-admin",
      active: true,
    });

  await db.collection("users").doc("reservation-teacher").set({
    active: true,
    systemRole: null,
  });

  await schoolRef.collection("members")
    .doc("reservation-teacher").set({
      role: "teacher",
      active: true,
    });
}

async function run() {
  await seedFixtures();

  console.log("Test 1: School Admin creates reservation");

  const first = await callCreate("reservation-admin");

  assert.equal(first.success, true);
  assert.ok(first.reservationId);

  const reservationRef = schoolRef
    .collection("roomReservations")
    .doc(first.reservationId);

  const reservation = (await reservationRef.get()).data();

  assert.equal(reservation.classId, CLASS_ID);
  assert.equal(reservation.roomId, ROOM_ID);
  assert.equal(reservation.status, "active");
  assert.equal(
    reservation.startsAt.toDate().toISOString(),
    "2026-11-02T00:00:00.000Z"
  );
  assert.equal(
    reservation.endsAt.toDate().toISOString(),
    "2026-11-02T01:30:00.000Z"
  );

  console.log("✓ Reservation created with correct UTC timestamps");

  console.log("Test 2: First reservation locks school time zone");

  const school = (await schoolRef.get()).data();

  assert.equal(
    school.scheduling.hasReservationHistory,
    true
  );

  await expectError(
    () => updateTimeZone({
      data: {
        schoolId: SCHOOL_ID,
        timeZone: "Europe/London",
      },
      auth: {uid: "reservation-admin"},
    }),
    "failed-precondition"
  );

  console.log("✓ Time zone permanently locked");

  console.log("Test 3: Overlapping reservation rejected");

  await expectError(
    () => callCreate("reservation-admin", {
      startTime: "10:00",
      endTime: "11:00",
    }),
    "already-exists"
  );

  console.log("✓ Overlapping reservation rejected");

  console.log("Test 4: Adjacent reservation allowed");

  const adjacent = await callCreate("reservation-admin", {
    startTime: "10:30",
    endTime: "11:30",
  });

  assert.equal(adjacent.success, true);

  console.log("✓ Adjacent reservation allowed");

  console.log("Test 5: Teacher cannot create reservation");

  await expectError(
    () => callCreate("reservation-teacher", {
      startTime: "12:00",
      endTime: "13:00",
    }),
    "permission-denied"
  );

  console.log("✓ Teacher denied");

  console.log("Test 6: Unauthenticated request denied");

  await expectError(
    () => callCreate(null, {
      startTime: "12:00",
      endTime: "13:00",
    }),
    "unauthenticated"
  );

  console.log("✓ Unauthenticated request denied");

  console.log("Test 7: Outside availability rejected");

  await expectError(
    () => callCreate("reservation-admin", {
      startTime: "18:00",
      endTime: "19:00",
    }),
    "failed-precondition"
  );

  console.log("✓ Outside availability rejected");

  console.log("Test 8: Class-room mismatch rejected");

  await expectError(
    () => callCreate("reservation-admin", {
      roomId: "another-room",
    }),
    "failed-precondition"
  );

  console.log("✓ Invalid room rejected");

  console.log("Test 9: Concurrent conflicting reservations");

  const results = await Promise.allSettled([
    callCreate("reservation-admin", {
      startTime: "13:00",
      endTime: "14:30",
    }),
    callCreate("reservation-admin", {
      startTime: "14:00",
      endTime: "15:00",
    }),
  ]);

  const successful = results.filter(
    (result) => result.status === "fulfilled"
  );

  const rejected = results.filter(
    (result) => result.status === "rejected"
  );

  assert.equal(successful.length, 1);
  assert.equal(rejected.length, 1);
  assert.equal(rejected[0].reason.code, "already-exists");

  console.log("✓ Exactly one concurrent booking succeeded");

  console.log("Test 10: Conflicting availability update rejected");

  const availabilityRef = schoolRef
    .collection("roomAvailability")
    .doc(ROOM_ID);

  const beforeAvailability = (await availabilityRef.get()).data();

  const conflictingHours = {
    ...availability,
    monday: [{start: "12:00", end: "18:00"}],
  };

  await expectError(
    () => callSaveAvailability(
      "reservation-admin",
      conflictingHours
    ),
    "failed-precondition"
  );

  const afterRejected = (await availabilityRef.get()).data();

  assert.deepEqual(afterRejected, beforeAvailability);

  console.log("✓ Conflicting update rejected without changing availability");

  console.log("Test 11: Compatible availability update allowed");

  const compatibleHours = {
    ...availability,
    monday: [{start: "08:30", end: "17:00"}],
  };

  const updated = await callSaveAvailability(
    "reservation-admin",
    compatibleHours
  );

  assert.equal(updated.success, true);

  const afterAllowed = (await availabilityRef.get()).data();

  assert.deepEqual(afterAllowed.weeklyHours, compatibleHours);

  console.log("✓ Compatible availability update allowed");

  console.log("Test 12: Teacher cannot update availability");

  await expectError(
    () => callSaveAvailability(
      "reservation-teacher",
      availability
    ),
    "permission-denied"
  );

  console.log("✓ Teacher availability update denied");

  console.log("Test 13: Concurrent availability update and booking");

  const concurrentDate = "2026-11-09";

  const restrictedHours = {
    ...availability,
    monday: [{start: "12:00", end: "18:00"}],
  };

  // Restore the original hours before the concurrent test.
  await callSaveAvailability(
    "reservation-admin",
    availability
  );

  const concurrentResults = await Promise.allSettled([
    callSaveAvailability(
      "reservation-admin",
      restrictedHours
    ),
    callCreate("reservation-admin", {
      localDate: concurrentDate,
      startTime: "09:00",
      endTime: "10:00",
    }),
  ]);

  const concurrentSuccesses = concurrentResults.filter(
    (result) => result.status === "fulfilled"
  );

  const concurrentFailures = concurrentResults.filter(
    (result) => result.status === "rejected"
  );

  assert.equal(concurrentSuccesses.length, 1);
  assert.equal(concurrentFailures.length, 1);

  const finalAvailability = (
    await availabilityRef.get()
  ).data();

  const concurrentBookings = await schoolRef
    .collection("roomReservations")
    .where("roomId", "==", ROOM_ID)
    .where("localDate", "==", concurrentDate)
    .get();

  const activeBookings = concurrentBookings.docs.filter(
    (doc) => doc.data().status === "active"
  );

  if (activeBookings.length > 0) {
    assert.equal(activeBookings.length, 1);

    assert.equal(
      reservationFitsAvailability(
        {
          weekday: "monday",
          startTime: "09:00",
          endTime: "10:00",
        },
        finalAvailability.weeklyHours
      ),
      true,
      "Confirmed booking must fit saved availability"
    );
  } else {
    assert.deepEqual(
      finalAvailability.weeklyHours,
      restrictedHours
    );
  }

  console.log("✓ Concurrent operations preserved schedule consistency");


  console.log("All room reservation callable tests passed.");
}

run()
  .then(() => test.cleanup())
  .catch((error) => {
    console.error(error);
    test.cleanup();
    process.exitCode = 1;
  });
