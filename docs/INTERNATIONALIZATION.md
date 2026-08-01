# Internationalization

## Goal

Classroom Manager should not assume one interface language.

Current languages:

- `en`
- `ja`

## Completed areas

- Settings
- Navigation
- Student Management
- Course Management
- Building Management
- Room Management
- Class Management
- Enrollment Management
- Seating Plan Management
- Intelligent Seating Planner interface

## Remaining areas

- Legacy Classroom page
- Login and authentication messages
- Shared confirmation, loading, empty, success, and error states
- Japanese terminology review
- Screenshots

## Planning Engine localization

The interface now localizes:

- Planner title and description
- Optimization attempts
- Historical avoidance preferences
- Generation and regeneration actions
- Candidate layout labels
- Objective counts
- Quality labels
- Trade-off summaries
- Historical conflict explanations
- Generation and selection messages

The engine itself remains language-independent and returns structured results.

## Browser validation limitation

HTML `required` messages may follow the browser language rather than the app locale.

Localized application validation is planned for v0.8.1.

## Definition of done for a page

- No visible hardcoded English
- Matching English/Japanese keys
- Dynamic values use interpolation
- Switching works without reload
- Existing behavior is unchanged
- All UI states are translated
- Lint and build pass
