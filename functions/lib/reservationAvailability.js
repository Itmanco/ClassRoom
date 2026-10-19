
/**
 * Checks whether a reservation fits within weekly room hours.
 *
 * @param {Object} reservation Reservation with weekday and local times.
 * @param {Object} weeklyHours Validated weekly availability.
 * @return {boolean} Whether the reservation fits.
 */
function reservationFitsAvailability(
    reservation,
    weeklyHours,
) {
  const windows = weeklyHours?.[reservation.weekday];

  if (!Array.isArray(windows)) {
    return false;
  }

  return windows.some(
      (window) =>
        reservation.startTime >= window.start &&
        reservation.endTime <= window.end,
  );
}

module.exports = {
  reservationFitsAvailability,
};
