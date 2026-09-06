# Firestore Schema

**Last verified against source:** 2026-09-06

## Overview

User identity/profile data is global under `users/{uid}`. School-owned domain data is stored below `schools/{schoolId}`. Global audit history is separated from school audit history.

```text
users/{uid}

systemAuditLogs/{logId}

schools/{schoolId}
├── members/{uid}
├── auditLogs/{logId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
└── classes/{classId}
    ├── enrollments/{studentId}
    └── seatingPlans/{seatingPlanId}
```

The schema favors stable IDs and archive flags so historical references remain understandable.

## Canonical identity

Firebase Authentication UID is canonical:

```text
Auth uid == users/{uid}.documentId == schools/{schoolId}/members/{uid}.documentId
```

Membership documents also carry `userUid`. The target invariant is:

```text
member document ID == userUid
```

Current code follows this convention, but Firestore rules still need to explicitly enforce it on create and prevent later `userUid` mutation.

## Users

Path:

```text
users/{uid}
```

Current/observed profile fields include:

```js
{
  email: "user@example.com",
  firstName: "Jaime",
  lastName: "Motta",
  displayName: "Jaime Motta",
  language: "en",              // en | ja
  activeSchool: "school_japan",
  systemRole: "system-admin",  // or null
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Notes:

- `systemRole` is application-wide privilege; current privileged value is `system-admin`.
- `active` controls global account lifecycle. `active === false` blocks normal application access.
- `activeSchool` is current working-school preference/session state, not authorization by itself.
- School authorization comes from membership documents.
- Legacy profile fields such as `role` or `schools[]` may exist in historical data but must not be used as authorization fallbacks.

### Managed profile update whitelist

`updateManagedUser` currently allows Admin-managed changes only to:

```text
firstName
lastName
displayName
language
```

It does not accept `systemRole`, `active`, `email`, legacy `role`, or membership data.

## School memberships

Path:

```text
schools/{schoolId}/members/{uid}
```

Current shape:

```js
{
  userUid: "firebase-auth-uid",
  role: "school-admin", // school-admin | teacher | student
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Memberships are the school-access source of truth.

Current membership lifecycle supports:

- create
- role change
- deactivate
- reactivate
- remove

School Admin self-role/status/removal changes are blocked. The remaining rule-hardening work is to enforce membership identity/immutability directly in Firestore rules and move privileged membership mutation behind server-side validation where appropriate.

## Schools

Path:

```text
schools/{schoolId}
```

Current service shape includes fields such as:

```js
{
  name: "Japanese Language School",
  country: "Japan",
  city: "Sapporo",
  ownerUid: "",
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

School IDs are normalized/stable document IDs. Schools are archived/reactivated by changing `active` rather than changing IDs.

## Students

Path:

```text
schools/{schoolId}/students/{studentId}
```

Student IDs are stable. Student lifecycle uses active/archive semantics (`isActive` in the current student model). Student create/update/archive/reactivate events are already represented in school audit logs.

Detailed student fields remain defined by `studentService.js` and the current UI; this document intentionally does not duplicate every presentation field.

## Buildings

Path:

```text
schools/{schoolId}/buildings/{buildingId}
```

Buildings describe school facilities and can be archived without breaking room references.

## Rooms

Path:

```text
schools/{schoolId}/rooms/{roomId}
```

Room configuration includes physical classroom properties used by preview, seating-plan visualization, and export. Important fields include desk count, seats per desk, capacity, building/floor/room information, active state, and:

```js
teacherPosition: "front-left"
```

Supported teacher positions:

```text
front-left
front-right
back-left
back-right
```

Older room documents without `teacherPosition` fall back to `front-left` in current application behavior.

## Courses

Path:

```text
schools/{schoolId}/courses/{courseId}
```

Courses use stable identifiers/codes and archive state.

## Classes

Path:

```text
schools/{schoolId}/classes/{classId}
```

Classes are school-owned and act as the parent context for enrollments and seating plans.

## Enrollments

Path:

```text
schools/{schoolId}/classes/{classId}/enrollments/{studentId}
```

Enrollment is class-owned. The stable student ID connects class participation to school student records.

## Seating plans

Path:

```text
schools/{schoolId}/classes/{classId}/seatingPlans/{seatingPlanId}
```

Assignments preserve physical position information such as:

```js
{
  studentId,
  deskNumber,
  seatNumber
}
```

Historical plans are used by the recommendation engine for previous-partner/desk/seat avoidance.

## Audit logs

### School audit

Path:

```text
schools/{schoolId}/auditLogs/{logId}
```

Typical shape:

```js
{
  action: "user.updated",
  entityType: "user",
  entityId: "uid",
  actorUid: "admin-uid",
  actorEmail: "admin@example.com",
  actorRole: "system-admin",
  schoolId: "school-a",
  changedFields: ["displayName"],
  details: {
    entityName: "Target User",
    email: "target@example.com",
    changes: {
      displayName: {
        before: "Old",
        after: "New"
      }
    }
  },
  createdAt: Timestamp
}
```

School audit history is immutable after creation (`update`/`delete` denied). Some school audit events are still created by authorized clients in the same Firestore batch as the domain change; user lifecycle/profile events are created by callable Functions with Admin SDK.

### System audit

Path:

```text
systemAuditLogs/{logId}
```

System audit records use the same general event shape, normally with `schoolId: null`. Client create/update/delete is denied; trusted Functions create these records.

### Audit destination rule

Audit destination follows the affected resource.

For `user.updated`, `user.archived`, and `user.reactivated`:

```text
memberships A/B/C → one event in A, B, C; no system duplicate
zero memberships  → one system event
```

For `user.created`:

```text
initial school → school event
no school      → system event
```

## Archive policy

Use archive/inactive state rather than destructive deletion for records that may be referenced historically.

Examples:

- users: `active`
- schools/classes/rooms/courses: `active`
- students: `isActive`
- memberships: `active` for access suspension; removal is also supported for membership lifecycle

## Current Firestore security status

Implemented/important rule behavior:

- active-user helper for privileged authorization
- System Admin from `users/{uid}.systemRole`
- School Admin from active school membership
- self profile updates limited to allowed profile fields
- activeSchool changes require valid membership unless System Admin
- System Admin system-role field update restriction
- School membership reads scoped to self/Admin
- School Admin self membership update/delete blocked
- System audit logs readable only by System Admin and not writable by clients
- School audit logs readable/creatable only by authorized school Admins; immutable after creation
- membership collection-group reads scoped to own membership or System Admin

Known security gaps still present in `firestore.rules`:

- `students`, `buildings`, `rooms`, `courses`, `classes`, enrollments, and seating plans currently use broad `isActiveUser()` read/write checks rather than school-membership/role checks.
- membership create does not yet explicitly enforce `memberId == request.resource.data.userUid`.
- membership update does not yet explicitly make `userUid` immutable.
- authorized school Admin clients can still create school audit documents directly for client-side audited operations.

These gaps are current roadmap items and must not be documented as already solved.

## Local schema inspection

Use the Firebase Emulator Suite for development and security testing:

```bash
cd ~/Projects/ClassRoom
firebase emulators:start \
  --only functions,auth,firestore \
  --import=./emulator-data \
  --export-on-exit=./emulator-data
```

`emulator-data/`, `emulator-data.zip`, `school-structure.json`, and local credentials are development artifacts and are excluded from version control.
