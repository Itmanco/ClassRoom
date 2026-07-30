# Migration Progress

## Completed

✔ Login no longer depends on `appId`

✔ Session stores `activeSchool`

✔ `App.vue` passes `schoolId`

✔ `ClassroomPage` accepts `schoolId`

✔ Student and classroom services renamed from `appId` to `schoolId`

✔ Firestore rules updated

✔ 18 legacy student documents copied to `schools/school_japan/students`

✔ Student document IDs preserved

✔ No legacy student IDs missing at the destination

✔ Application loads and runs correctly after student migration

✔ New domain model approved: buildings, rooms, courses, classes, enrollments, and seating plans

✔ Legacy `classrooms` documents identified as historical seating plans

---

## Current Architecture Work

The old plan to copy:

```text
artifacts/classroom-b81c6/classrooms
↓
schools/school_japan/classrooms
```

has been replaced.

Revised target:

```text
artifacts/classroom-b81c6/classrooms/{documentId}
↓
schools/school_japan/classes/legacy_class_2025/seatingPlans/{documentId}
```

The six legacy documents must keep their current IDs and fields.

---

## Next

### Domain foundation

☐ implement Building service and validation

☐ create Building A1

☐ implement Room service and validation

☐ create the initial A1 rooms

☐ implement Course service and validation

☐ identify or create the course associated with the historical class

☐ implement Class service and validation

### Historical class and seating plans

☐ create `schools/school_japan/classes/legacy_class_2025`

☐ use real `courseId` and `roomId` references when known

☐ use `null` only for relationships that cannot be established truthfully

☐ create `scripts/migrateLegacySeatingPlans.js`

☐ add `migrate:seating-plans` npm command

☐ migrate six documents

☐ verify source IDs exist at destination

☐ verify layout loading in the application

☐ verify saving a new seating plan

### Compatibility

☐ introduce seating-plan service using `schoolId` and `classId`

☐ keep the existing classroom UI working during transition

### Future domain work

☐ building, room, course, and class management UI

☐ enrollments

☐ seating-history assignment rules

### Cleanup

☐ remove remaining `artifacts` references

☐ delete old collections only after full verification

☐ simplify migration-only compatibility code

## Domain foundation implementation

✔ Building service implemented
✔ Building UI implemented
☐ First building document created
☐ Room, course, and class services implemented

## Room foundation implementation

✔ `roomService.js` added

✔ Room Management page added

✔ Rooms reference active buildings through `buildingId`

✔ Room capacity is calculated as `deskCount × seatsPerDesk`

☐ Create the initial physical rooms for Building A1

- Course service and Course Management UI implemented under `schools/{schoolId}/courses`.

## Student CRUD implementation — completed 2026-07-30

The migrated `schools/{schoolId}/students` collection now has a complete management UI. Administrators can create, edit, search, reactivate, and archive students without deleting historical references. Student IDs remain immutable after creation because legacy and future seating plans use them as references.

### Class foundation implemented
Class CRUD now exists at `schools/{schoolId}/classes`. The next migration step is to create enrollments and move legacy seating layouts beneath the class that owns them.

### Enrollment foundation completed
- Class-scoped enrollment service and UI implemented.
- Students can be added, archived, and reactivated within a selected class.
- Ready for historical seating-plan migration and seating-plan management.
