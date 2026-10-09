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


export async function getStudentOwnSeating(
  schoolId,
  classId,
) {
  const normalizedSchoolId =
    requireSchoolId(schoolId);

  if (
    typeof classId !== "string" ||
    !classId.trim()
  ) {
    throw new Error(
      "A classId is required to access student seating.",
    );
  }

  const callable =
    httpsCallable(
      functions,
      "getStudentOwnSeating",
    );

  const result =
    await callable({
      schoolId: normalizedSchoolId,
      classId: classId.trim(),
    });

  const data =
    result?.data &&
    typeof result.data === "object"
      ? result.data
      : {};

  const seating =
    data.seating &&
    typeof data.seating === "object"
      ? data.seating
      : null;

  return {
    classId:
      typeof data.classId === "string"
        ? data.classId
        : classId.trim(),
    seating: seating
      ? {
          planDate: seating.planDate,
          deskNumber: seating.deskNumber,
          seatNumber: seating.seatNumber,
          deskCount: seating.deskCount,
          seatsPerDesk: seating.seatsPerDesk,
          desksPerRow: seating.desksPerRow,
          teacherPosition: seating.teacherPosition,
        }
      : null,
  };
}
