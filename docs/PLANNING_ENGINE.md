# Planning Engine

## Purpose

The Planning Engine helps teachers create fairer seating arrangements by
comparing candidate plans against seating history.

Its product principle is:

> **Recommend, don't decide.**

The engine should explain why one candidate is stronger without taking
the final decision away from the teacher.

## Current inputs

``` js
{
  students,
  positions,
  historyPlans,
  options
}
```

`positions` represent physical room seats using:

``` js
{
  deskNumber,
  seatNumber
}
```

## Current historical objectives

Priority order:

1.  Repeated desk partners
2.  Repeated desks
3.  Repeated exact seats

A lower-priority improvement does not compensate for a worse
higher-priority result.

## Generation behavior

The current UI can request many attempts and several displayed results.
The engine:

1.  Generates candidate assignments.
2.  Evaluates historical conflicts.
3.  Compares candidates by objective priority.
4.  Deduplicates equivalent arrangements.
5.  Returns the strongest distinct candidates.

## Teacher control

The teacher can:

-   Enable/disable historical avoidance options
-   Generate recommendations
-   Inspect candidate quality/conflicts
-   Select a candidate
-   Manually modify assignments
-   Save the final plan

Generated output is a recommendation, not an automatic final record.

## Explainability

Violations are structured rather than stored as translated sentences.

Examples:

``` text
previous-partner
previous-desk
previous-seat
```

`SeatingPlanManager.vue` converts these structures into localized
messages.

## History

Only relevant saved seating-plan history should be considered.
Archived/inactive plans are excluded by the current planning workflow
when generating recommendations.

## Relationship to room layout

The engine reasons in terms of `deskNumber` and `seatNumber`. Visual
concepts such as:

-   Whiteboard
-   Teacher position
-   Classroom drawing
-   Excel layout

belong to the UI/export layer and do not alter the current engine
objectives.

## Non-goals for v1

The current engine does not yet model:

-   Front/back classroom zones
-   Accessibility/support seats
-   Pinned students
-   Student preference voting
-   Attendance
-   Grades
-   Social relationships beyond prior desk partners

These are future features and should be added deliberately.

## Related documents

-   `SEATING_ENGINE.md` --- implementation/API notes
-   `PLANNING_ENGINE_ROADMAP.md` --- future algorithm roadmap
-   `DECISIONS.md` --- architecture/product decisions
