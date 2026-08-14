const {
  initializeApp,
  cert,
} = require("firebase-admin/app");

const {
  getFirestore,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require(
  "../serviceAccountKey.json",
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const USER_ID =
  "F4zI2IT7U9OQEgV0j23waiXuYjF3";

const TEST_SCHOOL_ID =
  "school_test";

async function createTestSchool() {
  const schoolRef = db
    .collection("schools")
    .doc(TEST_SCHOOL_ID);

  await schoolRef.set(
    {
      name: "Test School",
      country: "Japan",
      city: "Sapporo",
      ownerUid: USER_ID,
      active: true,
      createdAt:
        FieldValue.serverTimestamp(),
    },
    {
      merge: true,
    },
  );

  const userRef = db
    .collection("users")
    .doc(USER_ID);

  await userRef.update({
    schools:
      FieldValue.arrayUnion(
        TEST_SCHOOL_ID,
      ),
    updatedAt:
      FieldValue.serverTimestamp(),
  });

  console.log(
    `Created ${TEST_SCHOOL_ID} and assigned it to ${USER_ID}.`,
  );
}

createTestSchool()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "Unable to create test school:",
      error,
    );

    process.exit(1);
  });