# AI Context

## Project

Classroom Manager is a Vue 3 and Firebase classroom planning application.

Documentation under `docs/` is the source of truth.

## Rules

Always:

- Explain architecture changes before implementation
- Prefer small commits
- Preserve backward compatibility
- Avoid unnecessary refactors
- Update documentation
- Explain reasoning
- Update `TODO.md`

## Current branch

`feature/internationalization-foundation`

## Current task

Complete English/Japanese support.

Completed:

- Vue I18n
- Settings
- Navigation
- Student Management
- Course Management

Next:

- Building Management
- Room Management
- Class Management
- Enrollment Management
- Seating Plan Management
- Planning Engine UI
- Classroom
- Login

## Internationalization rule

No new hardcoded user-facing strings.

Keep services and Planning Engine language-independent.

## Validation

Browser-native validation is not controlled by Vue I18n.

Do not add one-page workarounds. Localized validation is planned for v0.8.1.

## Planning Engine

- Independent of Vue/Firebase
- Uses seating history
- Prioritizes repeated partners, then desks, then exact seats
- Returns three recommendations
- Follows “Recommend, don't decide”

## Deployment

GitHub Pages deployment is manual:

```bash
npm run deploy
```
