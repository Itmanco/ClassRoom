"use strict";

const {DateTime} = require("luxon");

const MAX_OCCURRENCES = 60;

/**
 * Generates school-local calendar dates for a weekly reservation series.
 *
 * @param {Object} options Recurrence configuration.
 * @param {string} options.startDate Inclusive class start date.
 * @param {string} options.endDate Inclusive class end date.
 * @param {number[]} options.weekdays ISO weekdays (Monday=1, Sunday=7).
 * @return {string[]} Matching dates in YYYY-MM-DD format.
 */
function generateWeeklyReservationDates({
  startDate,
  endDate,
  weekdays,
}) {
  if (
    typeof startDate !== "string" ||
    typeof endDate !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(startDate) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(endDate)
  ) {
    throw new Error("INVALID_CLASS_PERIOD");
  }

  const start = DateTime.fromISO(startDate, {zone: "UTC"});
  const end = DateTime.fromISO(endDate, {zone: "UTC"});

  if (
    !start.isValid ||
    !end.isValid ||
    start.toISODate() !== startDate ||
    end.toISODate() !== endDate ||
    start > end
  ) {
    throw new Error("INVALID_CLASS_PERIOD");
  }

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

  const selected = new Set(weekdays);
  const dates = [];

  for (
    let current = start;
    current <= end;
    current = current.plus({days: 1})
  ) {
    if (selected.has(current.weekday)) {
      dates.push(current.toISODate());

      if (dates.length > MAX_OCCURRENCES) {
        throw new Error("RESERVATION_SERIES_TOO_LARGE");
      }
    }
  }

  if (dates.length === 0) {
    throw new Error("NO_RESERVATION_OCCURRENCES");
  }

  return dates;
}

module.exports = {
  generateWeeklyReservationDates,
  MAX_OCCURRENCES,
};
