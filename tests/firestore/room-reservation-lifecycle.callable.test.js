"use strict";

const assert = require("node:assert/strict");
const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
    "../../functions/node_modules/firebase-functions-test",
);
const {DateTime} = require("../../functions/node_modules/luxon");

const PROJECT_ID = "demo-classroom-reservations";
const host = process.env.FIRESTORE_EMULATOR_HOST;
if (!host || !/^(localhost|127\.0\.0\.1):\d+$/.test(host)) {
  throw new Error("A local Firestore emulator is required.");
}
if (
  process.env.GCLOUD_PROJECT !== PROJECT_ID ||
  process.env.FIREBASE_PROJECT_ID !== PROJECT_ID
) {
  throw new Error(`Set both project environment variables to ${PROJECT_ID}.`);
}

const runId = `${Date.now()}-${process.pid}`;
const schoolId = `reservation-lifecycle-${runId}`;
const classId = "lifecycle-class";
const roomId = "lifecycle-room";
const adminUid = `lifecycle-admin-${runId}`;
const teacherUid = `lifecycle-teacher-${runId}`;
const test = functionsTest({projectId: PROJECT_ID});
const {
  createWeeklyRoomReservations,
  cancelRoomReservations,
  updateRoomReservations,
} = require("../../functions/index.js");
const createWeekly = test.wrap(createWeeklyRoomReservations);
const cancel = test.wrap(cancelRoomReservations);
const update = test.wrap(updateRoomReservations);
const db = admin.firestore();
const schoolRef = db.collection("schools").doc(schoolId);
const reservationsRef = schoolRef.collection("roomReservations");
const daysRef = schoolRef.collection("roomReservationDays");
const auditRef = schoolRef.collection("auditLogs");

// Four consecutive future Mondays: enough for editing, cancellation and
// a conflicting series, without depending on a fixed calendar date.
let monday = DateTime.now().setZone("Asia/Tokyo")
    .plus({days: 14}).startOf("day");
while (monday.weekday !== 1) monday = monday.plus({days: 1});
const dates = [0, 1, 2, 3].map((n) =>
  monday.plus({weeks: n}).toISODate());

const operatingHours = {
  monday: [{startTime: "08:00", endTime: "18:00"}],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: [],
};

function invoke(fn, uid, data) {
  return fn({data: {schoolId, ...data}, auth: uid ? {uid} : undefined});
}
function create(uid, overrides = {}) {
  return invoke(createWeekly, uid, {
    classId, roomId, weekdays: [1], startTime: "09:00",
    endTime: "10:00", ...overrides,
  });
}
function edit(uid, reservationId, scope, startTime, endTime, localDate) {
  return invoke(update, uid, {
    reservationId, scope, startTime, endTime,
    ...(localDate ? {localDate} : {}),
  });
}
function cancelSelection(uid, reservationId, scope) {
  return invoke(cancel, uid, {reservationId, scope});
}
async function expectCode(promise, code) {
  await assert.rejects(promise, (error) => {
    assert.equal(error.code, code);
    return true;
  });
}
async function seed() {
  await schoolRef.set({
    name: "Lifecycle Regression School", active: true,
    timeZone: "Asia/Tokyo", operatingHours,
  });
  await schoolRef.collection("classes").doc(classId).set({
    name: "Lifecycle Class", roomId, active: true,
    startDate: dates[0], endDate: dates[3],
  });
  await schoolRef.collection("rooms").doc(roomId).set({
    name: "Lifecycle Room", active: true,
  });
  for (const [uid, role] of [
    [adminUid, "school-admin"], [teacherUid, "teacher"],
  ]) {
    await db.collection("users").doc(uid).set({
      active: true, systemRole: null,
    });
    await schoolRef.collection("members").doc(uid).set({
      role, active: true,
    });
  }
}
async function seriesDocs(seriesId) {
  const snapshot = await reservationsRef.where("seriesId", "==", seriesId).get();
  return snapshot.docs.sort((a, b) =>
    a.data().localDate.localeCompare(b.data().localDate));
}
async function dayIntervals(date) {
  const snapshot = await daysRef.doc(`${roomId}_${date}`).get();
  return snapshot.exists ? snapshot.data().intervals : [];
}
async function checkIndexes() {
  const snapshot = await reservationsRef.get();
  for (const doc of snapshot.docs) {
    const item = doc.data();
    const intervals = (await dayIntervals(item.localDate))
        .filter((interval) => interval.reservationId === doc.id);
    if (item.status === "active") {
      assert.equal(intervals.length, 1, `Missing index for ${doc.id}`);
      assert.equal(intervals[0].startsAtMillis, item.startsAt.toMillis());
      assert.equal(intervals[0].endsAtMillis, item.endsAt.toMillis());
    } else {
      assert.equal(item.status, "cancelled");
      assert.equal(intervals.length, 0, `Stale index for ${doc.id}`);
    }
  }
}
async function auditCount() {
  return (await auditRef.get()).size;
}
async function cleanupCollection(ref) {
  const snapshot = await ref.get();
  for (const doc of snapshot.docs) await doc.ref.delete();
}
async function cleanup() {
  // Only resources named by this test are removed; no database-wide clear.
  await Promise.all([
    cleanupCollection(reservationsRef),
    cleanupCollection(daysRef),
    cleanupCollection(auditRef),
    cleanupCollection(schoolRef.collection("members")),
  ]);
  await schoolRef.collection("classes").doc(classId).delete();
  await schoolRef.collection("rooms").doc(roomId).delete();
  await schoolRef.delete();
  await db.collection("users").doc(adminUid).delete();
  await db.collection("users").doc(teacherUid).delete();
}

async function run() {
  await seed();

  console.log("Test 1: Weekly creation and recurrence dates");
  const created = await create(adminUid);
  assert.equal(created.success, true);
  assert.equal(created.occurrenceCount, 4);
  assert.deepEqual(created.dates, dates);
  let docs = await seriesDocs(created.seriesId);
  assert.equal(docs.length, 4);
  assert(docs.every((doc) => doc.data().status === "active"));
  await checkIndexes();
  assert.equal(await auditCount(), 1);
  console.log("✓ Four indexed occurrences and creation audit");

  console.log("Test 2: Single edit changes only one occurrence");
  const single = await edit(adminUid, docs[0].id, "single",
      "10:00", "11:00", dates[0]);
  assert.equal(single.updatedCount, 1);
  docs = await seriesDocs(created.seriesId);
  assert.equal(docs[0].data().localStartTime, "10:00");
  assert.equal(docs[1].data().localStartTime, "09:00");
  await checkIndexes();
  assert.equal(await auditCount(), 2);
  console.log("✓ Single edit, indexes and audit");

  console.log("Test 3: Future-series edit preserves earlier occurrence");
  const future = await edit(adminUid, docs[1].id, "future-series",
      "11:00", "12:00");
  assert.equal(future.updatedCount, 3);
  docs = await seriesDocs(created.seriesId);
  assert.equal(docs[0].data().localStartTime, "10:00");
  assert(docs.slice(1).every((doc) =>
    doc.data().localStartTime === "11:00"));
  await checkIndexes();
  assert.equal(await auditCount(), 3);
  console.log("✓ Future-series edit, indexes and audit");

  console.log("Test 4: Conflicting edit is atomic");
  const blocker = await create(adminUid, {
    startTime: "13:00", endTime: "14:00",
  });
  assert.equal(blocker.occurrenceCount, 4);
  const before = await auditCount();
  await expectCode(edit(adminUid, docs[1].id, "future-series",
      "13:30", "14:30"), "already-exists");
  docs = await seriesDocs(created.seriesId);
  assert(docs.slice(1).every((doc) =>
    doc.data().localStartTime === "11:00"));
  assert.equal(await auditCount(), before);
  await checkIndexes();
  console.log("✓ Conflict rejected with no partial updates or audit");

  console.log("Test 5: Single cancellation");
  const oneCancelled = await cancelSelection(adminUid, docs[1].id, "single");
  assert.equal(oneCancelled.cancelledCount, 1);
  docs = await seriesDocs(created.seriesId);
  assert.equal(docs[1].data().status, "cancelled");
  assert.equal(docs[2].data().status, "active");
  await checkIndexes();
  assert.equal(await auditCount(), before + 1);
  console.log("✓ Single cancellation, indexes and audit");

  console.log("Test 6: Future-series cancellation excludes earlier/cancelled");
  const remaining = await cancelSelection(adminUid, docs[2].id,
      "future-series");
  assert.equal(remaining.cancelledCount, 2);
  docs = await seriesDocs(created.seriesId);
  assert.deepEqual(docs.map((doc) => doc.data().status),
      ["active", "cancelled", "cancelled", "cancelled"]);
  await checkIndexes();
  assert.equal(await auditCount(), before + 2);
  console.log("✓ Future-series cancellation, indexes and audit");

  console.log("Test 7: Unauthorized and invalid operations");
  const auditBeforeRejections = await auditCount();
  await expectCode(cancelSelection(teacherUid, docs[0].id, "single"),
      "permission-denied");
  await expectCode(edit(teacherUid, docs[0].id, "single",
      "12:00", "13:00", dates[0]), "permission-denied");
  await expectCode(create(teacherUid), "permission-denied");
  await expectCode(cancelSelection(adminUid, docs[0].id, "invalid"),
      "invalid-argument");
  assert.equal(await auditCount(), auditBeforeRejections);
  await checkIndexes();
  console.log("✓ Rejections left all reservation state unchanged");

  console.log("All lifecycle regression tests passed.");
}

(async () => {
  let failed = false;
  try {
    await run();
  } catch (error) {
    failed = true;
    console.error(error);
  } finally {
    try {
      await cleanup();
    } catch (error) {
      failed = true;
      console.error("Fixture cleanup failed:", error);
    }
    test.cleanup();
  }
  if (failed) process.exitCode = 1;
})();
