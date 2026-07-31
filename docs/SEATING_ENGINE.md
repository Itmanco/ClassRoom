# Seating Engine Technical Notes

The seating engine is the algorithmic core of the broader Classroom Planning Engine. The product philosophy and comparison priorities are defined in `PLANNING_ENGINE.md`.

## Version 1 input

```js
{
  students,
  positions,
  historyPlans,
  options
}
```

Positions use `deskNumber` and `seatNumber`. The engine is independent from Vue and Firestore.

## Candidate lifecycle

1. Shuffle students and positions.
2. Build a complete candidate assignment.
3. Evaluate repeated partners, desks, and exact seats independently.
4. Compare candidates lexicographically in objective priority order.
5. Deduplicate identical arrangements.
6. Return the best three candidates.

## Objective order

1. `repeatedPartners`
2. `repeatedDesks`
3. `repeatedSeats`
4. random tie-breaker

There is no combined public score. A lower-priority result never compensates for a worse higher-priority result.

## Public API

`generateSeatingCandidates()` returns:

```js
{
  candidates: [
    {
      rank,
      quality,
      assignments,
      objectives,
      violations
    }
  ],
  attemptsRequested,
  uniqueCandidatesEvaluated,
  historyPlansConsidered
}
```

`generateSeatingPlan()` remains as a compatibility wrapper that returns only the strongest candidate.

## Extension points

Future objectives include support-position satisfaction and fair room-zone distribution. Student voting remains a separate application workflow and must not be mixed with engine evaluation.
