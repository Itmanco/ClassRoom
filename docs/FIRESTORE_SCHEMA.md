# Firestore Schema

## Current

schools

    school_japan

        students

            studentId

        classrooms

            classroomId

        users

            uid

---

## Legacy

artifacts

    classroom-b81c6

        students

        classrooms

---

## User Profile

users/{uid}

{
    displayName,
    email,
    role,
    activeSchool
}

---

## Student

students/{studentId}

{
    name,
    hiragana,
    country,
    gender_id,
    isActive
}

---

## Classroom

classrooms/{classroomId}

{
    seats,
    layout,
    settings
}