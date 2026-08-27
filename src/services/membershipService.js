import { db } from "../firebase-init";

import {
  collection,
  collectionGroup,  
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";

import {
  createAuditLogWrite,
} from "./auditLogService";

const ALLOWED_ROLES = [
  "school-admin",
  "teacher",
  "student",
];

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

function normalizeRole(role) {
  const normalized =
    requireText(
      role,
      "Role",
    ).toLowerCase();

  if (
    !ALLOWED_ROLES.includes(
      normalized,
    )
  ) {
    throw new Error(
      `Unsupported role: ${normalized}.`,
    );
  }

  return normalized;
}

function getMembershipRef(
  schoolId,
  uid,
) {
  return doc(
    db,
    "schools",
    requireText(
      schoolId,
      "School ID",
    ),
    "members",
    requireText(
      uid,
      "User ID",
    ),
  );
}

function getMembershipsRef(
  schoolId,
) {
  return collection(
    db,
    "schools",
    requireText(
      schoolId,
      "School ID",
    ),
    "members",
  );
}

function mapMembership(
  documentSnapshot,
) {
  return {
    id:
      documentSnapshot.id,
    ...documentSnapshot.data(),
  };
}

export async function getSchoolMembership(
  schoolId,
  uid,
) {
  if (
    !schoolId ||
    !uid
  ) {
    return null;
  }

  const snapshot =
    await getDoc(
      getMembershipRef(
        schoolId,
        uid,
      ),
    );

  if (!snapshot.exists()) {
    return null;
  }

  return mapMembership(
    snapshot,
  );
}

export async function getSchoolMemberships(
  schoolId,
) {
  const snapshot =
    await getDocs(
      getMembershipsRef(
        schoolId,
      ),
    );

  return snapshot.docs
    .map(
      mapMembership,
    )
    .sort(
      (
        first,
        second,
      ) =>
        String(
          first.userUid ||
          first.id,
        ).localeCompare(
          String(
            second.userUid ||
            second.id,
          ),
          undefined,
          {
            sensitivity: "base",
          },
        ),
    );
}

export async function createSchoolMembership(
  schoolId,
  uid,
  {
    role,
    active = true,
  },
  options = {},
) {
  const normalizedUid =
    requireText(
      uid,
      "User ID",
    );

  const normalizedRole =
    normalizeRole(
      role,
    );

  const normalizedActive =
    active !== false;

  const membershipRef =
    getMembershipRef(
      schoolId,
      normalizedUid,
    );

  const existing =
    await getDoc(
      membershipRef,
    );

  if (existing.exists()) {
    throw new Error(
      "School membership already exists.",
    );
  }

  const userRef =
    doc(
      db,
      "users",
      normalizedUid,
    );

  const userSnapshot =
    await getDoc(
      userRef,
    );

  const user =
    userSnapshot.exists()
      ? userSnapshot.data()
      : {};

  const batch =
    writeBatch(db);

  batch.set(
    membershipRef,
    {
      userUid:
        normalizedUid,

      role:
        normalizedRole,

      active:
        normalizedActive,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),
    },
  );

  const audit =
    createAuditLogWrite(
      schoolId,
      {
        action:
          "membership.created",

        entityType:
          "membership",

        entityId:
          normalizedUid,

        actorRole:
          options.actorRole ||
          "",

        changedFields: [],

        details: {
        entityName:
          user.displayName ||
          user.email ||
          normalizedUid,

        userUid:
          normalizedUid,

        email:
          user.email || "",

        role:
          normalizedRole,

        active:
          normalizedActive,
      },
      },
    );

  batch.set(
    audit.ref,
    audit.data,
  );

  await batch.commit();

  return membershipRef.id;
}

export async function updateSchoolMembership(
  schoolId,
  uid,
  {
    role,
    active,
  },
  options = {},
) {
  const normalizedUid =
    requireText(
      uid,
      "User ID",
    );

  const membershipRef =
    getMembershipRef(
      schoolId,
      normalizedUid,
    );

  const existing =
    await getDoc(
      membershipRef,
    );

  if (!existing.exists()) {
    throw new Error(
      "School membership does not exist.",
    );
  }

  const previous =
    existing.data();

  const data = {
    updatedAt:
      serverTimestamp(),
  };

  let normalizedRole;

  if (
    role !== undefined
  ) {
    normalizedRole =
      normalizeRole(
        role,
      );

    data.role =
      normalizedRole;
  }

  if (
    active !== undefined
  ) {
    data.active =
      active !== false;
  }

  const roleChanged =
    normalizedRole !== undefined &&
    previous.role !==
      normalizedRole;

  const activeChanged =
    active !== undefined &&
    previous.active !==
      data.active;

  const batch =
    writeBatch(db);

  batch.update(
    membershipRef,
    data,
  );

  let user = {};

  if (
    roleChanged ||
    activeChanged
  ) {
    const userRef =
      doc(
        db,
        "users",
        normalizedUid,
      );

    const userSnapshot =
      await getDoc(
        userRef,
      );

    user =
      userSnapshot.exists()
        ? userSnapshot.data()
        : {};
  }

  if (roleChanged) {
    const audit =
      createAuditLogWrite(
        schoolId,
        {
          action:
            "membership.roleChanged",

          entityType:
            "membership",

          entityId:
            normalizedUid,

          actorRole:
            options.actorRole ||
            "",

          changedFields: [
            "role",
          ],

          details: {
            entityName:
              user.displayName ||
              user.email ||
              normalizedUid,

            userUid:
              normalizedUid,

            email:
              user.email || "",

            changes: {
              role: {
                before:
                  previous.role ||
                  null,

                after:
                  normalizedRole,
              },
            },
          },
        },
      );

    batch.set(
      audit.ref,
      audit.data,
    );
  }

  if (activeChanged) {
    const audit =
      createAuditLogWrite(
        schoolId,
        {
          action:
            data.active
              ? "membership.reactivated"
              : "membership.deactivated",

          entityType:
            "membership",

          entityId:
            normalizedUid,

          actorRole:
            options.actorRole ||
            "",

          changedFields: [
            "active",
          ],

          details: {
            entityName:
              user.displayName ||
              user.email ||
              normalizedUid,

            userUid:
              normalizedUid,

            email:
              user.email || "",

            changes: {
              active: {
                before:
                  previous.active !==
                  false,

                after:
                  data.active,
              },
            },
          },
        },
      );

    batch.set(
      audit.ref,
      audit.data,
    );
  }

  await batch.commit();
}

export async function setSchoolMembershipActive(
  schoolId,
  uid,
  active,
) {
  await updateSchoolMembership(
    schoolId,
    uid,
    {
      active:
        active !== false,
    },
  );
}

export async function removeSchoolMembership(
  schoolId,
  uid,
  options = {},
) {
  const normalizedUid =
    requireText(
      uid,
      "User ID",
    );

  const membershipRef =
    getMembershipRef(
      schoolId,
      normalizedUid,
    );

  const existing =
    await getDoc(
      membershipRef,
    );

  if (!existing.exists()) {
    throw new Error(
      "School membership does not exist.",
    );
  }

  const membership =
    existing.data();

  const userRef =
    doc(
      db,
      "users",
      normalizedUid,
    );

  const userSnapshot =
    await getDoc(
      userRef,
    );

  const user =
    userSnapshot.exists()
      ? userSnapshot.data()
      : {};

  const batch =
    writeBatch(db);

  batch.delete(
    membershipRef,
  );

  const audit =
    createAuditLogWrite(
      schoolId,
      {
        action:
          "membership.removed",

        entityType:
          "membership",

        entityId:
          normalizedUid,

        actorRole:
          options.actorRole ||
          "",

        changedFields: [],

        details: {
          entityName:
            user.displayName ||
            user.email ||
            normalizedUid,

          userUid:
            normalizedUid,

          email:
            user.email || "",

          previousRole:
            membership.role ||
            null,

          previousActive:
            membership.active !==
            false,
        },
      },
    );

  batch.set(
    audit.ref,
    audit.data,
  );

  await batch.commit();
}

export function isSchoolAdminMembership(
  membership,
) {
  return (
    membership?.active !== false &&
    membership?.role ===
      "school-admin"
  );
}

export function isTeacherMembership(
  membership,
) {
  return (
    membership?.active !== false &&
    membership?.role ===
      "teacher"
  );
}

export function isStudentMembership(
  membership,
) {
  return (
    membership?.active !== false &&
    membership?.role ===
      "student"
  );
}

export async function getUserSchoolMemberships(
  uid,
) {
  const normalizedUid =
    requireText(
      uid,
      "User ID",
    );

  const membershipsQuery =
    query(
      collectionGroup(
        db,
        "members",
      ),
      where(
        "userUid",
        "==",
        normalizedUid,
      ),
      where(
        "active",
        "==",
        true,
      ),
    );

  const snapshot =
    await getDocs(
      membershipsQuery,
    );

  return snapshot.docs.map(
    (documentSnapshot) => {
      const schoolRef =
        documentSnapshot.ref.parent.parent;

      return {
        id:
          documentSnapshot.id,

        ...documentSnapshot.data(),

        schoolId:
          schoolRef?.id || "",
      };
    },
  );
}