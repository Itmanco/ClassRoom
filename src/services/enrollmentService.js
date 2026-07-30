import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function getEnrollmentsRef(schoolId, classId) {
  if (!schoolId) throw new Error("A schoolId is required to access enrollments.");
  if (!classId) throw new Error("A classId is required to access enrollments.");
  return collection(db, "schools", schoolId, "classes", classId, "enrollments");
}

function normalizeEnrollment(snapshot) {
  return {
    id: snapshot.id,
    studentId: snapshot.data().studentId || snapshot.id,
    ...snapshot.data(),
  };
}

function sortEnrollments(items) {
  return items.sort((a, b) => Number(a.studentId) - Number(b.studentId));
}

export function watchEnrollments(schoolId, classId, onChange, onError) {
  return onSnapshot(
    getEnrollmentsRef(schoolId, classId),
    (snapshot) => onChange(sortEnrollments(snapshot.docs.map(normalizeEnrollment))),
    onError,
  );
}

export async function enrollStudent(schoolId, classId, studentId) {
  const normalizedStudentId = String(studentId || "").trim();
  if (!normalizedStudentId) throw new Error("A studentId is required.");

  const enrollmentRef = doc(getEnrollmentsRef(schoolId, classId), normalizedStudentId);
  const existing = await getDoc(enrollmentRef);
  const payload = {
    studentId: normalizedStudentId,
    active: true,
    updatedAt: serverTimestamp(),
  };

  if (!existing.exists()) payload.enrolledAt = serverTimestamp();

  await setDoc(enrollmentRef, payload, { merge: true });
  return normalizedStudentId;
}

export async function archiveEnrollment(schoolId, classId, studentId) {
  await updateDoc(doc(getEnrollmentsRef(schoolId, classId), String(studentId)), {
    active: false,
    updatedAt: serverTimestamp(),
  });
}
