# Architecture

Authentication

Firebase Auth

↓

User

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

---

Services

StudentService

getStudents(schoolId)

saveStudents(schoolId)

watchStudents(schoolId)

---

ClassroomService

getClassrooms(schoolId)

saveClassroomLayout(schoolId)

watchClassrooms(schoolId)

---

Firestore

schools

    schoolId

        students

        classrooms

        users