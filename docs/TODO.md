# TODO

This file contains actionable work. Completed milestone history belongs
in `CHANGELOG.md`; long-term direction belongs in `ROADMAP.md`.

## Current release checkpoint

-   [ ] Export a final seating-plan workbook and inspect print preview
-   [ ] Run `npm run lint`
-   [ ] Run `npm run build`
-   [ ] Confirm only accepted legacy warnings remain
-   [ ] Review `git diff`
-   [ ] Commit Excel/documentation milestone
-   [ ] Push `main`
-   [ ] Run GitHub Pages deployment
-   [ ] Verify live application

## Dashboard migration

-   [ ] Create Dashboard/Home page
-   [ ] Change default page from legacy Classroom to Dashboard
-   [ ] Update navigation label/icon
-   [ ] Add useful school-level summary
-   [ ] Add recent class/seating-plan activity
-   [ ] Add messages/announcements placeholder only when useful
-   [ ] Remove `ClassroomPage.vue`
-   [ ] Remove `MyClassroom.vue` if no longer referenced
-   [ ] Remove `StudentDesk.vue` if no longer referenced
-   [ ] Remove `classroomService.js` if no longer referenced
-   [ ] Remove resulting legacy lint warnings

## Multi-school/security

-   [x] Formalize membership documents (`schools/{schoolId}/members/{uid}`)
-   [x] Implement System Admin administration foundation
-   [x] Implement School Admin scoped user/membership administration
-   [x] Protect School Admin from changing/deactivating/removing own membership
-   [x] Protect System Admin from changing own system role
-   [x] Test user with one school using local emulators
-   [x] Test cross-school Admin access rejection
-   [x] Regression-test Teacher access after Admin authorization changes
-   [ ] Enforce `memberId == userUid` on membership creation
-   [ ] Prevent membership `userUid` changes
-   [ ] Finish role permissions for non-Admin domain operations
-   [ ] Harden Firestore rules for students/buildings/rooms/courses/classes/enrollments/seatingPlans
-   [ ] Test user with multiple schools
-   [ ] Test user with no schools
-   [ ] Test invalid/removed active school

## Internationalization

-   [ ] Friendly localized Firebase auth errors
-   [ ] Review validation behavior
-   [ ] Localize Excel export labels
-   [ ] Final Japanese terminology pass
-   [ ] Add bilingual screenshots

## Planning Engine

-   [ ] Unit tests for constraints
-   [ ] Comparator tests
-   [ ] Candidate uniqueness tests
-   [ ] Seeded generation for deterministic tests
-   [ ] Capacity/empty-history edge cases
-   [ ] Plan v2 constraints only after tests

## Engineering

-   [ ] Reduce production console noise
-   [ ] Add test framework
-   [ ] Add CI
-   [ ] Lazy-load major pages
-   [ ] Review bundle size
-   [ ] Review Node LTS/toolchain compatibility
-   [ ] Audit dependencies without forced upgrades
-   [ ] Evaluate Vite migration separately

## Admin / Firebase Functions

-   [x] Configure Firebase Functions codebase
-   [x] Implement callable `createUser`
-   [x] Configure Authentication, Firestore, and Functions emulators
-   [x] Create and log in with a locally created school admin
-   [ ] Add account deactivate/reactivate operation
-   [ ] Complete role-aware UI permissions
-   [ ] Review production Firestore rules before Functions deployment
-   [ ] Enable Blaze only when production Cloud Functions are required; follow `FIREBASE_BILLING_RUNBOOK.md`
