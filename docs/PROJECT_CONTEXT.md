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
