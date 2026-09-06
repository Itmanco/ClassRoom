# Project Context

**Last verified against source:** 2026-09-06

## Product

Classroom Manager is a Vue 3 + Firebase school-management and classroom-planning application. It combines structured school/class data management, bilingual administration, and explainable seating-plan generation while keeping final classroom decisions with the teacher.

## Current hierarchy

```text
Authenticated User
├── User profile / account state
├── Available Schools
└── Active School
    ├── Dashboard
    ├── Students
    ├── Courses
    ├── Buildings
    ├── Rooms
    ├── Classes
    │   └── Selected Class Workspace
    │       ├── Overview
    │       ├── Students / Enrollments
    │       └── Seating Plans
    ├── Settings
    └── Admin (authorized users only)
        ├── Schools (System Admin)
        ├── Users (System Admin / School Admin)
        └── Activity Log (scope depends on role)
```

## Current application state

Implemented:

- Firebase Authentication and Firestore user profiles
- Canonical Firebase Auth UID identity
- Active/inactive user accounts; inactive accounts are blocked from normal application access
- Membership-driven school access
- `system-admin` global authorization
- `school-admin`, `teacher`, and `student` school roles
- Multi-school school selector and no-school state
- Dashboard as the default page
- Active student/class/room/course summary cards
- Student, course, building, room, class, enrollment, and seating-plan management
- Class Workspace
- Explainable seating recommendation engine
- Classroom-style seating visualization and Excel export
- English/Japanese i18n and responsive navigation
- Admin Schools, Users, and Activity Log surfaces
- School Admin scoped user discovery through `getSchoolUsers`
- User creation, profile editing, archive/reactivate, and system-role management
- Last-active-System-Admin and administrator self-access protections
- School membership creation/role/status/removal management
- Resource-scoped user auditing and translated audit field labels
- Firebase Auth / Firestore / Functions emulator workflow with reusable imported data

Not yet complete:

- Membership document identity/immutability rules
- Membership/role-aware Firestore rules for the remaining school-domain collections
- Server-side migration of remaining privileged membership writes
- Broad automated test/CI coverage
- Friendly localization of all remaining platform/service errors
- Localized Excel labels
- Teacher domain management

## Navigation

The legacy Classroom/Home implementation is no longer part of the source tree. `DashboardPage.vue` is the default top-level page.

Current primary navigation:

```text
Dashboard
Students
Courses
Buildings
Rooms
Classes
Settings
Admin (when authorized)
Profile (via profile card)
```

Enrollments and Seating Plans remain class-owned workflows accessed from Class Workspace.

## Identity and authorization model

```text
Firebase Authentication uid
├── users/{uid}
│   ├── systemRole: system-admin | null
│   ├── active: true | false
│   └── activeSchool
└── schools/{schoolId}/members/{uid}
    ├── userUid: uid
    ├── role: school-admin | teacher | student
    └── active: true | false
```

`users/{uid}.role` and legacy school-list fields are not authorization fallbacks. School access is derived from membership documents. System Admin privilege is derived from `users/{uid}.systemRole`.

## Admin authorization

System Admin:

- Global school administration
- Global user administration
- System-role changes
- Global account archive/reactivate
- Selected-school + System Activity Log visibility

School Admin:

- Admin access only while the active membership is `school-admin` and active
- Create users only for a school they administer
- Load users through the scoped `getSchoolUsers` callable
- Manage other users' memberships in that school
- Cannot change, deactivate, or remove their own membership
- Cannot access global Schools administration or System Admin controls

The privileged backend additionally prevents a System Admin from changing their own system role and prevents archiving the final active System Admin.

## Account lifecycle

`users/{uid}.active === false` means the account is archived/inactive. The application detects this during session initialization and shows the inactive-account screen rather than normal school content.

`setManagedUserActive` is System-Admin-only. Archiving and reactivation are audited.

## Audit model

Collections:

```text
schools/{schoolId}/auditLogs/{logId}
systemAuditLogs/{logId}
```

Core rule: **audit destination follows the affected resource, not the actor**.

For `user.updated`, `user.archived`, and `user.reactivated`:

- If the target user has memberships in A/B/C, create one audit record in each A/B/C school log and no system copy.
- If the target user has zero memberships, create exactly one system audit record.

`user.created` is school-scoped when an initial school is supplied and system-scoped when created without a school.

The System Admin Activity Log intentionally reads only the selected school's logs plus system logs; it does not aggregate every school's history into one view.

## Dashboard state

The Dashboard currently shows active counts for students, classes, rooms, and courses. Recent Activity and Messages sections exist as deliberate placeholders and do not yet load domain activity/messages.

## Current security boundary

Admin/auth flows are substantially hardened, but the domain collection rules are still broader than the target architecture: several school-owned collections currently allow read/write to any active application user. The next security step is to require the correct active school membership/role for those collections.

## Development workflow

Use the persisted local emulator data by default:

```bash
cd ~/Projects/ClassRoom
firebase emulators:start \
  --only functions,auth,firestore \
  --import=./emulator-data \
  --export-on-exit=./emulator-data
```

Do not start this project with an empty emulator unless that is intentional.

## Design philosophy

- Keep school and class ownership explicit.
- Prefer archive state over destructive deletion where history matters.
- Keep Firestore access in services; privileged cross-account operations belong on trusted backend boundaries.
- Keep the seating engine framework-independent.
- Keep UI strings in Vue I18n.
- Let teachers make final seating decisions.
- Make small, tested, reviewable changes and keep documentation synchronized with source code.
