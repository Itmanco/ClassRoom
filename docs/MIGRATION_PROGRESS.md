# Migration Progress

## Purpose

This document tracks the transition from the original Classroom
implementation to the current school/class architecture.

## Legacy architecture

The original project centered on:

``` text
ClassroomPage.vue
MyClassroom.vue
StudentDesk.vue
classroomService.js
```

That implementation was useful for early classroom/seating functionality
but mixed concerns that are now represented by dedicated domain managers
and services.

## Current architecture

``` text
App
└── Active School
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

-   [x] School-scoped students
-   [x] Buildings
-   [x] Rooms
-   [x] Courses
-   [x] Classes
-   [x] Enrollments
-   [x] Seating plans
-   [x] Service-layer separation
-   [x] Student migration script

### Application context

-   [x] Firebase user profile
-   [x] Active school
-   [x] Multiple available schools
-   [x] School selector
-   [x] No-school state
-   [x] Selected class workspace

### Seating functionality preserved/improved

-   [x] Manual assignments
-   [x] Sequential assignment
-   [x] Historical plans
-   [x] Recommendation engine
-   [x] Classroom-style layout
-   [x] Desk grouping
-   [x] Teacher position
-   [x] Whiteboard
-   [x] Excel export

### Internationalization

-   [x] English/Japanese catalogs
-   [x] Browser locale
-   [x] Saved locale
-   [x] Modern page coverage

## Remaining legacy removal

-   [ ] Replace default Classroom page with Dashboard
-   [ ] Remove `ClassroomPage.vue`
-   [ ] Verify whether `MyClassroom.vue` is still referenced
-   [ ] Verify whether `StudentDesk.vue` is still referenced
-   [ ] Verify whether `classroomService.js` is still referenced
-   [ ] Remove dead imports/code
-   [ ] Re-run lint/build
-   [ ] Update documentation after removal

## Migration rule

Do not delete legacy code merely because a newer component exists.
Remove it only after:

1.  Confirming no route/component imports it.
2.  Confirming all useful behavior has a replacement.
3.  Running lint/build.
4.  Testing the primary seating workflow.
5.  Committing the removal separately.

## End state

The migration is complete when the application opens to a modern
Dashboard and no production workflow depends on the legacy Classroom
implementation.
