import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "../firebase-init";

const getDashboardActivityCallable =
  httpsCallable(
    functions,
    "getDashboardActivity",
  );

export async function getDashboardActivity(
  schoolId,
) {
  const result =
    await getDashboardActivityCallable({
      schoolId,
    });

  return Array.isArray(result.data)
    ? result.data
    : [];
}