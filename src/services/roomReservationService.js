import {httpsCallable} from "firebase/functions";
import {functions, db} from "../firebase-init";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";


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

export async function createWeeklyRoomReservations(
  schoolId,
  {
    classId,
    roomId,
    weekdays,
    localStartTime,
    localEndTime,
  },
) {
  if (
    !Array.isArray(weekdays) ||
    weekdays.length === 0 ||
    weekdays.length > 7 ||
    new Set(weekdays).size !== weekdays.length ||
    weekdays.some(
      (day) => !Number.isInteger(day) || day < 1 || day > 7,
    )
  ) {
    throw new Error("INVALID_RESERVATION_WEEKDAYS");
  }

  const normalizedStart = requireTime(
    localStartTime,
    "Start time",
  );

  const normalizedEnd = requireTime(
    localEndTime,
    "End time",
  );

  if (normalizedStart >= normalizedEnd) {
    throw new Error("INVALID_RESERVATION_TIME");
  }

  const callable = httpsCallable(
    functions,
    "createWeeklyRoomReservations",
  );

  const result = await callable({
    schoolId: requireId(schoolId, "School ID"),
    classId: requireId(classId, "Class ID"),
    roomId: requireId(roomId, "Room ID"),
    weekdays: [...weekdays].sort((a, b) => a - b),
    startTime: normalizedStart,
    endTime: normalizedEnd,
  });

  return result.data;
}

export function watchRoomReservations(
  schoolId,
  onData,
  onError,
) {
  const normalizedSchoolId = requireId(
    schoolId,
    "School ID",
  );

  const reservationsRef = collection(
    db,
    "schools",
    normalizedSchoolId,
    "roomReservations",
  );

  const reservationsQuery = query(
    reservationsRef,
    orderBy("startsAt", "desc"),
  );

  return onSnapshot(
    reservationsQuery,
    (snapshot) => {
      const reservations = snapshot.docs.map(
        (document) => ({
          id: document.id,
          ...document.data(),
        }),
      );

      onData(reservations);
    },
    onError,
  );
}

export function watchDailyRoomReservations(
  schoolId,
  localDate,
  onData,
  onError,
) {
  const normalizedSchoolId = requireId(
      schoolId,
      "School ID",
  );

  const normalizedDate = requireDate(localDate);

  const reservationsRef = collection(
      db,
      "schools",
      normalizedSchoolId,
      "roomReservations",
  );

  const dailyQuery = query(
      reservationsRef,
      where("localDate", "==", normalizedDate),
  );

  return onSnapshot(
      dailyQuery,
      (snapshot) => {
        const reservations = snapshot.docs
            .map((document) => ({
              id: document.id,
              ...document.data(),
            }))
            .filter((reservation) => reservation.status === "active")
            .sort((a, b) =>
              a.localStartTime.localeCompare(b.localStartTime),
            );

        onData(reservations);
      },
      onError,
  );
}
