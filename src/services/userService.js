import { db } from "../firebase-init";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
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

function mapUser(snapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

function sortUsers(users) {
  return users.sort(
    (first, second) =>
      String(
        first.displayName ||
        first.email ||
        first.id,
      ).localeCompare(
        String(
          second.displayName ||
          second.email ||
          second.id,
        ),
        undefined,
        {
          sensitivity: "base",
        },
      ),
  );
}

export async function getUsers() {
  const snapshot =
    await getDocs(
      collection(
        db,
        "users",
      ),
    );

  return sortUsers(
    snapshot.docs.map(
      mapUser,
    ),
  );
}

export function watchUsers(
  onChange,
  onError,
) {
  return onSnapshot(
    collection(
      db,
      "users",
    ),

    (snapshot) => {
      onChange(
        sortUsers(
          snapshot.docs.map(
            mapUser,
          ),
        ),
      );
    },

    onError,
  );
}