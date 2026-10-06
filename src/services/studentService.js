// src/services/studentService.js

import {
  db,
  functions,
} from "../firebase-init";

import {
  httpsCallable,
} from "firebase/functions";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import {
  createAuditLogWrite,
} from "./auditLogService";

const setStudentActiveCallable =
  httpsCallable(
    functions,
    "setStudentActive",
  );

function getStudentsRef(
  schoolId,
) {
  if (!schoolId) {
    throw new Error(
      "A schoolId is required to access students.",
    );
  }

  return collection(
    db,
    "schools",
    schoolId,
    "students",
  );
}

function normalizeStudent(
  document,
) {
  return {
    id:
      Number(
        document.id,
      ),

    ...document.data(),
  };
}

function sortStudents(
  students,
) {
  return students.sort(
    (a, b) => {
      const nameComparison =
        (
          a.hiragana ||
          a.name ||
          ""
        ).localeCompare(
          b.hiragana ||
          b.name ||
          "",
          "ja",
        );

      return (
        nameComparison ||
        a.id - b.id
      );
    },
  );
}

function validateStudent(
  student,
) {
  const id =
    Number(
      student.id,
    );

  const firstName =
    String(
      student.firstName ||
      "",
    ).trim();

  const lastName =
    String(
      student.lastName ||
      "",
    ).trim();

  const name =
    [
      firstName,
      lastName,
    ]
        .filter(Boolean)
        .join(" ")
        .trim();

  const hiragana =
    String(
      student.hiragana ||
      "",
    ).trim();

  const genderId =
    Number(
      student.gender_id,
    );

  if (
    !Number.isInteger(id) ||
    id <= 0
  ) {
    throw new Error(
      "Student ID must be a positive whole number.",
    );
  }

  if (!firstName) {
    throw new Error(
      "Student first name is required.",
    );
  }

  if (!lastName) {
    throw new Error(
      "Student last name is required.",
    );
  }

  if (!hiragana) {
    throw new Error(
      "Hiragana is required.",
    );
  }

  if (
    ![
      1,
      2,
      3,
    ].includes(
      genderId,
    )
  ) {
    throw new Error(
      "Please select a valid gender option.",
    );
  }

  return {
    id,
    firstName,
    lastName,
    name,
    hiragana,

    gender_id:
      genderId,

    country:
      String(
        student.country ||
        "",
      ).trim(),

    isActive:
      student.isActive !==
      false,
  };
}

function getChanges(
  previous,
  next,
) {
  const trackedFields = [
    "firstName",
    "lastName",
    "name",
    "hiragana",
    "gender_id",
    "country",
  ];

  const changes = {};

  for (
    const field
    of trackedFields
  ) {
    const before =
      previous?.[field];

    const after =
      next?.[field];

    if (
      before !== after
    ) {
      changes[field] = {
        before:
          before ?? null,

        after:
          after ?? null,
      };
    }
  }

  return changes;
}

export async function getStudents(
  schoolId,
) {
  const snapshot =
    await getDocs(
      getStudentsRef(
        schoolId,
      ),
    );

  return sortStudents(
    snapshot.docs.map(
      normalizeStudent,
    ),
  );
}

export async function getNextStudentId(
  schoolId,
) {
  const students =
    await getStudents(
      schoolId,
    );

  return (
    students.reduce(
      (
        highest,
        student,
      ) =>
        Math.max(
          highest,
          student.id,
        ),
      0,
    ) + 1
  );
}

export async function saveStudent(
  schoolId,
  student,
  originalId = null,
  options = {},
) {
  const normalized =
    validateStudent(
      student,
    );

  const studentsRef =
    getStudentsRef(
      schoolId,
    );

  const studentRef =
    doc(
      studentsRef,
      String(
        normalized.id,
      ),
    );

  const existing =
    await getDoc(
      studentRef,
    );

  if (
    originalId !== null &&
    Number(
      originalId,
    ) !==
      normalized.id
  ) {
    throw new Error(
      "Existing student IDs cannot be changed because seating history references them.",
    );
  }

  if (
    originalId === null &&
    existing.exists()
  ) {
    throw new Error(
      `Student ID ${normalized.id} already exists.`,
    );
  }

  const payload = {
    firstName:
      normalized.firstName,

    lastName:
      normalized.lastName,

    name:
      normalized.name,

    hiragana:
      normalized.hiragana,

    gender_id:
      normalized.gender_id,

    country:
      normalized.country,

    updatedAt:
      serverTimestamp(),
  };

  if (
    !existing.exists()
  ) {
    payload.isActive = true;
    payload.createdAt =
      serverTimestamp();
  }

  const previous =
    existing.exists()
      ? existing.data()
      : null;

  const changes =
    previous
      ? getChanges(
          previous,
          normalized,
        )
      : {};

  const changedFields =
    Object.keys(
      changes,
    );

  const action =
    existing.exists()
      ? "student.updated"
      : "student.created";

  const batch =
    writeBatch(db);

  batch.set(
    studentRef,
    payload,
    {
      merge: true,
    },
  );

  if (
    options.skipAudit !==
    true
  ) {
    const audit =
      createAuditLogWrite(
        schoolId,
        {
          action,

          entityType:
            "student",

          entityId:
            normalized.id,

          actorRole:
            options.actorRole ||
            "",

          changedFields,

          details: {
            entityName:
              normalized.name,

            ...(
              action !==
              "student.created"
                ? {
                    changes,
                  }
                : {}
            ),
          },
        },
      );

    batch.set(
      audit.ref,
      audit.data,
    );
  }

  await batch.commit();

  return normalized.id;
}

export async function setStudentActive(
  schoolId,
  studentId,
  active,
) {
  const result =
    await setStudentActiveCallable({
      schoolId,
      studentId,
      active,
    });

  return result.data;
}

export async function archiveStudent(
  schoolId,
  studentId,
) {
  return setStudentActive(
    schoolId,
    studentId,
    false,
  );
}

export async function reactivateStudent(
  schoolId,
  studentId,
) {
  return setStudentActive(
    schoolId,
    studentId,
    true,
  );
}

// Kept for compatibility with
// the classroom migration code.
export async function saveStudents(
  schoolId,
  students,
) {
  for (
    const student
    of students
  ) {
    await saveStudent(
      schoolId,
      student,
      student.id,
      {
        skipAudit: true,
      },
    );
  }
}

export function watchStudents(
  schoolId,
  onChange,
  onError,
) {
  return onSnapshot(
    getStudentsRef(
      schoolId,
    ),

    (snapshot) => {
      onChange(
        sortStudents(
          snapshot.docs.map(
            normalizeStudent,
          ),
        ),
      );
    },

    onError,
  );
}