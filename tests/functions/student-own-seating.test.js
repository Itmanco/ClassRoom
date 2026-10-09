
const assert = require("node:assert/strict");

const admin = require("../../functions/node_modules/firebase-admin");
const functionsTest = require(
  "../../functions/node_modules/firebase-functions-test"
);

const PROJECT_ID = "classroom-b81c6";
const SCHOOL_ID = "seating-test-school";
const CLASS_ID = "seating-test-class";
const STUDENT_ID = "student-1";
const STUDENT_UID = "student-user-1";

if (!process.env.FIRESTORE_EMULATOR_HOST) {
  throw new Error(
    "This test must run against the Firestore emulator."
  );
}

const test = functionsTest({
  projectId: PROJECT_ID,
});

const {
  getStudentOwnSeating,
} = require("../../functions/index.js");

const db = admin.firestore();

const wrapped = test.wrap(getStudentOwnSeating);

const schoolRef = db
  .collection("schools")
  .doc(SCHOOL_ID);

const classRef = schoolRef
  .collection("classes")
  .doc(CLASS_ID);

function todayTokyo() {
  const parts = new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return [
    values.year,
    values.month,
    values.day,
  ].join("-");
}

function dateOffset(days) {
  const now = new Date();

  now.setUTCDate(
    now.getUTCDate() + days
  );

  const parts = new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
  ).formatToParts(now);

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return [
    values.year,
    values.month,
    values.day,
  ].join("-");
}

async function seedStudent() {
  await db
    .collection("users")
    .doc(STUDENT_UID)
    .set({
      active: true,
      systemRole: null,
    });

  await schoolRef
    .collection("members")
    .doc(STUDENT_UID)
    .set({
      userUid: STUDENT_UID,
      role: "student",
      active: true,
    });

  await schoolRef
    .collection("studentAccounts")
    .doc(STUDENT_UID)
    .set({
      studentId: STUDENT_ID,
    });

  await schoolRef
    .collection("students")
    .doc(STUDENT_ID)
    .set({
      userUid: STUDENT_UID,
      isActive: true,
    });

  await classRef.set({
    active: true,
    name: "Test Class",
  });

  await classRef
    .collection("enrollments")
    .doc(STUDENT_ID)
    .set({
      studentId: STUDENT_ID,
      active: true,
    });
}

async function clearPlans() {
  const snapshot = await classRef
    .collection("seatingPlans")
    .get();

  for (const document of snapshot.docs) {
    await document.ref.delete();
  }
}

async function addPlan(
  id,
  planDate,
  assignments,
  active = true
) {
  await classRef
    .collection("seatingPlans")
    .doc(id)
    .set({
      planDate,
      active,
      assignments,
      deskCount: 9,
      seatsPerDesk: 2,
      desksPerRow: 3,
      teacherPosition: "front-left",
    });
}


async function callSeating(
  uid = STUDENT_UID,
  classId = CLASS_ID
) {
  return wrapped({
    data: {
      schoolId: SCHOOL_ID,
      classId,
    },
    auth: uid
      ? { uid }
      : undefined,
  });
}


async function expectDenied(
  action,
  expectedCode
) {
  await assert.rejects(
    action,
    (error) => {
      assert.equal(
        error.code,
        expectedCode
      );

      return true;
    }
  );
}

async function run() {
  await seedStudent();

  console.log(
    "Test 1: unauthenticated access denied"
  );

  await expectDenied(
    () => callSeating(null),
    "unauthenticated"
  );

  console.log(
    "✓ unauthenticated access denied"
  );

  console.log(
    "Test 2: inactive Student denied"
  );

  await schoolRef
    .collection("students")
    .doc(STUDENT_ID)
    .update({
      isActive: false,
    });

  await expectDenied(
    () => callSeating(),
    "permission-denied"
  );

  await schoolRef
    .collection("students")
    .doc(STUDENT_ID)
    .update({
      isActive: true,
    });

  console.log(
    "✓ inactive Student denied"
  );

  console.log(
    "Test 3: inactive enrollment denied"
  );

  await classRef
    .collection("enrollments")
    .doc(STUDENT_ID)
    .update({
      active: false,
    });

  await expectDenied(
    () => callSeating(),
    "permission-denied"
  );

  await classRef
    .collection("enrollments")
    .doc(STUDENT_ID)
    .update({
      active: true,
    });

  console.log(
    "✓ inactive enrollment denied"
  );

  console.log(
    "Test 4: future plans excluded"
  );

  await clearPlans();

  await addPlan(
    "future",
    dateOffset(5),
    [
      {
        studentId: STUDENT_ID,
        deskNumber: 9,
        seatNumber: 2,
      },
    ]
  );

  assert.deepEqual(
    await callSeating(),
    {
      classId: CLASS_ID,
      seating: null,
    }
  );

  console.log(
    "✓ future plans excluded"
  );

  console.log(
    "Test 5: latest eligible plan selected"
  );

  await clearPlans();

  await addPlan(
    "older",
    dateOffset(-10),
    [
      {
        studentId: STUDENT_ID,
        deskNumber: 1,
        seatNumber: 1,
      },
    ]
  );

  await addPlan(
    "latest",
    todayTokyo(),
    [
      {
        studentId: STUDENT_ID,
        deskNumber: 3,
        seatNumber: 2,
      },
      {
        studentId: "another-student",
        deskNumber: 4,
        seatNumber: 1,
      },
    ]
  );

  assert.deepEqual(
    await callSeating(),
    {
      classId: CLASS_ID,
      seating: {
        planDate: todayTokyo(),
        deskNumber: 3,
        seatNumber: 2,
        deskCount: 9,
        seatsPerDesk: 2,
        desksPerRow: 3,
        teacherPosition: "front-left",
      },
    }
  );

  console.log(
    "✓ latest eligible plan selected"
  );

  console.log(
    "Test 6: archived plans excluded"
  );

  await addPlan(
    "archived",
    todayTokyo(),
    [
      {
        studentId: STUDENT_ID,
        deskNumber: 8,
        seatNumber: 1,
      },
    ],
    false
  );

  assert.equal(
    (await callSeating()).seating.deskNumber,
    3
  );

  console.log(
    "✓ archived plans excluded"
  );

  console.log(
    "Test 7: no fallback to older plan"
  );

  await clearPlans();

  await addPlan(
    "older",
    dateOffset(-10),
    [
      {
        studentId: STUDENT_ID,
        deskNumber: 1,
        seatNumber: 1,
      },
    ]
  );

  await addPlan(
    "latest",
    todayTokyo(),
    [
      {
        studentId: "another-student",
        deskNumber: 2,
        seatNumber: 1,
      },
    ]
  );

  assert.deepEqual(
    await callSeating(),
    {
      classId: CLASS_ID,
      seating: null,
    }
  );

  console.log(
    "✓ no fallback to older plan"
  );

  console.log(
    "Test 8: unenrolled class denied"
  );

  await expectDenied(
    () => callSeating(
      STUDENT_UID,
      "another-class"
    ),
    "permission-denied"
  );

  console.log(
    "✓ unenrolled class denied"
  );

  console.log(
    "All Student Own Seating tests passed."
  );
}

run()
  .then(async () => {
    test.cleanup();
    await Promise.all(
      admin.apps.map((app) => app.delete())
    );
  })
  .catch(async (error) => {
    console.error(error);

    test.cleanup();

    await Promise.all(
      admin.apps.map((app) => app.delete())
    );

    process.exitCode = 1;
  });
