# Firestore Schema

## Overview

School-owned data is stored below `schools/{schoolId}`. User
identity/profile data is stored under `users/{uid}`.

``` text
users/{uid}

schools/{schoolId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
└── classes/{classId}
    ├── enrollments/{studentId}
    └── seatingPlans/{seatingPlanId}
```

The current schema favors stable IDs and archive flags so historical
seating/enrollment references remain valid.

## Users

Path:

``` text
users/{uid}
```

Observed/current profile shape includes fields such as:

``` js
{
  displayName: "Motta Jaime",
  email: "user@example.com",
  role: "admin",
  activeSchool: "school_japan",
  schools: ["school_japan"],
  language: "en",
  photoURL: "",
  firstName: "Jaime",
  lastName: "Motta",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Notes:

-   `uid` comes from Firebase Authentication.
-   `schools` contains school IDs available to the user.
-   `activeSchool` identifies the current working school.
-   `role` exists in the profile, but the complete authorization model
    is not yet finished.
-   `language` may coexist with locally persisted UI language;
    application behavior is defined by current source code.

## Schools

Path:

``` text
schools/{schoolId}
```

Example fields:

``` js
{
  name: "Japanese Language School",
  country: "Japan",
  city: "Sapporo",
  ownerUid: "",
  createdAt: Timestamp
}
```

## Students

Path:

``` text
schools/{schoolId}/students/{studentId}
```

Student IDs are intended to remain stable. Students are archived rather
than destructively deleted when historical references may exist.

Student fields are defined by `studentService.js` and the current
Student Management form.

## Buildings

Path:

``` text
schools/{schoolId}/buildings/{buildingId}
```

Buildings describe school facilities and floor count. Archived buildings
remain available for historical references.

## Rooms

Path:

``` text
schools/{schoolId}/rooms/{roomId}
```

Current room model includes:

``` js
{
  code: "A1F1C1",
  name: "Building A1 - Floor 1 - Classroom 1",
  buildingId: "A1",
  floor: 1,
  roomNumber: 1,
  deskCount: 9,
  seatsPerDesk: 2,
  capacity: 18,
  teacherPosition: "front-left",
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Supported teacher positions:

``` text
front-left
front-right
back-left
back-right
```

Older room documents may not contain `teacherPosition`. UI/service
fallback behavior should default them safely to `front-left` until
saved.

## Courses

Path:

``` text
schools/{schoolId}/courses/{courseId}
```

Courses use stable identifiers/codes and archive state.

## Classes

Path:

``` text
schools/{schoolId}/classes/{classId}
```

A class connects course, room, and academic context.

Typical relationships:

``` text
Class
├── courseId
├── roomId
├── academic year
├── semester
└── active
```

Refer to `classService.js` for the exact current field names.

## Enrollments

Path:

``` text
schools/{schoolId}/classes/{classId}/enrollments/{studentId}
```

Enrollments connect a school student to a class.

Behavior:

-   Prevent duplicate active enrollment
-   Archive instead of delete
-   Allow reactivation
-   Preserve the student ID relationship

## Seating plans

Path:

``` text
schools/{schoolId}/classes/{classId}/seatingPlans/{seatingPlanId}
```

Normalized plan shape:

``` js
{
  title: "Plan title",
  planDate: "YYYY-MM-DD",
  roomId: "A1F1C1",
  deskCount: 9,
  seatsPerDesk: 2,
  capacity: 18,
  assignments: [
    {
      studentId: "student-id",
      deskNumber: 1,
      seatNumber: 1
    }
  ],
  active: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

Validation ensures:

-   Desk numbers are in range
-   Seat numbers are in range
-   A student is not assigned twice
-   A physical seat is not assigned twice

## School ownership

Every school-domain service requires `schoolId`. Class-owned collections
additionally require `classId`.

This is a key boundary:

``` text
schoolId = organization context
classId  = selected class context
```

They should never be conflated.

## Archive policy

Where historical references matter, use:

``` js
active: false
```

instead of deleting the document.

This is particularly important for:

-   Students
-   Courses
-   Buildings
-   Rooms
-   Classes
-   Enrollments
-   Seating plans

## Security status

Authentication is implemented, but profile membership and roles should
not be treated as complete authorization by themselves.

Future security work should enforce:

-   User belongs to requested school
-   Role permits requested operation
-   Cross-school access is rejected
-   Administrative operations are restricted

Firestore rules must be reviewed alongside the final membership model.

## Local schema inspection

Development utilities:

``` text
scripts/exportSchoolStructure.js
scripts/createTestSchool.js
scripts/migrateStudents.js
```

Local exports such as `school-structure.json` and Firebase Admin
credentials are ignored and must not be committed.
