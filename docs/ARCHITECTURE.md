# Architecture

## Overview

Classroom Manager uses a Vue 3 frontend, Firebase Authentication, Cloud
Firestore, a service layer, a framework-independent seating engine, and
a client-side Excel export service.

``` text
App.vue
├── Authentication state
├── User profile
├── Available schools
├── Active school
├── Top-level navigation
└── Selected class
        │
        ▼
Pages / components
        │
        ├── Class Workspace
        ├── Room preview
        └── Seating Plan Manager
        │
        ▼
Services                    Seating Engine
        │                         │
        ├── Firestore             └── Pure JS recommendation logic
        └── XLSX export
```

## Application session

`App.vue` owns application-level state.

Conceptually:

``` js
session = {
  firebaseUser: null,
  profile: null,
  schools: [],
  activeSchool: null,
  initialized: false
}
```

The exact implementation should be treated as source-of-truth, but these
concepts define the architecture.

## Authentication

Firebase Authentication determines whether a user can enter the
authenticated application.

On auth-state change:

1.  Firebase user state is restored.
2.  The Firestore user profile is loaded.
3.  Available schools are resolved.
4.  The active school is validated.
5.  The application renders normal school content or the no-school
    state.

Authentication and school authorization are separate concerns.

## Multi-school context

A user profile can reference multiple school IDs and one active school.

``` text
User
├── schools[]
└── activeSchool
```

`SchoolSelector.vue` changes the active school. Class-specific state
must be cleared on school change.

If an authenticated user has no assigned school, `NoSchoolPage.vue` is
shown rather than rendering managers with a null school ID.

Current membership is profile-driven. Strong Firestore membership/role
enforcement is future work.

## Class context

`selectedClassId` is application/workspace state.

``` text
Classes
→ Manage Class
→ selectedClassId
→ ClassWorkspace
```

Leaving the class workspace or changing schools clears the selected
class.

## Class Workspace

`ClassWorkspace.vue` composes class-owned functionality:

``` text
ClassWorkspace
├── Overview
├── EnrollmentManager
└── SeatingPlanManager
```

`EnrollmentManager` and `SeatingPlanManager` accept:

-   `schoolId`
-   optional `classId`

With `classId`, the manager operates in embedded mode.

## Service layer

Firestore access is separated into domain services:

``` text
buildingService.js
classService.js
courseService.js
enrollmentService.js
roomService.js
schoolService.js
seatingPlanService.js
studentService.js
userService.js
```

Typical service responsibilities:

-   Validate required context
-   Build Firestore paths
-   Normalize input
-   Subscribe to real-time snapshots
-   Save documents
-   Archive documents
-   Preserve stable IDs

## Room model and physical layout

Rooms describe the physical classroom:

``` text
building
floor
room number
desk count
seats per desk
capacity
teacher position
```

Teacher position values:

``` text
front-left
front-right
back-left
back-right
```

The room preview and seating-plan visualization use this configuration
to present a classroom-like layout.

## Seating-plan model

A seating plan stores physical assignments:

``` js
{
  studentId,
  deskNumber,
  seatNumber
}
```

This keeps historical positions stable even when the UI layout changes.

## Planning Engine boundary

`src/engine/seating/` contains framework-independent JavaScript.

The engine does not:

-   Read Firestore
-   Know Vue components
-   Translate text
-   Download files

It receives plain data and returns structured results.

Current constraints:

-   Avoid previous partners
-   Avoid previous desks
-   Avoid previous exact seats

## Excel export boundary

`seatingPlanExportService.js` is separate from Firestore persistence and
the planning algorithm.

Input:

-   Saved seating plan
-   Selected class
-   Room
-   Student records

Output:

-   Printable `.xlsx` workbook

The export reflects classroom geometry: whiteboard, teacher position,
desk groups, and student assignments.

## Internationalization

Vue I18n is initialized under:

``` text
src/i18n/
├── index.js
└── locales/
    ├── en.json
    └── ja.json
```

Locale selection uses persisted preference first, then browser language,
then English fallback.

Rules:

-   New UI text belongs in locale catalogs.
-   Engine output should remain structured.
-   Services should avoid translated prose.
-   Dynamic UI messages use interpolation.

## Responsive navigation

`NavigationMenu.vue` supports collapsed state and automatically adapts
on smaller screens. The sidebar must not obscure primary application
content.

## Legacy boundary

The following are transitional:

``` text
ClassroomPage.vue
MyClassroom.vue
StudentDesk.vue
classroomService.js
```

New functionality should not be added there unless required for safe
migration. The target is a new Dashboard/Home page.

## Future architecture

Likely future additions:

``` text
Dashboard
├── Activity summary
├── Recent class activity
├── Messages
└── Announcements

Authorization
├── School membership
└── Roles / permissions

Engineering
├── Tests
├── CI
├── Lazy loading
└── Possible Vue CLI → Vite migration
```
