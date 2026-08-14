import { db } from "../firebase-init";
import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export async function getCurrentUserProfile(uid) {
  const docRef = doc(db, "users", uid);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    console.warn("User profile not found:", uid);
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateCurrentUserProfile(
  uid,
  profileData,
) {
  const docRef = doc(db, "users", uid);

  await updateDoc(docRef, {
    displayName: profileData.displayName || "",
    firstName: profileData.firstName || "",
    lastName: profileData.lastName || "",
    updatedAt: serverTimestamp(),
  });
}

export async function updateActiveSchool(
  uid,
  schoolId,
) {
  const docRef = doc(
    db,
    "users",
    uid,
  );

  await updateDoc(docRef, {
    activeSchool: schoolId,
    updatedAt: serverTimestamp(),
  });
}