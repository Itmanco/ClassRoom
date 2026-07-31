export function evaluatePreviousPartners(assignments, history, weight = 100) {
  const violations = [];
  const studentsByDesk = new Map();

  assignments.forEach((assignment) => {
    if (!studentsByDesk.has(assignment.deskNumber)) studentsByDesk.set(assignment.deskNumber, []);
    studentsByDesk.get(assignment.deskNumber).push(String(assignment.studentId));
  });

  studentsByDesk.forEach((studentIds, deskNumber) => {
    for (let first = 0; first < studentIds.length; first += 1) {
      for (let second = first + 1; second < studentIds.length; second += 1) {
        const studentA = studentIds[first];
        const studentB = studentIds[second];
        if (history.partnersByStudent.get(studentA)?.has(studentB)) {
          violations.push({ type: "previous-partner", studentA, studentB, deskNumber, penalty: weight });
        }
      }
    }
  });

  return { score: violations.length * weight, violations };
}
