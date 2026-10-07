import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "../firebase-init";

function requireSchoolId(schoolId) {
  if (
    typeof schoolId !== "string" ||
    !schoolId.trim()
  ) {
    throw new Error(
      "A schoolId is required to access student classes.",
    );
  }

  return schoolId.trim();
}

export async function getStudentClassInfo(
  schoolId,
) {
  const normalizedSchoolId =
    requireSchoolId(schoolId);

  const callable =
    httpsCallable(
      functions,
      "getStudentClassInfo",
    );

  const result =
    await callable({
      schoolId: normalizedSchoolId,
    });

  const data =
    result?.data &&
    typeof result.data === "object"
      ? result.data
      : {};

  return {
    studentId:
      typeof data.studentId === "string"
        ? data.studentId
        : "",
    classes:
      Array.isArray(data.classes)
        ? data.classes
        : [],
  };
}
