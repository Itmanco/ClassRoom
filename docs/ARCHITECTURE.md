# Architecture

## Application Flow

Firebase Auth

↓

User Profile

↓

activeSchool

↓

Session

↓

Vue Components

↓

Services

↓

Firestore

Components must not depend directly on authentication. They receive the current `schoolId` through the initialized session.

---

## Domain Model

### School

Owns students, buildings, rooms, courses, classes, and users.

### Building

A physical building belonging to a school, for example `A1`.

### Room

A physical teaching space inside a building, for example `A1F1C1`.

A room stores stable physical information such as floor, capacity, desk count, and seat layout. It does not own students or seating history.

### Course

A subject or program offered by a school, such as English, Mathematics, or Java Basics.

### Class

A specific group of students taking a course. A class may be assigned to a room and owns its enrollments and seating-plan history.

### Enrollment

Connects a student to a class.

### Seating Plan

A dated seating arrangement for one class. Historical plans are retained so future assignments can avoid repeating desks and desk partners too often.

---

## Ownership

School

├── Students

├── Buildings

├── Rooms

├── Courses

├── Classes

│   ├── Enrollments

│   └── Seating Plans

└── Users

---

## Services

### Student Service

- `getStudents(schoolId)`
- `saveStudents(schoolId)`
- `watchStudents(schoolId)`

### Future Building Service

- `getBuildings(schoolId)`
- `saveBuilding(schoolId, building)`
- `watchBuildings(schoolId)`

### Future Room Service

- `getRooms(schoolId)`
- `saveRoom(schoolId, room)`
- `watchRooms(schoolId)`

### Future Course Service

- `getCourses(schoolId)`
- `saveCourse(schoolId, course)`
- `watchCourses(schoolId)`

### Future Class Service

- `getClasses(schoolId)`
- `saveClass(schoolId, classRecord)`
- `watchClasses(schoolId)`

### Future Seating Plan Service

- `getSeatingPlans(schoolId, classId)`
- `saveSeatingPlan(schoolId, classId, seatingPlan)`
- `watchSeatingPlans(schoolId, classId)`

The current classroom service remains temporarily for backward compatibility until the seating-plan migration and UI verification are complete.

## Domain Dependencies

Create and validate entities in this order:

1. Building
2. Room, which references a building
3. Course
4. Class, which references a course and optionally a default room
5. Enrollment, which references a school student
6. Seating plan, which belongs to a class and records the room used

Services must validate referenced IDs before writing dependent records. Physical rooms never own students or seating history.

---

## Migration Compatibility

The legacy collection named `classrooms` contains historical seating plans, not physical room records.

Legacy source:

`artifacts/classroom-b81c6/classrooms/{documentId}`

Revised destination:

`schools/school_japan/classes/legacy_class_2025/seatingPlans/{documentId}`

Document IDs and existing fields must remain unchanged during the first migration step.
