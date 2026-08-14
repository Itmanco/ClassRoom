import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  db,
} from "../firebase-init";

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

  const snapshot = await getDoc(
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

export async function getUserSchools(
  schoolIds = [],
) {
  const uniqueSchoolIds = [
    ...new Set(
      schoolIds.filter(Boolean),
    ),
  ];

  const schools = await Promise.all(
    uniqueSchoolIds.map(
      (schoolId) =>
        getSchool(schoolId),
    ),
  );

  return schools.filter(Boolean);
}