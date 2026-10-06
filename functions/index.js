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
      "system-admin" ||
    profile.active === false
  ) {
    throw new HttpsError(
        "permission-denied",
        "SYSTEM_ADMIN_REQUIRED",
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
    profile.active === false
  ) {
    throw new HttpsError(
        "permission-denied",
        "ACCOUNT_INACTIVE",
    );
  }
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
 * Verifies that the caller may access teacher display
 * information for a specific class.
 *
 * System Admins and School Admins may access any class
 * in the school. Teachers must be active members and
 * assigned to the requested class.
 *
 * @param {Object} request Callable function request.
 * @param {string} schoolId School to authorize.
 * @param {string} classId Class to authorize.
 * @return {Promise<Object>} Caller and class information.
 */
async function requireClassTeacherDirectoryAccess(
    request,
    schoolId,
    classId,
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

  if (profile.active === false) {
    throw new HttpsError(
        "permission-denied",
        "ACCOUNT_INACTIVE",
    );
  }

  const classDocument =
    await db
        .collection("schools")
        .doc(schoolId)
        .collection("classes")
        .doc(classId)
        .get();

  if (!classDocument.exists) {
    throw new HttpsError(
        "not-found",
        "Class not found.",
    );
  }

  if (
    profile.systemRole ===
    "system-admin"
  ) {
    return {
      uid,
      profile,
      role: "system-admin",
      classData:
        classDocument.data(),
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
        "Class access is required.",
    );
  }

  const membership =
    membershipDocument.data();

  if (membership.active === false) {
    throw new HttpsError(
        "permission-denied",
        "Class access is required.",
    );
  }

  if (
    membership.role ===
    "school-admin"
  ) {
    return {
      uid,
      profile,
      role: "school-admin",
      membership,
      classData:
        classDocument.data(),
    };
  }

  const classData =
    classDocument.data();

  const teacherUids =
    Array.isArray(
        classData.teacherUids,
    ) ?
      classData.teacherUids :
      [];

  if (
    membership.role !== "teacher" ||
    !teacherUids.includes(uid)
  ) {
    throw new HttpsError(
        "permission-denied",
        "Class access is required.",
    );
  }

  return {
    uid,
    profile,
    role: "teacher",
    membership,
    classData,
  };
}

/**
 * Verifies that the caller may access Dashboard Activity
 * for the requested school.
 *
 * System Admins receive system-level activity.
 * School Admins receive activity for the requested school.
 * Teachers receive activity only for classes to which they
 * are currently assigned.
 *
 * @param {Object} request Callable function request.
 * @param {string} schoolId School to authorize.
 * @return {Promise<Object>} Caller role and activity scope.
 */
async function requireDashboardActivityAccess(
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

  if (profile.active === false) {
    throw new HttpsError(
        "permission-denied",
        "ACCOUNT_INACTIVE",
    );
  }

  if (
    profile.systemRole ===
    "system-admin"
  ) {
    return {
      uid,
      profile,
      role: "system-admin",
      classIds: [],
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
        "School access is required.",
    );
  }

  const membership =
    membershipDocument.data();

  if (membership.active === false) {
    throw new HttpsError(
        "permission-denied",
        "School access is required.",
    );
  }

  if (
    membership.role ===
    "school-admin"
  ) {
    return {
      uid,
      profile,
      role: "school-admin",
      membership,
      classIds: [],
    };
  }

  if (membership.role !== "teacher") {
    throw new HttpsError(
        "permission-denied",
        "Dashboard activity access is required.",
    );
  }

  const classesSnapshot =
    await db
        .collection("schools")
        .doc(schoolId)
        .collection("classes")
        .where(
            "teacherUids",
            "array-contains",
            uid,
        )
        .get();

  return {
    uid,
    profile,
    role: "teacher",
    membership,
    classIds:
      classesSnapshot.docs.map(
          (classDocument) =>
            classDocument.id,
      ),
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

        const users =
          await Promise.all(
              membershipsSnapshot.docs.map(
                  async (
                      membershipDocument,
                  ) => {
                    const uid =
                      membershipDocument.id;

                    const membership =
                      membershipDocument.data();

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

                      active:
                        user.active !== false,

                      schoolRole:
                        membership.role || "",

                      membershipActive:
                        membership.active !==
                          false,
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

/**
 * Returns safe display information for teachers assigned
 * to a class.
 *
 * The caller must be a System Admin, School Admin, or
 * an active Teacher assigned to the requested class.
 */
exports.getClassTeacherDirectory =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          requireText(
              data.schoolId,
              "School ID",
          );

        const classId =
          requireText(
              data.classId,
              "Class ID",
          );

        const {
          classData,
        } =
          await requireClassTeacherDirectoryAccess(
              request,
              schoolId,
              classId,
          );

        const teacherUids =
          [
            ...new Set(
                (
                  Array.isArray(
                      classData.teacherUids,
                  ) ?
                    classData.teacherUids :
                    []
                )
                    .map(
                        (uid) =>
                          String(uid)
                              .trim(),
                    )
                    .filter(Boolean),
            ),
          ];

        const teachers =
          await Promise.all(
              teacherUids.map(
                  async (uid) => {
                    const userDocument =
                      await db
                          .collection("users")
                          .doc(uid)
                          .get();

                    if (!userDocument.exists) {
                      return null;
                    }

                    const user =
                      userDocument.data();

                    return {
                      id: uid,

                      displayName:
                        user.displayName || "",

                      firstName:
                        user.firstName || "",

                      lastName:
                        user.lastName || "",
                    };
                  },
              ),
          );

        return teachers.filter(Boolean);
      },
  );

/**
 * Returns recent Dashboard Activity visible to the caller.
 *
 * Activity is selected and filtered server-side according
 * to the authenticated caller's role and current access.
 * Returned events contain only sanitized display data.
 */
exports.getDashboardActivity =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          requireText(
              data.schoolId,
              "School ID",
          );

        const access =
          await requireDashboardActivityAccess(
              request,
              schoolId,
          );

        let snapshot;

        if (
          access.role ===
          "system-admin"
        ) {
          snapshot =
            await db
                .collection(
                    "systemAuditLogs",
                )
                .orderBy(
                    "createdAt",
                    "desc",
                )
                .limit(20)
                .get();
        } else {
          snapshot =
            await db
                .collection("schools")
                .doc(schoolId)
                .collection("auditLogs")
                .orderBy(
                    "createdAt",
                    "desc",
                )
                .limit(
                    access.role ===
                      "teacher" ?
                      50 :
                      10,
                )
                .get();
        }

        let auditDocuments =
          snapshot.docs;

        if (
          access.role ===
          "teacher"
        ) {
          const assignedClassIds =
            new Set(
                access.classIds,
            );

          auditDocuments =
            auditDocuments.filter(
                (auditDocument) => {
                  const audit =
                    auditDocument.data();

                  const classId =
                    audit.context &&
                    typeof audit.context ===
                      "object" ?
                      audit.context.classId :
                      "";

                  return (
                    typeof classId ===
                      "string" &&
                    assignedClassIds.has(
                        classId,
                    )
                  );
                },
            )
                .slice(0, 10);
        }

        const actorUids =
          [
            ...new Set(
                auditDocuments
                    .map(
                        (auditDocument) =>
                          String(
                              auditDocument
                                  .data()
                                  .actorUid ||
                              "",
                          ).trim(),
                    )
                    .filter(Boolean),
            ),
          ];

        const actorDocuments =
          await Promise.all(
              actorUids.map(
                  async (uid) => {
                    const userDocument =
                      await db
                          .collection(
                              "users",
                          )
                          .doc(uid)
                          .get();

                    if (
                      !userDocument.exists
                    ) {
                      return [
                        uid,
                        "",
                      ];
                    }

                    const user =
                      userDocument.data();

                    const fullName =
                      [
                        user.firstName,
                        user.lastName,
                      ]
                          .filter(Boolean)
                          .join(" ")
                          .trim();

                    return [
                      uid,
                      user.displayName ||
                        fullName ||
                        "",
                    ];
                  },
              ),
          );

        const actorNames =
          Object.fromEntries(
              actorDocuments,
          );

        return auditDocuments.map(
            (auditDocument) => {
              const audit =
                auditDocument.data();

              const context =
                audit.context &&
                typeof audit.context ===
                  "object" ?
                  audit.context :
                  {};

              const createdAt =
                audit.createdAt &&
                typeof audit.createdAt
                    .toMillis ===
                  "function" ?
                  audit.createdAt.toMillis() :
                  null;

              const actorUid =
                String(
                    audit.actorUid ||
                    "",
                );

              const allowedChangedFields =
                new Set([
                  "name",
                  "courseId",
                  "roomId",
                  "academicYear",
                  "semester",
                  "teacherUids",
                  "mainTeacherUid",
                  "active",
                  "title",
                  "planDate",
                  "deskCount",
                  "seatsPerDesk",
                  "desksPerRow",
                  "teacherPosition",
                  "capacity",
                  "assignments",
                ]);

              const changedFields =
                Array.isArray(
                    audit.changedFields,
                ) ?
                  audit.changedFields.filter(
                      (field) =>
                        typeof field === "string" &&
                        allowedChangedFields.has(
                            field,
                        ),
                  ) :
                  [];

              return {
                id:
                  auditDocument.id,

                action:
                  audit.action || "",

                entityType:
                  audit.entityType || "",

                entityId:
                  audit.entityId || "",

                entityName:
                  audit.details &&
                  typeof audit.details ===
                    "object" ?
                    audit.details
                        .entityName ||
                      "" :
                    "",

                classId:
                  typeof context.classId ===
                    "string" ?
                    context.classId :
                    "",

                changedFields,

                actorName:
                  actorNames[
                      actorUid
                  ] || "",

                createdAt,
              };
            },
        );
      },
  );

exports.createStudentAccount =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          String(
              data.schoolId || "",
          ).trim();

        const studentId =
          String(
              data.studentId || "",
          ).trim();

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

        const language =
          typeof data.language ===
            "string" &&
          data.language.trim() ?
            data.language.trim() :
            "en";

        if (
          !schoolId ||
          !studentId
        ) {
          throw new HttpsError(
              "invalid-argument",
              "schoolId and studentId are required.",
          );
        }

        const actor =
          await requireSchoolAdmin(
              request,
              schoolId,
          );

        const schoolRef =
          db
              .collection("schools")
              .doc(schoolId);

        const studentRef =
          schoolRef
              .collection("students")
              .doc(studentId);

        /*
         * Validate the academic Student before
         * creating anything in Firebase Auth.
         */
        const studentDocument =
          await studentRef.get();

        if (!studentDocument.exists) {
          throw new HttpsError(
              "not-found",
              "Student record not found.",
          );
        }

        const student =
          studentDocument.data();

        const firstName =
          String(
              student.firstName || "",
          ).trim();

        const lastName =
          String(
              student.lastName || "",
          ).trim();

        if (
          !firstName ||
          !lastName
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_NAME_INCOMPLETE",
          );
        }

        const displayName =
          [
            firstName,
            lastName,
          ]
              .filter(Boolean)
              .join(" ")
              .trim();

        if (
          student.isActive === false
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_INACTIVE",
          );
        }

        const existingUserUid =
          typeof student.userUid ===
            "string" ?
            student.userUid.trim() :
            "";

        if (existingUserUid) {
          throw new HttpsError(
              "already-exists",
              "STUDENT_ALREADY_LINKED",
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

          const membershipRef =
            schoolRef
                .collection("members")
                .doc(uid);

          const accountRef =
            schoolRef
                .collection(
                    "studentAccounts",
                )
                .doc(uid);

          const auditRef =
            schoolRef
                .collection("auditLogs")
                .doc();

          await db.runTransaction(
              async (transaction) => {
                /*
                 * Re-read the Student inside the
                 * transaction so concurrent account
                 * creation cannot link two accounts.
                 */
                const currentStudentDocument =
                  await transaction.get(
                      studentRef,
                  );

                if (
                  !currentStudentDocument
                      .exists
                ) {
                  throw new HttpsError(
                      "not-found",
                      "Student record not found.",
                  );
                }

                const currentStudent =
                  currentStudentDocument
                      .data();

                if (
                  currentStudent.isActive ===
                    false
                ) {
                  throw new HttpsError(
                      "failed-precondition",
                      "STUDENT_INACTIVE",
                  );
                }

                const currentUserUid =
                  typeof currentStudent
                      .userUid ===
                    "string" ?
                    currentStudent
                        .userUid
                        .trim() :
                    "";

                if (currentUserUid) {
                  throw new HttpsError(
                      "already-exists",
                      "STUDENT_ALREADY_LINKED",
                  );
                }

                transaction.set(
                    userRef,
                    {
                      email,
                      firstName,
                      lastName,
                      displayName,
                      language,
                      photoURL: "",
                      systemRole: null,
                      activeSchool:
                        schoolId,
                      active: true,
                      createdAt:
                        FieldValue
                            .serverTimestamp(),
                      updatedAt:
                        FieldValue
                            .serverTimestamp(),
                    },
                );

                transaction.set(
                    membershipRef,
                    {
                      userUid: uid,
                      role: "student",
                      active: true,
                      createdAt:
                        FieldValue
                            .serverTimestamp(),
                      updatedAt:
                        FieldValue
                            .serverTimestamp(),
                    },
                );

                transaction.set(
                    accountRef,
                    {
                      studentId,
                      createdAt:
                        FieldValue
                            .serverTimestamp(),
                      updatedAt:
                        FieldValue
                            .serverTimestamp(),
                    },
                );

                transaction.set(
                    studentRef,
                    {
                      userUid: uid,
                      updatedAt:
                        FieldValue
                            .serverTimestamp(),
                    },
                    {
                      merge: true,
                    },
                );

                transaction.set(
                    auditRef,
                    {
                      action:
                        "student.accountCreated",

                      entityType:
                        "student",

                      entityId:
                        studentId,

                      actorUid:
                        actor.uid,

                      actorEmail:
                        actor.profile.email ||
                        request.auth
                            .token.email ||
                        "",

                      actorRole:
                        actor.role ||
                        actor.profile
                            .systemRole ||
                        null,

                      schoolId,

                      changedFields: [
                        "userUid",
                      ],

                      details: {
                        entityName:
                          currentStudent
                              .name ||
                          "",
                        userUid: uid,
                        email,
                      },

                      createdAt:
                        FieldValue
                            .serverTimestamp(),
                    },
                );
              },
          );

          return {
            uid,
            email,
            displayName,
            schoolId,
            studentId,
          };
        } catch (error) {
          /*
           * Firebase Auth cannot participate in a
           * Firestore transaction. If anything after
           * Auth creation fails, remove the newly
           * created Auth account.
           */
          if (authUser?.uid) {
            try {
              await getAuth()
                  .deleteUser(
                      authUser.uid,
                  );
            } catch (
              rollbackError
            ) {
              console.error(
                  "Unable to roll back Student Auth user:",
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
              "Unable to create Student account:",
              error,
          );

          if (
            error.code ===
              "auth/invalid-email"
          ) {
            throw new HttpsError("invalid-argument", "INVALID_EMAIL",
            );
          }
          if (
            error.code ===
              "auth/email-already-exists"
          ) {
            throw new HttpsError(
                "already-exists",
                "EMAIL_ALREADY_EXISTS",
            );
          }

          if (
            error.code ===
              "auth/invalid-password"
          ) {
            throw new HttpsError("invalid-argument", "INVALID_PASSWORD",
            );
          }

          throw new HttpsError(
              "internal",
              "Unable to create Student account.",
          );
        }
      },
  );

exports.setStudentActive =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          String(
              data.schoolId || "",
          ).trim();

        const studentId =
          String(
              data.studentId || "",
          ).trim();

        const active =
          data.active;

        if (
          !schoolId ||
          !studentId
        ) {
          throw new HttpsError(
              "invalid-argument",
              "schoolId and studentId are required.",
          );
        }

        if (
          typeof active !==
            "boolean"
        ) {
          throw new HttpsError(
              "invalid-argument",
              "ACTIVE_BOOLEAN_REQUIRED",
          );
        }

        const actor =
          await requireSchoolAdmin(
              request,
              schoolId,
          );

        const schoolRef =
          db
              .collection("schools")
              .doc(schoolId);

        const studentRef =
          schoolRef
              .collection("students")
              .doc(studentId);

        const studentDocument =
          await studentRef.get();

        if (!studentDocument.exists) {
          throw new HttpsError(
              "not-found",
              "STUDENT_NOT_FOUND",
          );
        }

        const student =
          studentDocument.data();

        const previousStudentActive =
          student.isActive !== false;

        const userUid =
          typeof student.userUid ===
            "string" ?
            student.userUid.trim() :
            "";

        /*
         * Reactivation intentionally restores only
         * the academic Student. Login access remains
         * disabled until an administrator explicitly
         * enables it through setStudentAccountActive.
         */
        if (active) {
          if (previousStudentActive) {
            return {
              success: true,
              schoolId,
              studentId,
              active: true,
              changed: false,
            };
          }

          const auditRef =
            schoolRef
                .collection("auditLogs")
                .doc();

          const batch =
            db.batch();

          batch.update(
              studentRef,
              {
                isActive: true,
                updatedAt:
                  FieldValue.serverTimestamp(),
              },
          );

          batch.set(
              auditRef,
              {
                action:
                  "student.reactivated",

                entityType:
                  "student",

                entityId:
                  studentId,

                actorUid:
                  actor.uid || "",

                actorEmail:
                  actor.email || "",

                actorRole:
                  actor.actorRole || "",

                schoolId,

                changedFields: [
                  "isActive",
                ],

                details: {
                  entityName:
                    student.name || "",

                  changes: {
                    isActive: {
                      before: false,
                      after: true,
                    },
                  },
                },

                createdAt:
                  FieldValue.serverTimestamp(),
              },
          );

          await batch.commit();

          return {
            success: true,
            schoolId,
            studentId,
            active: true,
            changed: true,
          };
        }

        /*
         * A Student without a linked login account
         * only needs the academic record archived.
         */
        if (!userUid) {
          if (!previousStudentActive) {
            return {
              success: true,
              schoolId,
              studentId,
              active: false,
              changed: false,
            };
          }

          const auditRef =
            schoolRef
                .collection("auditLogs")
                .doc();

          const batch =
            db.batch();

          batch.update(
              studentRef,
              {
                isActive: false,
                updatedAt:
                  FieldValue.serverTimestamp(),
              },
          );

          batch.set(
              auditRef,
              {
                action:
                  "student.archived",

                entityType:
                  "student",

                entityId:
                  studentId,

                actorUid:
                  actor.uid || "",

                actorEmail:
                  actor.email || "",

                actorRole:
                  actor.actorRole || "",

                schoolId,

                changedFields: [
                  "isActive",
                ],

                details: {
                  entityName:
                    student.name || "",

                  changes: {
                    isActive: {
                      before: true,
                      after: false,
                    },
                  },
                },

                createdAt:
                  FieldValue.serverTimestamp(),
              },
          );

          await batch.commit();

          return {
            success: true,
            schoolId,
            studentId,
            active: false,
            changed: true,
          };
        }

        /*
         * A linked Student must have a complete,
         * internally consistent account relationship
         * before archiving. Otherwise we fail rather
         * than risk leaving login access enabled.
         */
        const accountRef =
          schoolRef
              .collection(
                  "studentAccounts",
              )
              .doc(userUid);

        const membershipRef =
          schoolRef
              .collection("members")
              .doc(userUid);

        const userRef =
          db
              .collection("users")
              .doc(userUid);

        const [
          accountDocument,
          membershipDocument,
          userDocument,
        ] =
          await Promise.all([
            accountRef.get(),
            membershipRef.get(),
            userRef.get(),
          ]);

        if (!accountDocument.exists) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_ACCOUNT_MAPPING_MISSING",
          );
        }

        const account =
          accountDocument.data();

        if (
          String(
              account.studentId || "",
          ) !== studentId
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_ACCOUNT_LINK_MISMATCH",
          );
        }

        if (!membershipDocument.exists) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_MEMBERSHIP_REQUIRED",
          );
        }

        const membership =
          membershipDocument.data();

        if (
          membership.role !==
            "student"
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_MEMBERSHIP_REQUIRED",
          );
        }

        if (
          membership.userUid &&
          membership.userUid !==
            userUid
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_ACCOUNT_LINK_MISMATCH",
          );
        }

        if (!userDocument.exists) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_USER_PROFILE_MISSING",
          );
        }

        let authUser;

        try {
          authUser =
            await getAuth()
                .getUser(userUid);
        } catch (error) {
          if (
            error.code ===
              "auth/user-not-found"
          ) {
            throw new HttpsError(
                "failed-precondition",
                "STUDENT_AUTH_USER_MISSING",
            );
          }

          console.error(
              "Unable to load Student Auth user:",
              error,
          );

          throw new HttpsError(
              "internal",
              "Unable to load Student account.",
          );
        }

        const user =
          userDocument.data();

        const previousUserActive =
          user.active !== false;

        const previousMembershipActive =
          membership.active !== false;

        const previousAuthActive =
          authUser.disabled !== true;

        /*
         * Even if the academic Student is already
         * archived, reconcile every access layer to
         * disabled. This prevents an inconsistent
         * archived Student from retaining login.
         */
        const accessNeedsDisabling =
          previousUserActive ||
          previousMembershipActive ||
          previousAuthActive;

        if (
          !previousStudentActive &&
          !accessNeedsDisabling
        ) {
          return {
            success: true,
            schoolId,
            studentId,
            active: false,
            changed: false,
          };
        }

        try {
          if (previousAuthActive) {
            await getAuth()
                .updateUser(
                    userUid,
                    {
                      disabled: true,
                    },
                );
          }
        } catch (error) {
          console.error(
              "Unable to disable Student Auth account:",
              error,
          );

          throw new HttpsError(
              "internal",
              "Unable to disable Student login.",
          );
        }

        const auditRef =
          schoolRef
              .collection("auditLogs")
              .doc();

        const batch =
          db.batch();

        batch.update(
            studentRef,
            {
              isActive: false,
              updatedAt:
                FieldValue.serverTimestamp(),
            },
        );

        batch.update(
            userRef,
            {
              active: false,
              updatedAt:
                FieldValue.serverTimestamp(),
            },
        );

        batch.update(
            membershipRef,
            {
              active: false,
              updatedAt:
                FieldValue.serverTimestamp(),
            },
        );

        /*
         * Preserve both student.userUid and the
         * studentAccounts mapping. Archiving revokes
         * access; it does not unlink identity.
         */
        batch.set(
            auditRef,
            {
              action:
                "student.archived",

              entityType:
                "student",

              entityId:
                studentId,

              actorUid:
                actor.uid || "",

              actorEmail:
                actor.email || "",

              actorRole:
                actor.actorRole || "",

              schoolId,

              changedFields: [
                "isActive",
              ],

              details: {
                entityName:
                  student.name || "",

                changes: {
                  isActive: {
                    before:
                      previousStudentActive,
                    after: false,
                  },
                },
              },

              createdAt:
                FieldValue.serverTimestamp(),
            },
        );

        try {
          await batch.commit();
        } catch (error) {
          /*
           * Auth is outside the Firestore batch.
           * Restore its previous state if the
           * coordinated Firestore write fails.
           */
          if (previousAuthActive) {
            try {
              await getAuth()
                  .updateUser(
                      userUid,
                      {
                        disabled: false,
                      },
                  );
            } catch (
              rollbackError
            ) {
              console.error(
                  "Unable to restore Student Auth state:",
                  rollbackError,
              );
            }
          }

          console.error(
              "Unable to archive Student:",
              error,
          );

          throw new HttpsError(
              "internal",
              "Unable to archive Student.",
          );
        }

        return {
          success: true,
          schoolId,
          studentId,
          active: false,
          changed: true,
        };
      },
  );

exports.setStudentAccountActive =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          String(
              data.schoolId || "",
          ).trim();

        const studentId =
          String(
              data.studentId || "",
          ).trim();

        const active =
          data.active;

        if (
          !schoolId ||
          !studentId
        ) {
          throw new HttpsError(
              "invalid-argument",
              "schoolId and studentId are required.",
          );
        }

        if (
          typeof active !==
            "boolean"
        ) {
          throw new HttpsError(
              "invalid-argument",
              "ACTIVE_BOOLEAN_REQUIRED",
          );
        }

        const actor =
          await requireSchoolAdmin(
              request,
              schoolId,
          );

        const schoolRef =
          db
              .collection("schools")
              .doc(schoolId);

        const studentRef =
          schoolRef
              .collection("students")
              .doc(studentId);

        const studentDocument =
          await studentRef.get();

        if (!studentDocument.exists) {
          throw new HttpsError(
              "not-found",
              "STUDENT_NOT_FOUND",
          );
        }

        const student =
          studentDocument.data();

        if (
          active &&
          student.isActive === false
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_INACTIVE",
          );
        }

        const userUid =
          typeof student.userUid ===
            "string" ?
            student.userUid.trim() :
            "";

        if (!userUid) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_ACCOUNT_NOT_LINKED",
          );
        }

        const accountRef =
          schoolRef
              .collection(
                  "studentAccounts",
              )
              .doc(userUid);

        const membershipRef =
          schoolRef
              .collection("members")
              .doc(userUid);

        const userRef =
          db
              .collection("users")
              .doc(userUid);

        const [
          accountDocument,
          membershipDocument,
          userDocument,
        ] =
          await Promise.all([
            accountRef.get(),
            membershipRef.get(),
            userRef.get(),
          ]);

        if (!accountDocument.exists) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_ACCOUNT_MAPPING_MISSING",
          );
        }

        const account =
          accountDocument.data();

        if (
          String(
              account.studentId || "",
          ) !== studentId
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_ACCOUNT_LINK_MISMATCH",
          );
        }

        if (!membershipDocument.exists) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_MEMBERSHIP_REQUIRED",
          );
        }

        const membership =
          membershipDocument.data();

        if (
          membership.role !==
            "student"
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_MEMBERSHIP_REQUIRED",
          );
        }

        if (
          membership.userUid &&
          membership.userUid !==
            userUid
        ) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_ACCOUNT_LINK_MISMATCH",
          );
        }

        if (!userDocument.exists) {
          throw new HttpsError(
              "failed-precondition",
              "STUDENT_USER_PROFILE_MISSING",
          );
        }

        let authUser;

        try {
          authUser =
            await getAuth()
                .getUser(userUid);
        } catch (error) {
          if (
            error.code ===
              "auth/user-not-found"
          ) {
            throw new HttpsError(
                "failed-precondition",
                "STUDENT_AUTH_USER_MISSING",
            );
          }

          console.error(
              "Unable to load Student Auth user:",
              error,
          );

          throw new HttpsError(
              "internal",
              "Unable to load Student account.",
          );
        }

        const user =
          userDocument.data();

        const previousUserActive =
          user.active !== false;

        const previousMembershipActive =
          membership.active !== false;

        const previousAuthActive =
          authUser.disabled !== true;

        /*
         * If all three access layers already
         * match the requested state, there is
         * nothing to change.
         */
        if (
          previousUserActive === active &&
          previousMembershipActive === active &&
          previousAuthActive === active
        ) {
          return {
            success: true,
            schoolId,
            studentId,
            userUid,
            active,
            changed: false,
          };
        }

        /*
         * Firebase Auth cannot participate in
         * the Firestore batch below. Update it
         * first and restore its previous state
         * if the Firestore write fails.
         */
        try {
          await getAuth()
              .updateUser(
                  userUid,
                  {
                    disabled:
                      !active,
                  },
              );
        } catch (error) {
          console.error(
              "Unable to update Student Auth state:",
              error,
          );

          throw new HttpsError(
              "internal",
              "Unable to update Student login.",
          );
        }

        const action =
          active ?
            "student.accountEnabled" :
            "student.accountDisabled";

        const auditRef =
          schoolRef
              .collection("auditLogs")
              .doc();

        const batch =
          db.batch();

        batch.update(
            userRef,
            {
              active,
              updatedAt:
                FieldValue
                    .serverTimestamp(),
            },
        );

        batch.update(
            membershipRef,
            {
              active,
              updatedAt:
                FieldValue
                    .serverTimestamp(),
            },
        );

        batch.set(
            auditRef,
            {
              action,

              entityType:
                "student",

              entityId:
                studentId,

              actorUid:
                actor.uid,

              actorEmail:
                actor.profile.email ||
                request.auth.token.email ||
                "",

              actorRole:
                actor.role ||
                actor.profile.systemRole ||
                null,

              schoolId,

              changedFields: [
                "accountActive",
              ],

              details: {
                entityName:
                  student.name || "",

                userUid,

                email:
                  user.email ||
                  authUser.email ||
                  "",

                changes: {
                  accountActive: {
                    before:
                      previousUserActive &&
                      previousMembershipActive &&
                      previousAuthActive,

                    after:
                      active,
                  },
                },
              },

              createdAt:
                FieldValue
                    .serverTimestamp(),
            },
        );

        try {
          await batch.commit();
        } catch (error) {
          /*
           * Restore Firebase Auth because the
           * Firestore changes did not commit.
           */
          try {
            await getAuth()
                .updateUser(
                    userUid,
                    {
                      disabled:
                        !previousAuthActive,
                    },
                );
          } catch (rollbackError) {
            console.error(
                "Unable to restore Student Auth state:",
                rollbackError,
            );
          }

          console.error(
              "Unable to update Student account state:",
              error,
          );

          throw new HttpsError(
              "internal",
              "Unable to update Student login.",
          );
        }

        return {
          success: true,
          schoolId,
          studentId,
          userUid,
          active,
          changed: true,
        };
      },
  );

exports.linkStudentAccount =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          String(
              data.schoolId || "",
          ).trim();

        const studentId =
          String(
              data.studentId || "",
          ).trim();

        const userUid =
          String(
              data.userUid || "",
          ).trim();

        if (
          !schoolId ||
          !studentId ||
          !userUid
        ) {
          throw new HttpsError(
              "invalid-argument",
              "schoolId, studentId, and userUid are required.",
          );
        }

        const actor =
          await requireSchoolAdmin(
              request,
              schoolId,
          );

        const schoolRef =
          db
              .collection("schools")
              .doc(schoolId);

        const studentRef =
          schoolRef
              .collection("students")
              .doc(studentId);

        const accountRef =
          schoolRef
              .collection("studentAccounts")
              .doc(userUid);

        const userRef =
          db
              .collection("users")
              .doc(userUid);

        const membershipRef =
          schoolRef
              .collection("members")
              .doc(userUid);

        await db.runTransaction(
            async (transaction) => {
              const [
                studentDocument,
                accountDocument,
                userDocument,
                membershipDocument,
              ] =
                await Promise.all([
                  transaction.get(
                      studentRef,
                  ),
                  transaction.get(
                      accountRef,
                  ),
                  transaction.get(
                      userRef,
                  ),
                  transaction.get(
                      membershipRef,
                  ),
                ]);

              if (
                !studentDocument.exists
              ) {
                throw new HttpsError(
                    "not-found",
                    "Student record not found.",
                );
              }

              if (
                !userDocument.exists
              ) {
                throw new HttpsError(
                    "not-found",
                    "User profile not found.",
                );
              }

              const user =
                userDocument.data();

              if (
                user.active === false
              ) {
                throw new HttpsError(
                    "failed-precondition",
                    "TARGET_ACCOUNT_INACTIVE",
                );
              }

              if (
                !membershipDocument.exists
              ) {
                throw new HttpsError(
                    "failed-precondition",
                    "STUDENT_MEMBERSHIP_REQUIRED",
                );
              }

              const membership =
                membershipDocument.data();

              if (
                membership.active === false ||
                membership.role !==
                  "student" ||
                membership.userUid !==
                  userUid
              ) {
                throw new HttpsError(
                    "failed-precondition",
                    "ACTIVE_STUDENT_MEMBERSHIP_REQUIRED",
                );
              }

              const student =
                studentDocument.data();

              if (
                student.isActive === false
              ) {
                throw new HttpsError(
                    "failed-precondition",
                    "STUDENT_INACTIVE",
                );
              }

              const existingUserUid =
                typeof student.userUid ===
                  "string" ?
                  student.userUid.trim() :
                  "";

              if (
                existingUserUid &&
                existingUserUid !==
                  userUid
              ) {
                throw new HttpsError(
                    "already-exists",
                    "STUDENT_ALREADY_LINKED",
                );
              }

              if (
                accountDocument.exists
              ) {
                const existingStudentId =
                  String(
                      accountDocument
                          .data()
                          .studentId || "",
                  ).trim();

                if (
                  existingStudentId !==
                    studentId
                ) {
                  throw new HttpsError(
                      "already-exists",
                      "ACCOUNT_ALREADY_LINKED",
                  );
                }
              }

              /*
               * If both sides already describe the
               * requested relationship, treat this
               * operation as idempotent.
               */
              if (
                existingUserUid ===
                  userUid &&
                accountDocument.exists &&
                String(
                    accountDocument
                        .data()
                        .studentId || "",
                ).trim() ===
                  studentId
              ) {
                return;
              }

              transaction.set(
                  studentRef,
                  {
                    userUid,
                    updatedAt:
                      FieldValue
                          .serverTimestamp(),
                  },
                  {
                    merge: true,
                  },
              );

              transaction.set(
                  accountRef,
                  {
                    studentId,
                    createdAt:
                      FieldValue
                          .serverTimestamp(),
                    updatedAt:
                      FieldValue
                          .serverTimestamp(),
                  },
                  {
                    merge: true,
                  },
              );

              const auditRef =
                schoolRef
                    .collection(
                        "auditLogs",
                    )
                    .doc();

              transaction.set(
                  auditRef,
                  {
                    action:
                      "student.accountLinked",

                    entityType:
                      "student",

                    entityId:
                      studentId,

                    actorUid:
                      actor.uid,

                    actorEmail:
                      actor.profile.email ||
                      request.auth
                          .token.email ||
                      "",

                    actorRole:
                      actor.role ||
                      actor.profile
                          .systemRole ||
                      null,

                    schoolId,

                    changedFields: [
                      "userUid",
                    ],

                    details: {
                      entityName:
                        student.name ||
                        "",
                      userUid,
                    },

                    createdAt:
                      FieldValue
                          .serverTimestamp(),
                  },
              );
            },
        );

        return {
          schoolId,
          studentId,
          userUid,
        };
      },
  );

exports.unlinkStudentAccount =
  onCall(
      async (request) => {
        const data =
          request.data || {};

        const schoolId =
          String(
              data.schoolId || "",
          ).trim();

        const studentId =
          String(
              data.studentId || "",
          ).trim();

        if (
          !schoolId ||
          !studentId
        ) {
          throw new HttpsError(
              "invalid-argument",
              "schoolId and studentId are required.",
          );
        }

        const actor =
          await requireSchoolAdmin(
              request,
              schoolId,
          );

        const schoolRef =
          db
              .collection("schools")
              .doc(schoolId);

        const studentRef =
          schoolRef
              .collection("students")
              .doc(studentId);

        await db.runTransaction(
            async (transaction) => {
              const studentDocument =
                await transaction.get(
                    studentRef,
                );

              if (
                !studentDocument.exists
              ) {
                throw new HttpsError(
                    "not-found",
                    "Student record not found.",
                );
              }

              const student =
                studentDocument.data();

              const userUid =
                typeof student.userUid ===
                  "string" ?
                  student.userUid.trim() :
                  "";

              /*
               * Already unlinked: idempotent no-op.
               */
              if (!userUid) {
                return;
              }

              const accountRef =
                schoolRef
                    .collection(
                        "studentAccounts",
                    )
                    .doc(userUid);

              const accountDocument =
                await transaction.get(
                    accountRef,
                );

              /*
               * Refuse to delete a reverse mapping
               * that belongs to another student.
               * This protects against inconsistent
               * historical data.
               */
              if (
                accountDocument.exists &&
                String(
                    accountDocument
                        .data()
                        .studentId || "",
                ).trim() !==
                  studentId
              ) {
                throw new HttpsError(
                    "failed-precondition",
                    "STUDENT_ACCOUNT_LINK_MISMATCH",
                );
              }

              transaction.update(
                  studentRef,
                  {
                    userUid:
                      FieldValue
                          .delete(),
                    updatedAt:
                      FieldValue
                          .serverTimestamp(),
                  },
              );

              if (
                accountDocument.exists
              ) {
                transaction.delete(
                    accountRef,
                );
              }

              const auditRef =
                schoolRef
                    .collection(
                        "auditLogs",
                    )
                    .doc();

              transaction.set(
                  auditRef,
                  {
                    action:
                      "student.accountUnlinked",

                    entityType:
                      "student",

                    entityId:
                      studentId,

                    actorUid:
                      actor.uid,

                    actorEmail:
                      actor.profile.email ||
                      request.auth
                          .token.email ||
                      "",

                    actorRole:
                      actor.role ||
                      actor.profile
                          .systemRole ||
                      null,

                    schoolId,

                    changedFields: [
                      "userUid",
                    ],

                    details: {
                      entityName:
                        student.name ||
                        "",
                      userUid,
                    },

                    createdAt:
                      FieldValue
                          .serverTimestamp(),
                  },
              );
            },
        );

        return {
          schoolId,
          studentId,
          unlinked: true,
        };
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

        const currentProfile =
          userDocument.data();

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

        const nextValues = {
          firstName,
          lastName,
          displayName,
          language,
        };

        const changedFields =
          Object.keys(
              nextValues,
          ).filter(
              (field) =>
                String(
                    currentProfile[field] || "",
                ) !==
                String(
                    nextValues[field] || "",
                ),
          );

        /*
        * Do not create an audit event when
        * nothing actually changed.
        */
        if (
          changedFields.length === 0
        ) {
          return {
            success: true,
            userId,
            firstName,
            lastName,
            displayName,
            language,
            changed: false,
          };
        }

        const changes = {};

        changedFields.forEach(
            (field) => {
              changes[field] = {
                before:
                  currentProfile[field] ||
                  "",
                after:
                  nextValues[field] ||
                  "",
              };
            },
        );

        const batch =
          db.batch();

        batch.update(
            userRef,
            {
              firstName,
              lastName,
              displayName,
              language,
              updatedAt:
                FieldValue
                    .serverTimestamp(),
            },
        );

        /*
         * Audit destination is determined by
         * the target user's school memberships,
         * not by the actor's role.
         *
         * If the target user belongs to one or
         * more schools, write one audit event
         * to each school and do not create a
         * system audit event.
         *
         * If the target user has no school
         * memberships, write one system audit
         * event instead.
         */
        const membershipsSnapshot =
          await db
              .collectionGroup(
                  "members",
              )
              .where(
                  "userUid",
                  "==",
                  userId,
              )
              .get();

        const schoolIds =
          [
            ...new Set(
                membershipsSnapshot.docs
                    .map(
                        (document) =>
                          document.ref
                              .parent
                              .parent
                              ?.id,
                    )
                    .filter(Boolean),
            ),
          ];

        const auditData = {
          action:
            "user.updated",

          entityType:
            "user",

          entityId:
            userId,

          actorUid:
            actor.uid,

          actorEmail:
            actor.profile.email ||
            request.auth.token.email ||
            "",

          actorRole:
            actor.profile.systemRole ||
            actor.role ||
            null,

          changedFields,

          details: {
            entityName:
              displayName ||
              currentProfile.displayName ||
              currentProfile.email ||
              userId,

            email:
              currentProfile.email ||
              "",

            changes,
          },

          createdAt:
            FieldValue
                .serverTimestamp(),
        };

        if (schoolIds.length > 0) {
          schoolIds.forEach(
              (targetSchoolId) => {
                const schoolAuditRef =
                  db
                      .collection(
                          "schools",
                      )
                      .doc(
                          targetSchoolId,
                      )
                      .collection(
                          "auditLogs",
                      )
                      .doc();

                batch.set(
                    schoolAuditRef,
                    {
                      ...auditData,

                      schoolId:
                        targetSchoolId,
                    },
                );
              },
          );
        } else {
          const systemAuditRef =
            db
                .collection(
                    "systemAuditLogs",
                )
                .doc();

          batch.set(
              systemAuditRef,
              {
                ...auditData,

                schoolId:
                  null,
              },
          );
        }

        await batch.commit();

        return {
          success: true,
          userId,
          firstName,
          lastName,
          displayName,
          language,
          changed: true,
          changedFields,
        };
      },
  );

exports.setManagedUserActive =
  onCall(
      async (request) => {
        const actor =
          await requireSystemAdmin(
              request,
          );

        const data =
          request.data || {};

        const userId =
          String(
              data.userId || "",
          ).trim();

        const active =
          data.active;

        if (!userId) {
          throw new HttpsError(
              "invalid-argument",
              "USER_ID_REQUIRED",
          );
        }

        if (
          typeof active !==
          "boolean"
        ) {
          throw new HttpsError(
              "invalid-argument",
              "ACTIVE_BOOLEAN_REQUIRED",
          );
        }

        /*
         * A System Admin must never
         * archive their own account.
         */
        if (
          userId === actor.uid &&
          active === false
        ) {
          throw new HttpsError(
              "failed-precondition",
              "SELF_ARCHIVE_NOT_ALLOWED",
          );
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
              "USER_NOT_FOUND",
          );
        }

        const targetProfile =
          userDocument.data();

        const previousActive =
          targetProfile.active !== false;

        /*
         * If the requested state is already
         * the current state, do nothing.
         */
        if (
          previousActive === active
        ) {
          return {
            success: true,
            userId,
            active,
            changed: false,
          };
        }

        /*
         * Never allow the final active
         * System Admin to be archived.
         *
         * Profiles without an active
         * field are treated as active
         * for backwards compatibility.
         */
        if (
          active === false &&
          targetProfile.systemRole ===
            "system-admin"
        ) {
          const systemAdminSnapshot =
            await db
                .collection("users")
                .where(
                    "systemRole",
                    "==",
                    "system-admin",
                )
                .get();

          const activeSystemAdmins =
            systemAdminSnapshot.docs
                .filter(
                    (document) =>
                      document
                          .data()
                          .active !==
                        false,
                );

          if (
            activeSystemAdmins.length <=
            1
          ) {
            throw new HttpsError(
                "failed-precondition",
                "LAST_ACTIVE_SYSTEM_ADMIN",
            );
          }
        }

        /*
         * Find every school membership
         * belonging to the target user.
         */
        const membershipsSnapshot =
          await db
              .collectionGroup(
                  "members",
              )
              .where(
                  "userUid",
                  "==",
                  userId,
              )
              .get();

        const schoolIds =
          [
            ...new Set(
                membershipsSnapshot.docs
                    .map(
                        (document) =>
                          document.ref
                              .parent
                              .parent
                              ?.id,
                    )
                    .filter(Boolean),
            ),
          ];

        const action =
          active ?
            "user.reactivated" :
            "user.archived";

        const entityName =
          targetProfile.displayName ||
          targetProfile.email ||
          userId;

        const actorEmail =
          actor.profile.email ||
          request.auth.token.email ||
          "";

        const actorRole =
          actor.profile.systemRole ||
          actor.role ||
          "system-admin";

        /*
         * Update the user and create all
         * audit records atomically.
         */
        const batch =
          db.batch();

        batch.update(
            userRef,
            {
              active,
              updatedAt:
                FieldValue
                    .serverTimestamp(),
            },
        );

        /*
         * Audit destination is determined by
         * the target user's school memberships.
         *
         * If memberships exist, write one
         * audit event to each school only.
         *
         * If no memberships exist, write one
         * System Activity Log event.
         */
        const auditData = {
          action,

          entityType:
            "user",

          entityId:
            userId,

          actorUid:
            actor.uid,

          actorEmail,

          actorRole,

          changedFields: [
            "active",
          ],

          details: {
            entityName,

            email:
              targetProfile.email ||
              "",

            changes: {
              active: {
                before:
                  previousActive,

                after:
                  active,
              },
            },
          },

          createdAt:
            FieldValue
                .serverTimestamp(),
        };

        if (schoolIds.length > 0) {
          schoolIds.forEach(
              (targetSchoolId) => {
                const schoolAuditRef =
                  db
                      .collection(
                          "schools",
                      )
                      .doc(
                          targetSchoolId,
                      )
                      .collection(
                          "auditLogs",
                      )
                      .doc();

                batch.set(
                    schoolAuditRef,
                    {
                      ...auditData,

                      schoolId:
                        targetSchoolId,
                    },
                );
              },
          );
        } else {
          const systemAuditRef =
            db
                .collection(
                    "systemAuditLogs",
                )
                .doc();

          batch.set(
              systemAuditRef,
              {
                ...auditData,

                schoolId:
                  null,

                details: {
                  ...auditData.details,

                  affectedSchools: [],
                },
              },
          );
        }

        await batch.commit();

        return {
          success: true,
          userId,
          active,
          changed: true,
          affectedSchools:
            schoolIds,
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

        // Protect the last active System Admin.
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

          const activeSystemAdmins =
            adminsSnapshot.docs.filter(
                (doc) =>
                  doc.data().active !== false,
            );

          if (
            user.active !== false &&
            activeSystemAdmins.length <= 1
          ) {
            throw new HttpsError(
                "failed-precondition",
                "LAST_ACTIVE_SYSTEM_ADMIN",
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
