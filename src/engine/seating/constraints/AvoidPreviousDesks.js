export function evaluatePreviousDesks(assignments, history, weight = 20) {
  const violations = assignments
    .filter((assignment) => history.desksByStudent.get(String(assignment.studentId))?.has(assignment.deskNumber))
    .map((assignment) => ({
      type: "previous-desk",
      studentId: String(assignment.studentId),
      deskNumber: assignment.deskNumber,
      penalty: weight,
    }));

  return { score: violations.length * weight, violations };
}
