# Architecture Decisions

## Decision 001 — Remove appId from the frontend

The application operates based on the authenticated user's `activeSchool`.

Reason: school ownership belongs to the authenticated session, not to a hardcoded application ID.

---

## Decision 002 — Use schools/{schoolId}

Use:

`schools/{schoolId}`

instead of:

`artifacts/{appId}`

Reason: this supports multiple schools and clearer data ownership.

---

## Decision 003 — Preserve document IDs during migration

Student and seating-plan document IDs remain unchanged.

Reason: seating assignments reference student IDs, and preserving IDs reduces migration risk.

---

## Decision 004 — Separate physical rooms from classes and seating plans

Use distinct domain concepts:

- `rooms`: physical teaching spaces
- `classes`: groups of enrolled students taking a course
- `seatingPlans`: dated seating arrangements owned by a class

Reason: the legacy term `classrooms` mixed a physical location with saved seating history. Keeping these concepts separate supports multiple buildings, room reuse, courses, enrollment, and historical seat comparisons.

---

## Decision 005 — Store rooms directly under the school

Use:

`schools/{schoolId}/rooms/{roomId}`

with a `buildingId` field.

Reason: direct school-level room queries remain simple while each room still belongs to a building.

---

## Decision 006 — Store seating history under classes

Use:

`schools/{schoolId}/classes/{classId}/seatingPlans/{seatingPlanId}`

Reason: seating history belongs to the group of students, not to the physical room. The same room can host different groups and courses.

---

## Decision 007 — Revised legacy seating-plan migration

The six documents currently stored under:

`artifacts/classroom-b81c6/classrooms`

will be migrated to:

`schools/school_japan/classes/legacy_class_2025/seatingPlans`

They will not be migrated into `schools/school_japan/classrooms` or `rooms`.

Reason: inspection confirmed that these documents contain `title`, `creationDate`, and `studentAssignments`, making them historical seating plans rather than physical room records.

---

## Decision 008 — Keep legacy fields during the first migration

The initial seating-plan migration preserves:

- document IDs
- `title`
- `creationDate`
- `studentAssignments`
- numeric `studentId` values

Reason: schema cleanup and field renaming should not be combined with data relocation. A compatibility layer will keep the application working while the new model is introduced incrementally.

---

## Revised Migration Strategy

1. Migrate and verify students.
2. Document the new domain model and field-level schemas.
3. Introduce buildings, rooms, and courses.
4. Create the class that will own the historical seating plans.
5. Migrate legacy `classrooms` documents as seating plans.
6. Add a compatibility seating-plan service.
7. Verify historical layout loading and save behavior.
8. Introduce enrollment management and seating-history rules incrementally.
9. Remove legacy `artifacts` references only after full verification.

---

## Decision 009 — Use stable domain IDs and lifecycle metadata

Buildings, rooms, courses, and classes use stable, readable document IDs whenever a natural institutional code exists. New domain documents include `active`, `createdAt`, and `updatedAt` fields.

Reason: readable IDs simplify references and debugging, while lifecycle metadata allows records to be archived without deleting historical relationships.

---

## Decision 010 — Build the domain foundation before migrating seating plans

Before creating `legacy_class_2025`, define and introduce the building, room, course, and class schemas. Create real domain records where the historical relationships are known. Use `null` only when a legacy course or room cannot be identified truthfully.

Reason: this avoids unnecessary placeholder relationships and ensures the first migrated class uses the same model as future production classes.
