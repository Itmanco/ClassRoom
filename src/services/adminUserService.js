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

export async function createManagedUser(
  userData,
) {
  const result =
    await createUserCallable(
      userData,
    );

  return result.data;
}