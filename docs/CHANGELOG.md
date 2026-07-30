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
