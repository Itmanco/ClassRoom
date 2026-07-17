# Architecture Decisions

Decision 001

Remove appId from the frontend.

Reason

The application should operate based on the authenticated user's activeSchool.

---

Decision 002

Use

schools/{schoolId}

instead of

artifacts/{appId}

Reason

Supports multiple schools and clearer ownership.

---

Decision 003

Keep Firestore document IDs unchanged during migration.

Reason

Seat assignments reference student IDs.

---

Decision 004

Migration strategy

1. Students
2. Classrooms
3. Verification
4. Cleanup