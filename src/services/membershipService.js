import { db } from "../firebase-init";

import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

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

  if (existing.exists()) {
    throw new Error(
      "School membership already exists.",
    );
  }

  await setDoc(
    membershipRef,
    {
      userUid:
        normalizedUid,

      role:
        normalizeRole(
          role,
        ),

      active:
        active !== false,

      createdAt:
        serverTimestamp(),

      updatedAt:
        serverTimestamp(),
    },
  );

  return membershipRef.id;
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
      normalizeRole(
        role,
      );
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

  await deleteDoc(
    membershipRef,
  );
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