import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import {
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

function normalizeSchoolId(value) {
  return requireText(
    value,
    "School ID",
  )
    .toLowerCase()
    .replace(
      /[^a-z0-9_-]+/g,
      "_",
    );
}

function validateSchool(school) {
  if (
    !school ||
    typeof school !== "object"
  ) {
    throw new Error(
      "A school is required.",
    );
  }

  const id =
    normalizeSchoolId(
      school.id,
    );

  const name =
    requireText(
      school.name,
      "School name",
    );

  const country =
    requireText(
      school.country,
      "Country",
    );

  const city =
    requireText(
      school.city,
      "City",
    );

  const ownerUid =
    typeof school.ownerUid ===
      "string"
      ? school.ownerUid.trim()
      : "";

  return {
    id,
    name,
    country,
    city,
    ownerUid,
    active:
      school.active !== false,
  };
}

function getSchoolsRef() {
  return collection(
    db,
    "schools",
  );
}

function mapSchool(snapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

function sortSchools(items) {
  return items.sort(
    (first, second) =>
      String(
        first.name ||
        first.id,
      ).localeCompare(
        String(
          second.name ||
          second.id,
        ),
        undefined,
        {
          numeric: true,
          sensitivity: "base",
        },
      ),
  );
}

export async function getSchool(
  schoolId,
) {
  if (!schoolId) {
    return null;
  }

  const schoolRef = doc(
    db,
    "schools",
    schoolId,
  );

  const snapshot =
    await getDoc(
      schoolRef,
    );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function getSchools() {
  const snapshot =
    await getDocs(
      getSchoolsRef(),
    );

  return sortSchools(
    snapshot.docs.map(
      mapSchool,
    ),
  );
}

export function watchSchools(
  onChange,
  onError,
) {
  return onSnapshot(
    getSchoolsRef(),

    (snapshot) => {
      onChange(
        sortSchools(
          snapshot.docs.map(
            mapSchool,
          ),
        ),
      );
    },

    onError,
  );
}

export async function getUserSchools(
  schoolIds = [],
) {
  const uniqueSchoolIds = [
    ...new Set(
      schoolIds.filter(Boolean),
    ),
  ];

  const schools =
    await Promise.all(
      uniqueSchoolIds.map(
        (schoolId) =>
          getSchool(schoolId),
      ),
    );

  return schools.filter(Boolean);
}

export async function saveSchool(
  school,
  editingSchoolId = null,
) {
  const normalized =
    validateSchool(school);

  if (
    editingSchoolId &&
    normalized.id !==
      String(
        editingSchoolId,
      ).toLowerCase()
  ) {
    throw new Error(
      "School ID cannot be changed while editing.",
    );
  }

  const schoolRef = doc(
    getSchoolsRef(),
    normalized.id,
  );

  const existing =
    await getDoc(
      schoolRef,
    );

  if (
    !editingSchoolId &&
    existing.exists()
  ) {
    throw new Error(
      `School ${normalized.id} already exists.`,
    );
  }

  if (
    editingSchoolId &&
    !existing.exists()
  ) {
    throw new Error(
      `School ${normalized.id} does not exist.`,
    );
  }

  const data = {
    name:
      normalized.name,

    country:
      normalized.country,

    city:
      normalized.city,

    ownerUid:
      normalized.ownerUid,

    active:
      normalized.active,

    updatedAt:
      serverTimestamp(),
  };

  if (!existing.exists()) {
    data.createdAt =
      serverTimestamp();
  }

  await setDoc(
    schoolRef,
    data,
    {
      merge: true,
    },
  );

  return schoolRef.id;
}

export async function archiveSchool(
  schoolId,
) {
  const id =
    normalizeSchoolId(
      schoolId,
    );

  const schoolRef = doc(
    getSchoolsRef(),
    id,
  );

  const existing =
    await getDoc(
      schoolRef,
    );

  if (!existing.exists()) {
    throw new Error(
      `School ${id} does not exist.`,
    );
  }

  await updateDoc(
    schoolRef,
    {
      active: false,
      updatedAt:
        serverTimestamp(),
    },
  );
}

export async function reactivateSchool(
  schoolId,
) {
  const id =
    normalizeSchoolId(
      schoolId,
    );

  const schoolRef = doc(
    getSchoolsRef(),
    id,
  );

  const existing =
    await getDoc(
      schoolRef,
    );

  if (!existing.exists()) {
    throw new Error(
      `School ${id} does not exist.`,
    );
  }

  await updateDoc(
    schoolRef,
    {
      active: true,
      updatedAt:
        serverTimestamp(),
    },
  );
}