const fs = require("fs");
const path = require("path");

const {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
} = require("@firebase/rules-unit-testing");

const {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} = require("firebase/firestore");

const PROJECT_ID = "classroom-class-access-test";

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

async function seedClass(
  schoolId,
  classId,
  teacherUids,
  mainTeacherUid = ""
) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(
      doc(db, "schools", schoolId, "classes", classId),
      {
        code: classId,
        name: `Class ${classId}`,
        courseId: "course-1",
        roomId: "room-1",
        academicYear: 2026,
        semester: 1,
        active: true,
        teacherUids,
        mainTeacherUid,
      }
    );
  });
}

async function seedEnrollment(
  schoolId,
  classId,
  studentId
) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    await setDoc(
      doc(
        db,
        "schools",
        schoolId,
        "classes",
        classId,
        "enrollments",
        studentId
      ),
      {
        studentId,
        active: true,
      }
    );
  });
}

async function seedSeatingPlan(
  schoolId,
  classId,
  seatingPlanId
) {
  await testEnv.withSecurityRulesDisabled(
    async (context) => {
      const db = context.firestore();

      await setDoc(
        doc(
          db,
          "schools",
          schoolId,
          "classes",
          classId,
          "seatingPlans",
          seatingPlanId
        ),
        {
          name: `Seating Plan ${seatingPlanId}`,
          seats: [],
          active: true,
        }
      );
    }
  );
}

function seatingPlanAuditData({
  actorUid,
  action,
  classId,
  entityId = "PLAN_A",
}) {
  return {
    actorUid,
    actorEmail: `${actorUid}@example.com`,
    actorRole: "teacher",
    action,
    entityType: "seatingPlan",
    entityId,
    schoolId: "school-a",
    changedFields: [],
    details: {},
    context: {
      classId,
    },
    createdAt: new Date(),
  };
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

    const assignedTeacherUid = "teacher-assigned";
    const otherTeacherUid = "teacher-other";
    const adminUid = "school-admin";
    const studentId = "student-1";
    const mainTeacherUid = "teacher-main";

    await seedUser(assignedTeacherUid);
    await seedUser(otherTeacherUid);
    await seedUser(adminUid);
    await seedUser(mainTeacherUid);

    await seedMembership(
      schoolId,
      assignedTeacherUid,
      "teacher"
    );

    await seedMembership(
      schoolId,
      otherTeacherUid,
      "teacher"
    );

    await seedMembership(
      schoolId,
      adminUid,
      "school-admin"
    );

    await seedMembership(
      schoolId,
      mainTeacherUid,
      "teacher"
    );

    await seedClass(
      schoolId,
      "CLASS_A",
      [
        assignedTeacherUid,
        mainTeacherUid,
      ],
      mainTeacherUid
    );

    await seedClass(
      schoolId,
      "CLASS_B",
      [otherTeacherUid],
      otherTeacherUid
    );

    await seedEnrollment(
      schoolId,
      "CLASS_A",
      studentId
    );

    await seedSeatingPlan(
      schoolId,
      "CLASS_A",
      "PLAN_A"
    );

    await seedSeatingPlan(
      schoolId,
      "CLASS_B",
      "PLAN_B"
    );

    const teacherDb =
      testEnv
        .authenticatedContext(assignedTeacherUid)
        .firestore();

    const mainTeacherDb =
      testEnv
        .authenticatedContext(mainTeacherUid)
        .firestore();

    const adminDb =
      testEnv
        .authenticatedContext(adminUid)
        .firestore();

    console.log(
      "Assigned teacher: class read allowed"
    );

    await assertSucceeds(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A"
        )
      )
    );

    console.log(
      "✓ assigned teacher can read class"
    );

    console.log(
      "Assigned teacher: assigned-classes query allowed"
    );

    const assignedClassesQuery = query(
      collection(
        teacherDb,
        "schools",
        schoolId,
        "classes"
      ),
      where(
        "teacherUids",
        "array-contains",
        assignedTeacherUid
      )
    );

    const assignedClassesSnapshot =
      await assertSucceeds(
        getDocs(assignedClassesQuery)
      );

    const assignedClassIds =
      assignedClassesSnapshot.docs
        .map((classDoc) => classDoc.id)
        .sort();

    if (
      assignedClassIds.length !== 1 ||
      assignedClassIds[0] !== "CLASS_A"
    ) {
      throw new Error(
        `Expected teacher query to return only CLASS_A, received: ${assignedClassIds.join(", ")}`
      );
    }

    console.log(
      "✓ teacher query returns only assigned classes"
    );

    console.log(
      "Assigned teacher: unrestricted classes query denied"
    );

    await assertFails(
      getDocs(
        collection(
          teacherDb,
          "schools",
          schoolId,
          "classes"
        )
      )
    );

    console.log(
      "✓ teacher cannot query all classes"
    );

    console.log(
      "Assigned teacher: class update denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A"
        ),
        {
          name: "Forbidden Class Rename",
        }
      )
    );

    console.log(
      "✓ assigned teacher cannot update class document"
    );

    console.log(
      "Assigned teacher: teacherUids mutation denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A"
        ),
        {
          teacherUids: [
            assignedTeacherUid,
            otherTeacherUid,
          ],
        }
      )
    );

    console.log(
      "✓ teacher cannot change class assignments"
    );

    console.log(
      "Assigned teacher: mainTeacherUid mutation denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A"
        ),
        {
          mainTeacherUid: otherTeacherUid,
        }
      )
    );

    console.log(
      "✓ teacher cannot change main teacher"
    );

    console.log(
  "Assigned teacher: class archive denied"
);

await assertFails(
  updateDoc(
    doc(
      teacherDb,
      "schools",
      schoolId,
      "classes",
      "CLASS_A"
    ),
    {
      active: false,
    }
  )
);

console.log(
  "✓ teacher cannot archive assigned class"
);

    console.log(
      "Unassigned teacher: class read denied"
    );

    await assertFails(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B"
        )
      )
    );

    console.log(
      "✓ teacher cannot read unassigned class"
    );

    console.log(
      "Unassigned teacher: class update denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B"
        ),
        {
          name: "Forbidden Update",
        }
      )
    );

    console.log(
      "✓ teacher cannot update unassigned class"
    );

    console.log(
      "Assigned teacher: enrollment read allowed"
    );

    await assertSucceeds(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "enrollments",
          studentId
        )
      )
    );

    console.log(
      "✓ assigned teacher can read enrollment"
    );

    console.log(
      "Assigned teacher: enrollment create denied"
    );

    await assertFails(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "enrollments",
          "student-2"
        ),
        {
          studentId: "student-2",
          active: true,
        }
      )
    );

    console.log(
      "✓ teacher cannot create enrollment"
    );

    console.log(
      "Assigned teacher: enrollment update denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "enrollments",
          studentId
        ),
        {
          active: false,
        }
      )
    );

    console.log(
      "✓ teacher cannot modify enrollment"
    );

    console.log(
      "Assigned teacher: seating plan read allowed"
    );

    await assertSucceeds(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        )
      )
    );

    console.log(
      "✓ assigned teacher can read seating plan"
    );

    console.log(
      "Assigned teacher: seating plan create allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_TEACHER"
        ),
        {
          name: "Teacher Seating Plan",
          seats: [],
          active: true,
        }
      )
    );

    console.log(
      "✓ assigned teacher can create seating plan"
    );

    console.log(
      "Assigned teacher: seating plan update allowed"
    );

    await assertSucceeds(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        ),
        {
          name: "Updated Seating Plan",
        }
      )
    );

    console.log(
      "✓ assigned teacher can update seating plan"
    );

    console.log(
      "Assigned teacher: seating plan archive denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        ),
        {
          active: false,
        }
      )
    );

    console.log(
      "✓ assigned non-main teacher cannot archive seating plan"
    );

    console.log(
      "Assigned teacher: seating plan delete denied"
    );

    await assertFails(
      deleteDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        )
      )
    );

    console.log(
      "✓ assigned non-main teacher cannot delete seating plan"
    );

    console.log(
      "Main teacher: seating plan read allowed"
    );

    await assertSucceeds(
      getDoc(
        doc(
          mainTeacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        )
      )
    );

    console.log(
      "✓ main teacher can read seating plan"
    );

    console.log(
      "Main teacher: seating plan create allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          mainTeacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_MAIN_TEACHER"
        ),
        {
          name: "Main Teacher Seating Plan",
          seats: [],
          active: true,
        }
      )
    );

    console.log(
      "✓ main teacher can create seating plan"
    );

    console.log(
      "Main teacher: seating plan update allowed"
    );

    await assertSucceeds(
      updateDoc(
        doc(
          mainTeacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        ),
        {
          name: "Main Teacher Updated Plan",
        }
      )
    );

    console.log(
      "✓ main teacher can update seating plan"
    );

    console.log(
      "Main teacher: seating plan archive allowed"
    );

    await assertSucceeds(
      updateDoc(
        doc(
          mainTeacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        ),
        {
          active: false,
        }
      )
    );

    console.log(
      "✓ main teacher can archive seating plan"
    );

    console.log(
      "Assigned teacher: seating plan reactivation denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_A"
        ),
        {
          active: true,
        }
      )
    );

    console.log(
      "✓ assigned non-main teacher cannot reactivate seating plan"
    );

    console.log(
      "Main teacher: seating plan delete allowed"
    );

    await assertSucceeds(
      deleteDoc(
        doc(
          mainTeacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "seatingPlans",
          "PLAN_MAIN_TEACHER"
        )
      )
    );

    console.log(
      "✓ main teacher can delete seating plan"
    );

    console.log(
      "Unassigned teacher: seating plan read denied"
    );

    await assertFails(
      getDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_B"
        )
      )
    );

    console.log(
      "✓ teacher cannot read unassigned seating plan"
    );

    console.log(
      "Unassigned teacher: seating plan create denied"
    );

    await assertFails(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_FORBIDDEN"
        ),
        {
          name: "Forbidden Seating Plan",
          seats: [],
          active: true,
        }
      )
    );

    console.log(
      "✓ teacher cannot create unassigned seating plan"
    );

    console.log(
      "Unassigned teacher: seating plan update denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_B"
        ),
        {
          name: "Forbidden Seating Plan Update",
        }
      )
    );

    console.log(
      "✓ teacher cannot update unassigned seating plan"
    );

    console.log(
      "Unassigned teacher: seating plan archive denied"
    );

    await assertFails(
      updateDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_B"
        ),
        {
          active: false,
        }
      )
    );

    console.log(
      "✓ teacher cannot archive unassigned seating plan"
    );

    console.log(
      "Unassigned teacher: seating plan delete denied"
    );

    await assertFails(
      deleteDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_B"
        )
      )
    );

    console.log(
      "✓ teacher cannot delete unassigned seating plan"
    );

    console.log(
      "Assigned teacher: seating create audit allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "teacher-seating-created"
        ),
        seatingPlanAuditData({
          actorUid: assignedTeacherUid,
          action: "seatingPlan.created",
          classId: "CLASS_A",
        })
      )
    );

    console.log(
      "✓ assigned teacher can audit seating plan creation"
    );

    console.log(
      "Assigned teacher: seating update audit allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "teacher-seating-updated"
        ),
        seatingPlanAuditData({
          actorUid: assignedTeacherUid,
          action: "seatingPlan.updated",
          classId: "CLASS_A",
        })
      )
    );

    console.log(
      "✓ assigned teacher can audit seating plan update"
    );

    console.log(
      "Assigned teacher: seating archive audit denied"
    );

    await assertFails(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "teacher-seating-archived"
        ),
        seatingPlanAuditData({
          actorUid: assignedTeacherUid,
          action: "seatingPlan.archived",
          classId: "CLASS_A",
        })
      )
    );

    console.log(
      "✓ assigned non-main teacher cannot audit seating plan archive"
    );

    console.log(
      "Assigned teacher: seating reactivation audit denied"
    );

    await assertFails(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "teacher-seating-reactivated"
        ),
        seatingPlanAuditData({
          actorUid: assignedTeacherUid,
          action: "seatingPlan.reactivated",
          classId: "CLASS_A",
        })
      )
    );

    console.log(
      "✓ assigned non-main teacher cannot audit seating plan reactivation"
    );

    console.log(
      "Assigned teacher: unassigned-class seating audit denied"
    );

    await assertFails(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "teacher-unassigned-seating"
        ),
        seatingPlanAuditData({
          actorUid: assignedTeacherUid,
          action: "seatingPlan.updated",
          classId: "CLASS_B",
          entityId: "PLAN_B",
        })
      )
    );

    console.log(
      "✓ teacher cannot audit seating plan for unassigned class"
    );

    console.log(
      "Assigned teacher: spoofed seating audit actor denied"
    );

    await assertFails(
      setDoc(
        doc(
          teacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "teacher-spoofed-seating"
        ),
        seatingPlanAuditData({
          actorUid: otherTeacherUid,
          action: "seatingPlan.updated",
          classId: "CLASS_A",
        })
      )
    );

    console.log(
      "✓ teacher cannot spoof seating audit actor"
    );

    console.log(
      "Main teacher: seating archive audit allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          mainTeacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "main-teacher-seating-archived"
        ),
        seatingPlanAuditData({
          actorUid: mainTeacherUid,
          action: "seatingPlan.archived",
          classId: "CLASS_A",
        })
      )
    );

    console.log(
      "✓ main teacher can audit seating plan archive"
    );

    console.log(
      "Main teacher: seating reactivation audit allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          mainTeacherDb,
          "schools",
          schoolId,
          "auditLogs",
          "main-teacher-seating-reactivated"
        ),
        seatingPlanAuditData({
          actorUid: mainTeacherUid,
          action: "seatingPlan.reactivated",
          classId: "CLASS_A",
        })
      )
    );

    console.log(
      "✓ main teacher can audit seating plan reactivation"
    );

    console.log(
      "School Admin: seating plan archive allowed"
    );

    await assertSucceeds(
      updateDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_B"
        ),
        {
          active: false,
        }
      )
    );

    console.log(
      "✓ school admin can archive seating plan"
    );

    console.log(
      "School Admin: seating plan delete allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_ADMIN_DELETE"
        ),
        {
          name: "Admin Delete Test Plan",
          seats: [],
          active: true,
        }
      )
    );

    await assertSucceeds(
      deleteDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_ADMIN_DELETE"
        )
      )
    );

    console.log(
      "✓ school admin can delete seating plan"
    );

    console.log(
      "School Admin: class access allowed"
    );

    await assertSucceeds(
      getDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B"
        )
      )
    );

    console.log(
      "✓ school admin can read classes"
    );

    console.log(
      "School Admin: mainTeacherUid update allowed"
    );

    await assertSucceeds(
      updateDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A"
        ),
        {
          teacherUids: [
            assignedTeacherUid,
            otherTeacherUid,
          ],
          mainTeacherUid: otherTeacherUid,
        }
      )
    );

    console.log(
      "✓ school admin can change main teacher"
    );

    console.log(
      "School Admin: enrollment write allowed"
    );

    await assertSucceeds(
      setDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_A",
          "enrollments",
          "student-admin-added"
        ),
        {
          studentId: "student-admin-added",
          active: true,
        }
      )
    );

    console.log(
      "✓ school admin can manage enrollments"
    );

    console.log(
      "School Admin: seating plan access allowed"
    );

    await assertSucceeds(
      getDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_B"
        )
      )
    );

    await assertSucceeds(
      updateDoc(
        doc(
          adminDb,
          "schools",
          schoolId,
          "classes",
          "CLASS_B",
          "seatingPlans",
          "PLAN_B"
        ),
        {
          name: "Admin Updated Seating Plan",
        }
      )
    );

    console.log(
      "✓ school admin can read and update seating plans"
    );

    console.log(
      "\nAll class access rules tests passed."
    );
  } finally {
    await testEnv.cleanup();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});