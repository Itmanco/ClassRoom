# Start a New Chat

Use this as the current handoff for continuing Classroom Manager development.

**Last verified against source:** 2026-09-06

## Project

Classroom Manager — Vue 3, Firebase Authentication, Cloud Firestore, callable Cloud Functions, Vue I18n, `ExcelJS`, GitHub Pages.

Repository:

```text
Itmanco/ClassRoom
```

Current working branch during the Admin/audit checkpoint:

```text
feature/audit-log
```

Always run `git status` at the start of a new session because the latest tested Admin/audit changes may still be local until committed.

## Current hierarchy

```text
Authenticated User
└── Active School
    ├── Dashboard
    ├── Students
    ├── Courses
    ├── Buildings
    ├── Rooms
    ├── Classes
    │   └── Class Workspace
    │       ├── Overview
    │       ├── Students / Enrollments
    │       └── Seating Plans
    └── Admin (authorized roles only)
```

## Identity and roles

Firebase Authentication UID is canonical:

```text
users/{uid} = schools/{schoolId}/members/{uid}
```

Global privilege:

```text
users/{uid}.systemRole === "system-admin"
```

School role:

```text
schools/{schoolId}/members/{uid}.role
```

Allowed membership roles:

```text
school-admin
teacher
student
```

Never use legacy `users/{uid}.role` as an authorization fallback. `users/{uid}.active === false` blocks normal application access.

## Admin architecture

System Admin:

- Schools
- Users
- Activity Log
- global account archive/reactivate
- system-role management

School Admin:

- Users for the school they administer
- other users' membership management in that school
- school Activity Log
- no global Schools administration
- no System Admin role controls

Self-protection/current invariants:

- School Admin cannot change/deactivate/remove their own membership
- System Admin cannot change their own system role
- System Admin cannot archive their own account
- final active System Admin cannot be demoted or archived

## Callable Functions

```text
createUser
getSchoolUsers
updateManagedUser
setManagedUserActive
setSystemRole
```

`updateManagedUser` edits only whitelisted profile fields (`firstName`, `lastName`, `displayName`, `language`).

## Audit architecture

Collections:

```text
schools/{schoolId}/auditLogs/{logId}
systemAuditLogs/{logId}
```

The affected resource determines the destination.

For `user.updated`, `user.archived`, and `user.reactivated`:

```text
Target has School A/B/C memberships
→ A audit log
→ B audit log
→ C audit log
→ no system duplicate

Target has zero memberships
→ one systemAuditLogs event
```

This behavior has been tested in both membership and zero-membership cases.

The System Admin Activity Log intentionally combines only the selected school + system events.

## Recent completed work

- Dashboard is the default page; legacy Classroom/Home code is removed
- Admin user profile editing
- translated audit field labels
- archive/reactivate users
- archived-account access blocking
- canonical membership authorization cleanup
- last active System Admin protection
- School Admin scoping and self-membership protection
- membership badges and inactive-state display
- EN/JA Admin UI
- Refresh button in Admin Users (EN `Refresh`, JA `更新`)
- multi-school audit distribution for `user.updated`, `user.archived`, `user.reactivated`
- zero-membership system audit fallback
- emulator regression tests for these Admin/audit flows

## Next work

Prioritize security boundary completion before Teachers:

1. Enforce membership document ID == `userUid` on creation.
2. Prevent `userUid` mutation.
3. Harden students/buildings/rooms/courses/classes/enrollments/seatingPlans Firestore rules around active school membership/role.
4. Review which remaining membership mutations should move from client writes to callable Functions.
5. Add automated regression coverage/CI for critical authorization/audit paths.
6. Begin Teachers module.

Do not weaken `/users` reads to make School Admin UI work.

## Seating engine

Current historical priority:

1. Avoid previous partners
2. Avoid previous desks
3. Avoid previous exact seats

Teacher position values:

```text
front-left
front-right
back-left
back-right
```

The engine recommends; the teacher decides.

## Commands

Standard checks:

```bash
cd ~/Projects/ClassRoom
git status
npm run lint
npm run build
```

Start the emulator with existing data:

```bash
firebase emulators:start \
  --only functions,auth,firestore \
  --import=./emulator-data \
  --export-on-exit=./emulator-data
```

Never start this project's emulator without `--import=./emulator-data` unless an intentionally empty emulator is required.

## Security / local artifacts

Never commit:

```text
serviceAccountKey.json
school-structure.json
emulator-data/
emulator-data.zip
```

Avoid forced dependency upgrades without a dedicated modernization branch and regression testing.
