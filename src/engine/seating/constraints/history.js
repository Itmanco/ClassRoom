export function buildHistoryIndex(plans = []) {
  const desksByStudent = new Map();
  const partnersByStudent = new Map();
  const latestSeatByStudent = new Map();

  const sortedPlans = [...plans]
    .filter((plan) => Array.isArray(plan.assignments))
    .sort((a, b) => String(a.planDate || "").localeCompare(String(b.planDate || "")));

  sortedPlans.forEach((plan) => {
    const studentsByDesk = new Map();

    plan.assignments.forEach((assignment) => {
      const studentId = String(assignment.studentId);
      const deskNumber = Number(assignment.deskNumber);
      const seatNumber = Number(assignment.seatNumber);

      if (!desksByStudent.has(studentId)) desksByStudent.set(studentId, new Set());
      desksByStudent.get(studentId).add(deskNumber);
      latestSeatByStudent.set(studentId, { deskNumber, seatNumber, planId: plan.id || null });

      if (!studentsByDesk.has(deskNumber)) studentsByDesk.set(deskNumber, []);
      studentsByDesk.get(deskNumber).push(studentId);
    });

    studentsByDesk.forEach((studentIds) => {
      studentIds.forEach((studentId) => {
        if (!partnersByStudent.has(studentId)) partnersByStudent.set(studentId, new Set());
        studentIds.forEach((partnerId) => {
          if (partnerId !== studentId) partnersByStudent.get(studentId).add(partnerId);
        });
      });
    });
  });

  return { desksByStudent, partnersByStudent, latestSeatByStudent, plansConsidered: sortedPlans.length };
}
