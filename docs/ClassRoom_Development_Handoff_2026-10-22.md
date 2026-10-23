# ClassRoom — Development Handoff

**Checkpoint date:** 2026-10-22
**Repository:** https://github.com/Itmanco/ClassRoom
**Branch:** `feature/room-reservations`
**Last verified commit:** `38d9c98` — `feat: add school operating hours and reservation validation`
**Workstation:** Linux Mint, `~/Projects/ClassRoom`; previously MacBook `/Users/Jaime/Projects/ClassRoom`.

## Project and stack

Multi-school classroom management application. Vue 3 (Vue CLI), JavaScript, Firebase Authentication, Cloud Firestore, Firebase Cloud Functions (Node 22), Firebase Emulator Suite, vue-i18n (English and Japanese), ESLint. Roles include system/school administrators, teachers, students. Existing class-room assignments and permission checks must remain intact.

## Working conventions

- Act as senior engineering partner. Inspect current code before editing; prefer coordinated, minimal, reviewable changes rather than repeated one-line edits.
- Preserve existing functionality, permissions, audit logs, timezone behavior, and bilingual UI.
- Do not commit, push, deploy, delete/clear/reset emulator data, or overwrite local data without explicit user approval.
- Emulator data (`emulator-data/`) and backups are not in Git; moving workstations does not transfer those datasets.
- Production launch will use a fresh Firestore dataset; do not migrate legacy/emulator data by default.
- Do not assume remote GitHub code includes uncommitted local edits. Confirm branch and working tree before edits.

## Verified checkpoint

MacBook committed and pushed `38d9c98` to `origin/feature/room-reservations`. Linux workstation fetched and fast-forwarded to same commit. `git status` on Mac was clean; Linux production build completed successfully with 0 errors, 7 existing no-console warnings and advisory bundle-size warnings.

### Completed school operating hours

- `schools/{schoolId}.operatingHours`: all seven lowercase weekdays, arrays of `{startTime:'HH:mm', endTime:'HH:mm'}`; empty array means closed; multiple non-overlapping intervals allowed.
- `functions/lib/schoolOperatingHours.js`: validation and reservation-hours check; sorted nonoverlapping intervals, max 20/day, start before end.
- `functions/index.js`: callable `saveSchoolOperatingHours` with school-admin authorization, transaction that checks future active reservations, conflict handling, audit; `createRoomReservation` checks school-wide operating hours, class-room assignment, timezone, transaction conflicts.
- Firestore rules and indexes updated.
- `src/services/schoolSettingsService.js`: `getSchoolOperatingHours`, `saveSchoolOperatingHours`.
- `src/components/SchoolOperatingHoursEditor.vue` integrated into `src/pages/AdminSchoolSettings.vue`; English/Japanese translations, open/closed toggles, intervals, saving and confirmation on Back via `confirmDiscardChanges` and parent `handleBack`. Browser refresh and unrelated app navigation may not yet be guarded.
- Previous reported tests: 10 operating-hours unit tests + 12 callable operating-hours tests + 13 reservation callable tests = 35 passed. Browser operating-hours workflow previously checked successfully.

## Current reservation UI and service

- `src/pages/RoomReservationManager.vue`: existing creation form, classes and rooms listeners, timezone load, reservation listener, reservation table. Form ties room to selected class. Preserve callable `createRoomReservation` and authorization.
- `src/services/roomReservationService.js`: existing `watchRoomReservations()` and **already implemented** `watchDailyRoomReservations(schoolId, localDate, onData, onError)`. Daily listener queries `where('localDate','==',date)`, client-filters `status === 'active'`, sorts by `localStartTime`. Do **not** add this function again. It is present in committed GitHub source at `38d9c98`.
- `src/services/schoolSettingsService.js`: operating hours and timezone retrieval available.
- Old room availability viewer/editor and data have not been removed. Do not delete prematurely.

## Current task: Phase 3 — Daily Room Reservation Timeline

Desired UX:
1. Daily timeline with rooms as rows and time horizontally, using school timezone and school-wide operating hours; handle multiple intervals/day and closed days.
2. Previous day / Today / Next day / date picker.
3. Summary metrics: reservations, occupied rooms, available rooms (define clearly based on active rooms and date).
4. Colored clickable reservation blocks, accurate position and duration; details show class, room, exact start/end.
5. `+ New reservation` toggles existing creation form, rather than form always visible; selected date can prefill form.
6. Real-time updates, loading/error/empty states, responsive horizontal scrolling, accessibility and EN/JA translations.
7. Preserve existing creation validation, class-room assignment, permissions, and Firebase callable.

**Next exact step:** On Linux, optionally confirm `grep -n 'watchDailyRoomReservations' src/services/roomReservationService.js` (already verified in GitHub source). Then inspect current committed `RoomReservationManager.vue`, `roomReservationService.js`, operating-hours service, and `reservations` i18n keys. Implement coordinated UI changes, then run ESLint, build, `git diff --check`, and browser testing. Avoid unnecessary repeated verification cycles.

## Important caveats

- The last build passed on Linux on 2026-10-22. No deployment occurred.
- No new timeline UI implementation has been done yet beyond the existing daily listener.
- One earlier staging check reported trailing blank lines at EOF in three newly added files; commit succeeded anyway. This is minor housekeeping, not a blocker.
- Before modifying Firestore queries, check schema and rules/index needs; do not assume an index exists.

## Recovery prompt for a new ChatGPT conversation

> Continue developing my ClassRoom application using the attached `ClassRoom_Development_Handoff_2026-10-22.md` as the authoritative handoff and the GitHub repository `Itmanco/ClassRoom`, branch `feature/room-reservations`, commit `38d9c98` as the saved code checkpoint. I am on Linux Mint in `~/Projects/ClassRoom`. We are starting Phase 3, implementing the Daily Room Reservation Timeline. The daily Firestore listener `watchDailyRoomReservations()` already exists. Please inspect current source and translations before editing, preserve backend permissions and existing creation logic, propose coordinated implementation changes, and do not commit, push, deploy, or reset emulator data without permission. If local files have diverged, ask for relevant local diffs rather than assuming GitHub reflects uncommitted changes.
