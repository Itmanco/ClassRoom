# Classroom Manager Roadmap

**Last reviewed:** 2026-09-06

## Vision

Build a bilingual, explainable school/classroom management platform that keeps organization context explicit, protects multi-school data boundaries, and keeps teachers in control of classroom decisions.

## Completed foundation

### Authentication, identity, and multi-school context

- [x] Firebase Authentication
- [x] Firestore user profiles
- [x] Canonical Auth UID identity
- [x] Active/inactive account state
- [x] School membership documents
- [x] `system-admin` global role
- [x] `school-admin`, `teacher`, `student` school roles
- [x] Membership-based available schools
- [x] Active-school selector
- [x] No-school state

### School domain

- [x] Student Management
- [x] Course Management
- [x] Building Management
- [x] Room Management
- [x] Class Management
- [x] Enrollment Management
- [x] Seating Plan Management

### Dashboard and Class Workspace

- [x] Dashboard as default page
- [x] Student/class/room/course summary cards
- [x] Remove legacy Classroom/Home code
- [x] Selected class context
- [x] Overview
- [x] Embedded EnrollmentManager
- [x] Embedded SeatingPlanManager
- [x] Preserve school/class context boundaries

### Planning Engine v1

- [x] Framework-independent engine
- [x] Previous-partner avoidance
- [x] Previous-desk avoidance
- [x] Previous-seat avoidance
- [x] Multiple recommendations
- [x] Structured violations
- [x] Teacher selection/manual override

### Physical classroom and export

- [x] Desk count / seats per desk / capacity
- [x] Teacher position
- [x] Room preview
- [x] Classroom-style seating-plan view
- [x] Saved seating-plan `.xlsx` export
- [x] Teacher/whiteboard representation
- [x] Print-oriented page setup and filename

### Internationalization

- [x] Vue I18n
- [x] English/Japanese catalogs
- [x] Browser-language initialization
- [x] Persisted language selection
- [x] Modern management/Admin/Dashboard coverage
- [x] Responsive navigation

### Admin and audit foundation

- [x] System Admin Schools/Users/Activity Log
- [x] School Admin scoped Users/Activity Log
- [x] Callable `createUser`, `getSchoolUsers`, `updateManagedUser`, `setManagedUserActive`, `setSystemRole`
- [x] User profile editing
- [x] User archive/reactivate and inactive-account blocking
- [x] Last-active-System-Admin and self-access protections
- [x] Membership management and audit events
- [x] System/school audit scopes and UI filters
- [x] Multi-school distribution for user update/archive/reactivate
- [x] Zero-membership system audit fallback
- [x] Firebase Auth / Firestore / Functions emulator workflow

## Current milestone — authorization boundary hardening

Before expanding the next domain, complete the security invariants around school membership:

- [ ] Enforce membership document ID == `userUid`
- [ ] Make membership `userUid` immutable
- [ ] Replace broad active-user rules on school-domain collections with active membership/role-aware rules
- [ ] Move remaining privileged membership writes behind trusted backend authorization where appropriate
- [ ] Add automated regression tests for cross-school, multi-school, no-school, inactive-account, and role transitions
- [ ] Add CI for lint/build/tests

## Next product milestone — Teachers

- [ ] Define teacher Firestore model
- [ ] Add teacher directory/management
- [ ] Assign one or more teachers to a class
- [ ] Designate a main teacher
- [ ] Display teachers in Class Workspace/class details
- [ ] Use teacher information in Dashboard/class workflows
- [ ] Resolve the main teacher in Excel export

## Dashboard follow-up

The first Dashboard exists. Future work is intentionally incremental:

- [ ] Connect recent class/seating/audit activity when the desired source/scope is defined
- [ ] Add messages/announcements only with a concrete workflow
- [ ] Add teacher-related summary information after the Teachers domain exists

## Audit expansion

- [ ] School lifecycle audit events
- [ ] Course/building/room/class lifecycle audit events
- [ ] Pagination and richer actor/action/entity/date filters
- [ ] Retention/export policy
- [ ] Security-event logging only after normal audit integrity is server-hardened

## Internationalization hardening

- [ ] Friendly Firebase auth errors
- [ ] Review browser/service validation
- [ ] Localize export labels
- [ ] Final Japanese terminology review
- [ ] Bilingual screenshots and narrow-layout checks

## Planning Engine v2

Only after automated v1 tests:

- [ ] Classroom zones
- [ ] Support-seat preferences
- [ ] Pinned students
- [ ] Accessibility constraints
- [ ] Candidate comparison improvements

## Engineering improvements

- [ ] Unit/component/E2E test strategy
- [ ] GitHub Actions CI
- [ ] Lazy-load major pages
- [ ] Reduce vendor bundle size
- [ ] Reduce unnecessary console logging
- [ ] Safe dependency vulnerability review
- [ ] Evaluate Vue CLI → Vite migration

## v1.0 definition

A reasonable v1.0 should include:

- Stable multi-school/class workflows
- Membership-aware authorization for school-owned data
- Complete English/Japanese primary flow
- Tested Admin/account lifecycle and audit invariants
- Tested Planning Engine
- Useful Dashboard foundation
- Teacher domain sufficient for class ownership/export needs
- Repeatable deployment
- Automated coverage for critical workflows
- Current public documentation

## Production Functions

Local development remains emulator-first. Deploy callable Functions only when Blaze is intentionally enabled and the production rules/function set have been reviewed using `FIREBASE_BILLING_RUNBOOK.md`.
