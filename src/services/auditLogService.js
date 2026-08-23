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
  maxResults = 50,
) {
  const normalizedSchoolId =
    requireText(
      schoolId,
      "School ID",
    );

  const auditQuery =
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
        Number(maxResults) || 50,
      ),
    );

  const snapshot =
    await getDocs(
      auditQuery,
    );

  return snapshot.docs.map(
    (documentSnapshot) => ({
      id:
        documentSnapshot.id,

      ...documentSnapshot.data(),
    }),
  );
}