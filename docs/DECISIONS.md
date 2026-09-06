# Architecture and Product Decisions

This file records durable decisions. Completed implementation history belongs in `CHANGELOG.md`; temporary work items belong in `TODO.md`.

## D001 — School-scoped domain data

**Decision:** School-owned data lives below `schools/{schoolId}`.

**Reason:** Prevent accidental cross-school mixing and keep ownership explicit.

## D002 — Keep school and class context separate

**Decision:** `schoolId` identifies organization context; `classId` identifies the selected class workspace.

**Reason:** Class workflows should not leak across school changes.

## D003 — Membership-based school access

**Decision:** Firebase Auth UID is canonical. `users/{uid}.systemRole` controls system-wide privilege; `schools/{schoolId}/members/{uid}` controls school access/role. `activeSchool` is preference/session state, not authorization.

**Reason:** System privilege and school membership are different concerns.

## D004 — Dedicated no-school state

**Decision:** An authenticated, active non-System-Admin user with no available school sees `NoSchoolPage.vue`.

**Reason:** Rendering school managers with null/invalid context is unsafe and confusing.

## D005 — Class-owned enrollments and seating plans

**Decision:** Enrollments and seating plans live inside Class Workspace rather than primary top-level navigation.

**Reason:** Both require selected class context.

## D006 — Archive instead of destructive deletion

**Decision:** Preserve historically referenced records using active/archive state where appropriate.

**Reason:** Historical enrollment/seating/audit context must remain understandable.

## D007 — Framework-independent seating engine

**Decision:** Keep recommendation logic under `src/engine/seating/` independent from Vue/Firebase.

**Reason:** Testability, reuse, and separation of concerns.

## D008 — Lexicographic seating objectives

**Decision:** Prioritize repeated partners, then repeated desks, then repeated exact seats.

**Reason:** Higher-priority fairness goals should not be traded away by a weighted aggregate.

## D009 — Recommend, don't decide

**Decision:** Generated seating arrangements are recommendations; teachers retain final control.

**Reason:** Classroom context contains human factors outside the current model.

## D010 — Internationalization at the presentation layer

**Decision:** Engine/services return structured/domain information; components translate it through Vue I18n.

**Reason:** Keep language concerns out of domain logic.

## D011 — Browser language with persisted override

**Decision:** Saved language first, browser language second, English fallback.

**Reason:** Sensible first load plus respect for explicit choice.

## D012 — Room owns teacher position

**Decision:** Store teacher position on the room using `front-left`, `front-right`, `back-left`, or `back-right`.

**Reason:** Teacher-desk placement is a reusable physical room property.

## D013 — Classroom-style seating visualization

**Decision:** Display seats grouped by physical desks with whiteboard/front-of-room context.

**Reason:** Seating is spatial information.

## D014 — Excel export as a separate service

**Decision:** Generate `.xlsx` seating plans in `seatingPlanExportService.js`.

**Reason:** Keep export formatting outside Firestore persistence and recommendation logic.

## D015 — Responsive sidebar

**Decision:** Navigation can collapse and adapt on smaller screens.

**Reason:** Preserve usable classroom/seating workspace width.

## D016 — Replace legacy Classroom page with Dashboard

**Decision:** Retire the original Classroom/Home implementation and use `DashboardPage.vue` as the default home page.

**Status:** Implemented; the old Classroom page/components/service are removed.

**Reason:** Modern domain workflows superseded the original mixed-concern page.

## D017 — Controlled modernization

**Decision:** Avoid forced dependency upgrades during feature work.

**Reason:** Toolchain modernization should be isolated and regression-tested.

## D018 — Privileged account creation uses Cloud Functions

**Decision:** Creating another Firebase Authentication user is a callable Cloud Function operation, not a Vue-client Admin SDK operation.

**Reason:** Cross-account Auth administration requires trusted server privileges. The generated Auth UID is reused for the profile/membership documents.

## D019 — Emulator-first privileged development

**Decision:** Privileged Firebase operations are tested with Auth/Firestore/Functions emulators before production deployment, preserving the existing emulator dataset by default.

**Reason:** Protect production identities/data and allow backend development without enabling Blaze.

## D020 — Audit scope follows the affected resource

**Decision:** Audit destination is determined by affected resource scope, not by the actor role.

Examples:

- school resource → that school's audit log
- no-school/system-only user resource → system audit log
- user update/archive/reactivate with memberships A/B/C → one event in A, B, C and no system duplicate

**Reason:** Relevant School Admins need local history, while duplicate System copies make scope ambiguous and noisy.

## D021 — System Admin Activity Log is selected-school aware

**Decision:** System Admin “All” combines system events with the currently selected school's events; it does not aggregate every school's audit history.

**Reason:** Preserve active-school context and avoid unbounded cross-school aggregation.

## D022 — Protect administrators from self-removing critical access

**Decision:** School Admin cannot change/deactivate/remove their own membership. System Admin cannot change their own system role or archive their own account. The last active System Admin cannot be demoted or archived.

**Reason:** Prevent accidental administrative lockout. Backend/rule enforcement is required in addition to UI affordances.

## D023 — School Admin user discovery remains scoped

**Decision:** Do not grant School Admin broad direct read access to other `/users/{uid}` documents. Use the privileged `getSchoolUsers` backend for the authorized school.

**Reason:** School administration needs selected identity fields without exposing the global user collection.

## D024 — Managed user profile edits use an explicit whitelist

**Decision:** `updateManagedUser` accepts only `firstName`, `lastName`, `displayName`, and `language`.

**Reason:** Profile editing must not become a path for changing email, system role, account status, legacy roles, or membership authorization.

## D025 — Global user archive is separate from school membership status

**Decision:** `users/{uid}.active` controls global account access; `members/{uid}.active` controls access to a specific school. Archiving the user is System-Admin-only and does not replace membership lifecycle management.

**Reason:** Account lifecycle and school membership lifecycle have different scopes and consequences.

## D026 — Do not claim school-domain authorization is complete until rules are membership-aware

**Decision:** The project explicitly treats broad `isActiveUser()` rules on school-owned collections as unfinished security work.

**Reason:** Admin UI checks and canonical memberships do not by themselves prevent cross-school domain reads/writes.
