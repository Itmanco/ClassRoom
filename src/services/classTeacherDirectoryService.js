import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "../firebase-init";

const getClassTeacherDirectoryCallable =
  httpsCallable(
    functions,
    "getClassTeacherDirectory",
  );

export async function getClassTeacherDirectory(
  schoolId,
  classId,
) {
  const result =
    await getClassTeacherDirectoryCallable({
      schoolId,
      classId,
    });

  return Array.isArray(result.data)
    ? result.data
    : [];
}
