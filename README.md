# 📚 Classroom Manager

Classroom Manager is a Vue 3 and Firebase web application for managing school data and helping teachers create fair, explainable seating arrangements.

> **Planning Engine principle:** Recommend, don't decide.

## Current capabilities

- Firebase Authentication and user sessions
- School-scoped data under `schools/{schoolId}`
- Student, Building, Room, Course, Class, and Enrollment management
- Seating Plan creation, editing, history, and archiving
- Intelligent Seating Planner with three optimized recommendations
- English and Japanese support across the main management workflow
- GitHub Pages deployment

## Internationalization progress

Completed:

- Settings and navigation
- Student Management
- Course Management
- Building Management
- Room Management
- Class Management
- Enrollment Management
- Seating Plan Management
- Intelligent Seating Planner interface

Remaining before v0.8.0:

- Legacy Classroom page
- Login and authentication messages
- Shared confirmation and UI-state review
- Japanese terminology review
- English and Japanese screenshots

See `docs/INTERNATIONALIZATION.md`.

## Intelligent Seating Planner

Candidates are compared in this order:

1. Fewer repeated desk partners
2. Fewer repeated desks
3. Fewer repeated exact seat positions
4. Random tie-breaker

The teacher reviews the three strongest distinct layouts and chooses the final arrangement.

## Technology stack

- Vue 3
- Vue CLI 5
- Vue I18n 11
- Firebase Authentication
- Cloud Firestore
- GitHub Pages

## Local setup

```bash
git clone git@github.com:Itmanco/ClassRoom.git
cd ClassRoom
npm install
npm run serve
```

Verification:

```bash
npm run lint
npm run build
```

Deployment:

```bash
npm run deploy
```

## Current milestone

**v0.8.0 — Internationalization**

## License

MIT
