import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import {
  createAuditLogWrite,
} from "./auditLogService";

function requireText(value, fieldName) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required.`);
  }
  return value.trim();
}

function requireContext(schoolId, classId) {
  requireText(schoolId, "School ID");
  requireText(classId, "Class ID");
}

function getSeatingPlansRef(schoolId, classId) {
  requireContext(schoolId, classId);
  return collection(db, "schools", schoolId, "classes", classId, "seatingPlans");
}

function mapPlan(snapshot) {
  return { id: snapshot.id, ...snapshot.data() };
}

function sortPlans(items) {
  return items.sort((a, b) => {
    const first = a.planDate || "";
    const second = b.planDate || "";
    return second.localeCompare(first) || String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });
}

function validateAssignments(assignments, deskCount, seatsPerDesk) {
  if (!Array.isArray(assignments)) throw new Error("Assignments must be an array.");

  const seenStudents = new Set();
  const seenSeats = new Set();

  return assignments
    .filter((item) => item && item.studentId !== "" && item.studentId != null)
    .map((item) => {
      const studentId = String(item.studentId);
      const deskNumber = Number(item.deskNumber);
      const seatNumber = Number(item.seatNumber);

      if (!Number.isInteger(deskNumber) || deskNumber < 1 || deskNumber > deskCount) {
        throw new Error(`Desk number for student ${studentId} is invalid.`);
      }
      if (!Number.isInteger(seatNumber) || seatNumber < 1 || seatNumber > seatsPerDesk) {
        throw new Error(`Seat number for student ${studentId} is invalid.`);
      }
      if (seenStudents.has(studentId)) {
        throw new Error(`Student ${studentId} is assigned more than once.`);
      }

      const seatKey = `${deskNumber}:${seatNumber}`;
      if (seenSeats.has(seatKey)) throw new Error(`Desk ${deskNumber}, seat ${seatNumber} is duplicated.`);

      seenStudents.add(studentId);
      seenSeats.add(seatKey);
      return { studentId, deskNumber, seatNumber };
    });
}

function validatePlan(plan) {
  if (!plan || typeof plan !== "object") throw new Error("A seating plan is required.");
  const title = requireText(plan.title, "Plan title");
  const planDate = requireText(plan.planDate, "Plan date");
  const roomId = requireText(plan.roomId, "Room ID");
  const deskCount = Number(plan.deskCount);
  const seatsPerDesk = Number(plan.seatsPerDesk);
  const desksPerRow = Number(plan.desksPerRow || 2,);
  const allowedTeacherPositions = [
    "front-left",
    "front-right",
    "back-left",
    "back-right",
  ];
  const teacherPosition = allowedTeacherPositions.includes(plan.teacherPosition,)
      ? plan.teacherPosition : "front-left";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(planDate)) throw new Error("Plan date must use YYYY-MM-DD.");
  if (!Number.isInteger(deskCount) || deskCount < 1) throw new Error("Desk count must be positive.");
  if (!Number.isInteger(seatsPerDesk) || seatsPerDesk < 1) throw new Error("Seats per desk must be positive.");
  if (!Number.isInteger(desksPerRow) || desksPerRow < 1 || desksPerRow > deskCount) { throw new Error("Desks per row is invalid.",);
}

  return {
    title,
    planDate,
    roomId,
    deskCount,
    seatsPerDesk,
    desksPerRow,
    teacherPosition,
    capacity: deskCount * seatsPerDesk,
    assignments: validateAssignments(plan.assignments, deskCount, seatsPerDesk),
    active: plan.active !== false,
  };
}

function getAssignmentChanges(
  previousAssignments = [],
  nextAssignments = [],
  studentNames = {},
) {
  const previousByStudent =
    new Map(
      previousAssignments.map(
        (item) => [
          String(item.studentId),
          item,
        ],
      ),
    );

  const nextByStudent =
    new Map(
      nextAssignments.map(
        (item) => [
          String(item.studentId),
          item,
        ],
      ),
    );

  const studentIds =
    new Set([
      ...previousByStudent.keys(),
      ...nextByStudent.keys(),
    ]);

  const changes = [];

  studentIds.forEach(
    (studentId) => {
      const before =
        previousByStudent.get(
          studentId,
        );

      const after =
        nextByStudent.get(
          studentId,
        );

      const unchanged =
        before &&
        after &&
        before.deskNumber ===
          after.deskNumber &&
        before.seatNumber ===
          after.seatNumber;

      if (unchanged) {
        return;
      }

      changes.push({
        studentId,

        studentName:
          studentNames[studentId] ||
          studentId,

        before: before
          ? {
              deskNumber:
                before.deskNumber,
              seatNumber:
                before.seatNumber,
            }
          : null,

        after: after
          ? {
              deskNumber:
                after.deskNumber,
              seatNumber:
                after.seatNumber,
            }
          : null,
      });
    },
  );

  return changes;
}

function getChanges(
  previous,
  next,
  studentNames = {},
) {
  const trackedFields = [
    "title",
    "planDate",
    "roomId",
    "deskCount",
    "seatsPerDesk",
    "desksPerRow",
    "teacherPosition",
    "capacity",
    "assignments",
    "active",
  ];

  const changes = {};

  for (
    const field
    of trackedFields
  ) {
    const before =
      previous?.[field];

    const after =
      next?.[field];

    if (field === "assignments") {
      const assignmentChanges =
        getAssignmentChanges(
          before || [],
          after || [],
          studentNames,
        );

      if (assignmentChanges.length) {
        changes.assignments = {
          students:
            assignmentChanges,
        };
      }

      continue;
    }

    if (before !== after) {
      changes[field] = {
        before:
          before ?? null,

        after:
          after ?? null,
      };
    }
  }

  return changes;
}

export async function getSeatingPlans(schoolId, classId) {
  const snapshot = await getDocs(getSeatingPlansRef(schoolId, classId));
  return sortPlans(snapshot.docs.map(mapPlan));
}

export function watchSeatingPlans(schoolId, classId, onChange, onError) {
  return onSnapshot(
    getSeatingPlansRef(schoolId, classId),
    (snapshot) => onChange(sortPlans(snapshot.docs.map(mapPlan))),
    onError,
  );
}

export async function saveSeatingPlan(
  schoolId,
  classId,
  plan,
  options = {},
) {
  requireContext(
    schoolId,
    classId,
  );

  const normalized =
    validatePlan(plan);

  const planRef =
    plan.id
      ? doc(
          getSeatingPlansRef(
            schoolId,
            classId,
          ),
          String(plan.id),
        )
      : doc(
          getSeatingPlansRef(
            schoolId,
            classId,
          ),
        );

  const existing =
    await getDoc(planRef);

  const isNew =
    !existing.exists();

  const previous =
    existing.exists()
      ? existing.data()
      : null;

  const changes =
  previous
    ? getChanges(
        previous,
        normalized,
        options.studentNames || {},
      )
    : {};

  const changedFields =
    Object.keys(
      changes,
    );

  const data = {
    ...normalized,
    updatedAt:
      serverTimestamp(),
  };

  if (isNew) {
    data.createdAt =
      serverTimestamp();
  }

  const batch =
    writeBatch(db);

  batch.set(
    planRef,
    data,
    {
      merge: true,
    },
  );

  const audit =
    createAuditLogWrite(
      schoolId,
      {
        action:
          isNew
            ? "seatingPlan.created"
            : "seatingPlan.updated",

        entityType:
          "seatingPlan",

        entityId:
          planRef.id,

        actorRole:
          options.actorRole ||
          "",

        changedFields,

        details: {
          entityName:
            normalized.title,

          ...(
            !isNew
              ? {
                  changes,
                }
              : {}
          ),
        },

        context: {
          classId,
        },
      },
    );

  batch.set(
    audit.ref,
    audit.data,
  );

  await batch.commit();

  return planRef.id;
}

export async function archiveSeatingPlan(
  schoolId,
  classId,
  planId,
  options = {},
) {
  const id =
    requireText(
      planId,
      "Seating plan ID",
    );

  const planRef =
    doc(
      getSeatingPlansRef(
        schoolId,
        classId,
      ),
      id,
    );

  const existing =
    await getDoc(planRef);

  if (!existing.exists()) {
    throw new Error(
      `Seating plan ${id} does not exist.`,
    );
  }

  const batch =
    writeBatch(db);

  batch.update(
    planRef,
    {
      active: false,
      updatedAt:
        serverTimestamp(),
    },
  );

  const audit =
    createAuditLogWrite(
      schoolId,
      {
        action:
          "seatingPlan.archived",

        entityType:
          "seatingPlan",

        entityId:
          id,

        actorRole:
          options.actorRole ||
          "",

        changedFields: [
          "active",
        ],

        details: {
          entityName:
            existing.data().title ||
            "",
        },

        context: {
          classId,
        },
      },
    );

  batch.set(
    audit.ref,
    audit.data,
  );

  await batch.commit();
}

export async function reactivateSeatingPlan(
  schoolId,
  classId,
  planId,
  options = {},
) {
  const id =
    requireText(
      planId,
      "Seating plan ID",
    );

  const planRef =
    doc(
      getSeatingPlansRef(
        schoolId,
        classId,
      ),
      id,
    );

  const existing =
    await getDoc(planRef);

  if (!existing.exists()) {
    throw new Error(
      `Seating plan ${id} does not exist.`,
    );
  }

  const batch =
    writeBatch(db);

  batch.update(
    planRef,
    {
      active: true,
      updatedAt:
        serverTimestamp(),
    },
  );

  const audit =
    createAuditLogWrite(
      schoolId,
      {
        action:
          "seatingPlan.reactivated",

        entityType:
          "seatingPlan",

        entityId:
          id,

        actorRole:
          options.actorRole ||
          "",

        changedFields: [
          "active",
        ],

        details: {
          entityName:
            existing.data().title ||
            "",
        },

        context: {
          classId,
        },
      },
    );

  batch.set(
    audit.ref,
    audit.data,
  );

  await batch.commit();
}
