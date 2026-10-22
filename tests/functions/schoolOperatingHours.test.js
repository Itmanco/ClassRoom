"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");

const {
  validateSchoolOperatingHours,
  reservationFitsSchoolHours,
} = require("../../functions/lib/schoolOperatingHours");

function exampleHours() {
  return {
    monday: [
      {startTime: "08:00", endTime: "12:00"},
      {startTime: "13:00", endTime: "21:00"},
    ],
    tuesday: [
      {startTime: "08:00", endTime: "21:00"},
    ],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
}

test("accepts valid weekly hours", () => {
  assert.deepEqual(
      validateSchoolOperatingHours(exampleHours()),
      exampleHours(),
  );
});

test("rejects missing weekdays", () => {
  const hours = exampleHours();
  delete hours.sunday;

  assert.throws(() => validateSchoolOperatingHours(hours));
});

test("rejects invalid time formats", () => {
  const hours = exampleHours();
  hours.monday[0].startTime = "8:00";

  assert.throws(() => validateSchoolOperatingHours(hours));
});

test("rejects reversed intervals", () => {
  const hours = exampleHours();
  hours.monday[0].startTime = "12:00";

  assert.throws(() => validateSchoolOperatingHours(hours));
});

test("rejects overlapping intervals", () => {
  const hours = exampleHours();

  hours.monday.push({
    startTime: "11:00",
    endTime: "14:00",
  });

  assert.throws(() => validateSchoolOperatingHours(hours));
});

test("allows adjacent intervals", () => {
  const hours = exampleHours();

  hours.monday = [
    {startTime: "08:00", endTime: "12:00"},
    {startTime: "12:00", endTime: "17:00"},
  ];

  assert.doesNotThrow(
      () => validateSchoolOperatingHours(hours),
  );
});

test("allows closed days", () => {
  const hours = validateSchoolOperatingHours(exampleHours());

  assert.deepEqual(hours.sunday, []);
});

test("allows reservations inside operating hours", () => {
  const hours = validateSchoolOperatingHours(exampleHours());

  assert.equal(
      reservationFitsSchoolHours(
          {
            weekday: "monday",
            startTime: "09:00",
            endTime: "11:00",
          },
          hours,
      ),
      true,
  );
});

test("rejects reservations across a closed interval", () => {
  const hours = validateSchoolOperatingHours(exampleHours());

  assert.equal(
      reservationFitsSchoolHours(
          {
            weekday: "monday",
            startTime: "11:00",
            endTime: "14:00",
          },
          hours,
      ),
      false,
  );
});

test("rejects reservations on closed days", () => {
  const hours = validateSchoolOperatingHours(exampleHours());

  assert.equal(
      reservationFitsSchoolHours(
          {
            weekday: "sunday",
            startTime: "09:00",
            endTime: "10:00",
          },
          hours,
      ),
      false,
  );
});
