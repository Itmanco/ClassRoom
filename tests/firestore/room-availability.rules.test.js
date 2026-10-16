
const fs = require("fs");
const path = require("path");

const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} = require("@firebase/rules-unit-testing");

const {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

const PROJECT_ID = "classroom-room-availability-test";

let testEnv;

function availabilityData() {
  return {
    weeklyHours: {
      monday: [
        { start: "09:00", end: "12:00" },
        { start: "13:00", end: "18:00" },
      ],
      tuesday: [
        { start: "09:00", end: "18:00" },
      ],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
    updatedAt: new Date(),
  };
}

async function seedDocument(pathSegments, data) {
  await testEnv.withSecurityRulesDisabled(
    async (context) => {
      await setDoc(
        doc(context.firestore(), ...pathSegments),
        data,
      );
    },
  );
}

function availabilityRef(db, schoolId, roomId) {
  return doc(
    db,
    "schools",
    schoolId,
    "roomAvailability",
    roomId,
  );
}

async function run() {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(
        path.resolve(__dirname, "../../firestore.rules"),
        "utf8",
      ),
    },
  });

  try {
    await testEnv.clearFirestore();

    await seedDocument(
      ["users", "system-admin-user"],
      { active: true, systemRole: "system-admin" },
    );

    for (const uid of [
      "school-admin-user",
      "teacher-user",
      "student-user",
    ]) {
      await seedDocument(
        ["users", uid],
        { active: true, systemRole: null },
      );
    }

    for (const [uid, role] of [
      ["school-admin-user", "school-admin"],
      ["teacher-user", "teacher"],
      ["student-user", "student"],
    ]) {
      await seedDocument(
        ["schools", "school-a", "members", uid],
        { userUid: uid, role, active: true },
      );
    }

    await seedDocument(
      ["schools", "school-a", "rooms", "ROOM1"],
      { code: "ROOM1", active: true },
    );

    const systemDb = testEnv
      .authenticatedContext("system-admin-user")
      .firestore();

    const adminDb = testEnv
      .authenticatedContext("school-admin-user")
      .firestore();

    const teacherDb = testEnv
      .authenticatedContext("teacher-user")
      .firestore();

    const studentDb = testEnv
      .authenticatedContext("student-user")
      .firestore();

    const systemRef = availabilityRef(
      systemDb, "school-a", "ROOM1",
    );
    const adminRef = availabilityRef(
      adminDb, "school-a", "ROOM1",
    );
    const teacherRef = availabilityRef(
      teacherDb, "school-a", "ROOM1",
    );
    const studentRef = availabilityRef(
      studentDb, "school-a", "ROOM1",
    );

    await assertFails(
      setDoc(systemRef, availabilityData()),
    );

    await assertFails(
      setDoc(adminRef, availabilityData()),
    );

    await assertSucceeds(getDoc(teacherRef));

    await assertFails(getDoc(studentRef));

    await assertFails(
      setDoc(teacherRef, availabilityData()),
    );

    await assertFails(
      setDoc(studentRef, availabilityData()),
    );

    await assertFails(
      setDoc(
        availabilityRef(adminDb, "school-b", "ROOM1"),
        availabilityData(),
      ),
    );

    await assertFails(
      setDoc(
        availabilityRef(adminDb, "school-a", "MISSING"),
        availabilityData(),
      ),
    );

    const malformed = availabilityData();
    malformed.weeklyHours.monday = [
      { start: "18:00", end: "09:00" },
    ];

    await assertFails(
      setDoc(adminRef, malformed),
    );

    console.log("Testing overlapping availability...");
    const overlapping = availabilityData();
    overlapping.weeklyHours.monday = [
      { start: "09:00", end: "13:00" },
      { start: "12:00", end: "18:00" },
    ];

    await assertFails(
      setDoc(adminRef, overlapping),
    );

    console.log("Testing teacher update denial...");
    await assertFails(
      updateDoc(teacherRef, {
        timezone: "Asia/Tokyo",
      }),
    );

    await assertFails(deleteDoc(adminRef));

    console.log(
      "Room availability security tests passed.",
    );
  } finally {
    await testEnv.cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
