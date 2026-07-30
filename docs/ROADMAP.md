# Classroom Manager Roadmap

This document describes the long-term vision of the Classroom Manager project.

It is intended to guide future development and help prioritize new features.

---

# Vision

Build a modern, scalable classroom management platform that supports multiple schools while remaining simple to use for teachers.

Core principles:

- Multi-school architecture
- Clean UI
- Fast performance
- Easy maintenance
- Professional codebase
- Incremental development

---

# Current Phase

## Phase 2 - Multi-School Migration

Status

🚧 In Progress

Objectives

- Replace appId with schoolId
- Support multiple schools
- Preserve backward compatibility
- Migrate Firestore data
- Remove legacy artifacts structure

Tasks

### Authentication

- [x] Firebase Authentication
- [x] User Profile
- [x] activeSchool
- [x] Session initialization

### Services

- [x] Rename appId → schoolId
- [ ] Verify every service
- [ ] Remove legacy references

### Firestore

- [x] Migrate Students
- [x] Define field-level domain schemas
- [ ] Add Building, Room, Course, and Class services
- [ ] Create the initial domain records
- [ ] Create the historical class
- [ ] Migrate legacy classroom documents as seating plans
- [ ] Verify listeners
- [ ] Remove artifacts collection

Completion Goal

A fully working application using only:

schools/{schoolId}

---

# Phase 3 - School Administration

Objectives

Allow one Firebase project to host multiple schools.

Features

- School creation
- School settings
- School logo
- School theme
- Academic year
- Grade configuration
- Classroom management

Potential Firestore

schools

    schoolId

        settings

        buildings

        rooms

        courses

        classes

        students

        teachers

        users

---

# Phase 4 - User Roles

Objectives

Different permissions for different users.

Roles

Administrator

- Full access

Teacher

- Classroom management
- Attendance
- Student information

Assistant

- Limited editing

Viewer

- Read only

Future Firestore

users

    uid

        role

        activeSchool

        permissions

---

# Phase 5 - Student Management

Current

Basic student information

Future

Student profile

Photo

Emergency contacts

Guardians

Medical notes

Special needs

Birthday

Nationality

Attendance history

Transfer history

Archive

---

# Phase 6 - Buildings, Rooms, Courses, Classes, and Seating Management

Manage the physical and academic foundations separately, then improve seating-plan editing and historical assignment rules.

Features

Drag & Drop

Seat templates

Multiple layouts

Group seating

Seat locking

Teacher desk

Zoom

Undo / Redo

---

# Phase 7 - Attendance

Daily attendance.

Attendance states

Present

Absent

Late

Early Leave

Excused

Reports

Monthly

Semester

Yearly

---

# Phase 8 - Reporting

Generate reports.

Examples

Attendance

Seat history

Student list

Class list

Enrollment

Export

PDF

CSV

Excel

---

# Phase 9 - Communication

Teacher ↔ Parent

Future ideas

Announcements

Homework

Messages

Events

Notifications

---

# Phase 10 - Analytics

Dashboard

Students

Attendance %

Enrollment

Seat usage

School statistics

Charts

Future

Trend analysis

Risk indicators

Predictions

---

# Phase 11 - Mobile Experience

Responsive UI

Tablet optimization

Touch support

Offline mode

PWA

---

# Phase 12 - Internationalization

Support multiple languages.

Initially

English

Japanese

Later

Spanish

Portuguese

French

Translation strategy

Vue i18n

---

# Technical Improvements

Backend

- Firestore optimization
- Better indexes
- Security Rules
- Cloud Functions

Frontend

- Lazy loading
- Component cleanup
- Better routing
- State management improvements

Developer Experience

- Better documentation
- Automated tests
- GitHub Actions
- CI/CD

---

# Code Quality Goals

Maintain:

✔ Small components

✔ Reusable services

✔ Simple Firestore structure

✔ Clear naming

Avoid:

✘ Large components

✘ Duplicate logic

✘ Hardcoded values

✘ Breaking changes

---

# Migration Rules

Every migration should follow:

Plan

↓

Small implementation

↓

Testing

↓

Verification

↓

Cleanup

Never skip verification.

---

# Release Strategy

Major features should be completed independently.

Example

Authentication

↓

Students

↓

Classrooms

↓

Attendance

↓

Reports

↓

Analytics

Avoid implementing multiple large features simultaneously.

---

# Long-Term Vision

The final application should support:

- Multiple schools
- Thousands of students
- Multiple teachers
- Multiple classrooms
- Real-time updates
- Secure authentication
- Clean architecture
- Easy maintenance
- Professional documentation

without requiring major architectural rewrites.

---

# Current Priority

1. Finish Firestore migration
2. Verify multi-school support
3. Remove legacy architecture
4. Improve classroom management
5. Build attendance module

---

# Definition of Done

The migration is complete when:

- No reference to appId exists in the frontend.
- Firestore uses only schools/{schoolId}.
- Students load correctly.
- Classes and historical seating plans load correctly.
- Realtime listeners work.
- Save operations work.
- Legacy artifacts collection can be safely removed.
- Documentation reflects the final architecture.