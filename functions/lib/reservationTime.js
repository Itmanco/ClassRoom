const {DateTime} = require("luxon");

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

/**
 * Converts a same-day school-local reservation to UTC.
 *
 * @param {Object} input Reservation date, times and zone.
 * @return {Object} Validated local and UTC values.
 */
function resolveReservationTime(input) {
  const {
    localDate,
    startTime,
    endTime,
    timeZone,
  } = input || {};

  if (
    typeof localDate !== "string" ||
    !DATE_PATTERN.test(localDate) ||
    typeof startTime !== "string" ||
    !TIME_PATTERN.test(startTime) ||
    typeof endTime !== "string" ||
    !TIME_PATTERN.test(endTime) ||
    typeof timeZone !== "string" ||
    startTime >= endTime
  ) {
    throw new Error("INVALID_RESERVATION_TIME");
  }

  const date = DateTime.fromISO(localDate, {
    zone: timeZone,
  });

  if (
    !date.isValid ||
    date.toISODate() !== localDate
  ) {
    throw new Error("INVALID_RESERVATION_DATE");
  }

  const resolveLocalTime = (time) => {
    const expected = `${localDate}T${time}`;

    const value = DateTime.fromISO(expected, {
      zone: timeZone,
    });

    if (
      !value.isValid ||
      value.toFormat("yyyy-MM-dd'T'HH:mm") !== expected
    ) {
      throw new Error("NONEXISTENT_LOCAL_TIME");
    }

    if (value.getPossibleOffsets().length !== 1) {
      throw new Error("AMBIGUOUS_LOCAL_TIME");
    }

    return value;
  };

  const start = resolveLocalTime(startTime);
  const end = resolveLocalTime(endTime);

  return {
    localDate,
    startTime,
    endTime,
    timeZone,
    weekday: start.toFormat("cccc").toLowerCase(),
    startsAtMillis: start.toUTC().toMillis(),
    endsAtMillis: end.toUTC().toMillis(),
  };
}

module.exports = {
  resolveReservationTime,
};
