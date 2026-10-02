import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "@/firebase-init";

const linkStudentAccountCallable =
  httpsCallable(
    functions,
    "linkStudentAccount",
  );

const unlinkStudentAccountCallable =
  httpsCallable(
    functions,
    "unlinkStudentAccount",
  );

export async function linkStudentAccount(
  schoolId,
  studentId,
  userUid,
) {
  const result =
    await linkStudentAccountCallable({
      schoolId,
      studentId,
      userUid,
    });

  return result.data;
}

export async function unlinkStudentAccount(
  schoolId,
  studentId,
) {
  const result =
    await unlinkStudentAccountCallable({
      schoolId,
      studentId,
    });

  return result.data;
}