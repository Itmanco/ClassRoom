
## 2026-07-30 — Seating Plan Management

- Added `seatingPlanService.js` for class-scoped seating-plan CRUD.
- Added manual seating assignment using active enrollments and room capacity.
- Added seating-plan editing, history display, and archiving.
- Added the Seating Plans navigation page.
- Removed legacy seating migration from the active roadmap because the old records were sandbox data.
# Changelog

## Building Management UI

- Added a school-scoped Building management page.
- Added real-time building listing, create/edit actions, and soft archive support.
- Added a Buildings navigation entry without changing existing classroom behavior.

## Domain Foundation Schema

- Defined required fields and validation rules for buildings, rooms, courses, classes, enrollments, and seating plans.
- Standardized stable readable IDs for coded domain entities.
- Added lifecycle metadata using `active`, `createdAt`, and `updatedAt`.
- Recorded the dependency order: Building → Room → Course → Class → Enrollment → Seating Plan.
- Revised the implementation sequence so real domain foundations precede the historical seating-plan migration.

## Domain Model Documentation

- Standardized the teaching-group collection name as `classes`.
- Defined schools, buildings, rooms, courses, classes, enrollments, and seating plans.
- Clarified that rooms are physical spaces and seating plans belong to classes.
- Recorded that legacy `classrooms` documents are historical seating plans.
- Revised the legacy seating-plan destination to `classes/legacy_class_2025/seatingPlans`.
- Preserved the current migration compatibility requirements.

## Student Migration

- Fixed the nested Firestore source path in the student migration script.
- Migrated 18 student documents to `schools/school_japan/students`.
- Preserved student document IDs.
- Verified that no legacy student IDs were missing.
- Confirmed the application runs correctly after migration.

## Earlier Migration Work

- Authentication uses `activeSchool`.
- Services renamed `appId` to `schoolId`.
- New school-based Firestore root created.
- Firestore rules updated.

## 2026-07-29 — Room management

- Added a school-scoped room service at `schools/{schoolId}/rooms/{roomId}`.
- Added real-time room listing, creation, editing, and archival.
- Added validation against the selected building and its configured floor count.
- Added a Room Management navigation page.

- Added Firestore-backed Course Management with create, edit, archive, and real-time updates.

## 2026-07-30 — Student Management CRUD

- Replaced the Student Management placeholder with a school-scoped CRUD page.
- Added create, edit, search, archive, active-status, and real-time update workflows.
- Preserved numeric student document IDs because historical seating plans reference them.
- Added automatic next-ID selection and duplicate-ID validation.
- Extended `studentService.js` with single-student save and archive operations.
- Updated `App.vue` to pass the active school into Student Management.

## Class Management
- Added school-scoped Class CRUD backed by `schools/{schoolId}/classes`.
- Added course and room selectors with real-time reference data.
- Added archive/reactivate-compatible class records and academic period validation.

## Enrollment Management
- Added class-scoped enrollment CRUD using student IDs as enrollment document IDs.
- Added real-time class, student, and enrollment listeners.
- Added enrollment archive/reactivation instead of destructive deletion.

## Intelligent seating generator

- Added a framework-independent seating planning engine.
- Added weighted historical constraints for previous partners, desks, and the most recent exact seat.
- Added rerunnable teacher previews without automatic persistence.
- Added best-effort scoring and readable unavoidable-conflict reports.
- Added `docs/SEATING_ENGINE.md`.

## 2026-07-31 — Planning Engine v1 recommendations

- Replaced weighted total scoring with priority-based candidate comparison.
- Made repeated desk partnerships the first optimization objective.
- Added generation and deduplication of the three strongest recommendations.
- Added teacher preview and selection before saving.
- Replaced the public numeric score with understandable objective counts and quality labels.
- Added `PLANNING_ENGINE.md` and `PLANNING_ENGINE_ROADMAP.md`.
- Kept student voting outside the engine as a future application workflow.
