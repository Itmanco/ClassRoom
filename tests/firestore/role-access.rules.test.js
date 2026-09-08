const fs = require("fs");
const path = require("path");

const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} = require("@firebase/rules-unit-testing");

const {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} = require("firebase/firestore");

const PROJECT_ID = "classroom-role-access-test";

let testEnv;

async function seedUser(uid, data = {}) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(doc(db, "users", uid), {
      active: true,
      systemRole: null,
      displayName: uid,
      ...data,
    });
  });
}

async function seedMembership(
  schoolId,
  uid,
  role,
  data = {}
) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(
      doc(db, "schools", schoolId, "members", uid),
      {
        userUid: uid,
        role,
        active: true,
        ...data,
      }
    );
  });
}

async function seedSchoolData(schoolId) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(
      doc(db, "schools", schoolId, "students", "student-1"),
      {
        firstName: "Test",
        lastName: "Student",
      }
    );

    await setDoc(
      doc(db, "schools", schoolId, "courses", "course-1"),
      {
        name: "English",
      }
    );

    await setDoc(
      doc(db, "schools", schoolId, "buildings", "building-1"),
      {
        name: "Main Building",
      }
    );

    await setDoc(
      doc(db, "schools", schoolId, "rooms", "room-1"),
      {
        name: "Room 101",
      }
    );
  });
}

async function run() {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(
        path.resolve(__dirname, "../../firestore.rules"),
        "utf8"
      ),
    },
  });

  try {
    await testEnv.clearFirestore();

    const schoolA = "school-a";
    const schoolB = "school-b";

    const teacherUid = "teacher-a";
    const studentUid = "student-a";

    await seedUser(teacherUid);
    await seedUser(studentUid);

    await seedMembership(
      schoolA,
      teacherUid,
      "teacher"
    );

    await seedMembership(
      schoolA,
      studentUid,
      "student"
    );

    await seedSchoolData(schoolA);
    await seedSchoolData(schoolB);

    const teacherDb =
      testEnv.authenticatedContext(teacherUid).firestore();

    const studentDb =
      testEnv.authenticatedContext(studentUid).firestore();

    console.log(
      "Teacher: read students in own school"
    );

    await assertSucceeds(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolA,
          "students",
          "student-1"
        )
      )
    );

    console.log("✓ teacher can read students");

    console.log(
      "Teacher: update student in own school"
    );

    await assertSucceeds(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolA,
          "students",
          "student-1"
        ),
        {
          firstName: "Updated",
        }
      )
    );

    console.log("✓ teacher can update students");

    console.log(
  "Teacher: create student denied"
);

await assertFails(
  setDoc(
    doc(
      teacherDb,
      "schools",
      schoolA,
      "students",
      "student-created-by-teacher"
    ),
    {
      firstName: "New",
      lastName: "Student",
    }
  )
);

console.log("✓ teacher cannot create students");

    console.log("Teacher: courses denied");

    await assertFails(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolA,
          "courses",
          "course-1"
        )
      )
    );

    console.log("✓ teacher cannot read courses");

    console.log("Teacher: buildings denied");

    await assertFails(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolA,
          "buildings",
          "building-1"
        )
      )
    );

    console.log("✓ teacher cannot read buildings");

    console.log("Teacher: rooms denied");

    await assertFails(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolA,
          "rooms",
          "room-1"
        )
      )
    );

    console.log("✓ teacher cannot read rooms");

    console.log(
      "Teacher: students in another school denied"
    );

    await assertFails(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolB,
          "students",
          "student-1"
        )
      )
    );

    console.log(
      "✓ teacher cannot access another school's students"
    );

    console.log(
      "Student: school-wide students denied"
    );

    await assertFails(
      getDoc(
        doc(
          studentDb,
          "schools",
          schoolA,
          "students",
          "student-1"
        )
      )
    );

    console.log(
      "✓ student cannot browse school-wide students"
    );

    console.log("Student: courses denied");

    await assertFails(
      getDoc(
        doc(
          studentDb,
          "schools",
          schoolA,
          "courses",
          "course-1"
        )
      )
    );

    console.log("✓ student cannot read courses");

    console.log("Student: buildings denied");

    await assertFails(
      getDoc(
        doc(
          studentDb,
          "schools",
          schoolA,
          "buildings",
          "building-1"
        )
      )
    );

    console.log("✓ student cannot read buildings");

    console.log("Student: rooms denied");

    await assertFails(
      getDoc(
        doc(
          studentDb,
          "schools",
          schoolA,
          "rooms",
          "room-1"
        )
      )
    );

    console.log("✓ student cannot read rooms");

    console.log("");
    console.log("All role access tests passed.");
  } finally {
    await testEnv.cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});