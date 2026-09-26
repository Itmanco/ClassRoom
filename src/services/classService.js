import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  where,
  query
} from "firebase/firestore";

import {
  createAuditLogWrite,
} from "./auditLogService";

function requireSchoolId(schoolId) {
  if (!schoolId || typeof schoolId !== "string") {
    throw new Error("A schoolId is required to access classes.");
  }
}

function normalizeClassCode(code) {
  if (typeof code !== "string" || !code.trim()) {
    throw new Error("A class code is required.");
  }
  const normalized = code.trim().toUpperCase().replace(/\s+/g, "_");
  if (!/^[A-Z0-9_-]+$/.test(normalized)) {
    throw new Error("Class codes may contain only letters, numbers, hyphens, and underscores.");
  }
  return normalized;
}

function validateClass(classItem) {
  if (!classItem || typeof classItem !== "object") throw new Error("A class is required.");
  const code = normalizeClassCode(classItem.code);
  const name = typeof classItem.name === "string" ? classItem.name.trim() : "";
  const courseId = typeof classItem.courseId === "string" ? classItem.courseId.trim() : "";
  const roomId = typeof classItem.roomId === "string" ? classItem.roomId.trim() : "";
  const academicYear = Number(classItem.academicYear);
  const semester = Number(classItem.semester);

  if (!name) throw new Error("A class name is required.");
  if (!courseId) throw new Error("A course is required.");
  if (!roomId) throw new Error("A room is required.");
  if (!Number.isInteger(academicYear) || academicYear < 2000 || academicYear > 2100) {
    throw new Error("Academic year must be between 2000 and 2100.");
  }
  if (!Number.isInteger(semester) || semester < 1 || semester > 4) {
    throw new Error("Semester must be between 1 and 4.");
  }

  const teacherUids = Array.isArray(classItem.teacherUids)
  ? [
      ...new Set(
        classItem.teacherUids
          .filter((uid) => typeof uid === "string")
          .map((uid) => uid.trim())
          .filter(Boolean)
      ),
    ]
  : [];

  const mainTeacherUid =
    typeof classItem.mainTeacherUid === "string"
      ? classItem.mainTeacherUid.trim()
      : "";

  if (
    mainTeacherUid &&
    !teacherUids.includes(mainTeacherUid)
  ) {
    const error = new Error(
      "MAIN_TEACHER_NOT_ASSIGNED"
    );

    error.code =
      "MAIN_TEACHER_NOT_ASSIGNED";

    throw error;
  }

  return {
    code,
    name,
    courseId,
    roomId,
    academicYear,
    semester,
    active: classItem.active !== false,
    teacherUids,
    mainTeacherUid,
  };
}

function getClassChanges(
  previous,
  next,
  teacherNames = {},
) {
  const trackedFields = [
    "name",
    "courseId",
    "roomId",
    "academicYear",
    "semester",
    "teacherUids",
    "mainTeacherUid",
    "active",
  ];

  const teacherName = (uid) => {
    if (!uid) {
      return "";
    }

    return (
      teacherNames[String(uid)] ||
      String(uid)
    );
  };

  const changes = {};

  for (const field of trackedFields) {
    const before = previous?.[field];
    const after = next?.[field];

    if (field === "teacherUids") {
      const beforeUids = [
        ...(before || []),
      ].sort();

      const afterUids = [
        ...(after || []),
      ].sort();

      if (
        JSON.stringify(beforeUids) !==
        JSON.stringify(afterUids)
      ) {
        changes[field] = {
          before:
            (before || []).map(
              teacherName,
            ),
          after:
            (after || []).map(
              teacherName,
            ),
        };
      }

      continue;
    }

    if (field === "mainTeacherUid") {
      if (before !== after) {
        changes[field] = {
          before:
            teacherName(before),
          after:
            teacherName(after),
        };
      }

      continue;
    }

    if (before !== after) {
      changes[field] = {
        before: before ?? null,
        after: after ?? null,
      };
    }
  }

  return changes;
}

function getClassesRef(schoolId) {
  requireSchoolId(schoolId);
  return collection(db, "schools", schoolId, "classes");
}

function mapClass(snapshot) { return { id: snapshot.id, ...snapshot.data() }; }
function sortClasses(items) {
  return items.sort((a, b) => b.academicYear - a.academicYear || a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: "base" }));
}

export async function getClasses(schoolId) {
  const snapshot = await getDocs(getClassesRef(schoolId));
  return sortClasses(snapshot.docs.map(mapClass));
}

export function watchClasses(schoolId, onChange, onError) {
  return onSnapshot(getClassesRef(schoolId), (snapshot) => onChange(sortClasses(snapshot.docs.map(mapClass))), onError);
}

export function watchTeacherClasses(
  schoolId,
  teacherUid,
  onChange,
  onError
) {
  requireSchoolId(schoolId);

  if (!teacherUid || typeof teacherUid !== "string") {
    throw new Error(
      "A teacherUid is required to access assigned classes."
    );
  }

  const classesQuery = query(
    getClassesRef(schoolId),
    where(
      "teacherUids",
      "array-contains",
      teacherUid
    )
  );

  return onSnapshot(
    classesQuery,
    (snapshot) =>
      onChange(
        sortClasses(
          snapshot.docs.map(mapClass)
        )
      ),
    onError
  );
}

export async function saveClass(
  schoolId,
  classItem,
  options = {},
) {
  const normalized =
    validateClass(classItem);

  const classRef = doc(
    getClassesRef(schoolId),
    normalized.code,
  );

  const existing =
    await getDoc(classRef);

  const isNew =
    !existing.exists();

  const previous =
    existing.exists()
      ? existing.data()
      : null;

  const changes =
    previous
      ? getClassChanges(
          previous,
          normalized,
          options.teacherNames || {},
        )
      : {};

  const changedFields =
    Object.keys(changes);

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
    classRef,
    data,
    {
      merge: true,
    },
  );

  const auditWrite =
    createAuditLogWrite(
      schoolId,
      {
        action:
          isNew
            ? "class.created"
            : "class.updated",

        entityType: "class",
        entityId: classRef.id,
        actorRole:
          options.actorRole || "",

        changedFields,

        details: {
          entityName:
            normalized.name,

          ...(
            !isNew
              ? {
                  changes,
                }
              : {}
          ),
        },

        context: {
          classId:
            classRef.id,
        },
      },
    );

  batch.set(
    auditWrite.ref,
    auditWrite.data,
  );

  await batch.commit();

  return classRef.id;
}

export async function archiveClass(
  schoolId,
  classId,
  options = {},
) {
  const normalizedId =
    normalizeClassCode(classId);

  const classRef = doc(
    getClassesRef(schoolId),
    normalizedId,
  );

  const existing =
    await getDoc(classRef);

  if (!existing.exists()) {
    throw new Error(
      `Class ${normalizedId} does not exist.`,
    );
  }

  const existingData =
    existing.data();

  const batch =
    writeBatch(db);

  batch.update(
    classRef,
    {
      active: false,
      updatedAt:
        serverTimestamp(),
    },
  );

  const auditWrite =
    createAuditLogWrite(
      schoolId,
      {
        action:
          "class.archived",

        entityType:
          "class",

        entityId:
          normalizedId,

        actorRole:
          options.actorRole || "",

        changedFields: [
          "active",
        ],

        details: {
          entityName:
            existingData.name ||
            normalizedId,

          changes: {
            active: {
              before:
                existingData.active !==
                false,
              after: false,
            },
          },
        },

        context: {
          classId:
            normalizedId,
        },
      },
    );

  batch.set(
    auditWrite.ref,
    auditWrite.data,
  );

  await batch.commit();
}
