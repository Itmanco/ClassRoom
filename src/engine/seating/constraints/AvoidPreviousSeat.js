export function evaluatePreviousSeat(assignments, history, weight = 10) {
  const violations = assignments
    .filter((assignment) => {
      const previous = history.latestSeatByStudent.get(String(assignment.studentId));
      return previous
        && previous.deskNumber === assignment.deskNumber
        && previous.seatNumber === assignment.seatNumber;
    })
    .map((assignment) => ({
      type: "previous-seat",
      studentId: String(assignment.studentId),
      deskNumber: assignment.deskNumber,
      seatNumber: assignment.seatNumber,
      penalty: weight,
    }));

  return { score: violations.length * weight, violations };
}
