const {
  initializeApp,
  cert,
} = require("firebase-admin/app");

const {
  getFirestore,
} = require("firebase-admin/firestore");

const fs = require("fs");
const path = require("path");

const serviceAccount = require(
  "../serviceAccountKey.json",
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

function serializeValue(value) {
  if (value === null || value === undefined) {
    return value;
  }

  // Firestore Timestamp
  if (
    typeof value === "object" &&
    typeof value.toDate === "function"
  ) {
    return value.toDate().toISOString();
  }

  // Firestore DocumentReference
  if (
    typeof value === "object" &&
    typeof value.path === "string" &&
    value.firestore
  ) {
    return {
      documentReference: value.path,
    };
  }

  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }

  if (typeof value === "object") {
    const result = {};

    for (const [key, item] of Object.entries(value)) {
      result[key] = serializeValue(item);
    }

    return result;
  }

  return value;
}

async function getSubcollectionSummary(docRef) {
  const collections =
    await docRef.listCollections();

  const result = {};

  for (const collectionRef of collections) {
    const snapshot =
      await collectionRef.get();

    result[collectionRef.id] = {
      documentCount: snapshot.size,
    };
  }

  return result;
}

async function exportStructure() {
  console.log(
    "Reading Firestore school structure...",
  );

  const output = {
    exportedAt: new Date().toISOString(),
    users: [],
    schools: [],
  };

  // -----------------------------
  // Users
  // -----------------------------

  const usersSnapshot =
    await db.collection("users").get();

  console.log(
    `Found ${usersSnapshot.size} user document(s).`,
  );

  for (const userDoc of usersSnapshot.docs) {
    const data = serializeValue(
      userDoc.data(),
    );

    output.users.push({
      id: userDoc.id,
      data,
    });
  }

  // -----------------------------
  // Schools
  // -----------------------------

  const schoolsSnapshot =
    await db.collection("schools").get();

  console.log(
    `Found ${schoolsSnapshot.size} school document(s).`,
  );

  for (const schoolDoc of schoolsSnapshot.docs) {
    console.log(
      `Reading school: ${schoolDoc.id}`,
    );

    const subcollections =
      await getSubcollectionSummary(
        schoolDoc.ref,
      );

    output.schools.push({
      id: schoolDoc.id,

      data: serializeValue(
        schoolDoc.data(),
      ),

      subcollections,
    });
  }

  // -----------------------------
  // Save JSON
  // -----------------------------

  const outputPath = path.join(
    __dirname,
    "../school-structure.json",
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(output, null, 2),
    "utf8",
  );

  console.log("");
  console.log("Export complete.");
  console.log(`Created: ${outputPath}`);
}

exportStructure()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(
      "Export failed:",
      error,
    );

    process.exit(1);
  });