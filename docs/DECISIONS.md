# Architecture and Product Decisions

## D001 --- School-scoped domain data

**Decision:** Store school-owned data under `schools/{schoolId}`.

**Reason:** Prevent ambiguous ownership and prepare the application for
users who can access more than one school.

## D002 --- Keep school and class context separate

**Decision:** `schoolId` identifies organization context; `classId`
identifies the selected class workflow.

**Reason:** A class selection must never replace or imply school
authorization.

## D003 --- Membership-based school access

**Decision:** Firebase Authentication UID is the canonical identity. `users/{uid}.systemRole` controls system-wide privileges, while `schools/{schoolId}/members/{uid}` controls school access and the school-specific role. `activeSchool` remains user session/profile state.

**Status:** Implemented for UI/application context.

**Caveat:** This is not the final server-side authorization model.

## D004 --- Dedicated no-school state

**Decision:** An authenticated user with no assigned school sees
`NoSchoolPage.vue`.

**Reason:** Rendering school managers with a null/invalid school ID
creates confusing failures and accidental assumptions.

## D005 --- Class-owned enrollments and seating plans

**Decision:** Enrollments and seating plans live inside Class Workspace
rather than as primary top-level workflows.

**Reason:** Both require a selected class to be meaningful.

## D006 --- Archive instead of destructive deletion

**Decision:** Preserve referenced records using active/archive state.

**Reason:** Historical enrollment and seating-plan data must remain
understandable.

## D007 --- Framework-independent seating engine

**Decision:** Keep the recommendation algorithm under
`src/engine/seating/` independent from Vue/Firebase.

**Reason:** Improves testability, reuse, and separation of concerns.

## D008 --- Lexicographic seating objectives

**Decision:** Prioritize repeated partners, then repeated desks, then
repeated exact seats.

**Reason:** Higher-priority fairness goals should not be traded away by
a weighted aggregate score.

## D009 --- Recommend, don't decide

**Decision:** Generated seating arrangements remain teacher
recommendations.

**Reason:** Classroom context contains human factors that the current
data model cannot fully represent.

## D010 --- Internationalization at the presentation layer

**Decision:** Engine/services return structured/domain information;
components translate it.

**Reason:** Prevent language concerns from contaminating domain logic.

## D011 --- Browser language with persisted override

**Decision:** Use saved language first, otherwise browser language,
otherwise English.

**Reason:** Gives sensible first-load behavior while respecting explicit
user choice.

## D012 --- Room owns teacher position

**Decision:** Store teacher position on the room.

Supported values:

``` text
front-left
front-right
back-left
back-right
```

**Reason:** Teacher-desk placement is a physical room property and
should be reused by room preview, seating-plan display, and export.

## D013 --- Classroom-style seating visualization

**Decision:** Display seats grouped by physical desks, with a
whiteboard/front-of-room reference.

**Reason:** A seating plan is spatial information; a generic card/list
layout is less useful to teachers.

## D014 --- Excel export as a separate service

**Decision:** Generate `.xlsx` seating plans in
`seatingPlanExportService.js`.

**Reason:** Keeps print/export concerns out of Firestore persistence and
the recommendation engine.

## D015 --- Responsive sidebar

**Decision:** Navigation can collapse and should adapt automatically on
smaller screens.

**Reason:** Preserve usable classroom/seating workspace width.

## D016 --- Retire legacy Classroom page

**Decision:** Do not continue expanding `ClassroomPage.vue`.

**Target:** Replace it with a Dashboard/Home page containing useful
summaries and, later, messages/activity.

**Reason:** Modern domain workflows have superseded the original page
architecture.

## D017 --- Controlled modernization

**Decision:** Avoid forced dependency upgrades during feature work.

**Reason:** Vue CLI and older dependency chains can produce breaking
changes. Modernization should occur on a dedicated branch with
regression testing.


## D014 --- Privileged account creation uses Cloud Functions

**Decision:** Firebase Authentication users are created by a callable Cloud Function, not directly by the Vue client.

**Reason:** Creating and administering other Auth users requires trusted server-side Firebase Admin SDK privileges. The generated Auth UID is reused for the profile and membership documents.

## D015 --- Emulator-first privileged development

**Decision:** User administration and other privileged Firebase operations are tested with the Authentication, Firestore, and Functions emulators before production deployment.

**Reason:** This prevents development mistakes from corrupting production identities or Firestore data and allows Cloud Functions work before Blaze is intentionally enabled.

## 2026-09-01 — Audit scope follows the affected resource

**Decision:** Audit scope is determined by the affected resource, not by the actor's privilege level.

A user created with a school membership produces one school-scoped `user.created` event under `schools/{schoolId}/auditLogs/{logId}`. A user created without a school produces one system-scoped event under `systemAuditLogs/{logId}`.

For System Admin, Activity Log remains selected-school aware: **All** combines the selected school's events with system events, **School** shows only the selected school's events, and **System** shows only system events.

**Reason:** This keeps school history visible to the relevant School Admin without duplicating the same event into multiple audit scopes.

## 2026-09-01 — Protect administrators from self-removing critical access

**Decision:** School Admin cannot change, deactivate, or remove their own school membership. System Admin cannot change their own `systemRole`.

**Reason:** Prevent accidental administrative lockout. UI protection improves usability, while Firestore rules/backend validation remain the security boundary.

## 2026-09-01 — School Admin user discovery remains scoped

**Decision:** Do not grant School Admin broad direct-read access to other `/users/{uid}` documents. Use the privileged school-scoped backend to return only the user fields needed by Admin Users.

**Reason:** School administration requires identity information without granting client-side access to the global user collection.
