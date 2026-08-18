import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function requireText(value, fieldName) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${fieldName} is required.`);
  }
  return value.trim();
}

function requireContext(schoolId, classId) {
  requireText(schoolId, "School ID");
  requireText(classId, "Class ID");
}

function getSeatingPlansRef(schoolId, classId) {
  requireContext(schoolId, classId);
  return collection(db, "schools", schoolId, "classes", classId, "seatingPlans");
}

function mapPlan(snapshot) {
  return { id: snapshot.id, ...snapshot.data() };
}

function sortPlans(items) {
  return items.sort((a, b) => {
    const first = a.planDate || "";
    const second = b.planDate || "";
    return second.localeCompare(first) || String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
  });
}

function validateAssignments(assignments, deskCount, seatsPerDesk) {
  if (!Array.isArray(assignments)) throw new Error("Assignments must be an array.");

  const seenStudents = new Set();
  const seenSeats = new Set();

  return assignments
    .filter((item) => item && item.studentId !== "" && item.studentId != null)
    .map((item) => {
      const studentId = String(item.studentId);
      const deskNumber = Number(item.deskNumber);
      const seatNumber = Number(item.seatNumber);

      if (!Number.isInteger(deskNumber) || deskNumber < 1 || deskNumber > deskCount) {
        throw new Error(`Desk number for student ${studentId} is invalid.`);
      }
      if (!Number.isInteger(seatNumber) || seatNumber < 1 || seatNumber > seatsPerDesk) {
        throw new Error(`Seat number for student ${studentId} is invalid.`);
      }
      if (seenStudents.has(studentId)) {
        throw new Error(`Student ${studentId} is assigned more than once.`);
      }

      const seatKey = `${deskNumber}:${seatNumber}`;
      if (seenSeats.has(seatKey)) throw new Error(`Desk ${deskNumber}, seat ${seatNumber} is duplicated.`);

      seenStudents.add(studentId);
      seenSeats.add(seatKey);
      return { studentId, deskNumber, seatNumber };
    });
}

function validatePlan(plan) {
  if (!plan || typeof plan !== "object") throw new Error("A seating plan is required.");
  const title = requireText(plan.title, "Plan title");
  const planDate = requireText(plan.planDate, "Plan date");
  const roomId = requireText(plan.roomId, "Room ID");
  const deskCount = Number(plan.deskCount);
  const seatsPerDesk = Number(plan.seatsPerDesk);
  const desksPerRow = Number(plan.desksPerRow || 2,);
  const allowedTeacherPositions = [
    "front-left",
    "front-right",
    "back-left",
    "back-right",
  ];
  const teacherPosition = allowedTeacherPositions.includes(plan.teacherPosition,)
      ? plan.teacherPosition : "front-left";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(planDate)) throw new Error("Plan date must use YYYY-MM-DD.");
  if (!Number.isInteger(deskCount) || deskCount < 1) throw new Error("Desk count must be positive.");
  if (!Number.isInteger(seatsPerDesk) || seatsPerDesk < 1) throw new Error("Seats per desk must be positive.");
  if (!Number.isInteger(desksPerRow) || desksPerRow < 1 || desksPerRow > deskCount) { throw new Error("Desks per row is invalid.",);
}

  return {
    title,
    planDate,
    roomId,
    deskCount,
    seatsPerDesk,
    desksPerRow,
    teacherPosition,
    capacity: deskCount * seatsPerDesk,
    assignments: validateAssignments(plan.assignments, deskCount, seatsPerDesk),
    active: plan.active !== false,
  };
}

export async function getSeatingPlans(schoolId, classId) {
  const snapshot = await getDocs(getSeatingPlansRef(schoolId, classId));
  return sortPlans(snapshot.docs.map(mapPlan));
}

export function watchSeatingPlans(schoolId, classId, onChange, onError) {
  return onSnapshot(
    getSeatingPlansRef(schoolId, classId),
    (snapshot) => onChange(sortPlans(snapshot.docs.map(mapPlan))),
    onError,
  );
}

export async function saveSeatingPlan(schoolId, classId, plan) {
  requireContext(schoolId, classId);
  const normalized = validatePlan(plan);
  const planRef = plan.id
    ? doc(getSeatingPlansRef(schoolId, classId), String(plan.id))
    : doc(getSeatingPlansRef(schoolId, classId));
  const existing = await getDoc(planRef);
  const data = { ...normalized, updatedAt: serverTimestamp() };
  if (!existing.exists()) data.createdAt = serverTimestamp();
  await setDoc(planRef, data, { merge: true });
  return planRef.id;
}

export async function archiveSeatingPlan(schoolId, classId, planId) {
  const id = requireText(planId, "Seating plan ID");
  const planRef = doc(getSeatingPlansRef(schoolId, classId), id);
  const existing = await getDoc(planRef);
  if (!existing.exists()) throw new Error(`Seating plan ${id} does not exist.`);
  await updateDoc(planRef, { active: false, updatedAt: serverTimestamp() });
}
