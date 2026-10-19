import {httpsCallable} from "firebase/functions";
import {functions} from "../firebase-init";

function requireId(value, fieldName) {
  if (
    typeof value !== "string" ||
    !value.trim() ||
    value.includes("/")
  ) {
    throw new Error(`${fieldName} is invalid.`);
  }

  return value.trim();
}

function requireDate(value) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    throw new Error("Date must use YYYY-MM-DD format.");
  }

  return value;
}

function requireTime(value, fieldName) {
  if (
    typeof value !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)
  ) {
    throw new Error(`${fieldName} must use HH:mm format.`);
  }

  return value;
}

export async function createRoomReservation(
  schoolId,
  {
    classId,
    roomId,
    localDate,
    localStartTime,
    localEndTime,
  },
) {
  const normalizedStart = requireTime(
    localStartTime,
    "Start time",
  );

  const normalizedEnd = requireTime(
    localEndTime,
    "End time",
  );

  if (normalizedStart >= normalizedEnd) {
    throw new Error(
      "Start time must be before end time.",
    );
  }

  const callable = httpsCallable(
    functions,
    "createRoomReservation",
  );

  const result = await callable({
    schoolId: requireId(schoolId, "School ID"),
    classId: requireId(classId, "Class ID"),
    roomId: requireId(roomId, "Room ID"),
    localDate: requireDate(localDate),
    startTime: normalizedStart,
    endTime: normalizedEnd,
  });

  return result.data;
}
