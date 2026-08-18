import { db } from "../firebase-init";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const ALLOWED_ROLES = [
  "admin",
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

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function createSchoolMembership(
  schoolId,
  uid,
  {
    role,
    active = true,
  },
) {
  const membershipRef =
    getMembershipRef(
      schoolId,
      uid,
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

  await setDoc(
    membershipRef,
    {
      userUid:
        requireText(
          uid,
          "User ID",
        ),

      role:
        normalizeRole(role),

      active:
        active !== false,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),
    },
  );
}

export async function updateSchoolMembership(
  schoolId,
  uid,
  {
    role,
    active,
  },
) {
  const membershipRef =
    getMembershipRef(
      schoolId,
      uid,
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

  const data = {
    updatedAt:
      serverTimestamp(),
  };

  if (
    role !== undefined
  ) {
    data.role =
      normalizeRole(role);
  }

  if (
    active !== undefined
  ) {
    data.active =
      active !== false;
  }

  await updateDoc(
    membershipRef,
    data,
  );
}

export function isAdminMembership(
  membership,
) {
  return (
    membership?.active !== false &&
    membership?.role === "admin"
  );
}

export function isTeacherMembership(
  membership,
) {
  return (
    membership?.active !== false &&
    membership?.role === "teacher"
  );
}

export function isStudentMembership(
  membership,
) {
  return (
    membership?.active !== false &&
    membership?.role === "student"
  );
}