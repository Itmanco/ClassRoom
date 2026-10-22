"use strict";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const MAX_INTERVALS_PER_DAY = 20;

/**
 * Validates and normalizes school operating hours.
 *
 * An empty array means the school is closed that day.
 * All times are interpreted in the school's time zone.
 *
 * @param {Object} input Weekly operating hours.
 * @return {Object} Normalized weekly operating hours.
 */
function validateSchoolOperatingHours(input) {
  if (
    !input ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    Object.keys(input).length !== DAYS.length ||
    Object.keys(input).some((day) => !DAYS.includes(day))
  ) {
    throw new Error("Invalid school operating hours.");
  }

  const normalizedHours = {};

  for (const day of DAYS) {
    const intervals = input[day];

    if (
      !Array.isArray(intervals) ||
      intervals.length > MAX_INTERVALS_PER_DAY
    ) {
      throw new Error(`Invalid operating hours for ${day}.`);
    }

    const normalized = intervals.map((interval) => {
      if (
        !interval ||
        typeof interval !== "object" ||
        Array.isArray(interval) ||
        Object.keys(interval).length !== 2 ||
        !Object.keys(interval).every(
            (key) => ["startTime", "endTime"].includes(key),
        ) ||
        typeof interval.startTime !== "string" ||
        typeof interval.endTime !== "string" ||
        !TIME_PATTERN.test(interval.startTime) ||
        !TIME_PATTERN.test(interval.endTime) ||
        interval.startTime >= interval.endTime
      ) {
        throw new Error(`Invalid time interval for ${day}.`);
      }

      return {
        startTime: interval.startTime,
        endTime: interval.endTime,
      };
    });

    normalized.sort(
        (a, b) => a.startTime.localeCompare(b.startTime),
    );

    for (let i = 1; i < normalized.length; i++) {
      if (normalized[i].startTime < normalized[i - 1].endTime) {
        throw new Error(
            `Overlapping operating hours for ${day}.`,
        );
      }
    }

    normalizedHours[day] = normalized;
  }

  return normalizedHours;
}

/**
 * Checks whether a reservation fits within school hours.
 *
 * @param {Object} reservation Reservation weekday and local times.
 * @param {Object} operatingHours Validated school operating hours.
 * @return {boolean} Whether the reservation fits.
 */
function reservationFitsSchoolHours(
    reservation,
    operatingHours,
) {
  const intervals = operatingHours?.[reservation.weekday];

  if (!Array.isArray(intervals)) {
    return false;
  }

  return intervals.some(
      (interval) =>
        reservation.startTime >= interval.startTime &&
        reservation.endTime <= interval.endTime,
  );
}

module.exports = {
  validateSchoolOperatingHours,
  reservationFitsSchoolHours,
};

