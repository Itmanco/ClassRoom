
import {httpsCallable} from "firebase/functions";

import {functions} from "../firebase-init";
import {getSchool} from "./schoolService";

export const DEFAULT_SCHOOL_TIME_ZONE = "Asia/Tokyo";

export async function getSchoolTimeZone(schoolId) {
  if (!schoolId) {
    throw new Error("School ID is required.");
  }

  const school = await getSchool(schoolId);

  if (!school) {
    throw new Error("School not found.");
  }

  return school.timeZone || DEFAULT_SCHOOL_TIME_ZONE;
}

export async function updateSchoolTimeZone(schoolId, timeZone) {
  if (!schoolId) {
    throw new Error("School ID is required.");
  }

  if (typeof timeZone !== "string" || !timeZone.trim()) {
    throw new Error("Time zone is required.");
  }

  const callable = httpsCallable(
    functions,
    "updateSchoolTimeZone"
  );

  const result = await callable({
    schoolId,
    timeZone: timeZone.trim(),
  });

  return result.data;
}
