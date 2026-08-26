// src/services/auditLogService.js

import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase-init";

function requireText(
  value,
  fieldName,
) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new Error(
      `${fieldName} is required.`,
    );
  }

  return value.trim();
}

export function createAuditLogWrite(
  schoolId,
  {
    action,
    entityType,
    entityId,
    actorRole = "",
    changedFields = [],
    details = {},
  },
) {
  const actor =
    auth.currentUser;

  if (!actor) {
    throw new Error(
      "Authenticated user required for audit logging.",
    );
  }

  const normalizedSchoolId =
    requireText(
      schoolId,
      "School ID",
    );

  const auditRef =
    doc(
      collection(
        db,
        "schools",
        normalizedSchoolId,
        "auditLogs",
      ),
    );

  return {
    ref:
      auditRef,

    data: {
      actorUid:
        actor.uid,

      actorEmail:
        actor.email || "",

      actorRole:
        typeof actorRole === "string"
          ? actorRole.trim()
          : "",

      action:
        requireText(
          action,
          "Action",
        ),

      entityType:
        requireText(
          entityType,
          "Entity type",
        ),

      entityId:
        String(
          entityId,
        ),

      schoolId:
        normalizedSchoolId,

      changedFields:
        Array.isArray(
          changedFields,
        )
          ? changedFields
          : [],

      details:
        details &&
        typeof details === "object"
          ? details
          : {},

      createdAt:
        serverTimestamp(),
    },
  };
}

export async function getRecentAuditLogs(
  schoolId,
  options = {},
) {
  const normalizedSchoolId =
    requireText(
      schoolId,
      "School ID",
    );

  const maxResults =
    Number(
      options.maxResults,
    ) || 50;

  const isSystemAdmin =
    options.isSystemAdmin ===
    true;

  const schoolAuditQuery =
    query(
      collection(
        db,
        "schools",
        normalizedSchoolId,
        "auditLogs",
      ),
      orderBy(
        "createdAt",
        "desc",
      ),
      limit(
        maxResults,
      ),
    );

  const schoolSnapshot =
    await getDocs(
      schoolAuditQuery,
    );

  const schoolLogs =
    schoolSnapshot.docs.map(
      (documentSnapshot) => ({
        id:
          `school-${documentSnapshot.id}`,

        documentId:
          documentSnapshot.id,

        scope:
          "school",

        ...documentSnapshot.data(),
      }),
    );

  if (!isSystemAdmin) {
    return schoolLogs;
  }

  const systemAuditQuery =
    query(
      collection(
        db,
        "systemAuditLogs",
      ),
      orderBy(
        "createdAt",
        "desc",
      ),
      limit(
        maxResults,
      ),
    );

  const systemSnapshot =
    await getDocs(
      systemAuditQuery,
    );

  const systemLogs =
    systemSnapshot.docs.map(
      (documentSnapshot) => ({
        id:
          `system-${documentSnapshot.id}`,

        documentId:
          documentSnapshot.id,

        scope:
          "system",

        ...documentSnapshot.data(),
      }),
    );

  return [
    ...schoolLogs,
    ...systemLogs,
  ]
    .sort(
      (a, b) => {
        const aTime =
          a.createdAt
            ?.toMillis?.() ||
          0;

        const bTime =
          b.createdAt
            ?.toMillis?.() ||
          0;

        return (
          bTime -
          aTime
        );
      },
    )
    .slice(
      0,
      maxResults,
    );
}