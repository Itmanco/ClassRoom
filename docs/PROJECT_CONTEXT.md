# Classroom Manager

## Overview

Classroom Manager is a Vue 3 + Firebase application for schools to manage:

- students
- buildings and physical rooms
- courses and classes
- class enrollment
- current and historical seating plans
- future attendance features
- multiple schools

The project originally supported one school and used the ambiguous term `classrooms` for saved seating arrangements. It is being migrated to a clearer multi-school domain model.

---

## Tech Stack

Frontend:

- Vue 3
- Vue Router
- Vue CLI

Backend:

- Firebase Authentication
- Firestore
- Firebase Storage

---

## Current Branch

`feature/student-management`

---

## Current Status

✅ Authentication works

✅ Session initialization works

✅ User profile loading works

✅ `activeSchool` is stored in the session

✅ Components receive `schoolId`

✅ Services use `schoolId` instead of `appId`

✅ 18 students migrated with unchanged IDs

✅ Application works after the student migration

✅ New domain model approved

🚧 Building, room, course, and class foundations are next

---

## Domain Language

### Room

A physical location such as `A1F1C1`.

### Course

A subject or program offered by the school.

### Class

A group of enrolled students taking a course. It may be assigned to a room.

### Seating Plan

A dated seating arrangement for a class. Previous plans remain available so future seat generation can consider previous desks and desk partners.

---

## Firestore Migration

Legacy root:

`artifacts/classroom-b81c6`

New school root:

`schools/school_japan`

Students have been migrated from:

`artifacts/classroom-b81c6/students`

into:

`schools/school_japan/students`

The six legacy documents under:

`artifacts/classroom-b81c6/classrooms`

are historical seating plans, not physical classroom records.

Their revised destination is:

`schools/school_japan/classes/legacy_class_2025/seatingPlans`

Before that migration, the project will introduce the Building, Room, Course, and Class services so the historical class can use real relationships wherever they are known.

---

## Compatibility Rule

Do not delete the old collections or remove the existing classroom UI until:

- all six seating plans are migrated;
- their document IDs and assignments are verified;
- historical plans load correctly;
- saving a new plan works through the new path.
