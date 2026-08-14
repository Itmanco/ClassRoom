# Seating Engine Technical Notes

## Location

``` text
src/engine/seating/
├── SeatingEngine.js
└── constraints/
    ├── AvoidPreviousDesks.js
    ├── AvoidPreviousPartners.js
    ├── AvoidPreviousSeat.js
    └── history.js
```

The engine is plain JavaScript and is intentionally independent from
Vue, Firebase, i18n, and Excel export.

## Input

``` js
{
  students,
  positions,
  historyPlans,
  options
}
```

Positions use:

``` js
{
  deskNumber,
  seatNumber
}
```

## Candidate lifecycle

1.  Create/shuffle candidate assignments.
2.  Evaluate enabled historical constraints.
3.  Compare candidates lexicographically by objective priority.
4.  Deduplicate identical arrangements.
5.  Return the strongest distinct candidates.

## Objective order

1.  `repeatedPartners`
2.  `repeatedDesks`
3.  `repeatedSeats`
4.  Random tie-breaker when objective values are equal

There is no public weighted score where lower-priority objectives can
cancel a worse higher-priority objective.

## Public behavior

`generateSeatingCandidates()` returns structured candidate data
including:

-   Rank
-   Quality information
-   Assignments
-   Objective counts
-   Violations
-   Search statistics

The exact return shape is defined by `SeatingEngine.js` and should be
treated as source-of-truth.

## Constraint modules

### AvoidPreviousPartners

Detects students seated at the same desk together in historical plans.

### AvoidPreviousDesks

Detects a student returning to a previously used desk.

### AvoidPreviousSeat

Detects a student returning to the same desk/seat position.

### history.js

Contains shared history-processing logic used by constraints.

## Extension rules

New constraints should:

-   Remain framework-independent
-   Return structured data
-   Avoid localized strings
-   Be independently testable
-   Have a clearly defined priority
-   Avoid hidden coupling to Vue component state

## Planned engineering work

-   Comparator tests
-   Constraint unit tests
-   Candidate uniqueness tests
-   Deterministic/seeded test support
-   Edge-case tests for room capacity and incomplete assignments
-   Performance characterization for larger classes
