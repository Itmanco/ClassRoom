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

function requireSchoolId(schoolId) {
  if (!schoolId || typeof schoolId !== "string") {
    throw new Error("A schoolId is required to access classes.");
  }
}

function normalizeClassCode(code) {
  if (typeof code !== "string" || !code.trim()) {
    throw new Error("A class code is required.");
  }
  const normalized = code.trim().toUpperCase().replace(/\s+/g, "_");
  if (!/^[A-Z0-9_-]+$/.test(normalized)) {
    throw new Error("Class codes may contain only letters, numbers, hyphens, and underscores.");
  }
  return normalized;
}

function validateClass(classItem) {
  if (!classItem || typeof classItem !== "object") throw new Error("A class is required.");
  const code = normalizeClassCode(classItem.code);
  const name = typeof classItem.name === "string" ? classItem.name.trim() : "";
  const courseId = typeof classItem.courseId === "string" ? classItem.courseId.trim() : "";
  const roomId = typeof classItem.roomId === "string" ? classItem.roomId.trim() : "";
  const academicYear = Number(classItem.academicYear);
  const semester = Number(classItem.semester);

  if (!name) throw new Error("A class name is required.");
  if (!courseId) throw new Error("A course is required.");
  if (!roomId) throw new Error("A room is required.");
  if (!Number.isInteger(academicYear) || academicYear < 2000 || academicYear > 2100) {
    throw new Error("Academic year must be between 2000 and 2100.");
  }
  if (!Number.isInteger(semester) || semester < 1 || semester > 4) {
    throw new Error("Semester must be between 1 and 4.");
  }

  return { code, name, courseId, roomId, academicYear, semester, active: classItem.active !== false };
}

function getClassesRef(schoolId) {
  requireSchoolId(schoolId);
  return collection(db, "schools", schoolId, "classes");
}

function mapClass(snapshot) { return { id: snapshot.id, ...snapshot.data() }; }
function sortClasses(items) {
  return items.sort((a, b) => b.academicYear - a.academicYear || a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: "base" }));
}

export async function getClasses(schoolId) {
  const snapshot = await getDocs(getClassesRef(schoolId));
  return sortClasses(snapshot.docs.map(mapClass));
}

export function watchClasses(schoolId, onChange, onError) {
  return onSnapshot(getClassesRef(schoolId), (snapshot) => onChange(sortClasses(snapshot.docs.map(mapClass))), onError);
}

export async function saveClass(schoolId, classItem) {
  const normalized = validateClass(classItem);
  const classRef = doc(getClassesRef(schoolId), normalized.code);
  const existing = await getDoc(classRef);
  const data = { ...normalized, updatedAt: serverTimestamp() };
  if (!existing.exists()) data.createdAt = serverTimestamp();
  await setDoc(classRef, data, { merge: true });
  return classRef.id;
}

export async function archiveClass(schoolId, classId) {
  const normalizedId = normalizeClassCode(classId);
  const classRef = doc(getClassesRef(schoolId), normalizedId);
  const existing = await getDoc(classRef);
  if (!existing.exists()) throw new Error(`Class ${normalizedId} does not exist.`);
  await updateDoc(classRef, { active: false, updatedAt: serverTimestamp() });
}
