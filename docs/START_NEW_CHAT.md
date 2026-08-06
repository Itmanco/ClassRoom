# Start a New Chat

Use this summary when continuing development in a new conversation.

## Project

Classroom Manager — Vue 3, Firebase Authentication, Cloud Firestore, Vue I18n, GitHub Pages.

## Repository

```text
Itmanco/ClassRoom
```

## Current main architecture

```text
Selected School
└── Classes
    └── Selected Class Workspace
        ├── Overview
        ├── Students
        └── Seating Plans
```

Top-level navigation:

- Classroom
- Students
- Courses
- Buildings
- Rooms
- Classes
- Settings

## Recent completed work

- Class Workspace
- Manage Class action
- EnrollmentManager embedded mode
- SeatingPlanManager embedded mode
- Removal of Enrollments and Seating Plans from sidebar
- Main branch merge

## Current documentation task

Replace thin documentation templates with the full updated package and commit:

```bash
git add README.md docs/
git commit -m "docs: document class workspace architecture"
git push origin main
```

## Deployment

```bash
npm run lint
npm run build
npm run deploy
```

## Known warnings

- Node 24 engine warning from old Vue CLI dependency
- Existing legacy lint warnings
- Console warnings
- Large vendor bundle
- Dependency vulnerabilities

Do not run `npm audit fix --force` without a dedicated branch and regression testing.

## Next product work

- Legacy Classroom page localization
- Login/authentication localization
- Shared UI-state review
- Localized validation
- Multi-school selector planning
