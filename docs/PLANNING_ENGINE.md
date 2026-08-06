# Intelligent Seating Planner

## Philosophy

> **Recommend, don't decide.**

The engine helps teachers compare fair seating alternatives. It does not automatically make the final decision.

## Inputs

- Active enrolled students
- Available seat positions
- Active historical seating plans
- Generation options
- Number of optimization attempts
- Number of requested results

## Core preferences

The current engine treats all historical rules as preferences rather than absolute constraints.

Priority order:

1. Avoid repeated desk partners
2. Avoid previously used desks
3. Avoid repeated exact seat positions
4. Use a random tie-breaker

This ensures the engine can still return a result when the history makes perfect avoidance impossible.

## Candidate generation

The engine:

1. Creates many candidate assignments.
2. Evaluates each candidate.
3. Deduplicates identical layouts.
4. Compares candidates lexicographically by priority.
5. Returns the strongest distinct candidates.

The interface currently requests three recommendations.

## Why no single weighted public score

A weighted total can hide important differences. For example, a candidate with fewer repeated partners should normally outrank one with a better desk score but more repeated partners.

The comparison therefore uses ordered objectives rather than presenting a misleading single fairness percentage.

## Candidate output

A candidate includes:

```js
{
  rank,
  assignments,
  objectives: {
    repeatedPartners,
    repeatedDesks,
    repeatedSeats
  },
  quality,
  violations
}
```

## Violations

Structured conflict types include:

- `previous-partner`
- `previous-desk`
- `previous-seat`

The Vue interface translates these into readable English or Japanese explanations.

## Teacher workflow

```text
Open class
→ Seating Plans
→ Choose optimization preferences
→ Generate layouts
→ Compare three candidates
→ Preview one candidate
→ Modify manually if needed
→ Save final plan
```

## Historical data

Only appropriate historical plans should be considered. Current behavior uses active plans.

Future work may add:

- Date windows
- Term-based history
- Configurable history depth
- Archived-plan inclusion
- Per-objective history depth

## Non-goals of v1

- No claim of artificial intelligence
- No final automatic teacher decision
- No mandatory perfect arrangement
- No student voting inside the engine
- No medical/support rules yet
