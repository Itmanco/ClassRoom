# Architecture

**Last verified against source:** 2026-09-06

## Overview

Classroom Manager uses a Vue 3 frontend, Firebase Authentication, Cloud Firestore, callable Cloud Functions for privileged account operations, a domain service layer, a framework-independent seating engine, and a client-side Excel export service.

```text
App.vue
├── auth/session/account state
├── available schools + active school
├── top-level navigation
├── selected class
└── pages
    ├── Dashboard
    ├── domain managers
    ├── Class Workspace
    └── Admin
         │
         ├── client services ────── Firestore
         ├── callable Functions ─── Admin SDK / privileged writes
         ├── seating engine ─────── pure JS
         └── XLSX export ────────── client-side workbook generation
```

## Application session

`App.vue` owns application-level session/navigation state. Conceptually:

```js
session = {
  firebaseUser: null,
  profile: null,
  schools: [],
  activeSchool: null,
  membership: null,
  initialized: false
}
```

`currentPage` defaults to `dashboard`; `selectedClassId` is cleared when leaving class context or changing schools.

## Authentication and account state

Firebase Authentication answers “who is signed in?”. Firestore profile/account state and memberships answer “what may this user access?”.

On auth-state change:

1. Load `users/{uid}`.
2. If `profile.active === false`, stop normal initialization and show the inactive-account view.
3. Determine System Admin status from `profile.systemRole`.
4. Resolve available schools/memberships.
5. Validate/fallback `activeSchool`.
6. Resolve the active membership for non-System-Admin users.
7. Render Dashboard/domain content, Admin content when authorized, or `NoSchoolPage` when appropriate.

Authentication and authorization are intentionally separate.

## Canonical identity

Firebase Authentication UID is the canonical identity:

```text
Firebase Auth uid
├── users/{uid}
└── schools/{schoolId}/members/{uid}
```

Legacy `users/{uid}.role` and profile school-list fields must not be used as authorization fallbacks.

## Multi-school context

School access for normal users is membership-driven.

```text
users/{uid}
├── activeSchool
├── systemRole
└── active

schools/{schoolId}/members/{uid}
├── userUid
├── role
└── active
```

Membership roles:

```text
school-admin
teacher
student
```

`SchoolSelector.vue` changes the active school. For a non-System-Admin user, the target school must have a corresponding active membership. Changing schools resets selected class state and returns to Dashboard.

System Admin has global school administration and can observe active schools independently of a school membership. The implementation still contains limited legacy profile-school compatibility during initial loading; that compatibility is not an authorization model.

## Dashboard

`DashboardPage.vue` is the default modern home page.

It subscribes to current-school students, classes, rooms, and courses and displays active counts. Recent Activity and Messages sections currently exist as placeholders and intentionally do not load real activity/message data yet.

The former `ClassroomPage.vue`, `MyClassroom.vue`, `StudentDesk.vue`, and `classroomService.js` are no longer present in the source tree.

## Administrative authorization

### System Admin

A user is a System Admin when the profile is active and:

```text
users/{uid}.systemRole == "system-admin"
```

System Admin can access:

```text
Admin
├── Schools
├── Users
└── Activity Log
```

System Admin-only account operations include system-role changes and global user archive/reactivate.

### School Admin

A user is a School Admin for the active school when the user profile is active and the active membership is active with:

```text
role == "school-admin"
```

School Admin can access:

```text
Admin
├── Users (scoped)
└── Activity Log (school scope)
```

School Admin cannot access global Schools administration or System Admin controls.

`getSchoolUsers` is the scoped backend discovery path. Do not grant broad direct `/users` reads to make School Admin UI work.

### Self-lockout protections

Current protections include:

- School Admin cannot change, deactivate, or remove their own membership.
- System Admin cannot change their own system role.
- System Admin cannot archive their own account.
- The final active System Admin cannot be demoted or archived.

UI checks improve UX, but trusted backend validation / Firestore rules are the security boundary.

## Privileged callable Functions

Current `functions/index.js` exports:

```text
createUser
getSchoolUsers
updateManagedUser
setManagedUserActive
setSystemRole
```

### `createUser`

Creates a Firebase Auth account, then reuses the UID for `users/{uid}` and optional `schools/{schoolId}/members/{uid}`. If the later Firestore work fails after Auth creation, the function attempts to delete the Auth user as rollback cleanup.

School Admin creation is restricted to an administered school; no-school/global creation requires System Admin.

### `getSchoolUsers`

Returns the user data needed by the School Admin interface for members of one authorized school without broad client reads of the global user collection.

### `updateManagedUser`

Allows only whitelisted profile fields:

```text
firstName
lastName
displayName
language
```

A School Admin must identify and administer the school and the target must be an active member of that school. A System Admin may call without a school ID.

### `setManagedUserActive`

System-Admin-only global account archive/reactivate operation. It prevents self-archive and archiving the final active System Admin.

### `setSystemRole`

System-Admin-only system-role change with self-change and last-active-System-Admin protection.

## Audit architecture

Collections:

```text
schools/{schoolId}/auditLogs/{logId}
systemAuditLogs/{logId}
```

Durable rule: **audit destination is determined by the affected resource, not the actor**.

### User update/status distribution

For `user.updated`, `user.archived`, and `user.reactivated`, the function discovers all current membership documents for the target user.

```text
Target memberships: School A, B, C
├── School A / auditLogs / event
├── School B / auditLogs / event
├── School C / auditLogs / event
└── no system duplicate
```

If the target has zero memberships:

```text
systemAuditLogs / event
```

`user.created` is school-scoped when an initial school is assigned and system-scoped when no school is assigned.

### Activity Log read behavior

School Admin sees the selected authorized school's audit history.

System Admin Activity Log loads:

- selected school's audit history
- system audit history

and merges/sorts those results. It intentionally does not aggregate all schools in one request/view.

## Firestore rule boundary

Current rules correctly enforce important identity/Admin behaviors such as:

- active profile checks for admin helpers
- System Admin global privilege
- School Admin membership requirement for Admin membership paths
- self-membership protection
- System audit immutability/client-write denial
- school audit immutability
- scoped membership collection-group reads

However, several school-owned domain collections (`students`, `buildings`, `rooms`, `courses`, `classes`, enrollments, seating plans) currently allow read/write to any active user. This is a known security gap. The target architecture requires appropriate active school membership/role.

Membership creation/update rules also still need explicit identity invariants (`memberId == userUid`, immutable `userUid`).

## Class context and Class Workspace

```text
Classes
→ Manage Class
→ selectedClassId
→ ClassWorkspace
```

`ClassWorkspace.vue` composes:

```text
ClassWorkspace
├── Overview
├── EnrollmentManager
└── SeatingPlanManager
```

Leaving the workspace or changing schools clears selected class state.

## Service layer

Domain Firestore access is separated into services:

```text
adminUserService.js
auditLogService.js
buildingService.js
classService.js
courseService.js
enrollmentService.js
membershipService.js
roomService.js
schoolService.js
seatingPlanService.js
studentService.js
userService.js
```

Typical responsibilities:

- validate required context
- build Firestore paths
- normalize input
- subscribe to snapshots
- persist/archive/reactivate data
- build client-side audit writes where currently authorized
- preserve stable IDs

Privileged cross-account operations that require Admin SDK authority belong in callable Functions rather than client services.

## Room model and physical layout

Rooms own physical classroom configuration including building/floor/room identity, desk count, seats per desk, capacity, and teacher position.

Teacher position values:

```text
front-left
front-right
back-left
back-right
```

Older room data falls back to `front-left` in UI/service behavior.

## Seating-plan and Planning Engine boundary

A seating plan stores physical assignments such as:

```js
{
  studentId,
  deskNumber,
  seatNumber
}
```

`src/engine/seating/` is framework-independent JavaScript. It does not read Firestore, depend on Vue, translate text, or export files.

Current historical objectives are lexicographic:

1. avoid previous partners
2. avoid previous desks
3. avoid previous exact seats

The engine recommends; the teacher selects/adjusts the final plan.

## Excel export boundary

`seatingPlanExportService.js` receives saved plan/class/room/student data and creates a printable `.xlsx` workbook. It reflects current classroom geometry (whiteboard, teacher position, desk groups, student assignments) without mixing export formatting into Firestore or the recommendation engine.

## Internationalization

Vue I18n lives under `src/i18n/`. New user-visible UI strings must be represented in aligned `en.json` and `ja.json` keys. Services/engine should return structured/domain errors rather than importing i18n.

Current Admin/Dashboard UI, including user refresh and audit fields, has EN/JA coverage. Some Firebase/service/browser validation messages and Excel labels remain localization work.

## Local Firebase emulator workflow

Development mode connects the Vue app to:

```text
Authentication Emulator :9099
Firestore Emulator      :8080
Functions Emulator      :5001
Emulator UI             :4000
```

Preserve the existing dataset by default:

```bash
cd ~/Projects/ClassRoom
firebase emulators:start \
  --only functions,auth,firestore \
  --import=./emulator-data \
  --export-on-exit=./emulator-data
```

`emulator-data/` and `emulator-data.zip` are local ignored artifacts.

## Future architecture

Near-term direction:

```text
Security
├── membership identity/immutability
├── membership-aware domain rules
├── trusted membership mutation boundary
└── automated authorization/audit regression tests

Teachers
├── teacher directory/model
├── class teacher assignments
├── main teacher
└── Class Workspace / export integration

Engineering
├── tests + CI
├── lazy loading / bundle review
└── possible Vue CLI → Vite migration
```
