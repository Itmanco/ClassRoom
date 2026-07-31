# Classroom Planning Engine

> Recommend, don't decide.

## Vision

The Classroom Planning Engine helps teachers create fair seating experiences over time. It does not merely randomize students. It recommends strong arrangements by considering classroom history and teacher-selected objectives, while leaving the final decision to the teacher.

## Mission

Help teachers make better seating decisions while treating every student as fairly as possible.

## Core principles

### Encourage new relationships

Repeated desk partners should be avoided whenever possible. This is the first comparison objective because new partnerships promote broader classroom interaction.

### Support student needs

Students may require positions near the front, teacher, assistant, aisle, accessible desk, or another classroom resource. Support preferences are part of the philosophy but will be implemented in a later version after the room-zone and student-support models exist.

### Promote fair classroom distribution

Students should experience different parts of the room throughout the school year. Future versions will understand front, middle, back, left, center, and right zones rather than treating desks only as numbers.

### Encourage desk rotation

Previously used desks should be avoided when practical. Desk rotation is a preference and must never outweigh avoiding a repeated desk partner.

### Always produce recommendations

No historical preference is mandatory. When a perfect arrangement is impossible, the engine returns the strongest available recommendations and explains the compromises.

### Recommend, don't decide

The engine recommends the best three distinct arrangements. The teacher previews them, applies classroom knowledge the system may not possess, and selects the final arrangement.

## Candidate comparison

Candidates are compared in priority order rather than with one combined score:

1. Fewer repeated desk partnerships.
2. Fewer previously used desks.
3. Fewer repeated exact seats.
4. Random tie-breaker when all current objectives are equal.

Future support needs and room-distribution objectives will be inserted into this order after their data models are implemented.

A lower-priority objective cannot cancel out a worse result in a higher-priority objective. For example, a candidate with no repeated partners and five repeated desks is preferred over a candidate with one repeated partner and no repeated desks.

## Recommendation workflow

1. Generate hundreds or thousands of complete candidate arrangements.
2. Evaluate each candidate independently.
3. Sort candidates using the documented objective order.
4. Keep the three strongest distinct candidates.
5. Explain the compromises in each candidate.
6. Let the teacher preview and select one candidate.
7. Save only the teacher's selected arrangement.

## Explainability

Each recommendation displays objective counts rather than an arbitrary combined score:

- repeated desk partnerships;
- previously used desks;
- repeated exact seats;
- historical plans considered;
- readable descriptions of each compromise.

## Teacher-first design

Teachers may know about recent conflicts, friendships, temporary support needs, or classroom atmosphere that are not yet represented in data. The engine therefore supports professional judgement instead of replacing it.

## Non-goals

The engine does not attempt to:

- replace teacher judgement;
- guarantee a mathematically perfect arrangement;
- eliminate every historical repetition;
- refuse generation when preferences conflict;
- treat student votes as an optimization objective.

## Future versions

- Room zones and fair spatial distribution.
- Student support profiles and preferred zones.
- Pinned students and temporary teacher preferences.
- Separation or grouping preferences.
- Student voting sessions across published candidate plans.
- Fairness analytics across a school term.
- Exam and laboratory layouts.

## Architecture

```text
Vue UI
  ↓
Planning Engine
  ↓
Candidate generation
  ↓
Independent objective evaluation
  ↓
Priority-based candidate comparison
  ↓
Top three recommendations
  ↓
Teacher selection
  ↓
Existing seating-plan persistence service
```

The engine receives plain data and has no dependency on Vue or Firebase.

## Development rule

Before changing the Planning Engine, review this document and `DECISIONS.md`.

Every proposed feature should answer:

> Does this improve fairness for students while respecting teacher judgement?

The goal is not to find the perfect seating arrangement. The goal is to help teachers make better decisions while treating every student as fairly as possible.
