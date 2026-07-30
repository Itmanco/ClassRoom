# Firestore Schema

## Target Multi-School Schema

```text
schools/{schoolId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
├── classes/{classId}
│   ├── enrollments/{studentId}
│   └── seatingPlans/{seatingPlanId}
└── users/{uid}
```

The root `users/{uid}` profile remains responsible for authentication-related school selection through `activeSchool`.

All new domain documents use Firestore timestamps for `createdAt` and `updatedAt`. Legacy seating-plan fields remain unchanged during migration.

---

## User Profile

`users/{uid}`

```js
{
  displayName,
  email,
  role,
  activeSchool
}
```

---

## Student

`schools/{schoolId}/students/{studentId}`

```js
{
  name,
  hiragana,
  country,
  gender_id,
  isActive
}
```

Student document IDs are preserved because seating assignments reference them.

---

## Building

`schools/{schoolId}/buildings/{buildingId}`

Recommended document ID: the stable building code, for example `A1`.

```js
{
  code: "A1",
  name: "Building A1",
  floorCount: 3,
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Field rules:

- `code`: required, unique within the school, and stable after creation.
- `name`: required human-readable name.
- `floorCount`: required positive integer.
- `active`: supports archiving without deleting references.
- `createdAt`: set once when the document is created.
- `updatedAt`: refreshed whenever the document changes.

A building owns no rooms as nested documents. Rooms are stored at school level and reference their building through `buildingId`.

---

## Room

`schools/{schoolId}/rooms/{roomId}`

Recommended document ID: the stable room code, for example `A1F1C1`.

```js
{
  code: "A1F1C1",
  name: "Building A1 - Floor 1 - Classroom 1",
  buildingId: "A1",
  floor: 1,
  roomNumber: 1,
  deskCount: 9,
  seatsPerDesk: 2,
  capacity: 18,
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Field rules:

- `code`: required, unique within the school, and stable after creation.
- `name`: required human-readable label.
- `buildingId`: required reference by ID to `buildings/{buildingId}`.
- `floor`: required positive integer that must not exceed the building's `floorCount`.
- `roomNumber`: required positive integer within the floor.
- `deskCount`: required non-negative integer.
- `seatsPerDesk`: required positive integer.
- `capacity`: required non-negative integer; initially expected to equal `deskCount × seatsPerDesk`.
- `active`: supports retiring a physical room without deleting class history.

Rooms describe physical spaces only. They do not contain enrolled students, courses, classes, or seating-plan history.

---

## Course

`schools/{schoolId}/courses/{courseId}`

Recommended document ID: a stable normalized code such as `java_basic`.

```js
{
  code: "JAVA-BASIC",
  name: "Java Basics",
  description: "Introductory Java programming course",
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Field rules:

- `code`: required and unique within the school.
- `name`: required human-readable course name.
- `description`: optional plain-text description.
- `active`: allows a course to stop accepting new classes while preserving history.

A course defines a reusable subject or program. It does not directly own students or seating plans.

---

## Class

`schools/{schoolId}/classes/{classId}`

Recommended document ID: a stable descriptive ID such as `java_basic_2026_a`.

```js
{
  name: "Java Basics 2026 A",
  courseId: "java_basic",
  roomId: "A1F1C1",
  schoolYear: 2026,
  term: "1",
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Field rules:

- `name`: required human-readable class name.
- `courseId`: required reference by ID to `courses/{courseId}` for normal classes.
- `roomId`: nullable reference by ID to the class's default physical room.
- `schoolYear`: required four-digit year.
- `term`: optional school-defined string such as `1`, `Spring`, or `Full Year`.
- `active`: distinguishes current classes from archived classes.

A class represents one specific group of students taking a course. It owns enrollments and seating-plan history. A room may be reused by many classes.

The migration-only class `legacy_class_2025` may temporarily use `null` for `courseId` and `roomId` if the original relationships cannot be established truthfully.

---

## Enrollment

`schools/{schoolId}/classes/{classId}/enrollments/{studentId}`

The enrollment document ID must equal the enrolled student's document ID.

```js
{
  studentId: "10",
  active: true,
  enrolledAt: Timestamp,
  withdrawnAt: null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Field rules:

- `studentId`: required and must match the enrollment document ID.
- `active`: identifies current membership without deleting historical enrollment.
- `enrolledAt`: required timestamp.
- `withdrawnAt`: nullable timestamp; set when the enrollment becomes inactive.

Students remain school-level records. Enrollments connect those students to one or more classes.

---

## Seating Plan

`schools/{schoolId}/classes/{classId}/seatingPlans/{seatingPlanId}`

New seating plans should use:

```js
{
  title: "July 2026",
  effectiveDate: Timestamp,
  roomId: "A1F1C1",
  status: "active",
  studentAssignments: [
    {
      studentId: "10",
      deskNumber: 1,
      seatPosition: "left"
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Field rules:

- `title`: required human-readable title.
- `effectiveDate`: required timestamp representing when the arrangement takes effect.
- `roomId`: required snapshot of the physical room used by this plan.
- `status`: one of `draft`, `active`, or `archived`.
- `studentAssignments`: required array of student-to-seat assignments.
- `studentId`: stored as a string in new plans. Legacy numeric values remain unchanged during migration.
- `deskNumber`: required positive integer.
- `seatPosition`: optional stable position within a shared desk, such as `left` or `right`.

A seating plan is immutable historical evidence after it becomes archived. Corrections should be deliberate and must not silently rewrite previous plans.

During migration, existing legacy fields remain unchanged for backward compatibility:

```js
{
  title,
  creationDate,
  studentAssignments
}
```

---

## Legacy Schema

```text
artifacts/classroom-b81c6
├── students/{studentId}
└── classrooms/{documentId}
```

Despite the collection name, legacy `classrooms` documents are saved historical seating plans.

---

## Current Migration Targets

Students:

```text
artifacts/classroom-b81c6/students/{studentId}
↓
schools/school_japan/students/{studentId}
```

Historical seating plans:

```text
artifacts/classroom-b81c6/classrooms/{documentId}
↓
schools/school_japan/classes/legacy_class_2025/seatingPlans/{documentId}
```

The migration must preserve document IDs, `title`, `creationDate`, `studentAssignments`, and the current numeric `studentId` values.
