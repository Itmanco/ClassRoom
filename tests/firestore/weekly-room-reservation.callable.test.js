"use strict";

const assert = require("node:assert/strict");
const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
  "../../functions/node_modules/firebase-functions-test"
);
const {DateTime} = require("../../functions/node_modules/luxon");
const {
  generateWeeklyReservationDates,
} = require("../../functions/lib/weeklyReservationDates");

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Firestore emulator is required.");
}

const PROJECT_ID = "classroom-b81c6";
const RUN_ID = `${Date.now()}-${process.pid}`;
const SCHOOL_ID = `weekly-reservation-test-${RUN_ID}`;
const CLASS_ID = "WEEKLY_CLASS";
const ROOM_ID = "weekly-room";

const test = functionsTest({projectId: PROJECT_ID});

const {
  createWeeklyRoomReservations,
  createRoomReservation,
} = require("../../functions/index.js");

const createWeekly = test.wrap(createWeeklyRoomReservations);
const createSingle = test.wrap(createRoomReservation);

const db = admin.firestore();
const schoolRef = db.collection("schools").doc(SCHOOL_ID);
const classRef = schoolRef.collection("classes").doc(CLASS_ID);

const zone = "Asia/Tokyo";
const now = DateTime.now().setZone(zone);
const today = now.toISODate();

const hours = {
  monday: [{startTime: "08:00", endTime: "18:00"}],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

function nextMonday() {
  let date = DateTime.now()
    .setZone(zone)
    .plus({days: 7})
    .startOf("day");

  while (date.weekday !== 1) {
    date = date.plus({days: 1});
  }

  return date.toISODate();
}

const monday = nextMonday();

function weeklyRequest(overrides = {}, uid = "weekly-admin") {
  return createWeekly({
    data: {
      schoolId: SCHOOL_ID,
      classId: CLASS_ID,
      roomId: ROOM_ID,
      weekdays: [1],
      startTime: "11:00",
      endTime: "12:00",
      ...overrides,
    },
    auth: uid ? {uid} : undefined,
  });
}

async function expectError(action, code, message) {
  await assert.rejects(action, (error) => {
    assert.equal(error.code, code);

    if (message) {
      assert.equal(error.message, message);
    }

    return true;
  });
}

async function reservationsAt(startTime) {
  const snapshot = await schoolRef
    .collection("roomReservations")
    .get();

  return snapshot.docs
    .map((doc) => doc.data())
    .filter((data) => {
      return (
        data.status === "active" &&
        data.localStartTime === startTime
      );
  });
}

async function seed() {
  await schoolRef.set({
    name: "Weekly Reservation Test School",
    active: true,
    timeZone: zone,
    operatingHours: hours,
  });

  await classRef.set({
    name: "Weekly Test Class",
    roomId: ROOM_ID,
    startDate: now.minus({days: 21}).toISODate(),
    endDate: now.plus({days: 35}).toISODate(),
    active: true,
  });

  await schoolRef.collection("rooms").doc(ROOM_ID).set({
    name: "Weekly Test Room",
    active: true,
  });

  for (const [uid, role] of [
    ["weekly-admin", "school-admin"],
    ["weekly-teacher", "teacher"],
  ]) {
    await db.collection("users").doc(uid).set({
      active: true,
      systemRole: null,
    });

    await schoolRef.collection("members").doc(uid).set({
      role,
      active: true,
    });
  }
}

async function run() {
  await seed();

  console.log("Test 1: Historical occurrences excluded");

  const classData = (await classRef.get()).data();

  const expected = generateWeeklyReservationDates({
    startDate: classData.startDate,
    endDate: classData.endDate,
    weekdays: [1],
    minDate: today,
  }).filter((date) => {
    return date > today || "11:00" > DateTime.now()
      .setZone(zone).toFormat("HH:mm");
  });

  const result = await weeklyRequest({notes: "Bring projector"});

  assert.equal(result.occurrenceCount, expected.length);
  assert.deepEqual(result.dates, expected);
  assert.ok(result.dates.every((date) => date >= today));

  const created = await reservationsAt("11:00");
  assert.equal(created.length, expected.length);
  assert.ok(created.every((item) => item.notes === "Bring projector"));

  console.log("✓ Only future occurrences created");

  await expectError(
    () => weeklyRequest({notes: "x".repeat(1001)}),
    "invalid-argument",
    "INVALID_RESERVATION_NOTES",
  );

  console.log("Test 2: Today's elapsed occurrence excluded");

  const todayKey = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ][now.weekday - 1];

  await classRef.update({
    startDate: today,
    endDate: today,
  });

  await schoolRef.update({
    operatingHours: {
      ...hours,
      [todayKey]: [
        {startTime: "00:00", endTime: "23:55"},
      ],
    },
  });

  await expectError(
    () => weeklyRequest({
      weekdays: [now.weekday],
      startTime: "00:00",
      endTime: "00:15",
    }),
    "failed-precondition",
    "NO_FUTURE_RESERVATION_OCCURRENCES",
  );

  console.log("✓ Elapsed occurrence rejected");

  console.log("Test 3: No future dates rejected");

  await classRef.update({
    startDate: now.minus({days: 21}).toISODate(),
    endDate: now.minus({days: 1}).toISODate(),
  });

  await expectError(
    () => weeklyRequest(),
    "invalid-argument",
    "NO_RESERVATION_OCCURRENCES",
  );

  console.log("✓ Expired class period rejected");

  console.log("Test 4: Conflicts reject entire series");

  await classRef.update({
    startDate: now.minus({days: 21}).toISODate(),
    endDate: now.plus({days: 35}).toISODate(),
  });

  await schoolRef.update({operatingHours: hours});

  const single = await createSingle({
    data: {
      schoolId: SCHOOL_ID,
      classId: CLASS_ID,
      roomId: ROOM_ID,
      localDate: monday,
      startTime: "09:00",
      endTime: "10:00",
    },
    auth: {uid: "weekly-admin"},
  });

  assert.equal(single.success, true);

  const before = (await reservationsAt("09:00")).length;

  await expectError(
    () => weeklyRequest({
      startTime: "09:00",
      endTime: "10:00",
    }),
    "already-exists",
    "ROOM_RESERVATION_CONFLICT",
  );

  const after = (await reservationsAt("09:00")).length;
  assert.equal(after, before);

  console.log("✓ Conflict caused no partial reservation writes");

  console.log("Test 5: Operating hours enforced");

  await expectError(
    () => weeklyRequest({
      startTime: "18:00",
      endTime: "19:00",
    }),
    "failed-precondition",
    "OUTSIDE_SCHOOL_OPERATING_HOURS",
  );

  console.log("✓ Outside operating hours rejected");

  console.log("Test 6: Teacher denied");

  await expectError(
    () => weeklyRequest(
      {startTime: "14:00", endTime: "15:00"},
      "weekly-teacher",
    ),
    "permission-denied",
  );

  console.log("✓ Teacher denied");
}

run()
  .then(() => {
    console.log("All weekly callable tests passed.");
    test.cleanup();
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    test.cleanup();
    process.exit(1);
  });
