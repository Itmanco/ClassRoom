# AI Context

## Project

Classroom Manager is a Vue 3 + Firebase school/classroom management
application with multi-school context, bilingual UI, an explainable
seating engine, classroom-style seating visualization, and Excel
seating-plan export.

Repository:

``` text
Itmanco/ClassRoom
```

## Current architecture

``` text
Authenticated User
└── Available Schools
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
```

## Important current features

-   Firebase Authentication
-   User profiles
-   `schools[]` + `activeSchool`
-   School selector
-   No-school state
-   Responsive sidebar
-   Room teacher position
-   Room preview
-   Seating recommendation engine
-   Classroom-style seating layout
-   `.xlsx` seating-plan export
-   English/Japanese locale system
-   Browser-language initialization

## Teacher position values

``` text
front-left
front-right
back-left
back-right
```

Default/fallback for older rooms:

``` text
front-left
```

## Planning Engine

Location:

``` text
src/engine/seating/
```

Priority:

1.  Previous partners
2.  Previous desks
3.  Previous exact seats

Principle:

> Recommend, don't decide.

## Excel export

Location:

``` text
src/services/seatingPlanExportService.js
```

Uses:

``` text
xlsx-js-style
```

Exports saved plans using classroom geometry.

## Legacy code

Still present temporarily:

``` text
ClassroomPage.vue
MyClassroom.vue
StudentDesk.vue
classroomService.js
```

Do not expand the legacy page. Next structural work is Dashboard/Home
replacement and safe legacy removal.

## Development rules

-   Explain architecture changes before large edits.
-   Prefer small commits.
-   Run lint/build at checkpoints.
-   Preserve historical references.
-   Keep school/class context separate.
-   Do not hardcode new user-facing strings unnecessarily.
-   Keep engine independent from Vue/Firebase/i18n.
-   Never commit `serviceAccountKey.json`.
-   Never commit `school-structure.json`.
-   Avoid `npm audit fix --force` during normal feature work.
-   Treat current source code as the final authority when docs disagree.

## Immediate sequence

1.  Finish documentation checkpoint.
2.  Run lint/build.
3.  Commit and push.
4.  Deploy to GitHub Pages.
5.  Verify live build.
6.  Create Dashboard.
7.  Remove legacy Classroom code safely.
