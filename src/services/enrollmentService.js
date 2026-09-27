import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import {
  createAuditLogWrite,
} from "./auditLogService";

function getEnrollmentsRef(schoolId, classId) {
  if (!schoolId) throw new Error("A schoolId is required to access enrollments.");
  if (!classId) throw new Error("A classId is required to access enrollments.");
  return collection(db, "schools", schoolId, "classes", classId, "enrollments");
}

function normalizeEnrollment(snapshot) {
  return {
    id: snapshot.id,
    studentId: snapshot.data().studentId || snapshot.id,
    ...snapshot.data(),
  };
}

function sortEnrollments(items) {
  return items.sort((a, b) => Number(a.studentId) - Number(b.studentId));
}

export function watchEnrollments(schoolId, classId, onChange, onError) {
  return onSnapshot(
    getEnrollmentsRef(schoolId, classId),
    (snapshot) => onChange(sortEnrollments(snapshot.docs.map(normalizeEnrollment))),
    onError,
  );
}

export async function enrollStudent(
  schoolId,
  classId,
  studentId,
  options = {},
) {
  const normalizedStudentId =
    String(studentId || "").trim();

  if (!normalizedStudentId) {
    throw new Error(
      "A studentId is required.",
    );
  }

  const enrollmentRef =
    doc(
      getEnrollmentsRef(
        schoolId,
        classId,
      ),
      normalizedStudentId,
    );

  const existing =
    await getDoc(enrollmentRef);

  const existingData =
    existing.exists()
      ? existing.data()
      : null;

  const isNew =
    !existing.exists();

  const isReactivation =
    existing.exists() &&
    existingData.active === false;

  const payload = {
    studentId: normalizedStudentId,
    active: true,
    updatedAt: serverTimestamp(),
  };

  if (isNew) {
    payload.enrolledAt =
      serverTimestamp();
  }

  const action =
    isNew
      ? "enrollment.created"
      : isReactivation
        ? "enrollment.reactivated"
        : "";

  const batch =
    writeBatch(db);

  batch.set(
    enrollmentRef,
    payload,
    {
      merge: true,
    },
  );

  if (action) {
    const auditWrite =
      createAuditLogWrite(
        schoolId,
        {
          action,
          entityType: "enrollment",
          entityId:
            normalizedStudentId,
          actorRole:
            options.actorRole || "",
          changedFields: [
            "active",
          ],
          details: {
            entityName:
              options.studentName ||
              normalizedStudentId,
          },
          context: {
            classId,
          },
        },
      );

    batch.set(
      auditWrite.ref,
      auditWrite.data,
    );
  }

  await batch.commit();

  return normalizedStudentId;
}

export async function archiveEnrollment(
  schoolId,
  classId,
  studentId,
  options = {},
) {
  const normalizedStudentId =
    String(studentId || "").trim();

  if (!normalizedStudentId) {
    throw new Error(
      "A studentId is required.",
    );
  }

  const enrollmentRef =
    doc(
      getEnrollmentsRef(
        schoolId,
        classId,
      ),
      normalizedStudentId,
    );

  const existing =
    await getDoc(enrollmentRef);

  if (!existing.exists()) {
    throw new Error(
      "Enrollment not found.",
    );
  }

  const batch =
    writeBatch(db);

  batch.update(
    enrollmentRef,
    {
      active: false,
      updatedAt: serverTimestamp(),
    },
  );

  const auditWrite =
    createAuditLogWrite(
      schoolId,
      {
        action:
          "enrollment.archived",
        entityType:
          "enrollment",
        entityId:
          normalizedStudentId,
        actorRole:
          options.actorRole || "",
        changedFields: [
          "active",
        ],
        details: {
          entityName:
            options.studentName ||
            normalizedStudentId,
        },
        context: {
          classId,
        },
      },
    );

  batch.set(
    auditWrite.ref,
    auditWrite.data,
  );

  await batch.commit();
}
