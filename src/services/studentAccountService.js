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

const createStudentAccountCallable =
  httpsCallable(
    functions,
    "createStudentAccount",
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

export async function createStudentAccount(
  accountData,
) {
  const result =
    await createStudentAccountCallable(
      accountData,
    );

  return result.data;
}
