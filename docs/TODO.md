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

-   [ ] Formalize membership documents or equivalent authorization model
-   [ ] Define role permissions
-   [ ] Update Firestore security rules
-   [ ] Test user with one school
-   [ ] Test user with multiple schools
-   [ ] Test user with no schools
-   [ ] Test invalid/removed active school
-   [ ] Test cross-school access rejection

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
