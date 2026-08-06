# Project Context

## Product

Classroom Manager is a school-management and classroom-planning web application.

Its two main goals are:

1. Manage school, class, and student data with clear ownership.
2. Help teachers create fair seating arrangements without replacing teacher judgement.

## Current product hierarchy

```text
Authenticated User
└── Active School
    ├── Students
    ├── Courses
    ├── Buildings
    ├── Rooms
    └── Classes
        └── Selected Class Workspace
            ├── Overview
            ├── Students / Enrollments
            └── Seating Plans / Planning Engine
```

## Current navigation

Top-level navigation:

- Classroom
- Students
- Courses
- Buildings
- Rooms
- Classes
- Settings

Enrollments and Seating Plans are intentionally absent from the top level. They require a selected class and therefore live inside the Class Workspace.

## Current application state

Implemented:

- Firebase authentication and session initialization
- Active-school context
- School-scoped Firestore collections
- Student Management
- Course Management
- Building Management
- Room Management
- Class Management
- Class Workspace
- Enrollment Management
- Seating Plan Management
- Intelligent Seating Planner
- English/Japanese i18n foundation
- GitHub Pages deployment

Still incomplete:

- Legacy Classroom page modernization and localization
- Login/authentication localization
- Shared UI-state audit
- Localized application validation
- Multi-school selector
- Roles and permissions
- Automated testing

## Design philosophy

- Prefer understandable workflows over flat CRUD navigation.
- Preserve historical references.
- Archive rather than delete referenced records.
- Keep service and engine code independent from translated prose.
- Keep school and class context explicit.
- Let teachers make final seating decisions.
- Implement changes in small, reviewable commits.
