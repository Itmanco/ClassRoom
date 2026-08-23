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

export async function updateSystemRole(
  uid,
  systemRole,
) {
  const allowedRoles = [
    "",
    "system-admin",
  ];

  const normalized =
    typeof systemRole === "string"
      ? systemRole.trim()
      : "";

  if (
    !allowedRoles.includes(
      normalized,
    )
  ) {
    throw new Error(
      `Unsupported system role: ${normalized}.`,
    );
  }

  const userRef = doc(
    db,
    "users",
    uid,
  );

  const existing =
    await getDoc(
      userRef,
    );

  if (!existing.exists()) {
    throw new Error(
      `User ${uid} does not exist.`,
    );
  }

  const currentUser =
    existing.data();

  // ----------------------------------------
  // Protect the last System Admin
  // ----------------------------------------

  if (
    currentUser.systemRole ===
      "system-admin" &&
    normalized !==
      "system-admin"
  ) {
    const usersSnapshot =
      await getDocs(
        collection(
          db,
          "users",
        ),
      );

    const systemAdmins =
      usersSnapshot.docs.filter(
        (documentSnapshot) =>
          documentSnapshot.data()
            .systemRole ===
          "system-admin",
      );

    if (
      systemAdmins.length <= 1
    ) {
      throw new Error(
        "The last System Admin cannot be demoted.",
      );
    }
  }

  await updateDoc(
    userRef,
    {
      systemRole:
        normalized || null,

      updatedAt:
        serverTimestamp(),
    },
  );
}