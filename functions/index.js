const {
  setGlobalOptions,
} = require(
    "firebase-functions/v2/options",
);

const {
  onCall,
  HttpsError,
} = require(
    "firebase-functions/v2/https",
);

const {
  initializeApp,
} = require(
    "firebase-admin/app",
);

const {
  getAuth,
} = require(
    "firebase-admin/auth",
);

const {
  getFirestore,
  FieldValue,
} = require(
    "firebase-admin/firestore",
);

initializeApp();

setGlobalOptions({
  maxInstances: 10,
});

const db = getFirestore();

/**
 * Verifies that the caller is a system administrator.
 *
 * @param {Object} request Callable function request.
 * @return {Promise<Object>} Authenticated administrator information.
 */
async function requireSystemAdmin(
    request,
) {
  if (!request.auth) {
    throw new HttpsError(
        "unauthenticated",
        "Authentication is required.",
    );
  }

  const uid =
    request.auth.uid;

  const userDocument =
    await db
        .collection("users")
        .doc(uid)
        .get();

  if (!userDocument.exists) {
    throw new HttpsError(
        "permission-denied",
        "User profile not found.",
    );
  }

  const profile =
    userDocument.data();

  if (
    profile.systemRole !==
    "system-admin"
  ) {
    throw new HttpsError(
        "permission-denied",
        "System Admin access is required.",
    );
  }

  return {
    uid,
    profile,
  };
}

/**
 * Validates and normalizes a required text value.
 *
 * @param {*} value Value to validate.
 * @param {string} fieldName Field name used in validation errors.
 * @return {string} Normalized text value.
 */
function requireText(
    value,
    fieldName,
) {
  if (
    typeof value !== "string" ||
    !value.trim()
  ) {
    throw new HttpsError(
        "invalid-argument",
        `${fieldName} is required.`,
    );
  }

  return value.trim();
}

/**
 * Validates and normalizes a school role.
 *
 * @param {*} role School role to normalize.
 * @return {?string} Normalized school role.
 */
function normalizeSchoolRole(
    role,
) {
  if (!role) {
    return null;
  }

  const normalized =
    String(role)
        .trim()
        .toLowerCase();

  const allowedRoles = [
    "school-admin",
    "teacher",
    "student",
  ];

  if (
    !allowedRoles.includes(
        normalized,
    )
  ) {
    throw new HttpsError(
        "invalid-argument",
        "Unsupported school role.",
    );
  }

  return normalized;
}

exports.createUser =
  onCall(
      async (request) => {
        await requireSystemAdmin(
            request,
        );

        const data =
        request.data || {};

        const email =
        requireText(
            data.email,
            "Email",
        ).toLowerCase();

        const password =
        requireText(
            data.password,
            "Password",
        );

        const firstName =
        requireText(
            data.firstName,
            "First name",
        );

        const lastName =
        requireText(
            data.lastName,
            "Last name",
        );

        const displayName =
        typeof data.displayName ===
          "string" &&
        data.displayName.trim() ?
          data.displayName.trim() :
          `${firstName} ${lastName}`;

        const language =
        typeof data.language ===
          "string" &&
        data.language.trim() ?
          data.language.trim() :
          "en";

        const schoolId =
        typeof data.schoolId ===
          "string" ?
          data.schoolId.trim() :
          "";

        const schoolRole =
        normalizeSchoolRole(
            data.schoolRole,
        );

        if (
          schoolRole &&
        !schoolId
        ) {
          throw new HttpsError(
              "invalid-argument",
              "A school is required when assigning a school role.",
          );
        }

        if (
          schoolId &&
        !schoolRole
        ) {
          throw new HttpsError(
              "invalid-argument",
              "A school role is required when assigning a school.",
          );
        }

        let authUser = null;

        try {
          authUser =
          await getAuth()
              .createUser({
                email,
                password,
                displayName,
                disabled: false,
              });

          const uid =
          authUser.uid;

          const userRef =
          db
              .collection("users")
              .doc(uid);

          const userData = {
            email,
            firstName,
            lastName,
            displayName,
            language,
            photoURL: "",
            systemRole: null,
            activeSchool:
            schoolId || null,
            active: true,
            createdAt:
            FieldValue.serverTimestamp(),
            updatedAt:
            FieldValue.serverTimestamp(),
          };

          await userRef.set(
              userData,
          );

          if (
            schoolId &&
          schoolRole
          ) {
            const schoolRef =
            db
                .collection("schools")
                .doc(schoolId);

            const schoolDocument =
            await schoolRef.get();

            if (
              !schoolDocument.exists
            ) {
              throw new HttpsError(
                  "not-found",
                  `School ${schoolId} does not exist.`,
              );
            }

            const membershipRef =
            schoolRef
                .collection("members")
                .doc(uid);

            await membershipRef.set({
              userUid: uid,
              role: schoolRole,
              active: true,
              createdAt:
              FieldValue.serverTimestamp(),
              updatedAt:
              FieldValue.serverTimestamp(),
            });
          }

          return {
            uid,
            email,
            displayName,
            schoolId:
            schoolId || null,
            schoolRole:
            schoolRole || null,
          };
        } catch (error) {
          if (
            authUser?.uid
          ) {
            try {
              await getAuth()
                  .deleteUser(
                      authUser.uid,
                  );
            } catch (
              rollbackError
            ) {
              console.error(
                  "Unable to roll back Auth user:",
                  rollbackError,
              );
            }
          }

          if (
            error instanceof
          HttpsError
          ) {
            throw error;
          }

          console.error(
              "Unable to create user:",
              error,
          );

          if (
            error.code ===
          "auth/email-already-exists"
          ) {
            throw new HttpsError(
                "already-exists",
                "A user with this email already exists.",
            );
          }

          if (
            error.code ===
          "auth/invalid-password"
          ) {
            throw new HttpsError(
                "invalid-argument",
                "The password doesn't meet Fbase Authentication requirements.",
            );
          }

          if (
            error.code ===
          "auth/invalid-email"
          ) {
            throw new HttpsError(
                "invalid-argument",
                "The email address is invalid.",
            );
          }

          throw new HttpsError(
              "internal",
              "Unable to create user.",
          );
        }
      },
  );
