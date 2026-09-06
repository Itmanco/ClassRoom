# TODO

This file contains actionable work only. Completed milestone history belongs in `CHANGELOG.md`; long-term direction belongs in `ROADMAP.md`.

**Last reviewed:** 2026-09-06

## Current release checkpoint

- [x] Refresh the documentation pack against the current source tree
- [x] Verify `user.updated` multi-school audit distribution in the emulator
- [x] Verify `user.archived` / `user.reactivated` membership distribution
- [x] Verify zero-membership system audit fallback
- [x] Run `npm run lint` after the Admin/audit changes
- [ ] Run `npm run build`
- [ ] Run `git diff --check`
- [ ] Review final `git status` / staged files
- [ ] Commit the current Admin/audit/documentation checkpoint
- [ ] Push `feature/audit-log` when the commit is ready
- [ ] Merge/deploy only after the branch regression check is complete

## Dashboard

- [x] Dashboard/Home page
- [x] Default page changed to Dashboard
- [x] Navigation entry/icon
- [x] Active student/class/room/course summary cards
- [x] Remove legacy Classroom page/components/service
- [ ] Connect recent activity when the desired product behavior is defined
- [ ] Implement messages/announcements only when a real workflow exists

## Multi-school/security

- [x] Canonical UID membership model
- [x] System Admin administration foundation
- [x] School Admin scoped user/membership administration
- [x] School Admin self-membership protection
- [x] System Admin self-role-change protection
- [x] System Admin self-archive protection
- [x] Last active System Admin demotion/archive protection
- [x] Cross-school Admin access rejection regression
- [x] Teacher access regression after Admin changes
- [x] User profile edit callable
- [x] Account archive/reactivate callable
- [x] Inactive-account application blocking
- [x] Multi-school audit distribution for user update/archive/reactivate
- [x] Zero-membership system audit fallback
- [ ] Enforce `memberId == userUid` on membership creation
- [ ] Prevent membership `userUid` changes
- [ ] Finish role permissions for non-Admin domain operations
- [ ] Harden students/buildings/rooms/courses/classes/enrollments/seatingPlans Firestore rules
- [ ] Move remaining privileged membership writes to callable Functions as appropriate
- [ ] Add automated tests for multi-school/no-school/invalid-active-school cases

## Audit

- [x] Student audit events
- [x] User creation/system-role/profile/status events
- [x] Membership audit events
- [x] System vs school scope filters
- [x] Changed field translations and before/after details
- [x] Resource-scoped multi-school user-event distribution
- [ ] Add school lifecycle audit events
- [ ] Add course/building/room/class audit coverage
- [ ] Add pagination and richer filtering when history size requires it
- [ ] Define retention/export policy before production-scale use

## Teachers

- [ ] Define teacher Firestore model
- [ ] Define class ↔ teacher relationship and main-teacher semantics
- [ ] Build teacher service + manager with EN/JA UI
- [ ] Add class teacher assignment workflow
- [ ] Surface teacher information in Class Workspace
- [ ] Integrate main teacher into Excel export

## Internationalization

- [ ] Friendly localized Firebase auth errors
- [ ] Review browser-native/service validation presentation
- [ ] Localize Excel export labels
- [ ] Final Japanese terminology pass
- [ ] Add bilingual screenshots
- [ ] Test long strings on narrow layouts

## Planning Engine

- [ ] Unit tests for constraints
- [ ] Comparator tests
- [ ] Candidate uniqueness tests
- [ ] Seeded generation for deterministic tests
- [ ] Capacity/empty-history edge cases
- [ ] Plan v2 constraints only after tests

## Engineering

- [ ] Add test framework and CI
- [ ] Reduce production console noise
- [ ] Lazy-load major pages
- [ ] Review bundle size
- [ ] Review Node/toolchain compatibility
- [ ] Audit dependencies without forced upgrades
- [ ] Evaluate Vue CLI → Vite migration separately

## Firebase deployment

- [x] Functions codebase and local emulators
- [x] Callable user administration functions
- [x] Persistent emulator import/export workflow
- [ ] Review production rules and callable deployment set before enabling Blaze
- [ ] Enable Blaze only for intentional production/demo Functions use; follow `FIREBASE_BILLING_RUNBOOK.md`
