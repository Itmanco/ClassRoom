# Architecture Decisions

## 001 — Use the active school from the session

The application uses `session.activeSchool` instead of a hardcoded school ID.

## 002 — Store data below `schools/{schoolId}`

This supports data isolation and future multi-school access.

## 003 — Preserve referenced identifiers

Student and domain IDs remain stable because historical and related documents reference them.

## 004 — Separate physical rooms from academic classes

A room is a physical resource. A class is an academic group that references a room and course.

## 005 — Archive instead of deleting history

Historical relationships and seating plans must remain valid.

## 006 — Isolate the Planning Engine

The engine is independent of Vue and Firebase.

## 007 — Treat historical seating rules as soft preferences

Perfect avoidance eventually becomes impossible. Generation must continue and explain compromises.

## 008 — Compare objectives by priority

1. Repeated partners
2. Repeated desks
3. Repeated exact seats
4. Random tie-breaker

## 009 — Return three recommendations

The teacher compares alternatives and makes the final decision.

## 010 — Keep student voting separate

Voting may become a future workflow, but it is not an optimization objective.

## 011 — Introduce i18n before further expansion

This limits additional hardcoded text and supports Japanese demonstrations.

## 012 — Put language selection in Settings

Language is global but does not require permanent navigation space.

## 013 — Keep English as the development language

Code, commits, and technical documentation remain English.

## 014 — Defer localized validation

Application-controlled localized validation belongs to a separate milestone.

## 015 — Add a Class Workspace

Class-owned workflows are grouped under a selected class.

```text
Class
├── Overview
├── Students
└── Seating Plans
```

## 016 — Remove class-owned workflows from top-level navigation

Enrollments and Seating Plans are not independent application contexts. Both require a class.

Benefits:

- Reduces duplicate class selectors
- Matches Firestore ownership
- Improves teacher workflow
- Creates room for future class tabs

## 017 — Keep school and class context separate

`schoolId` and `classId` are always passed independently.

This prepares the application for a future school selector and prevents class context from leaking between schools.

## 018 — Clear class context during top-level navigation

Leaving the workspace clears the selected class.

A future school change must do the same.
