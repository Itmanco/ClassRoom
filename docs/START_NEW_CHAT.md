# Start a New Chat

Use this as a compact handoff for continuing Classroom Manager
development.

## Project

Classroom Manager --- Vue 3, Firebase Authentication, Cloud Firestore,
Vue I18n, `xlsx-js-style`, GitHub Pages.

Repository:

``` text
Itmanco/ClassRoom
```

## Current hierarchy

``` text
User
└── Active School
    ├── Students
    ├── Courses
    ├── Buildings
    ├── Rooms
    └── Classes
        └── Class Workspace
            ├── Overview
            ├── Students
            └── Seating Plans
```

## Recent completed work

-   Multi-school profile/context
-   School selector
-   No-school state
-   Responsive sidebar
-   Browser-language initialization
-   Room teacher position
-   Room preview
-   Classroom-style seating-plan layout
-   Excel seating-plan export
-   Full documentation refresh

## Room teacher positions

``` text
front-left
front-right
back-left
back-right
```

Older rooms fall back to `front-left`.

## Seating engine

Current historical priority:

1.  Avoid previous partners
2.  Avoid previous desks
3.  Avoid previous exact seats

The engine recommends; the teacher decides.

## Legacy status

`ClassroomPage.vue` is still present but is scheduled for removal. Do
not build new long-term functionality into it.

Also verify/remove when safe:

``` text
MyClassroom.vue
StudentDesk.vue
classroomService.js
```

## Next work

1.  Run final lint/build.
2.  Commit documentation/export milestone.
3.  Deploy to GitHub Pages.
4.  Verify public demo.
5.  Build Dashboard/Home page.
6.  Remove legacy Classroom code.

Future Dashboard ideas:

-   School summary
-   Recent class activity
-   Recent seating plans
-   Messages/announcements

## Commands

``` bash
npm run lint
npm run build
npm run deploy
```

## Security

Never commit:

``` text
serviceAccountKey.json
school-structure.json
```

Avoid forced dependency upgrades without a dedicated modernization
branch and regression testing.


## 2026-08-23 admin/auth update

- Firebase Auth UID is the canonical user ID.
- `users/{uid}.systemRole` represents system-wide privilege (`system-admin` or null).
- `schools/{schoolId}/members/{uid}` represents school access and role (`school-admin`, `teacher`, `student`) plus `active`.
- Admin user creation is implemented through callable Cloud Function `createUser`.
- Local development uses Authentication, Firestore, and Functions emulators together to avoid modifying production data.
- Production Functions deployment requires Blaze and must follow `FIREBASE_BILLING_RUNBOOK.md`.
- Next authorization work: complete role capability enforcement and account deactivate/reactivate behavior.

## Latest checkpoint — 2026-09-01

School Admin authorization is implemented and emulator-tested through cross-school isolation and Teacher regression.

Before Admin badges/search, prioritize:

1. Enforce membership identity (`memberId == userUid`).
2. Prevent membership `userUid` mutation.
3. Harden the remaining domain-collection Firestore rules.
4. Improve `createUser` rollback cleanup.

Do not weaken `/users` reads to make School Admin UI work. Audit scope follows the affected resource, and System Admin Activity Log intentionally combines the selected school's logs with system logs.
