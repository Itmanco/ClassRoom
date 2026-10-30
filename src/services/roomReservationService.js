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

/**
 * Cancels one reservation or the selected occurrence and all
 * subsequent future occurrences in the same weekly series.
 *
 * @param {string} schoolId School identifier.
 * @param {string} reservationId Reservation identifier.
 * @param {"single"|"future-series"} scope Cancellation scope.
 * @return {Promise<Object>} Cancellation result.
 */
export async function cancelRoomReservations(
  schoolId,
  reservationId,
  scope = "single",
) {
  if (!["single", "future-series"].includes(scope)) {
    throw new Error("INVALID_CANCELLATION_SCOPE");
  }

  const callable = httpsCallable(
    functions,
    "cancelRoomReservations",
  );

  const result = await callable({
    schoolId: requireId(schoolId, "School ID"),
    reservationId: requireId(reservationId, "Reservation ID"),
    scope,
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

/**
 * Updates the time of one reservation or the selected occurrence
 * and subsequent active occurrences in the same weekly series.
 *
 * @param {string} schoolId School identifier.
 * @param {string} reservationId Reservation identifier.
 * @param {"single"|"future-series"} scope Update scope.
 * @param {string} startTime New start time in HH:mm format.
 * @param {string} endTime New end time in HH:mm format.
 * @param {string} localDate Original reservation date (YYYY-MM-DD).
 * @return {Promise<Object>} Update result.
 */
export async function updateRoomReservations(
    schoolId,
    reservationId,
    scope,
    startTime,
    endTime,
    localDate,
) {
  if (!["single", "future-series"].includes(scope)) {
    throw new Error("INVALID_UPDATE_SCOPE");
  }

  const normalizedStart = requireTime(
      startTime,
      "Start time",
  );

  const normalizedEnd = requireTime(
      endTime,
      "End time",
  );

  if (normalizedStart >= normalizedEnd) {
    throw new Error("INVALID_RESERVATION_TIME");
  }

  const callable = httpsCallable(
      functions,
      "updateRoomReservations",
  );

  const result = await callable({
    schoolId: requireId(schoolId, "School ID"),
    reservationId: requireId(reservationId, "Reservation ID"),
    scope,
    startTime: normalizedStart,
    endTime: normalizedEnd,
    ...(scope === "single" ?
      {localDate: requireDate(localDate)} :
      {}),
  });

  return result.data;
}
