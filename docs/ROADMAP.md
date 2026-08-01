# Classroom Manager Roadmap

## Vision

Build a classroom planning platform that helps teachers manage school data and make fair, explainable seating decisions.

## Completed milestones

### v0.5.0 — School domain foundation

- School-scoped Firestore architecture
- Buildings, rooms, courses, classes, enrollments, and seating plans
- Building, Room, and Course management
- Student migration

### v0.6.0 — Student management

- Student CRUD
- Search
- Archive/reactivate
- Real-time updates

### v0.7.0 — Planning Engine v1

- Framework-independent engine
- Historical seating analysis
- Priority-based comparison
- Three recommendations
- Teacher preview and selection

## Current milestone — v0.8.0 Internationalization

Completed:

- [x] Vue I18n
- [x] English and Japanese catalogs
- [x] Browser locale detection
- [x] Persist selected language
- [x] Settings language selector
- [x] Main navigation
- [x] Student Management
- [x] Course Management

Remaining:

- [ ] Building Management
- [ ] Room Management
- [ ] Class Management
- [ ] Enrollment Management
- [ ] Seating Plan Management
- [ ] Planning Engine UI
- [ ] Classroom page
- [ ] Login and authentication messages
- [ ] Japanese terminology review
- [ ] English and Japanese screenshots

## v0.8.1 — Localized validation

- [ ] Replace browser-native validation
- [ ] Reusable validation helpers
- [ ] Localized field-level messages
- [ ] Consistent invalid-field styling
- [ ] Automated validation tests

## Planning Engine v2

- [ ] Classroom zones
- [ ] Student support-seat preferences
- [ ] Room-distribution fairness
- [ ] Side-by-side recommendation layouts
- [ ] Candidate-comparison tests
- [ ] Pinned students
- [ ] Better explanations

## Administration and authorization

- [ ] School administration
- [ ] User administration
- [ ] Assign users to schools
- [ ] Roles and permissions
- [ ] Firestore rule enforcement

## Engineering improvements

- [ ] Unit tests
- [ ] Component tests
- [ ] End-to-end tests
- [ ] GitHub Actions CI
- [ ] Automatic Pages deployment
- [ ] Dependency modernization
- [ ] Evaluate Vue CLI to Vite migration

## Definition of v1.0

- Stable core workflows
- Complete English/Japanese demo flow
- Explainable Planning Engine
- Appropriate Firestore authorization
- Automated coverage for main workflows
- Current documentation
- Repeatable deployment
