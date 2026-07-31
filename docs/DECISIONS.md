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

---

## Decision 011 — Do not migrate disposable sandbox seating data

The legacy documents under `artifacts/{appId}/classrooms` will not be migrated. New seating plans are created directly under:

`schools/{schoolId}/classes/{classId}/seatingPlans/{seatingPlanId}`

Reason: the legacy records were test data and have no production or historical value. Skipping migration reduces temporary compatibility code and lets the new seating model become the source of truth immediately.

---

## Decision 012 — Store explicit seat positions

Each assignment stores `studentId`, `deskNumber`, and `seatNumber`.

Reason: desk number alone is ambiguous when a desk contains more than one seat. Explicit seat positions support deterministic editing, display, exporting, and future history analysis.

---

## Decision 013 — Isolate seating generation from Vue and Firebase

The planning engine is stored under `src/engine/seating` and receives plain data as input.

Reason: generation and constraint evaluation should be independently testable and should not depend on UI state or persistence technology.

---

## Decision 014 — Treat historical preferences as weighted soft constraints

Room capacity and one-position-per-student are hard requirements. Avoiding previous partners, desks, and exact seats are weighted preferences.

Reason: historical combinations eventually make perfect avoidance impossible. Returning the best available candidate with a transparent violation report is more useful than failing generation.

---

## Decision 015 — Keep student candidate voting for a future release

The first planning-engine release generates one teacher preview at a time. Student voting across several candidates will be implemented as a separate feature with its own sessions, eligibility, deadlines, and vote records.

Reason: voting is an application workflow and authorization problem, not a seating constraint.

---

## Decision 016 — Compare objectives by priority, not a weighted total

Candidate arrangements are compared lexicographically: repeated partners first, repeated desks second, and repeated exact seats third.

Reason: a lower-priority improvement must not compensate for a repeated partnership. This mirrors the teacher's definition of fairness and avoids arbitrary public scores.

---

## Decision 017 — Recommend the best three distinct arrangements

The engine evaluates many candidates, removes duplicate arrangements, and returns the three strongest recommendations. The teacher previews and selects the final arrangement.

Reason: classroom knowledge cannot be fully represented in the algorithm. The engine supports teacher judgement rather than replacing it.

---

## Decision 018 — Treat Planning Engine philosophy as a version-review document

Before implementing or reviewing a Planning Engine version, contributors should review `PLANNING_ENGINE.md`, `PLANNING_ENGINE_ROADMAP.md`, and this decision log.

Reason: new objectives and workflows must remain aligned with fairness, explainability, and teacher control.
