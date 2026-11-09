"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  generateWeeklyReservationDates,
  MAX_OCCURRENCES,
} = require("../lib/weeklyReservationDates");

test("preserves original behavior without minDate", () => {
  const dates = generateWeeklyReservationDates({
    startDate: "2026-11-01",
    endDate: "2026-11-16",
    weekdays: [1],
  });

  assert.deepEqual(dates, [
    "2026-11-02",
    "2026-11-09",
    "2026-11-16",
  ]);
});

test("excludes dates before minDate", () => {
  const dates = generateWeeklyReservationDates({
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    weekdays: [1],
    minDate: "2026-11-07",
  });

  assert.deepEqual(dates, [
    "2026-11-09",
    "2026-11-16",
    "2026-11-23",
    "2026-11-30",
  ]);
});

test("includes minDate when its weekday matches", () => {
  const dates = generateWeeklyReservationDates({
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    weekdays: [6],
    minDate: "2026-11-07",
  });

  assert.equal(dates[0], "2026-11-07");
});

test("does not generate dates before class start", () => {
  const dates = generateWeeklyReservationDates({
    startDate: "2026-11-16",
    endDate: "2026-11-30",
    weekdays: [1],
    minDate: "2026-11-07",
  });

  assert.deepEqual(dates, [
    "2026-11-16",
    "2026-11-23",
    "2026-11-30",
  ]);
});

test("rejects when no dates remain", () => {
  assert.throws(
      () => generateWeeklyReservationDates({
        startDate: "2026-11-01",
        endDate: "2026-11-06",
        weekdays: [1],
        minDate: "2026-11-07",
      }),
      /NO_RESERVATION_OCCURRENCES/,
  );
});

test("rejects invalid minimum dates", () => {
  for (const minDate of [
    "2026-02-30",
    "invalid",
    "",
    null,
    123,
  ]) {
    assert.throws(
        () => generateWeeklyReservationDates({
          startDate: "2026-11-01",
          endDate: "2026-11-30",
          weekdays: [1],
          minDate,
        }),
        /INVALID_MIN_DATE/,
    );
  }
});

test("historical dates do not count toward the limit", () => {
  const dates = generateWeeklyReservationDates({
    startDate: "2020-01-01",
    endDate: "2026-12-31",
    weekdays: [1],
    minDate: "2026-11-07",
  });

  assert.ok(dates.length > 0);
  assert.ok(dates.length <= MAX_OCCURRENCES);
  assert.ok(dates.every((date) => date >= "2026-11-07"));
});

test("rejects more than 60 future occurrences", () => {
  assert.throws(
      () => generateWeeklyReservationDates({
        startDate: "2026-11-07",
        endDate: "2027-12-31",
        weekdays: [1, 2, 3, 4, 5],
        minDate: "2026-11-07",
      }),
      /RESERVATION_SERIES_TOO_LARGE/,
  );
});

test("rejects invalid weekdays", () => {
  assert.throws(
      () => generateWeeklyReservationDates({
        startDate: "2026-11-01",
        endDate: "2026-11-30",
        weekdays: [0, 8],
        minDate: "2026-11-07",
      }),
      /INVALID_RESERVATION_WEEKDAYS/,
  );
});
