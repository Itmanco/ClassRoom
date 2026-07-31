import { evaluatePreviousPartners } from "./constraints/AvoidPreviousPartners";
import { evaluatePreviousDesks } from "./constraints/AvoidPreviousDesks";
import { evaluatePreviousSeat } from "./constraints/AvoidPreviousSeat";
import { buildHistoryIndex } from "./constraints/history";

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function normalizePositions(positions = []) {
  return positions.map((position) => ({
    deskNumber: Number(position.deskNumber),
    seatNumber: Number(position.seatNumber),
  }));
}

function createCandidate(students, positions) {
  const shuffledStudents = shuffle(students);
  const shuffledPositions = shuffle(positions);
  return shuffledStudents.slice(0, shuffledPositions.length).map((student, index) => ({
    studentId: String(student.id),
    deskNumber: shuffledPositions[index].deskNumber,
    seatNumber: shuffledPositions[index].seatNumber,
  }));
}

function candidateKey(assignments) {
  return [...assignments]
    .sort((a, b) => String(a.studentId).localeCompare(String(b.studentId)))
    .map((item) => `${item.studentId}:${item.deskNumber}:${item.seatNumber}`)
    .join("|");
}

function evaluateCandidate(assignments, history, options) {
  const partnerResult = options.avoidPreviousPartners
    ? evaluatePreviousPartners(assignments, history, 1)
    : { violations: [] };
  const deskResult = options.avoidPreviousDesks
    ? evaluatePreviousDesks(assignments, history, 1)
    : { violations: [] };
  const seatResult = options.avoidPreviousSeat
    ? evaluatePreviousSeat(assignments, history, 1)
    : { violations: [] };

  const objectives = {
    repeatedPartners: partnerResult.violations.length,
    repeatedDesks: deskResult.violations.length,
    repeatedSeats: seatResult.violations.length,
  };

  return {
    objectives,
    violations: [
      ...partnerResult.violations,
      ...deskResult.violations,
      ...seatResult.violations,
    ],
  };
}

export function compareCandidates(first, second) {
  const objectiveOrder = ["repeatedPartners", "repeatedDesks", "repeatedSeats"];

  for (const objective of objectiveOrder) {
    const difference = first.objectives[objective] - second.objectives[objective];
    if (difference !== 0) return difference;
  }

  return first.tieBreaker - second.tieBreaker;
}

function qualityLabel(objectives) {
  if (objectives.repeatedPartners === 0 && objectives.repeatedDesks === 0 && objectives.repeatedSeats === 0) return "Excellent";
  if (objectives.repeatedPartners === 0 && objectives.repeatedDesks <= 2) return "Very good";
  if (objectives.repeatedPartners === 0) return "Good";
  if (objectives.repeatedPartners === 1) return "Acceptable";
  return "Best available";
}

export function generateSeatingCandidates({ students, positions, historyPlans = [], options = {} }) {
  if (!Array.isArray(students) || students.length === 0) throw new Error("At least one student is required.");
  if (!Array.isArray(positions) || positions.length < students.length) {
    throw new Error("The room does not have enough positions for all enrolled students.");
  }

  const normalizedOptions = {
    attempts: Math.max(3, Math.min(Number(options.attempts) || 1000, 10000)),
    resultCount: Math.max(1, Math.min(Number(options.resultCount) || 3, 5)),
    avoidPreviousPartners: options.avoidPreviousPartners !== false,
    avoidPreviousDesks: options.avoidPreviousDesks !== false,
    avoidPreviousSeat: options.avoidPreviousSeat !== false,
  };

  const history = buildHistoryIndex(historyPlans);
  const usablePositions = normalizePositions(positions);
  const uniqueCandidates = new Map();

  for (let attempt = 1; attempt <= normalizedOptions.attempts; attempt += 1) {
    const assignments = createCandidate(students, usablePositions);
    const key = candidateKey(assignments);
    if (uniqueCandidates.has(key)) continue;

    const evaluation = evaluateCandidate(assignments, history, normalizedOptions);
    uniqueCandidates.set(key, {
      ...evaluation,
      assignments,
      attempt,
      tieBreaker: Math.random(),
    });
  }

  const candidates = [...uniqueCandidates.values()]
    .sort(compareCandidates)
    .slice(0, normalizedOptions.resultCount)
    .map((candidate, index) => ({
      ...candidate,
      rank: index + 1,
      quality: qualityLabel(candidate.objectives),
    }));

  return {
    candidates,
    attemptsRequested: normalizedOptions.attempts,
    uniqueCandidatesEvaluated: uniqueCandidates.size,
    historyPlansConsidered: history.plansConsidered,
  };
}

export function generateSeatingPlan(input) {
  const result = generateSeatingCandidates({
    ...input,
    options: { ...input.options, resultCount: 1 },
  });
  const best = result.candidates[0];
  return {
    ...best,
    attemptsRequested: result.attemptsRequested,
    uniqueCandidatesEvaluated: result.uniqueCandidatesEvaluated,
    historyPlansConsidered: result.historyPlansConsidered,
    perfect: best.objectives.repeatedPartners === 0
      && best.objectives.repeatedDesks === 0
      && best.objectives.repeatedSeats === 0,
  };
}
