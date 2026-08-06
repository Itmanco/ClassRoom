# Firestore Schema

## Root structure

```text
schools/{schoolId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
└── classes/{classId}
    ├── enrollments/{studentId}
    └── seatingPlans/{seatingPlanId}
```

## Students

Path:

```text
schools/{schoolId}/students/{studentId}
```

Representative fields:

```js
{
  id: number,
  name: string,
  hiragana: string,
  country: string,
  gender_id: number,
  isActive: boolean
}
```

Student IDs remain stable because enrollments and historical seating plans reference them.

## Buildings

Path:

```text
schools/{schoolId}/buildings/{buildingId}
```

Representative fields:

```js
{
  code: string,
  name: string,
  floorCount: number,
  active: boolean
}
```

## Rooms

Path:

```text
schools/{schoolId}/rooms/{roomId}
```

Representative fields:

```js
{
  code: string,
  name: string,
  buildingId: string,
  floor: number,
  roomNumber: number,
  deskCount: number,
  seatsPerDesk: number,
  capacity: number,
  active: boolean
}
```

## Courses

Path:

```text
schools/{schoolId}/courses/{courseId}
```

Representative fields:

```js
{
  code: string,
  name: string,
  description: string,
  active: boolean
}
```

## Classes

Path:

```text
schools/{schoolId}/classes/{classId}
```

Representative fields:

```js
{
  code: string,
  name: string,
  courseId: string,
  roomId: string,
  academicYear: number,
  semester: number,
  active: boolean
}
```

## Enrollments

Path:

```text
schools/{schoolId}/classes/{classId}/enrollments/{studentId}
```

Representative fields:

```js
{
  studentId: string | number,
  active: boolean
}
```

An enrollment belongs to exactly one class. The Class Workspace reflects this ownership.

## Seating Plans

Path:

```text
schools/{schoolId}/classes/{classId}/seatingPlans/{seatingPlanId}
```

Representative fields:

```js
{
  title: string,
  planDate: string,
  roomId: string,
  deskCount: number,
  seatsPerDesk: number,
  assignments: [
    {
      studentId: string | number,
      deskNumber: number,
      seatNumber: number
    }
  ],
  active: boolean
}
```

## Archiving policy

Referenced records should normally be archived instead of deleted.

Reasons:

- Historical plans need student references.
- Classes need course and room references.
- Reporting may need inactive records.
- Restoration/reactivation remains possible.

## Future authorization model

A future user-school membership structure should support:

- School administrator
- Teacher/editor
- Viewer

Firestore rules must verify membership and role independently of the UI.
