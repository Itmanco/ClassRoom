
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
  deleteDoc,
} = require("firebase/firestore");

const PROJECT_ID = "classroom-reservation-rules-test";
const SCHOOL_ID = "reservation-rules-school";
const OTHER_SCHOOL_ID = "reservation-rules-other-school";

async function run() {
  const testEnv = await initializeTestEnvironment({
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

    await testEnv.withSecurityRulesDisabled(async (context) => {
      const db = context.firestore();

      await setDoc(doc(db, "users", "rr-system-admin"), {
        active: true,
        systemRole: "system-admin",
      });

      for (const [uid, role] of [
        ["rr-school-admin", "school-admin"],
        ["rr-teacher", "teacher"],
        ["rr-student", "student"],
        ["rr-inactive-admin", "school-admin"],
      ]) {
        await setDoc(doc(db, "users", uid), {
          active: uid !== "rr-inactive-admin",
          systemRole: null,
        });

        await setDoc(
          doc(db, "schools", SCHOOL_ID, "members", uid),
          {role, active: true}
        );
      }

      for (const schoolId of [SCHOOL_ID, OTHER_SCHOOL_ID]) {
        await setDoc(doc(db, "schools", schoolId), {
          name: schoolId,
          active: true,
        });

        await setDoc(
          doc(db, "schools", schoolId, "roomReservations", "res-1"),
          {status: "active", roomId: "room-1"}
        );

        await setDoc(
          doc(db, "schools", schoolId, "reservationSeries", "series-1"),
          {roomId: "room-1"}
        );

        await setDoc(
          doc(db, "schools", schoolId, "roomReservationDays", "room-1_2026-11-02"),
          {intervals: []}
        );
      }
    });

    const systemDb = testEnv
      .authenticatedContext("rr-system-admin")
      .firestore();

    const adminDb = testEnv
      .authenticatedContext("rr-school-admin")
      .firestore();

    const teacherDb = testEnv
      .authenticatedContext("rr-teacher")
      .firestore();

    const studentDb = testEnv
      .authenticatedContext("rr-student")
      .firestore();

    const inactiveDb = testEnv
      .authenticatedContext("rr-inactive-admin")
      .firestore();

    const anonymousDb = testEnv.unauthenticatedContext().firestore();

    const reservationPath =
      `schools/${SCHOOL_ID}/roomReservations/res-1`;

    const seriesPath =
      `schools/${SCHOOL_ID}/reservationSeries/series-1`;

    const dayPath =
      `schools/${SCHOOL_ID}/roomReservationDays/room-1_2026-11-02`;

    console.log("Test 1: System Admin can read reservations");

    await assertSucceeds(getDoc(doc(systemDb, reservationPath)));
    console.log("✓ System Admin read allowed");

    console.log("Test 2: School Admin can read reservations");

    await assertSucceeds(getDoc(doc(adminDb, reservationPath)));
    console.log("✓ School Admin read allowed");

    console.log("Test 3: Teacher cannot read reservations");

    await assertFails(getDoc(doc(teacherDb, reservationPath)));
    console.log("✓ Teacher read denied");

    console.log("Test 4: Student cannot read reservations");

    await assertFails(getDoc(doc(studentDb, reservationPath)));
    console.log("✓ Student read denied");

    console.log("Test 5: Inactive admin cannot read reservations");

    await assertFails(getDoc(doc(inactiveDb, reservationPath)));
    console.log("✓ Inactive admin denied");

    console.log("Test 6: Unauthenticated read denied");

    await assertFails(getDoc(doc(anonymousDb, reservationPath)));
    console.log("✓ Unauthenticated read denied");

    console.log("Test 7: Cross-school read denied");

    await assertFails(
      getDoc(doc(
        adminDb,
        `schools/${OTHER_SCHOOL_ID}/roomReservations/res-1`
      ))
    );

    console.log("✓ Cross-school read denied");

    console.log("Test 8: Direct reservation writes denied");

    await assertFails(
      setDoc(
        doc(adminDb, `schools/${SCHOOL_ID}/roomReservations/new-res`),
        {status: "active"}
      )
    );

    await assertFails(
      updateDoc(doc(adminDb, reservationPath), {
        status: "cancelled",
      })
    );

    await assertFails(
      deleteDoc(doc(systemDb, reservationPath))
    );

    console.log("✓ Direct reservation writes denied");

    console.log("Test 9: Reservation series access");

    await assertSucceeds(getDoc(doc(adminDb, seriesPath)));
    await assertFails(getDoc(doc(teacherDb, seriesPath)));

    await assertFails(
      setDoc(
        doc(adminDb, `schools/${SCHOOL_ID}/reservationSeries/new-series`),
        {roomId: "room-1"}
      )
    );

    console.log("✓ Series permissions enforced");

    console.log("Test 10: Reservation day index inaccessible");

    await assertFails(getDoc(doc(systemDb, dayPath)));
    await assertFails(getDoc(doc(adminDb, dayPath)));

    await assertFails(
      setDoc(doc(systemDb, dayPath), {intervals: []})
    );

    console.log("✓ Internal day index protected");

    console.log("All reservation security-rule tests passed.");
  } finally {
    await testEnv.cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
