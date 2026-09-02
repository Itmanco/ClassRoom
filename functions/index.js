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
 * Verifies that the caller can administer a school.
 *
 * System Admins may administer any school.
 * School Admins may administer only schools where
 * they have an active school-admin membership.
 *
 * @param {Object} request Callable function request.
 * @param {string} schoolId School to authorize.
 * @return {Promise<Object>} Administrator information.
 */
async function requireSchoolAdmin(
    request,
    schoolId,
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
    profile.systemRole ===
    "system-admin"
  ) {
    return {
      uid,
      profile,
      role:
        "system-admin",
    };
  }

  const membershipDocument =
    await db
        .collection("schools")
        .doc(schoolId)
        .collection("members")
        .doc(uid)
        .get();

  if (!membershipDocument.exists) {
    throw new HttpsError(
        "permission-denied",
        "School Admin access is required.",
    );
  }

  const membership =
    membershipDocument.data();

  if (
    membership.role !==
      "school-admin" ||
    membership.active ===
      false
  ) {
    throw new HttpsError(
        "permission-denied",
        "School Admin access is required.",
    );
  }

  return {
    uid,
    profile,
    role:
      "school-admin",
    membership,
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

        let admin;

        if (schoolId) {
          admin =
            await requireSchoolAdmin(
                request,
                schoolId,
            );
        } else {
          admin =
            await requireSystemAdmin(
                request,
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

          const auditRef = schoolId ? db.collection("schools")
              .doc(schoolId).collection("auditLogs").doc() : db
                  .collection("systemAuditLogs")
                  .doc();

          await auditRef.set({
            action:
              "user.created",

            entityType:
              "user",

            entityId:
              uid,

            actorUid:
              admin.uid,

            actorEmail:
              admin.profile.email ||
              request.auth.token.email ||
              "",

            actorRole:
              admin.profile.systemRole ||
              admin.role ||
              null,

            schoolId:
              schoolId || null,

            changedFields: [],

            details: {
              entityName:
                displayName,

              email,

              schoolId:
                schoolId || null,

              schoolRole:
                schoolRole || null,
            },

            createdAt:
              FieldValue.serverTimestamp(),
          });

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

exports.getSchoolUsers =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          requireText(
              data.schoolId,
              "School ID",
          );

        await requireSchoolAdmin(
            request,
            schoolId,
        );

        const membershipsSnapshot =
          await db
              .collection("schools")
              .doc(schoolId)
              .collection("members")
              .get();

        const userIds =
          membershipsSnapshot.docs.map(
              (documentSnapshot) =>
                documentSnapshot.id,
          );

        const users =
          await Promise.all(
              userIds.map(
                  async (uid) => {
                    const userDocument =
                      await db
                          .collection("users")
                          .doc(uid)
                          .get();

                    if (
                      !userDocument.exists
                    ) {
                      return null;
                    }

                    const user =
                      userDocument.data();

                    return {
                      id:
                        uid,

                      email:
                        user.email || "",

                      firstName:
                        user.firstName || "",

                      lastName:
                        user.lastName || "",

                      displayName:
                        user.displayName || "",

                      language:
                        user.language || "en",
                    };
                  },
              ),
          );

        return users
            .filter(Boolean)
            .sort(
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
                        sensitivity:
                          "base",
                      },
                  ),
            );
      },
  );

exports.updateManagedUser =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const userId =
          String(
              data.userId || "",
          ).trim();

        const schoolId =
          String(
              data.schoolId || "",
          ).trim();

        if (!userId) {
          throw new HttpsError(
              "invalid-argument",
              "userId is required.",
          );
        }

        /*
         * Authorization
         *
         * A System Admin may update a user
         * without a schoolId.
         *
         * A School Admin must provide the
         * school they are administering.
         */
        let actor;

        if (schoolId) {
          actor =
            await requireSchoolAdmin(
                request,
                schoolId,
            );
        } else {
          actor =
            await requireSystemAdmin(
                request,
            );
        }

        /*
         * For a School Admin, verify that
         * the target user actually belongs
         * to the same school.
         */
        if (
          actor.role ===
            "school-admin"
        ) {
          const targetMembership =
            await db
                .collection("schools")
                .doc(schoolId)
                .collection("members")
                .doc(userId)
                .get();

          if (
            !targetMembership.exists ||
            targetMembership
                .data()
                .active === false
          ) {
            throw new HttpsError(
                "permission-denied",
                "The user is not an active member of this school.",
            );
          }
        }

        const userRef =
          db
              .collection("users")
              .doc(userId);

        const userDocument =
          await userRef.get();

        if (!userDocument.exists) {
          throw new HttpsError(
              "not-found",
              "User profile not found.",
          );
        }

        /*
         * Explicit whitelist.
         *
         * Do NOT accept systemRole,
         * active, email, role, schools,
         * memberships, etc.
         */
        const firstName =
          String(
              data.firstName || "",
          ).trim();

        const lastName =
          String(
              data.lastName || "",
          ).trim();

        const displayName =
          String(
              data.displayName || "",
          ).trim();

        const language =
          String(
              data.language || "en",
          ).trim();

        if (!firstName) {
          throw new HttpsError(
              "invalid-argument",
              "firstName is required.",
          );
        }

        if (!lastName) {
          throw new HttpsError(
              "invalid-argument",
              "lastName is required.",
          );
        }

        if (
          !["en", "ja"].includes(
              language,
          )
        ) {
          throw new HttpsError(
              "invalid-argument",
              "Invalid language.",
          );
        }

        await userRef.update({
          firstName,
          lastName,
          displayName,
          language,
          updatedAt: FieldValue.serverTimestamp(),
        });

        return {
          success: true,
          userId,
          firstName,
          lastName,
          displayName,
          language,
        };
      },
  );

exports.setSystemRole =
  onCall(
      async (request) => {
        const admin =
          await requireSystemAdmin(
              request,
          );

        const data =
          request.data || {};

        const uid =
          requireText(
              data.uid,
              "User ID",
          );

        const requestedRole =
          typeof data.systemRole ===
            "string" ?
            data.systemRole.trim() :
            "";

        const allowedRoles = [
          "",
          "system-admin",
        ];

        if (
          !allowedRoles.includes(
              requestedRole,
          )
        ) {
          throw new HttpsError(
              "invalid-argument",
              "Unsupported system role.",
          );
        }

        // A System Admin must never change
        // their own system role.
        if (
          admin.uid === uid
        ) {
          throw new HttpsError(
              "failed-precondition",
              "You cannot change your own system role.",
          );
        }

        const userRef =
          db
              .collection("users")
              .doc(uid);

        const userDocument =
          await userRef.get();

        if (!userDocument.exists) {
          throw new HttpsError(
              "not-found",
              `User ${uid} does not exist.`,
          );
        }

        const user =
          userDocument.data();

        const previousRole =
          user.systemRole || null;

        const nextRole =
          requestedRole || null;

        if (
          previousRole ===
          nextRole
        ) {
          return {
            uid,
            systemRole:
              nextRole,
          };
        }

        // Protect the last System Admin.
        if (
          previousRole ===
            "system-admin" &&
          nextRole !==
            "system-admin"
        ) {
          const adminsSnapshot =
            await db
                .collection("users")
                .where(
                    "systemRole",
                    "==",
                    "system-admin",
                )
                .get();

          if (
            adminsSnapshot.size <= 1
          ) {
            throw new HttpsError(
                "failed-precondition",
                "The last System Admin cannot be demoted.",
            );
          }
        }

        const batch =
          db.batch();

        batch.update(
            userRef,
            {
              systemRole:
                nextRole,

              updatedAt:
                FieldValue.serverTimestamp(),
            },
        );

        const auditRef =
          db
              .collection("systemAuditLogs")
              .doc();

        batch.set(
            auditRef,
            {
              action:
                "user.systemRoleChanged",

              entityType:
                "user",

              entityId:
                uid,

              actorUid:
                admin.uid,

              actorEmail:
                admin.profile.email ||
                request.auth.token.email ||
                "",

              actorRole:
                admin.profile.systemRole ||
                "system-admin",

              schoolId:
                null,

              changedFields: [
                "systemRole",
              ],

              details: {
                entityName:
                  user.displayName ||
                  user.email ||
                  uid,

                email:
                  user.email || "",

                changes: {
                  systemRole: {
                    before:
                      previousRole,

                    after:
                      nextRole,
                  },
                },
              },

              createdAt:
                FieldValue.serverTimestamp(),
            },
        );

        await batch.commit();

        return {
          uid,
          systemRole:
            nextRole,
        };
      },
  );
