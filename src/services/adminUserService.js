import {
  httpsCallable,
} from "firebase/functions";

import {
  functions,
} from "../firebase-init";

const createUserCallable =
  httpsCallable(
    functions,
    "createUser",
  );

const setSystemRoleCallable =
  httpsCallable(
    functions,
    "setSystemRole",
  );

const getSchoolUsersCallable =
  httpsCallable(
    functions,
    "getSchoolUsers",
  );

const updateManagedUserCallable =
  httpsCallable(
    functions,
    "updateManagedUser",
  );

export async function createManagedUser(
  userData,
) {
  const result =
    await createUserCallable(
      userData,
    );

  return result.data;
}

export async function setManagedUserSystemRole(
  uid,
  systemRole,
) {
  const result =
    await setSystemRoleCallable({
      uid,
      systemRole,
    });

  return result.data;
}

export async function getManagedSchoolUsers(
  schoolId,
) {
  const result =
    await getSchoolUsersCallable({
      schoolId,
    });

  return Array.isArray(
    result.data,
  )
    ? result.data
    : [];
}

export async function updateManagedUser(
  userData,
) {
  const result =
    await updateManagedUserCallable(
      userData,
    );

  return result.data;
}