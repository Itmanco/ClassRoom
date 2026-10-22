
const assert = require("node:assert/strict");

const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
  "../../functions/node_modules/firebase-functions-test"
);

const {
  reservationFitsSchoolHours,
} = require("../../functions/lib/schoolOperatingHours");

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Firestore emulator is required.");
}

const PROJECT_ID = "classroom-b81c6";
const RUN_ID = `${Date.now()}-${process.pid}`;
const SCHOOL_ID = `reservation-test-${RUN_ID}`;
const CLASS_ID = "TEST_CLASS_A";
const ROOM_ID = "test-room-101";

const test = functionsTest({projectId: PROJECT_ID});

const {
  createRoomReservation,
  updateSchoolTimeZone,
  saveSchoolOperatingHours,
} = require("../../functions/index.js");

const createReservation = test.wrap(createRoomReservation);
const updateTimeZone = test.wrap(updateSchoolTimeZone);
const saveOperatingHours = test.wrap(saveSchoolOperatingHours);

const db = admin.firestore();
const schoolRef = db.collection("schools").doc(SCHOOL_ID);

const operatingHours = {
  monday: [{startTime: "08:00", endTime: "18:00"}],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

const {DateTime} = require("../../functions/node_modules/luxon");

let reservationMonday = DateTime.now()
    .setZone("Asia/Tokyo")
    .plus({days: 7})
    .startOf("day");

while (reservationMonday.weekday !== 1) {
  reservationMonday = reservationMonday.plus({days: 1});
}

const RESERVATION_DATE = reservationMonday.toISODate();

function callCreate(uid, overrides = {}) {
  return createReservation({
    data: {
      schoolId: SCHOOL_ID,
      classId: CLASS_ID,
      roomId: ROOM_ID,
      localDate: RESERVATION_DATE,
      startTime: "09:00",
      endTime: "10:30",
      ...overrides,
    },
    auth: uid ? {uid} : undefined,
  });
}

function callSaveOperatingHours(uid, hours) {
  return saveOperatingHours({
    data: {
      schoolId: SCHOOL_ID,
      operatingHours: hours,
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
    operatingHours,
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
      reservationMonday.set({hour: 9}).toUTC().toISO(),
  );

  assert.equal(
      reservation.endsAt.toDate().toISOString(),
      reservationMonday.set({hour: 10, minute: 30}).toUTC().toISO(),
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

  console.log("Test 7: Outside school operating hours rejected");

  await assert.rejects(
      () => callCreate("reservation-admin", {
        startTime: "18:00",
        endTime: "19:00",
      }),
      (error) => {
        assert.equal(error.code, "failed-precondition");
        assert.equal(error.message, "OUTSIDE_SCHOOL_OPERATING_HOURS");
        return true;
      },
  );

  console.log("✓ Outside school operating hours rejected");

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

  console.log("Test 10: Conflicting school operating hours rejected");

  const beforeHours = (await schoolRef.get()).data().operatingHours;

  const conflictingHours = {
    ...operatingHours,
    monday: [{startTime: "12:00", endTime: "18:00"}],
  };

  await assert.rejects(
      () => callSaveOperatingHours(
          "reservation-admin",
          conflictingHours,
      ),
      (error) => {
        assert.equal(error.code, "failed-precondition");
        assert.equal(error.message, "SCHOOL_OPERATING_HOURS_CONFLICT");
        return true;
      },
  );

  const afterRejected = (await schoolRef.get()).data().operatingHours;

  assert.deepEqual(afterRejected, beforeHours);

  console.log("✓ Conflicting update rejected without changing school hours");

  console.log("Test 11: Compatible school operating hours update allowed");

  const compatibleHours = {
    ...operatingHours,
    monday: [{startTime: "08:30", endTime: "17:00"}],
  };

  const updated = await callSaveOperatingHours(
      "reservation-admin",
      compatibleHours,
  );

  assert.equal(updated.success, true);

  const afterAllowed = (await schoolRef.get()).data();

  assert.deepEqual(afterAllowed.operatingHours, compatibleHours);

  console.log("✓ Compatible school operating hours update allowed");


  console.log("Test 12: Teacher cannot update school operating hours");

  await expectError(
      () => callSaveOperatingHours(
          "reservation-teacher",
          operatingHours,
      ),
      "permission-denied",
  );

  console.log("✓ Teacher operating hours update denied");

  console.log("Test 13: Concurrent operating hours update and booking");

  // Choose a future Monday so this test remains valid over time.
  let futureMonday = DateTime.now()
      .setZone("Asia/Tokyo")
      .plus({days: 14})
      .startOf("day");

  while (futureMonday.weekday !== 1) {
    futureMonday = futureMonday.plus({days: 1});
  }

  const concurrentDate = futureMonday.toISODate();

  const restrictedHours = {
    ...operatingHours,
    monday: [{startTime: "12:00", endTime: "18:00"}],
  };

  // Restore the original school hours before the concurrent test.
  await callSaveOperatingHours(
      "reservation-admin",
      operatingHours,
  );

  const concurrentResults = await Promise.allSettled([
    callSaveOperatingHours(
        "reservation-admin",
        restrictedHours,
    ),
    callCreate("reservation-admin", {
      localDate: concurrentDate,
      startTime: "09:00",
      endTime: "10:00",
    }),
  ]);

  const concurrentSuccesses = concurrentResults.filter(
      (result) => result.status === "fulfilled",
  );

  const concurrentFailures = concurrentResults.filter(
      (result) => result.status === "rejected",
  );

  assert.equal(
      concurrentSuccesses.length,
      1,
      "Exactly one concurrent operation should succeed",
  );

  assert.equal(
      concurrentFailures.length,
      1,
      "Exactly one concurrent operation should fail",
  );

  const finalHours = (await schoolRef.get()).data().operatingHours;

  const concurrentBookings = await schoolRef
      .collection("roomReservations")
      .where("roomId", "==", ROOM_ID)
      .where("localDate", "==", concurrentDate)
      .get();

  const activeBookings = concurrentBookings.docs.filter(
      (doc) => doc.data().status === "active",
  );

  if (activeBookings.length > 0) {
    assert.equal(activeBookings.length, 1);

    assert.equal(
        reservationFitsSchoolHours(
            {
              weekday: "monday",
              startTime: "09:00",
              endTime: "10:00",
            },
            finalHours,
        ),
        true,
        "Confirmed booking must fit saved school operating hours",
    );
  } else {
    assert.deepEqual(
        finalHours,
        restrictedHours,
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
