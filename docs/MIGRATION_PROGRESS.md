# Migration Progress

**Last verified against source:** 2026-09-06

## Purpose

This document records the transition from the original Classroom-centric implementation to the current school/class/domain architecture.

## Legacy architecture

The original project centered on:

```text
ClassroomPage.vue
MyClassroom.vue
StudentDesk.vue
classroomService.js
```

Those files mixed page, classroom, and seating concerns that are now represented by dedicated domain managers/services and Class Workspace.

## Current architecture

```text
App
└── Active School
    ├── Dashboard
    ├── Students
    ├── Courses
    ├── Buildings
    ├── Rooms
    └── Classes
        └── Class Workspace
            ├── Overview
            ├── Enrollments
            └── Seating Plans
```

## Completed migration work

### Data/domain

- [x] School-scoped students
- [x] Buildings
- [x] Rooms
- [x] Courses
- [x] Classes
- [x] Enrollments
- [x] Seating plans
- [x] Service-layer separation
- [x] Student migration script

### Application context

- [x] Firebase user profile
- [x] Active school
- [x] Multiple available schools
- [x] Membership-driven school access
- [x] School selector
- [x] No-school state
- [x] Selected class workspace
- [x] Dashboard as the default page

### Legacy Classroom removal

- [x] Replace the default Classroom page with Dashboard
- [x] Remove `ClassroomPage.vue`
- [x] Remove `MyClassroom.vue`
- [x] Remove `StudentDesk.vue`
- [x] Remove `classroomService.js`
- [x] Remove production dependencies on the old Classroom workflow

### Seating functionality preserved/improved

- [x] Manual assignments
- [x] Sequential assignment
- [x] Historical plans
- [x] Recommendation engine
- [x] Classroom-style layout
- [x] Desk grouping
- [x] Teacher position
- [x] Whiteboard
- [x] Excel export

### Internationalization

- [x] English/Japanese catalogs
- [x] Browser locale
- [x] Saved locale
- [x] Modern page coverage
- [x] Dashboard/Admin strings in EN/JA

### Admin/security migration

- [x] Canonical Firebase Auth UID
- [x] `systemRole` separated from school membership roles
- [x] School membership documents
- [x] System Admin and School Admin Admin surfaces
- [x] Scoped School Admin user discovery
- [x] User create/edit/archive/reactivate callable backend operations
- [x] Inactive-account blocking
- [x] Audit scope separation and multi-school user-event distribution
- [x] Critical administrator self-lockout protections

## Remaining migration/security work

The UI/domain migration is complete. Remaining work is security hardening rather than legacy page removal:

- [ ] Enforce membership document ID == `userUid` on creation
- [ ] Prevent membership `userUid` mutation
- [ ] Require appropriate active membership/role for school-domain Firestore operations
- [ ] Move remaining privileged membership mutations behind server-side authorization as appropriate
- [ ] Add automated regression tests and CI

## Migration rule

Do not reintroduce the old Classroom architecture. New features should use the current school/class ownership model, services, Class Workspace, Dashboard, canonical UID memberships, and Vue I18n.

## End state

The original Classroom-page migration is complete. The current modernization target is a hardened multi-school authorization boundary followed by the Teachers domain and other product expansion.
