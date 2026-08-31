# AI Context

## Project

Classroom Manager is a Vue 3 + Firebase school/classroom management
application with multi-school context, bilingual UI, an explainable
seating engine, classroom-style seating visualization, and Excel
seating-plan export.

Repository:

``` text
Itmanco/ClassRoom
```

## Current architecture

``` text
Authenticated User
└── Available Schools
    └── Active School
        ├── Students
        ├── Courses
        ├── Buildings
        ├── Rooms
        └── Classes
            └── Class Workspace
                ├── Overview
                ├── Students / Enrollments
                └── Seating Plans
```

## Important current features

-   Firebase Authentication
-   User profiles
-   `schools[]` + `activeSchool`
-   School selector
-   No-school state
-   Responsive sidebar
-   Room teacher position
-   Room preview
-   Seating recommendation engine
-   Classroom-style seating layout
-   `.xlsx` seating-plan export
-   English/Japanese locale system
-   Browser-language initialization

## Teacher position values

``` text
front-left
front-right
back-left
back-right
```

Default/fallback for older rooms:

``` text
front-left
```

## Planning Engine

Location:

``` text
src/engine/seating/
```

Priority:

1.  Previous partners
2.  Previous desks
3.  Previous exact seats

Principle:

> Recommend, don't decide.

## Excel export

Location:

``` text
src/services/seatingPlanExportService.js
```

Uses:

``` text
xlsx-js-style
```

Exports saved plans using classroom geometry.

## Legacy code

Still present temporarily:

``` text
ClassroomPage.vue
MyClassroom.vue
StudentDesk.vue
classroomService.js
```

Do not expand the legacy page. Next structural work is Dashboard/Home
replacement and safe legacy removal.

## Development rules

-   Explain architecture changes before large edits.
-   Prefer small commits.
-   Run lint/build at checkpoints.
-   Preserve historical references.
-   Keep school/class context separate.
-   Do not hardcode new user-facing strings unnecessarily.
-   Keep engine independent from Vue/Firebase/i18n.
-   Never commit `serviceAccountKey.json`.
-   Never commit `school-structure.json`.
-   Avoid `npm audit fix --force` during normal feature work.
-   Treat current source code as the final authority when docs disagree.

## Immediate sequence

1.  Finish documentation checkpoint.
2.  Run lint/build.
3.  Commit and push.
4.  Deploy to GitHub Pages.
5.  Verify live build.
6.  Create Dashboard.
7.  Remove legacy Classroom code safely.


## 2026-08-23 admin/auth update

- Firebase Auth UID is the canonical user ID.
- `users/{uid}.systemRole` represents system-wide privilege (`system-admin` or null).
- `schools/{schoolId}/members/{uid}` represents school access and role (`school-admin`, `teacher`, `student`) plus `active`.
- Admin user creation is implemented through callable Cloud Function `createUser`.
- Local development uses Authentication, Firestore, and Functions emulators together to avoid modifying production data.
- Production Functions deployment requires Blaze and must follow `FIREBASE_BILLING_RUNBOOK.md`.
- Next authorization work: complete role capability enforcement and account deactivate/reactivate behavior.

## Admin authorization checkpoint — 2026-09-01

- Firebase Auth UID is canonical across Auth, `users/{uid}`, and `schools/{schoolId}/members/{uid}`.
- `users/{uid}.systemRole == "system-admin"` grants global administration.
- Active `school-admin` membership grants Admin access only for that school.
- School Admin can create users in the school and manage other memberships there.
- School Admin cannot change, deactivate, or remove their own membership.
- System Admin cannot change their own system role.
- School Admin user loading must not be solved by weakening `/users` reads; use the scoped privileged backend.
- Audit scope follows the affected resource: school user creation is school-scoped; no-school creation is system-scoped.
- System Admin Activity Log intentionally uses selected school + system logs, not every school's logs.
- Emulator E2E regression coverage passed through cross-school isolation and Teacher regression.
- Next security work: membership identity/immutability invariants, broader domain Firestore rules, and `createUser` rollback robustness.
