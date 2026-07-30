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
    throw new Error("A schoolId is required to access courses.");
  }
}

function normalizeCourseCode(code) {
  if (typeof code !== "string" || !code.trim()) {
    throw new Error("A course code is required.");
  }

  const normalizedCode = code.trim().toUpperCase().replace(/\s+/g, "_");

  if (!/^[A-Z0-9_-]+$/.test(normalizedCode)) {
    throw new Error("Course codes may contain only letters, numbers, hyphens, and underscores.");
  }

  return normalizedCode;
}

function validateCourse(course) {
  if (!course || typeof course !== "object") {
    throw new Error("A course is required.");
  }

  const code = normalizeCourseCode(course.code);
  const name = typeof course.name === "string" ? course.name.trim() : "";
  const description =
    typeof course.description === "string" ? course.description.trim() : "";

  if (!name) {
    throw new Error("A course name is required.");
  }

  return {
    code,
    name,
    description,
    active: course.active !== false,
  };
}

function getCoursesRef(schoolId) {
  requireSchoolId(schoolId);
  return collection(db, "schools", schoolId, "courses");
}

function mapCourse(documentSnapshot) {
  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  };
}

function sortCourses(courses) {
  return courses.sort((first, second) =>
    first.code.localeCompare(second.code, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

export async function getCourses(schoolId) {
  const snapshot = await getDocs(getCoursesRef(schoolId));
  return sortCourses(snapshot.docs.map(mapCourse));
}

export function watchCourses(schoolId, onChange, onError) {
  return onSnapshot(
    getCoursesRef(schoolId),
    (snapshot) => {
      onChange(sortCourses(snapshot.docs.map(mapCourse)));
    },
    onError,
  );
}

export async function saveCourse(schoolId, course) {
  const normalizedCourse = validateCourse(course);
  const courseRef = doc(getCoursesRef(schoolId), normalizedCourse.code);
  const existingDocument = await getDoc(courseRef);

  const data = {
    ...normalizedCourse,
    updatedAt: serverTimestamp(),
  };

  if (!existingDocument.exists()) {
    data.createdAt = serverTimestamp();
  }

  await setDoc(courseRef, data, { merge: true });
  return courseRef.id;
}

export async function archiveCourse(schoolId, courseId) {
  const normalizedCourseId = normalizeCourseCode(courseId);
  const courseRef = doc(getCoursesRef(schoolId), normalizedCourseId);
  const existingDocument = await getDoc(courseRef);

  if (!existingDocument.exists()) {
    throw new Error(`Course ${normalizedCourseId} does not exist.`);
  }

  await updateDoc(courseRef, {
    active: false,
    updatedAt: serverTimestamp(),
  });
}
