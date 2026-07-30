// src/services/studentService.js

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

function getStudentsRef(schoolId) {
  if (!schoolId) {
    throw new Error("A schoolId is required to access students.");
  }

  return collection(db, "schools", schoolId, "students");
}

function normalizeStudent(document) {
  return {
    id: Number(document.id),
    ...document.data(),
  };
}

function sortStudents(students) {
  return students.sort((a, b) => {
    const nameComparison = (a.hiragana || a.name || "").localeCompare(
      b.hiragana || b.name || "",
      "ja",
    );

    return nameComparison || a.id - b.id;
  });
}

function validateStudent(student) {
  const id = Number(student.id);
  const name = String(student.name || "").trim();
  const hiragana = String(student.hiragana || "").trim();
  const genderId = Number(student.gender_id);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Student ID must be a positive whole number.");
  }

  if (!name) {
    throw new Error("Student name is required.");
  }

  if (!hiragana) {
    throw new Error("Hiragana is required.");
  }

  if (![1, 2, 3].includes(genderId)) {
    throw new Error("Please select a valid gender option.");
  }

  return {
    id,
    name,
    hiragana,
    gender_id: genderId,
    country: String(student.country || "").trim(),
    isActive: student.isActive !== false,
  };
}

export async function getStudents(schoolId) {
  const snapshot = await getDocs(getStudentsRef(schoolId));
  return sortStudents(snapshot.docs.map(normalizeStudent));
}

export async function getNextStudentId(schoolId) {
  const students = await getStudents(schoolId);
  return students.reduce((highest, student) => Math.max(highest, student.id), 0) + 1;
}

export async function saveStudent(schoolId, student, originalId = null) {
  const normalized = validateStudent(student);
  const studentsRef = getStudentsRef(schoolId);
  const studentRef = doc(studentsRef, String(normalized.id));
  const existing = await getDoc(studentRef);

  if (originalId !== null && Number(originalId) !== normalized.id) {
    throw new Error("Existing student IDs cannot be changed because seating history references them.");
  }

  if (originalId === null && existing.exists()) {
    throw new Error(`Student ID ${normalized.id} already exists.`);
  }

  const payload = {
    name: normalized.name,
    hiragana: normalized.hiragana,
    gender_id: normalized.gender_id,
    country: normalized.country,
    isActive: normalized.isActive,
    updatedAt: serverTimestamp(),
  };

  if (!existing.exists()) {
    payload.createdAt = serverTimestamp();
  }

  await setDoc(studentRef, payload, { merge: true });
  return normalized.id;
}

export async function archiveStudent(schoolId, studentId) {
  await updateDoc(doc(getStudentsRef(schoolId), String(studentId)), {
    isActive: false,
    updatedAt: serverTimestamp(),
  });
}

// Kept for compatibility with the classroom migration code.
export async function saveStudents(schoolId, students) {
  for (const student of students) {
    await saveStudent(schoolId, student, student.id);
  }
}

export function watchStudents(schoolId, onChange, onError) {
  return onSnapshot(
    getStudentsRef(schoolId),
    (snapshot) => {
      onChange(sortStudents(snapshot.docs.map(normalizeStudent)));
    },
    onError,
  );
}
