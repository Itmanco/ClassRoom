# AI Context

This project is actively developed together with ChatGPT.

When continuing work:

- Read PROJECT_CONTEXT.md
- Read MIGRATION_PROGRESS.md
- Read FIRESTORE_SCHEMA.md
- Read DECISIONS.md

Important rules

- Never change architecture without discussion.
- Prefer small commits.
- Keep backward compatibility until migration finishes.
- Explain code before making major changes.
- Avoid unnecessary refactors.

Current goal

Finish the multi-school migration while separating physical rooms, classes, and historical seating plans.

Current school

school_japan

Legacy app

classroom-b81c6

Current status

Students have been migrated and verified. The domain schemas are defined. The next task is to implement the Building service, create Building A1, and then proceed through Rooms, Courses, and Classes before migrating the six historical seating plans.
## Current implementation status

The Building service and Building management UI are implemented. The next task is to verify the screen locally and create the first `A1` building document through the application.

## Current implementation checkpoint — Rooms

Building Management is working. Room Management has now been added using `schools/{schoolId}/rooms/{roomId}`. Rooms reference buildings by `buildingId`, calculate capacity from desks and seats per desk, and are archived rather than deleted. The next verification task is to create and inspect the first A1 rooms before implementing Courses.

- Course Management is implemented using `courseService.js` and `CourseManager.vue`.

## Student Management status

Student Management is now a complete school-scoped CRUD feature. It uses `studentService.js`, listens to `schools/{schoolId}/students` in real time, preserves numeric IDs, and archives records through `isActive: false` rather than deletion. Class and enrollment work should build on these student records.

### Current implementation status
Class Management is implemented. A class references `courseId` and `roomId` and stores an academic year, semester, and active state. Enrollments and seating plans remain the next features.

## Current Implementation Update: Enrollments
Enrollment Management is implemented at `schools/{schoolId}/classes/{classId}/enrollments/{studentId}`. Enrollment documents reference existing school students; student data is not duplicated. Archiving sets `active: false` so historical class membership remains available.

## Current implementation update — Seating Plans

The application now includes manual class-scoped Seating Plan Management. A plan uses the selected class, its active enrollments, and its assigned room's `deskCount` and `seatsPerDesk`. Assignments store `studentId`, `deskNumber`, and `seatNumber`. Legacy seating records are disposable sandbox data and will not be migrated. The next major feature is history-aware random seating generation.

## Current seating engine state

The Seating Plan page now calls a pure JavaScript planning engine under `src/engine/seating`. The teacher can select historical constraints, generate or rerun previews, inspect a score and violation report, manually adjust the preview, and save only the accepted plan. Student voting on multiple candidate plans is deferred.

## Planning Engine development rule

Before implementing any Planning Engine change, review:

- `docs/PLANNING_ENGINE.md`
- `docs/PLANNING_ENGINE_ROADMAP.md`
- `docs/DECISIONS.md`

Planning Engine v1 uses priority-based comparison, not weighted scoring. It recommends the three strongest distinct arrangements and lets the teacher choose which one to save. Student voting is a separate future workflow.
