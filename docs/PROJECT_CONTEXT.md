# Classroom Manager

## Overview

Classroom Manager is a Vue 3 + Firebase application used by schools to manage:

- Students
- Classrooms
- Seating layouts
- Attendance
- Future multi-school support

The project originally supported only one school and is being migrated to support multiple schools.

---

## Tech Stack

Frontend
- Vue 3
- Vue Router
- Vite

Backend
- Firebase Authentication
- Firestore
- Firebase Storage

---

## Current Branch

migration/schools

---

## Current Status

✅ Authentication works

✅ Session initialization works

✅ User Profile loading works

✅ activeSchool stored in session

✅ ClassroomPage receives schoolId

✅ Services renamed appId → schoolId

🚧 Firestore migration in progress

---

## Firestore

Old

artifacts/{appId}/

New

schools/{schoolId}/

Current school

school_japan

Old app id

classroom-b81c6

---

## Current Issue

Students are not loading because data has not yet been migrated from

artifacts/classroom-b81c6/students

to

schools/school_japan/students