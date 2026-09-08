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
} = require("firebase/firestore");

const PROJECT_ID = "classroom-school-access-test";

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

async function seedMembership(schoolId, uid, data = {}) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(
      doc(db, "schools", schoolId, "members", uid),
      {
        userUid: uid,
        role: "teacher",
        active: true,
        ...data,
      }
    );
  });
}

async function seedStudent(schoolId, studentId) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(
      doc(
        db,
        "schools",
        schoolId,
        "students",
        studentId
      ),
      {
        firstName: "Test",
        lastName: "Student",
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

    const userUid = "teacher-a";
    const schoolA = "school-a";
    const schoolB = "school-b";

    await seedUser(userUid);
    await seedMembership(schoolA, userUid);

    await seedStudent(schoolA, "student-a");
    await seedStudent(schoolB, "student-b");

    const userContext =
      testEnv.authenticatedContext(userUid);

    const db = userContext.firestore();

    console.log(
      "Test 1: member should read student in own school"
    );

    await assertSucceeds(
      getDoc(
        doc(
          db,
          "schools",
          schoolA,
          "students",
          "student-a"
        )
      )
    );

    console.log(
      "✓ own-school student read succeeded"
    );

    console.log(
      "Test 2: member should NOT read student in another school"
    );

    await assertFails(
      getDoc(
        doc(
          db,
          "schools",
          schoolB,
          "students",
          "student-b"
        )
      )
    );

    console.log(
      "✓ cross-school student read was denied"
    );

    console.log("");
    console.log("All school access rules tests passed.");
  } finally {
    await testEnv.cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
