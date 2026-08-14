# 📚 Classroom Manager

**English** | [日本語](README.ja.md)

Classroom Manager is a Vue 3 and Firebase web application for managing
school data and creating explainable classroom seating plans. The
project is designed around explicit school and class context, real-time
Firestore data, bilingual English/Japanese UI, and teacher-controlled
seating recommendations.

## Live demo

GitHub Pages deployment is configured for the project. The public demo
is intended to be refreshed after this documentation milestone.

## Current status

The application currently includes:

-   Firebase Authentication and persistent authenticated sessions
-   Firestore-backed user profiles
-   Multi-school user context with an active-school selector
-   A dedicated no-school state for authenticated users without an
    assigned school
-   Student, course, building, room, and class management
-   Class Workspace with enrollments and seating plans
-   Explainable seating-plan recommendation engine
-   Classroom-style seating-plan visualization
-   Configurable teacher position per room
-   Excel (`.xlsx`) seating-plan export
-   English and Japanese UI with browser-language initialization and
    saved language preference
-   Responsive sidebar behavior for smaller screens
-   GitHub Pages deployment tooling

The legacy `ClassroomPage.vue` still exists temporarily. Its useful
functionality has been moved into newer workflows and it is scheduled to
be removed and replaced by a Dashboard/Home page.

## Product philosophy

The application follows several principles:

1.  **School context is explicit.** School-owned data is always accessed
    with a `schoolId`.
2.  **Class workflows belong to a class.** Enrollments and seating plans
    live inside the Class Workspace.
3.  **Archive instead of destructive deletion.** Historical references
    should remain valid.
4.  **Recommend, don't decide.** The seating engine proposes
    arrangements and explains trade-offs; the teacher makes the final
    decision.
5.  **Keep domain logic separate from presentation.** Firestore access
    lives in services and the seating engine is independent of Vue.
6.  **Internationalization is part of the architecture.** New
    user-facing text should use Vue I18n.

## Main workflow

``` text
Authenticated User
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
                ├── Manual assignment
                ├── Recommendation engine
                ├── Classroom preview
                └── Excel export
```

## Features

### Authentication and user profile

-   Firebase email/password authentication
-   Auth-state restoration on application load
-   Firestore user profile loading
-   Profile editing
-   Sign out
-   Dedicated handling for users without an assigned school

Changing a Firebase password does not automatically invalidate an
already authenticated client session; normal Firebase
authentication/session behavior applies.

### Multi-school context

User profiles can contain:

``` js
{
  activeSchool: "school_japan",
  schools: ["school_japan"],
  role: "admin"
}
```

The application loads the schools available to the user and lets the
user change the active school. A school change resets class-specific
state so data from two schools is not mixed.

Current membership is profile-based. Stronger server-enforced
membership/role authorization remains future work.

### Students

-   Create and edit students
-   Search student records
-   Archive students
-   Real-time Firestore updates
-   Stable student IDs
-   School-scoped storage

### Courses

-   Create, edit, and archive courses
-   Stable course codes
-   School-scoped storage

### Buildings and rooms

Buildings define school facilities. Rooms include:

-   Room code and name
-   Building
-   Floor and room number
-   Desk count
-   Seats per desk
-   Calculated capacity
-   Active/archive state
-   Teacher position

Supported teacher positions:

``` text
front-left
front-right
back-left
back-right
```

Room Management also includes a room-layout preview.

### Classes

A class connects academic and physical context such as:

-   Course
-   Room
-   Academic year
-   Semester
-   Active/archive state

The **Manage Class** action opens the Class Workspace.

### Class Workspace

The workspace groups class-owned operations in one place.

``` text
Class Workspace
├── Overview
├── Students
│   └── EnrollmentManager
└── Seating Plans
    └── SeatingPlanManager
```

Enrollment and seating-plan managers support an optional `classId`,
allowing them to operate as embedded class workflows.

### Seating plans

The seating-plan workflow supports:

-   Manual seat assignment
-   Sequential assignment
-   Saved seating-plan history
-   Editing
-   Archiving
-   Classroom-style visualization
-   Physical desk grouping based on `seatsPerDesk`
-   Whiteboard/front-of-room representation
-   Teacher position derived from room configuration
-   Multiple generated recommendations
-   Excel export of saved plans

### Seating recommendation engine

The framework-independent engine evaluates historical seating plans.

Current objective priority:

1.  Avoid repeated desk partners
2.  Avoid repeated desks
3.  Avoid repeated exact seats
4.  Random tie-break when higher-priority objectives are equal

The engine returns structured candidates, objective counts, violations,
quality information, and search statistics. Translation is performed in
the UI, not inside the engine.

### Excel seating-plan export

`src/services/seatingPlanExportService.js` uses `xlsx-js-style` to
generate a printable `.xlsx` representation of a saved seating plan.

The export includes:

-   Plan title
-   Class and room information
-   Plan date
-   Whiteboard
-   Teacher position
-   Desk grouping
-   Student names
-   Compact print-oriented spacing
-   Landscape page setup
-   Class-based filename with export date/time

The exported file is intended to represent the classroom physically
rather than as a flat data table.

## Internationalization

Supported locales:

-   English (`en`)
-   Japanese (`ja`)

Initial language behavior:

1.  Use a previously saved application language when available.
2.  Otherwise inspect the browser language.
3.  Use Japanese when the browser language resolves to `ja`.
4.  Use English for unsupported languages.

The language can be changed in the application and is persisted locally.

See [`docs/INTERNATIONALIZATION.md`](docs/INTERNATIONALIZATION.md).

## Firestore model

Primary structure:

``` text
users/{uid}

schools/{schoolId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
└── classes/{classId}
    ├── enrollments/{studentId}
    └── seatingPlans/{seatingPlanId}
```

See [`docs/FIRESTORE_SCHEMA.md`](docs/FIRESTORE_SCHEMA.md).

## Architecture

``` text
App.vue
├── Firebase authentication/session
├── User profile
├── Available schools
├── Active school
├── Top-level navigation
└── Selected class
        │
        ▼
Vue pages/components
        │
        ├── Class Workspace
        ├── Room preview
        └── Seating-plan UI
        │
        ▼
Service layer
        │
        ├── Firestore services
        └── Excel export service
        │
        ▼
Firebase / xlsx-js-style

SeatingPlanManager
        │
        ▼
Framework-independent Seating Engine
```

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Technology stack

### Frontend

-   Vue 3.2
-   Vue CLI 5
-   JavaScript
-   CSS
-   Vue I18n 11

### Backend/services

-   Firebase Authentication
-   Cloud Firestore
-   Firebase Admin SDK for local administrative/migration scripts

### Export

-   `xlsx-js-style`

### Tooling/deployment

-   ESLint
-   Babel
-   Git
-   GitHub
-   `gh-pages`

## Project structure

``` text
src/
├── App.vue
├── components/
│   ├── LanguageSelector.vue
│   ├── LoginModal.vue
│   ├── NavigationMenu.vue
│   ├── SchoolSelector.vue
│   └── UserProfileCard.vue
├── engine/
│   └── seating/
│       ├── SeatingEngine.js
│       └── constraints/
├── i18n/
│   ├── index.js
│   └── locales/
├── pages/
│   ├── BuildingManager.vue
│   ├── ClassManager.vue
│   ├── ClassWorkspace.vue
│   ├── CourseManager.vue
│   ├── EnrollmentManager.vue
│   ├── NoSchoolPage.vue
│   ├── ProfilePage.vue
│   ├── RoomManager.vue
│   ├── SeatingPlanManager.vue
│   ├── SettingsPage.vue
│   └── StudentManager.vue
└── services/
    ├── buildingService.js
    ├── classService.js
    ├── courseService.js
    ├── enrollmentService.js
    ├── roomService.js
    ├── schoolService.js
    ├── seatingPlanExportService.js
    ├── seatingPlanService.js
    ├── studentService.js
    └── userService.js

scripts/
├── createTestSchool.js
├── exportSchoolStructure.js
└── migrateStudents.js
```

`ClassroomPage.vue`, `MyClassroom.vue`, `StudentDesk.vue`, and
`classroomService.js` are legacy code still present during the
transition to the new architecture.

## Local setup

### Requirements

-   Node.js and npm
-   A Firebase project
-   Firebase web configuration
-   Optional Firebase Admin service-account credentials for local admin
    scripts

Install dependencies:

``` bash
npm install
```

Start development:

``` bash
npm run serve
```

Lint:

``` bash
npm run lint
```

Production build:

``` bash
npm run build
```

## Firebase configuration and secrets

The frontend Firebase configuration is initialized by
`src/firebase-init.js`.

Administrative scripts use a local:

``` text
serviceAccountKey.json
```

This file must never be committed. The repository `.gitignore` also
excludes:

``` text
serviceAccountKey.json
school-structure.json
```

Before committing administrative scripts, verify that credentials are
referenced from the ignored file and are not embedded in source code.

## Administrative scripts

### Student migration

``` bash
npm run migrate:students
```

Migrates legacy student data into the school-scoped structure.

### School structure export

``` bash
node scripts/exportSchoolStructure.js
```

Used for local inspection/documentation of Firestore school/user
structure. The resulting `school-structure.json` is intentionally
ignored.

### Test school

``` bash
node scripts/createTestSchool.js
```

Development utility for multi-school testing. Review IDs and intended
environment before running it.

## Deployment

The project contains:

``` json
"deploy": "npm run build && gh-pages -d dist"
```

Typical deployment:

``` bash
npm run lint
npm run build
npm run deploy
```

Before publishing, verify the GitHub Pages base/public path
configuration and test the deployed authentication/Firebase behavior.

## Known technical debt

-   Legacy `ClassroomPage.vue` still exists and has known lint warnings.
-   Legacy classroom components/services remain until the replacement
    Dashboard is complete.
-   Some console logging/error handling should be reviewed for
    production.
-   The Vue CLI vendor bundle is larger than the recommended performance
    threshold.
-   Automated test coverage is not yet established.
-   Role/membership enforcement needs a stronger authorization model.
-   Browser-native and service validation are not yet fully localized.
-   Vue CLI is an older toolchain and may eventually be replaced by
    Vite.

## Next milestone

The next structural milestone is:

1.  Finalize and verify the Excel seating-plan export.
2.  Publish the refreshed documentation and application.
3.  Remove the legacy Classroom page.
4.  Replace the home page with a Dashboard.
5.  Add useful school/class activity summaries and messages
    incrementally.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) and
[`docs/TODO.md`](docs/TODO.md).

## Documentation

Start with [`docs/DOCUMENTATION_INDEX.md`](docs/DOCUMENTATION_INDEX.md)
for the full documentation map.

## Author

Developed as a portfolio and learning project focused on practical
Vue/Firebase application architecture, school-domain modeling,
internationalization, and explainable planning logic.
