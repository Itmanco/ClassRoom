# Changelog

This changelog records major project milestones rather than every individual commit.

## 2026-09-06 — User lifecycle, audit distribution, Dashboard/documentation checkpoint

- Added Admin user profile editing through callable `updateManagedUser` with an explicit field whitelist.
- Added `user.updated` Activity Log events with changed fields and before/after values.
- Added translated EN/JA audit field labels for editable user profile fields.
- Added global user archive/reactivate through callable `setManagedUserActive`.
- Added application-level blocking for `users/{uid}.active === false` accounts.
- Added protection against self-archive and against archiving/demoting the final active System Admin.
- Corrected `user.updated`, `user.archived`, and `user.reactivated` audit distribution: one event per target-user school membership, no duplicate system event when memberships exist, and one system fallback when none exist.
- Added an explicit Refresh action to Admin Users in English/Japanese.
- Verified the membership and zero-membership audit paths in the local Firebase emulators; lint passed after the changes.
- Confirmed Dashboard is the default page and the old Classroom/Home implementation has been removed.
- Refreshed the complete documentation set against the current source tree.

## 2026-09-01 — School Admin authorization and membership management

- Added school-scoped Admin access for active `school-admin` memberships.
- Added School Admin user creation restricted to the administered school.
- Added School Admin membership role changes, deactivation, reactivation, and removal.
- Added UI and Firestore-rule protection preventing School Admins from changing, deactivating, or removing their own school membership.
- Added backend protection preventing a System Admin from changing their own system role.
- Added scoped School Admin user discovery without broad client reads of other `/users/{uid}` profiles.
- Scoped `user.created` audit events to the affected school when a school is assigned; no-school user creation remains system-scoped.
- Added membership deactivation/reactivation audit coverage.
- Completed emulator E2E regression coverage through cross-school isolation and Teacher regression.

## 2026-08-23 — Admin identity, memberships, and local Firebase emulators

- Added system-level `system-admin` administration.
- Added school membership documents at `schools/{schoolId}/members/{uid}` with `school-admin`, `teacher`, and `student` roles.
- Added Admin School and Admin User management interfaces with English/Japanese translations.
- Added callable `createUser` Cloud Function using Firebase Admin SDK.
- Standardized Firebase Authentication UID as the canonical identifier for Auth, user profiles, and memberships.
- Added local Authentication, Firestore, and Functions emulator workflow for isolated privileged development.
- Added Firebase billing runbook; production Functions deployment remains intentionally separate from local development.

## August 2026 — School/classroom foundation

### Added

- Multi-school application context and school selector
- Dedicated no-school state
- Responsive/collapsible navigation
- User profile improvements
- Room teacher-position configuration and room preview
- Classroom-style seating-plan visualization
- Physical desk grouping by seats-per-desk
- Whiteboard/front-of-room representation
- Excel (`.xlsx`) seating-plan export
- Print-oriented Excel layout and filename generation
- Dashboard with school summary cards

### Changed

- Browser language initializes Japanese for Japanese browser locale and English otherwise unless a saved locale exists.
- School/class context resets more safely when navigation context changes.
- Seating-plan presentation became spatial/classroom-oriented.
- Legacy Classroom/Home components/services were removed after Dashboard replacement.

## Previous milestone — Class Workspace

- Added `ClassWorkspace.vue` with Overview, EnrollmentManager, and SeatingPlanManager.
- Moved enrollment and seating-plan workflows under selected class context.
- Preserved Classes as the navigation context while the workspace is open.

## Previous milestone — Internationalization

- Added Vue I18n
- Added English/Japanese catalogs
- Added language selector/settings and locale persistence
- Localized modern management workflows

## Previous milestone — Planning Engine v1

- Added framework-independent seating engine
- Added historical partner/desk/seat constraints
- Added multiple candidate generation
- Added structured violations and candidate selection

## Previous milestone — School domain migration

- Introduced school-scoped Firestore structure
- Added buildings, rooms, courses, classes, enrollments, and seating plans
- Migrated student data toward school ownership
