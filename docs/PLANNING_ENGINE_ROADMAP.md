# Planning Engine Roadmap

## Current v1

Implemented:

-   [x] Multiple candidate generation
-   [x] Historical partner avoidance
-   [x] Historical desk avoidance
-   [x] Historical exact-seat avoidance
-   [x] Priority-based comparison
-   [x] Structured violations
-   [x] Teacher candidate selection
-   [x] Manual override after generation
-   [x] Saved-plan history integration

## v1 hardening

-   [ ] Unit tests for each constraint
-   [ ] Comparator tests
-   [ ] Candidate uniqueness tests
-   [ ] Deterministic seeded generation for tests
-   [ ] Capacity edge-case tests
-   [ ] Empty/incomplete history tests
-   [ ] Performance tests

## v2 candidate features

Potential objectives:

-   [ ] Classroom zones (front/middle/back)
-   [ ] Support-seat preferences
-   [ ] Pinned/fixed students
-   [ ] Accessibility constraints
-   [ ] Distribution fairness
-   [ ] Better side-by-side candidate comparison

Any new objective must define its priority relative to existing
objectives.

## Separate product workflows

The following should not be silently mixed into the engine:

-   Attendance
-   Grades
-   Student voting
-   Messaging
-   Discipline records

If such data influences seating in the future, the product and privacy
implications should be designed explicitly.

## Teacher control remains mandatory

Future optimization should continue to produce recommendations rather
than automatically committing a final seating plan.
