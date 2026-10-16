
import { db } from "../firebase-init";
import {
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-init";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

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

function normalizeTime(value) {
  if (
    typeof value !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)
  ) {
    throw new Error("Time must use HH:mm format.");
  }

  return value;
}

export function validateRoomAvailability(input) {
  if (!input || typeof input !== "object") {
    throw new Error("Availability is required.");
  }

  const weeklyHours = {};

  for (const day of DAYS) {
    const windows = input.weeklyHours?.[day];

    if (!Array.isArray(windows)) {
      throw new Error(
        `Availability for ${day} must be an array.`,
      );
    }

    const normalized = windows.map((window) => {
      const start = normalizeTime(window?.start);
      const end = normalizeTime(window?.end);

      if (start >= end) {
        throw new Error(
          `${day}: Start must be before end.`,
        );
      }

      return { start, end };
    });

    normalized.sort((a, b) =>
      a.start.localeCompare(b.start),
    );

    for (let i = 1; i < normalized.length; i += 1) {
      if (normalized[i].start < normalized[i - 1].end) {
        throw new Error(
          `${day}: Availability windows overlap.`,
        );
      }
    }

    weeklyHours[day] = normalized;
  }

  return {
    weeklyHours,
  };
}

function availabilityRef(schoolId, roomId) {
  return doc(
    db,
    "schools",
    requireId(schoolId, "School ID"),
    "roomAvailability",
    requireId(roomId, "Room ID"),
  );
}

export async function getRoomAvailability(
  schoolId,
  roomId,
) {
  const snapshot = await getDoc(
    availabilityRef(schoolId, roomId),
  );

  return snapshot.exists()
    ? { id: snapshot.id, ...snapshot.data() }
    : null;
}

export function watchRoomAvailability(
  schoolId,
  roomId,
  onChange,
  onError,
) {
  return onSnapshot(
    availabilityRef(schoolId, roomId),
    (snapshot) => {
      onChange(
        snapshot.exists()
          ? { id: snapshot.id, ...snapshot.data() }
          : null,
      );
    },
    onError,
  );
}


export async function saveRoomAvailability(
  schoolId,
  roomId,
  availability,
) {
  const normalized = validateRoomAvailability(availability);

  const callable = httpsCallable(
    functions,
    "saveRoomAvailability",
  );

  const result = await callable({
    schoolId: requireId(schoolId, "School ID"),
    roomId: requireId(roomId, "Room ID"),
    availability: normalized,
  });

  return result.data;
}
