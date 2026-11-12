const assert = require("node:assert/strict");
const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
    "../../functions/node_modules/firebase-functions-test");
const {DateTime} = require("../../functions/node_modules/luxon");

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error("Firestore emulator is required.");
}

const PROJECT_ID = "classroom-b81c6";
const SCHOOL_ID = `class-period-test-${Date.now()}-${process.pid}`;
const CLASS_ID = "PERIOD_A";
const ROOM_ID = "period-room";
const ADMIN_UID = "period-admin";
const TEACHER_UID = "period-teacher";
const test = functionsTest({projectId: PROJECT_ID});
const {
  createRoomReservation,
  updateClassWithReservations,
  archiveClassSafely,
} = require("../../functions/index.js");
const create = test.wrap(createRoomReservation);
const update = test.wrap(updateClassWithReservations);
const archive = test.wrap(archiveClassSafely);
const db = admin.firestore();
const schoolRef = db.collection("schools").doc(SCHOOL_ID);
const classRef = schoolRef.collection("classes").doc(CLASS_ID);
const day = DateTime.now().setZone("Asia/Tokyo")
    .plus({days: 14}).startOf("day");
const bookingDate = day.toISODate();
const initialStart = day.minus({days: 10}).toISODate();
const initialEnd = day.plus({days: 10}).toISODate();

const operatingHours = Object.fromEntries(
    ["monday", "tuesday", "wednesday", "thursday", "friday",
      "saturday", "sunday"].map((name) => [name, [
      {startTime: "08:00", endTime: "18:00"},
    ]]));

const baseClass = {
  code: CLASS_ID,
  name: "Period Test Class",
  courseId: "course-1",
  roomId: ROOM_ID,
  academicYear: 2026,
  semester: 1,
  startDate: initialStart,
  endDate: initialEnd,
  teacherUids: [],
  mainTeacherUid: "",
  active: true,
};

function callUpdate(mode, classData, preview, uid = ADMIN_UID) {
  return update({
    data: {
      schoolId: SCHOOL_ID,
      classId: CLASS_ID,
      mode,
      classData,
      ...(mode === "apply" ? {
        confirmedIds: preview.affectedIds,
        expectedUpdatedAt: preview.expectedUpdatedAt,
      } : {}),
    },
    auth: {uid},
  });
}

function callArchive(uid = ADMIN_UID) {
  return archive({
    data: {schoolId: SCHOOL_ID, classId: CLASS_ID},
    auth: {uid},
  });
}

async function expectCode(action, code) {
  await assert.rejects(action, (error) => {
    assert.equal(error.code, code);
    return true;
  });
}

async function run() {
  await schoolRef.set({
    name: "Period Test School",
    active: true,
    timeZone: "Asia/Tokyo",
    operatingHours,
  });
  await classRef.set(baseClass);
  await schoolRef.collection("rooms").doc(ROOM_ID).set({
    name: "Period Room", active: true,
  });
  await db.collection("users").doc(ADMIN_UID).set({active: true});
  await schoolRef.collection("members").doc(ADMIN_UID).set({
    role: "school-admin", active: true,
  });
  await db.collection("users").doc(TEACHER_UID).set({active: true});
  await schoolRef.collection("members").doc(TEACHER_UID).set({
    role: "teacher", active: true,
  });

  const created = await create({
    data: {
      schoolId: SCHOOL_ID,
      classId: CLASS_ID,
      roomId: ROOM_ID,
      localDate: bookingDate,
      startTime: "09:00",
      endTime: "10:00",
      notes: "Keep this note",
    },
    auth: {uid: ADMIN_UID},
  });
  const reservationRef = schoolRef.collection("roomReservations")
      .doc(created.reservationId);
  const dayRef = schoolRef.collection("roomReservationDays")
      .doc(`${ROOM_ID}_${bookingDate}`);

  console.log("Test 1: Extending period preserves booking");
  const extended = {...baseClass, endDate: day.plus({days: 20}).toISODate()};
  const extendedPreview = await callUpdate("preview", extended);
  assert.deepEqual(extendedPreview.affectedIds, []);
  await callUpdate("apply", extended, extendedPreview);
  assert.equal((await reservationRef.get()).data().status, "active");
  console.log("✓ Extension preserved reservation");

  console.log("Test 2: Teacher cannot edit or archive class");
  await expectCode(
      () => callUpdate("preview", extended, undefined, TEACHER_UID),
      "permission-denied");
  await expectCode(() => callArchive(TEACHER_UID), "permission-denied");
  console.log("✓ Teacher denied");

  console.log("Test 3: Room reassignment blocked");
  await expectCode(
      () => callUpdate("preview", {...extended, roomId: "other-room"}),
      "failed-precondition");
  console.log("✓ Room reassignment denied");

  console.log("Test 4: Archive blocked while booking is active");
  await expectCode(() => callArchive(), "failed-precondition");
  assert.equal((await classRef.get()).data().active, true);
  console.log("✓ Archive did not change class");

  console.log("Test 5: Stale preview does not cancel booking");
  const shortened = {...extended,
    endDate: day.minus({days: 1}).toISODate()};
  const stalePreview = await callUpdate("preview", shortened);
  assert.deepEqual(stalePreview.affectedIds, [created.reservationId]);
  await classRef.update({name: "Changed after preview"});
  await expectCode(
      () => callUpdate("apply", shortened, stalePreview),
      "failed-precondition");
  assert.equal((await reservationRef.get()).data().status, "active");
  console.log("✓ Stale confirmation rejected");

  console.log("Test 6: Shortening cancels booking and releases index");
  const freshPreview = await callUpdate("preview", shortened);
  const result = await callUpdate("apply", shortened, freshPreview);
  assert.equal(result.cancelledCount, 1);
  const cancelled = (await reservationRef.get()).data();
  assert.equal(cancelled.status, "cancelled");
  assert.equal(cancelled.notes, "Keep this note");
  assert.equal((await classRef.get()).data().endDate, shortened.endDate);
  assert.equal((await dayRef.get()).data().intervals.some(
      (interval) => interval.reservationId === created.reservationId), false);
  console.log("✓ Reservation cancelled, note kept, index cleared");

  console.log("Test 7: Archive succeeds after cancellation");
  const archived = await callArchive();
  assert.equal(archived.success, true);
  assert.equal((await classRef.get()).data().active, false);
  assert.equal((await reservationRef.get()).data().notes, "Keep this note");
  console.log("✓ Archive succeeded without modifying history");
  console.log("All class-period callable tests passed.");
}

run().then(() => test.cleanup()).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
