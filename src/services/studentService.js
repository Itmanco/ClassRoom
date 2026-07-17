// src/services/studentService.js

import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

function getStudentsRef(schoolId) {
  if (!schoolId) {
    throw new Error("A schoolId is required to access students.");
  }

  return collection(db, "schools", schoolId, "students");
}

export async function getStudents(schoolId) {
  const snapshot = await getDocs(getStudentsRef(schoolId));

  return snapshot.docs.map((document) => ({
    id: Number(document.id),
    ...document.data(),
  }));
}

export async function saveStudents(schoolId, students) {
  const studentsRef = getStudentsRef(schoolId);

  for (const student of students) {
    await setDoc(doc(studentsRef, String(student.id)), {
      name: student.name,
      hiragana: student.hiragana,
      gender_id: student.gender_id,
      country: student.country ?? "",
      isActive: student.isActive,
    });
  }
}

export function watchStudents(schoolId, onChange, onError) {
  return onSnapshot(
    getStudentsRef(schoolId),
    (snapshot) => {
      const students = snapshot.docs.map((document) => ({
        id: Number(document.id),
        ...document.data(),
      }));

      onChange(students);
    },
    onError,
  );
}