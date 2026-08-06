# AI Context

## Project

Classroom Manager is a Vue 3 and Firebase classroom-management application with an explainable seating recommendation engine.

The files under `docs/` are the source of truth.

## Current branch state

The Class Workspace feature has been merged into `main`.

Latest structural milestone:

- Add Class Workspace
- Embed Enrollment Management
- Embed Seating Plan Management
- Simplify top-level navigation

## Current hierarchy

```text
School context
└── Class context
    ├── Overview
    ├── Students
    └── Seating Plans
```

## Top-level pages

- Classroom
- Students
- Courses
- Buildings
- Rooms
- Classes
- Settings

## Class-owned components

`EnrollmentManager` and `SeatingPlanManager` receive:

- `schoolId`
- optional `classId`

When a `classId` is provided, they operate in embedded mode and hide their internal class selector.

## Important rules

Always:

- Explain architecture changes before implementation
- Prefer small commits
- Preserve historical references
- Keep school and class context separate
- Avoid new hardcoded user-facing text
- Keep the Planning Engine independent
- Update documentation and TODO
- Never use forced dependency upgrades casually

## Current next priorities

1. Commit the full documentation update.
2. Deploy the merged Class Workspace build.
3. Finish the legacy Classroom page internationalization.
4. Localize login/authentication.
5. Audit shared UI states.
6. Plan localized validation.
7. Plan future school selection.

## Known technical warnings

- Node 24 produces a Vue CLI dependency engine warning; Node 22 LTS is safer.
- Legacy ClassroomPage has unused imports/functions.
- Production files contain console statements.
- Vendor bundle exceeds the recommended size.
- Dependency vulnerabilities require controlled modernization.
