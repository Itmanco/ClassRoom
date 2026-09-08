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
  updateDoc,
} = require("firebase/firestore");

const PROJECT_ID = "classroom-rules-test";

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
        role: "school-admin",
        active: true,
        ...data,
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

    const schoolId = "school-a";
    const adminUid = "admin-1";
    const targetUid = "user-1";

    await seedUser(adminUid);
    await seedUser(targetUid);
    await seedMembership(schoolId, adminUid);

    const adminContext = testEnv.authenticatedContext(adminUid);
    const adminDb = adminContext.firestore();

    console.log("Test 1: valid membership create should succeed");

    await assertSucceeds(
      setDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "members",
          targetUid
        ),
        {
          userUid: targetUid,
          role: "teacher",
          active: true,
        }
      )
    );

    console.log("✓ valid membership create succeeded");

    console.log(
      "Test 2: mismatched memberId/userUid should fail"
    );

    await assertFails(
      setDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "members",
          "user-2"
        ),
        {
          userUid: "different-user",
          role: "teacher",
          active: true,
        }
      )
    );

    console.log(
      "✓ mismatched membership create was denied"
    );

    console.log(
      "Test 3: changing userUid should fail"
    );

    await assertFails(
      updateDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "members",
          targetUid
        ),
        {
          userUid: "changed-user",
        }
      )
    );

    console.log(
      "✓ membership userUid mutation was denied"
    );

    console.log("");
    console.log("All membership rules tests passed.");
  } finally {
    await testEnv.cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});