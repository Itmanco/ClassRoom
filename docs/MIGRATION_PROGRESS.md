# Migration Progress

## Completed

✔ Login no longer depends on appId

✔ Session stores activeSchool

✔ App.vue passes schoolId

✔ ClassroomPage accepts schoolId

✔ studentService

appId

↓

schoolId

✔ classroomService

appId

↓

schoolId

✔ Firestore rules updated

---

## Current

Migrating Firestore data

Old

artifacts/classroom-b81c6

↓

New

schools/school_japan

---

## Remaining

Students

☐ copy documents

☐ verify listener

☐ verify save

Classrooms

☐ migrate collection

☐ verify layout loading

Cleanup

☐ remove artifacts references

☐ delete old collection

☐ simplify code