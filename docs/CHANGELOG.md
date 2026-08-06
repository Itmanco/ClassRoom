# Changelog

## Unreleased

### Added

- Class Workspace
- Manage Class action
- Class Overview tab
- Embedded Enrollment Management
- Embedded Seating Plan Management
- Embedded Intelligent Seating Planner
- Separate school and selected-class contexts

### Changed

- Simplified top-level navigation
- Removed Enrollments from the sidebar
- Removed Seating Plans from the sidebar
- Enrollment and seating workflows now belong to the selected class
- Classes remain highlighted while the workspace is open
- Top-level navigation clears selected-class context
- Documentation now describes the class-oriented hierarchy

### Architecture

```text
Selected School
└── Classes
    └── Selected Class
        ├── Overview
        ├── Students
        └── Seating Plans
```

## v0.8.0 — Internationalization work

### Added

- Vue I18n 11
- English and Japanese locale catalogs
- Browser locale detection
- Locale persistence
- Settings language selector
- Localized management pages
- Localized Planning Engine interface
- Localized quality labels and conflict explanations

### Remaining

- Legacy Classroom page
- Login/authentication localization
- Shared UI-state review
- Localized validation
- Japanese terminology review

## v0.7.0 — Planning Engine v1

- Historical seating analysis
- Priority-based comparison
- Three distinct recommendations
- Teacher preview and selection
- Structured conflict explanations

## v0.6.0 — Student Management

- Student CRUD
- Search
- Archive workflow
- Real-time updates

## v0.5.0 — School domain foundation

- School-scoped collections
- Core academic and facility domains
