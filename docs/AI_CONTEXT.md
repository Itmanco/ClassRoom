# AI Context

**Last verified against source:** 2026-09-06

## Project

Classroom Manager is a Vue 3 + Firebase school/classroom management application with multi-school context, English/Japanese UI, an explainable seating engine, classroom-style seating visualization, Excel export, and an increasingly strict Admin/security model.

Repository:

```text
Itmanco/ClassRoom
```

## Current architecture

```text
Authenticated User
├── users/{uid}
├── available school memberships
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

## Canonical identity and authorization

Firebase Authentication UID is canonical:

```text
users/{uid}
schools/{schoolId}/members/{uid}
```

Global authorization:

```text
users/{uid}.systemRole === "system-admin"
```

School authorization:

```text
schools/{schoolId}/members/{uid}.role
```

Membership roles:

```text
school-admin
teacher
student
```

`users/{uid}.role` is legacy and must not be used for authorization. Archived users have `users/{uid}.active === false` and are blocked from normal application access.

## Admin architecture

System Admin:

- Schools
- Users
- Activity Log
- System-role changes
- Global account archive/reactivate

School Admin:

- Users for the administered school
- Membership management for other users in that school
- Activity Log for the selected/authorized school
- No global Schools administration
- No System Admin role controls

School Admin user discovery uses callable `getSchoolUsers`; do not weaken `/users/{uid}` read rules to make the UI work.

## Privileged callable functions

Current exports in `functions/index.js`:

```text
createUser
getSchoolUsers
updateManagedUser
setManagedUserActive
setSystemRole
```

Important protections:

- inactive actor accounts are rejected
- School Admin scope is verified server-side for applicable calls
- School Admin cannot administer a target outside the requested school
- System Admin cannot change their own system role
- a System Admin cannot archive their own account
- the last active System Admin cannot be demoted or archived
- `createUser` rolls back the Auth account if later profile/membership creation fails

## Audit architecture

Collections:

```text
schools/{schoolId}/auditLogs/{logId}
systemAuditLogs/{logId}
```

Rule: **affected resource determines audit destination, not actor role**.

For a target user with memberships in School A/B/C:

```text
School A → user.updated / user.archived / user.reactivated
School B → same action
School C → same action
System  → no duplicate event
```

For a target user with zero memberships:

```text
systemAuditLogs → one event
```

`user.created` is school-scoped when a school is assigned and system-scoped when there is no school.

System Admin Activity Log combines only the selected school's events with system events. It intentionally does not load every school's log.

## Current Admin UX

`AdminUserManager.vue` currently supports:

- search/status filtering
- explicit Refresh action (EN `Refresh`, JA `更新`)
- profile editing (`firstName`, `lastName`, `displayName`, `language`)
- school membership badges and active/inactive membership state
- membership create/role/status/remove operations within authorization scope
- global account archive/reactivate for System Admin
- system-role management for System Admin

## Dashboard

`DashboardPage.vue` is the default page. It shows active counts for:

- students
- classes
- rooms
- courses

Recent Activity and Messages are placeholders only.

The old Classroom/Home components/services have been removed. Do not plan new work around `ClassroomPage.vue`, `MyClassroom.vue`, `StudentDesk.vue`, or `classroomService.js`.

## Teacher position values

```text
front-left
front-right
back-left
back-right
```

Older rooms fall back to `front-left`.

## Planning Engine

Location:

```text
src/engine/seating/
```

Priority:

1. Previous partners
2. Previous desks
3. Previous exact seats

Principle: **Recommend, don't decide.**

## Excel export

Location:

```text
src/services/seatingPlanExportService.js
```

Uses `ExcelJS` and exports saved plans with classroom geometry and print-oriented setup.

## Current security gap

Do not overstate Firestore authorization. Admin paths are role-aware, but several school-domain collections still allow read/write to any active user. Current next security work:

1. enforce `memberId == userUid` on membership creation
2. prevent membership `userUid` mutation
3. harden domain collection rules around active school membership/role
4. move remaining privileged membership mutation to trusted callable functions where appropriate
5. add automated regression tests/CI

## Emulator workflow

Always preserve the existing emulator dataset unless an empty emulator is explicitly intended:

```bash
cd ~/Projects/ClassRoom
firebase emulators:start \
  --only functions,auth,firestore \
  --import=./emulator-data \
  --export-on-exit=./emulator-data
```

`emulator-data/` and `emulator-data.zip` are ignored local artifacts and must not be committed.

## Development rules

- Work incrementally; avoid speculative rewrites.
- Do not weaken Firestore rules to solve UI access problems.
- Keep Firebase Auth UID canonical.
- Never use legacy `users/{uid}.role` for authorization.
- All new user-visible strings must have aligned EN/JA i18n keys.
- Do not claim a security/audit change is complete until it has been tested.
- Prefer exact file/function/current-code/replacement/test guidance when making code changes.
- Keep documentation synchronized as a full project state, not as disconnected update fragments.

## Immediate sequence

1. Finish the current Admin/security documentation checkpoint and commit the tested audit/account-lifecycle changes.
2. Enforce membership identity/immutability invariants.
3. Harden remaining school-domain Firestore rules.
4. Add automated regression coverage for critical authorization/audit flows.
5. Begin the Teachers module after the security boundary is stable.
