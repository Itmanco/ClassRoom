# Classroom Manager Roadmap

## Vision

Build a bilingual, explainable school/classroom management platform that
keeps organization context explicit and teachers in control of classroom
decisions.

## Completed foundation

### Authentication and domain structure

-   [x] Firebase Authentication
-   [x] Firestore user profiles
-   [x] School-scoped collections
-   [x] Student Management
-   [x] Course Management
-   [x] Building Management
-   [x] Room Management
-   [x] Class Management
-   [x] Enrollment Management
-   [x] Seating Plan Management

### Class Workspace

-   [x] Manage Class action
-   [x] Selected class context
-   [x] Overview
-   [x] Embedded EnrollmentManager
-   [x] Embedded SeatingPlanManager
-   [x] Remove enrollments/seating plans from primary navigation
-   [x] Preserve school/class context boundaries

### Planning Engine v1

-   [x] Framework-independent engine
-   [x] Previous-partner avoidance
-   [x] Previous-desk avoidance
-   [x] Previous-seat avoidance
-   [x] Multiple recommendations
-   [x] Structured violations
-   [x] Teacher selection/manual override

### Internationalization foundation

-   [x] Vue I18n
-   [x] English/Japanese catalogs
-   [x] Browser-language initialization
-   [x] Persisted language selection
-   [x] Modern management pages localized
-   [x] Responsive navigation

### Multi-school UI

-   [x] Profile school IDs
-   [x] Available-school loading
-   [x] Active-school selector
-   [x] School-change reset behavior
-   [x] No-school state

### Physical classroom model

-   [x] Desk count
-   [x] Seats per desk
-   [x] Capacity
-   [x] Teacher position
-   [x] Room preview
-   [x] Classroom-style seating-plan view

### Excel export

-   [x] Saved seating-plan `.xlsx` export
-   [x] Classroom-oriented layout
-   [x] Teacher/whiteboard representation
-   [x] Compact desk spacing
-   [x] Print-oriented page setup
-   [x] Class/date-time filename

## Immediate milestone

### Documentation and public deployment

-   [x] Refresh documentation pack
-   [ ] Run final lint/build
-   [ ] Review repository diff
-   [ ] Commit documentation/export milestone
-   [ ] Deploy current build to GitHub Pages
-   [ ] Verify live demo

## Next product milestone --- Dashboard

-   [ ] Remove `ClassroomPage.vue`
-   [ ] Remove obsolete legacy classroom components/services when safe
-   [ ] Add Dashboard/Home page
-   [ ] School summary cards
-   [ ] Recent class/seating activity
-   [ ] Empty-state design
-   [ ] Future messages/announcements area

## Authorization

-   [ ] Define school membership model
-   [ ] Define role capabilities
-   [ ] Enforce membership in Firestore rules
-   [ ] Restrict administrative actions
-   [ ] Test cross-school access

## Internationalization hardening

-   [ ] Localize friendly Firebase auth errors
-   [ ] Replace/review browser-native validation
-   [ ] Localize export labels
-   [ ] Final Japanese terminology review
-   [ ] English/Japanese screenshots

## Planning Engine v2

-   [ ] Automated tests
-   [ ] Classroom zones
-   [ ] Support-seat preferences
-   [ ] Pinned students
-   [ ] Accessibility constraints
-   [ ] Candidate comparison improvements

## Engineering improvements

-   [ ] Unit tests
-   [ ] Component tests
-   [ ] End-to-end tests
-   [ ] GitHub Actions CI
-   [ ] Lazy-load major pages
-   [ ] Reduce vendor bundle size
-   [ ] Remove unnecessary console logging
-   [ ] Review dependency vulnerabilities safely
-   [ ] Evaluate Vue CLI → Vite migration

## v1.0 definition

A reasonable v1.0 should include:

-   Stable multi-school/class workflows
-   Strong authorization rules
-   Complete English/Japanese primary flow
-   Tested Planning Engine
-   Dashboard replacing legacy Classroom page
-   Repeatable deployment
-   Automated coverage for critical workflows
-   Current public documentation
