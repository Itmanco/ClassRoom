# Architecture

## Overview

Classroom Manager uses a Vue 3 frontend, a Firebase service layer, and an independent Planning Engine.

```text
App.vue
├── Authentication/session state
├── Active school context
├── Top-level page navigation
└── Selected class context
        │
        ▼
Pages and reusable managers
        │
        ▼
Service modules
        │
        ├── Firebase Authentication
        ├── Cloud Firestore
        └── Seating Planning Engine
```

## Application context

### School context

`session.activeSchool` identifies the selected school.

All school-owned operations receive `schoolId`.

Examples:

```js
watchStudents(schoolId)
watchCourses(schoolId)
watchClasses(schoolId)
```

A future school selector will update this value.

### Class context

`selectedClassId` is owned by `App.vue` while the Class Workspace is open.

```text
Classes page
→ Manage class
→ App stores selectedClassId
→ ClassWorkspace receives schoolId and classId
```

Changing a top-level page clears the selected class. A future school change must also clear it.

## Class Workspace

`ClassWorkspace.vue` composes class-owned workflows.

```text
ClassWorkspace
├── Overview
├── EnrollmentManager
└── SeatingPlanManager
```

Both embedded managers receive:

```vue
:school-id="schoolId"
:class-id="classId"
```

They support an optional `classId` mode:

- With `classId`: embedded mode; no class selector.
- Without `classId`: temporary standalone mode.

The top-level standalone routes have been removed, but reusable component support remains useful for testing and future composition.

## Service layer

Firestore access is kept in service files rather than duplicated across components.

Typical responsibilities:

- Build collection/document paths
- Subscribe to real-time data
- Save normalized records
- Archive records
- Preserve stable identifiers

## Planning Engine

The engine is separate from Vue and Firebase.

Inputs:

- Students
- Seat positions
- Historical plans
- Generation options

Outputs:

- Structured candidate assignments
- Objective counts
- Quality labels/codes
- Structured violations
- Search statistics

Translation happens in the Vue interface, not in the engine.

## Internationalization

Vue I18n is initialized under:

```text
src/i18n/
├── index.js
└── locales/
    ├── en.json
    └── ja.json
```

Rules:

- No new hardcoded user-facing strings.
- Services return data/errors, not translated sentences.
- Engine returns structured values, not localized prose.
- Components translate dynamic messages with interpolation.

## Navigation architecture

Current top level:

```text
Classroom
Students
Courses
Buildings
Rooms
Classes
Settings
```

Class level:

```text
Overview
Students
Seating Plans
```

This structure is designed to accommodate future tabs such as:

- Attendance
- Grades
- Statistics
- Reports
- Class settings

## Future multi-school architecture

```text
User
├── School A
├── School B
└── School C
```

The school selector should:

- Display only authorized schools
- Update `session.activeSchool`
- Clear `selectedClassId`
- Return to a safe top-level page
- Trigger all school-scoped listeners to reload
- Be backed by Firestore security rules
