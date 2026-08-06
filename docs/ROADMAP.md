# Classroom Manager Roadmap

## Vision

Build an explainable school and classroom planning platform that organizes data by school and class while keeping teachers in control.

## Completed milestones

### v0.5.0 — School domain foundation

- School-scoped Firestore architecture
- Buildings, rooms, courses, classes, enrollments, and seating plans
- Initial domain services and migrations

### v0.6.0 — Student Management

- Student CRUD
- Search
- Archive workflow
- Immutable student IDs
- Real-time updates

### v0.7.0 — Planning Engine v1

- Framework-independent engine
- Historical seating analysis
- Priority-based comparison
- Three recommendations
- Teacher preview and selection
- Planning philosophy documentation

### v0.8.0 — Internationalization foundation

Completed:

- [x] Vue I18n
- [x] English and Japanese catalogs
- [x] Browser locale detection
- [x] Locale persistence
- [x] Settings language selector
- [x] Main navigation
- [x] Student Management
- [x] Course Management
- [x] Building Management
- [x] Room Management
- [x] Class Management
- [x] Enrollment Management
- [x] Seating Plan Management
- [x] Planning Engine interface
- [x] Class Workspace

Remaining:

- [ ] Legacy Classroom page
- [ ] Login and authentication messages
- [ ] Shared UI-state review
- [ ] Japanese terminology review
- [ ] English and Japanese screenshots

### Class Workspace milestone — Completed

- [x] Add Manage Class action
- [x] Add selected class context
- [x] Add Overview tab
- [x] Embed Enrollment Management
- [x] Embed Seating Plan Management
- [x] Preserve the Planning Engine
- [x] Remove Enrollments from top-level navigation
- [x] Remove Seating Plans from top-level navigation
- [x] Keep Classes highlighted in the workspace
- [x] Preserve separate school and class context

## v0.8.1 — Localized validation

- [ ] Replace browser-native validation
- [ ] Reusable validation helpers
- [ ] Field-level translated errors
- [ ] Consistent invalid styling
- [ ] Validation tests

## Multi-school interface

- [ ] Load schools available to the user
- [ ] Add school selector above navigation
- [ ] Clear selected class when school changes
- [ ] Add roles and permissions
- [ ] Enforce membership in Firestore rules

## Class Workspace expansion

- [ ] Attendance
- [ ] Grades
- [ ] Statistics
- [ ] Reports
- [ ] Class settings

## Planning Engine v2

- [ ] Classroom zones
- [ ] Support-seat preferences
- [ ] Pinned students
- [ ] Side-by-side comparison
- [ ] Distribution fairness
- [ ] Automated tests

## Engineering improvements

- [ ] Unit tests
- [ ] Component tests
- [ ] End-to-end tests
- [ ] GitHub Actions CI
- [ ] Automatic Pages deployment
- [ ] Remove legacy unused code
- [ ] Reduce console logging
- [ ] Lazy load major pages
- [ ] Review bundle size
- [ ] Evaluate Vite migration
- [ ] Review dependency vulnerabilities safely

## Definition of v1.0

- Stable school and class workflows
- Complete English/Japanese demo flow
- Explainable and tested Planning Engine
- Multi-school authorization model
- Appropriate Firestore security rules
- Automated coverage for critical workflows
- Current documentation
- Repeatable deployment
