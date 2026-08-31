# Project Context

## Product

Classroom Manager is a school-management and classroom-planning
application built with Vue 3 and Firebase.

The current product combines two concerns:

1.  Structured school/class data management.
2.  Explainable seating-plan creation that keeps the teacher in control.

## Current hierarchy

``` text
Authenticated User
└── Available Schools
    └── Active School
        ├── Students
        ├── Courses
        ├── Buildings
        ├── Rooms
        └── Classes
            └── Selected Class Workspace
                ├── Overview
                ├── Students / Enrollments
                └── Seating Plans
```

## Current application state

Implemented:

-   Firebase Authentication
-   User profiles
-   Browser-restored authentication session
-   Multi-school profile data
-   Available-school loading
-   Active-school selector
-   No-school state
-   Student Management
-   Course Management
-   Building Management
-   Room Management
-   Configurable teacher position
-   Room preview
-   Class Management
-   Class Workspace
-   Enrollment Management
-   Seating Plan Management
-   Intelligent Seating Planner
-   Classroom-style seating visualization
-   Excel seating-plan export
-   English/Japanese i18n
-   Browser-language initialization
-   Responsive/collapsible navigation
-   GitHub Pages deployment tooling

Transitional:

-   `ClassroomPage.vue` remains in the source tree.
-   Legacy `MyClassroom.vue`, `StudentDesk.vue`, and
    `classroomService.js` remain.
-   The legacy Classroom page is planned for removal rather than further
    feature development.

Planned:

-   Dashboard/Home replacement
-   Activity summaries
-   Messages/announcements
-   Stronger roles and school-membership authorization
-   Localized validation
-   Automated testing
-   CI
-   Further performance/toolchain modernization

## Navigation

The current application still exposes the legacy Classroom destination
while the replacement Dashboard is pending.

Long-term top-level direction:

``` text
Dashboard
Students
Courses
Buildings
Rooms
Classes
Settings
Profile
```

Enrollments and Seating Plans are class-owned workflows and are
intentionally accessed from the Class Workspace.

## Design philosophy

-   Prefer domain-oriented workflows over a flat CRUD menu.
-   Keep `schoolId` and `classId` explicit.
-   Clear class state when school context changes.
-   Preserve stable IDs and historical references.
-   Archive referenced records instead of deleting them.
-   Keep Firestore logic in services.
-   Keep the seating engine framework-independent.
-   Keep translation concerns out of the engine.
-   Let teachers make final seating decisions.
-   Make changes in small, reviewable commits.


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
