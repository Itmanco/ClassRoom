const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const OLD_APP_ID = "classroom-b81c6";
const SCHOOL_ID = "school_japan";

async function migrateStudents() {
  const oldStudentsRef = db
    .collection("artifacts")
    .doc(OLD_APP_ID)
    .collection("students");

  const newStudentsRef = db
    .collection("schools")
    .doc(SCHOOL_ID)
    .collection("students")

  console.log(
    `Reading students from artifacts/${OLD_APP_ID}/students...`,
  );

  const snapshot = await oldStudentsRef.get();

  if (snapshot.empty) {
    console.log("No students found in the old collection.");
    return;
  }

  console.log(`Found ${snapshot.size} student documents.`);

  let batch = db.batch();
  let operationsInBatch = 0;
  let migratedCount = 0;

  for (const studentDoc of snapshot.docs) {
    const destinationRef = newStudentsRef.doc(studentDoc.id);

    batch.set(destinationRef, studentDoc.data(), {
      merge: true,
    });

    operationsInBatch += 1;
    migratedCount += 1;

    console.log(`Preparing student: ${studentDoc.id}`);

    if (operationsInBatch === 500) {
      await batch.commit();
      batch = db.batch();
      operationsInBatch = 0;
    }
  }

  if (operationsInBatch > 0) {
    await batch.commit();
  }

  console.log(
    `Migration complete: ${migratedCount} students copied to schools/${SCHOOL_ID}/students.`,
  );
}

migrateStudents()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });