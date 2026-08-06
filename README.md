# 📚 Classroom Manager

A modern classroom management application built with **Vue 3** and **Firebase**. It helps schools manage students, facilities, courses, classes, enrollments, and explainable seating recommendations while preserving teacher decision-making.

## 🚀 Live Demo

**https://itmanco.github.io/ClassRoom/**

## 💻 Portfolio Project

This project demonstrates practical experience with:

- Vue 3 and component-based UI design
- Firebase Authentication and Cloud Firestore
- Vue I18n with English and Japanese interfaces
- School-scoped and class-scoped data architecture
- Real-time listeners and service-layer separation
- Search and optimization algorithms
- Git feature branches and milestone commits
- GitHub Pages deployment

## ✨ Current Features

### Authentication and school context

- Firebase Authentication
- User profile loading
- Active school stored in the application session
- School-scoped data paths
- Architecture prepared for a future school selector

### Student Management

- Create and edit students
- Search by ID, name, hiragana, or country
- Archive students without breaking historical references
- Immutable student IDs
- Real-time updates

### Course Management

- Create, edit, and archive courses
- Stable course codes
- Active and archived status

### Building and Room Management

- Create school buildings
- Track floor count
- Create rooms inside buildings
- Track floor, room number, desk count, seats per desk, and capacity
- Archive buildings and rooms

### Class Management

Each class connects:

- Course
- Physical room
- Academic year
- Semester

Class cards include a **Manage Class** action that opens the Class Workspace.

## 🏷️ Class Workspace

Class-specific workflows are grouped inside one workspace.

```text
Selected School
└── Classes
    └── Selected Class
        ├── Overview
        ├── Students
        └── Seating Plans
```

### Overview tab

Displays:

- Course
- Room
- Academic year
- Semester
- Room capacity
- Class status

### Students tab

Embeds Enrollment Management for the selected class:

- Add active school students
- Prevent duplicate enrollment records
- Archive enrollments
- Show archived enrollments
- Reactivate enrollments

### Seating Plans tab

Embeds Seating Plan Management and the Intelligent Seating Planner:

- Create and edit plans
- Assign students manually
- Fill seats sequentially
- Save plan history
- Archive plans
- Generate three optimized recommendations
- Review historical conflicts and trade-offs

Enrollments and Seating Plans are no longer independent top-level navigation pages because both belong to a class.

## 🪑 Intelligent Seating Planner

The planner generates several candidate arrangements and presents the three strongest distinct layouts.

### Optimization priority

1. Fewer repeated desk partners
2. Fewer repeated desks
3. Fewer repeated exact seat positions
4. Random tie-breaker when objective values are equal

### Philosophy

> **Recommend, don't decide.**

The application explains the compromises in each recommendation, but the teacher chooses the final arrangement.

### Planner characteristics

- Framework-independent engine
- Language-independent structured results
- Uses active historical seating plans
- Configurable optimization attempts
- Optional historical-avoidance preferences
- Three candidate layouts
- Quality labels and conflict explanations

## 🌍 Internationalization

Supported languages:

- English
- Japanese

Internationalized areas:

- Main navigation
- Settings
- Student Management
- Course Management
- Building Management
- Room Management
- Class Management
- Class Workspace
- Enrollment Management
- Seating Plan Management
- Intelligent Seating Planner

Remaining localization work:

- Legacy Classroom page
- Login and authentication messages
- Shared UI-state review
- Browser-independent localized validation
- Final Japanese terminology review

## 🧭 Main Navigation

```text
Classroom
Students
Courses
Buildings
Rooms
Classes
Settings
```

Class-owned functionality is accessed through:

```text
Classes
→ Manage Class
→ Overview / Students / Seating Plans
```

## 🏗 Architecture

```text
App session
├── Authenticated user
├── Active school
└── Selected class workspace
        │
        ▼
Vue pages and reusable components
        │
        ▼
Application service layer
        │
        ├── Firebase Authentication
        ├── Cloud Firestore
        └── Planning Engine
```

The school context and class context remain separate. This is important for future multi-school support.

## 🔥 Firestore Structure

```text
schools/{schoolId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
└── classes/{classId}
    ├── enrollments/{studentId}
    └── seatingPlans/{seatingPlanId}
```

Historical records use stable IDs and archive flags instead of destructive deletion.

## 🛠 Technology Stack

### Frontend

- Vue 3
- Vue CLI 5
- Vue I18n 11
- JavaScript
- CSS

### Backend

- Firebase Authentication
- Cloud Firestore

### Tooling

- npm
- ESLint
- Git
- GitHub
- GitHub Pages
- `gh-pages`

## 🚀 Running Locally

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

## 📦 Deployment

A normal push updates the repository source but does not deploy the live application.

```bash
git push origin main
npm run build
npm run deploy
```

The application is published from the `gh-pages` branch.

## ⚠️ Current Engineering Notes

- Vue CLI dependencies show an engine warning under Node 24; Node 22 LTS is the safer compatibility target.
- Existing lint warnings remain in the legacy `ClassroomPage.vue`.
- Dependency vulnerabilities require a dedicated modernization branch; avoid using `npm audit fix --force` without testing.
- The vendor bundle is large and should later be improved through lazy loading and code splitting.

## 📅 Roadmap Summary

### Completed

- School domain foundation
- Student, Course, Building, Room, and Class management
- Enrollment Management
- Seating Plan Management
- Planning Engine v1
- English/Japanese localization foundation
- Class Workspace
- Simplified class-oriented navigation

### In progress

- Complete internationalization
- Authentication localization
- Legacy Classroom page review
- Shared UI-state review

### Future

- Multi-school selector
- User roles and permissions
- Firestore access enforcement
- Localized validation framework
- Automated tests
- Planning Engine v2
- Attendance, grades, statistics, and reports
- GitHub Actions deployment
- Vue CLI to Vite evaluation

## 📖 Documentation

See the `docs/` directory:

- `PROJECT_CONTEXT.md`
- `ARCHITECTURE.md`
- `FIRESTORE_SCHEMA.md`
- `PLANNING_ENGINE.md`
- `PLANNING_ENGINE_ROADMAP.md`
- `INTERNATIONALIZATION.md`
- `DECISIONS.md`
- `ROADMAP.md`
- `TODO.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `AI_CONTEXT.md`
- `START_NEW_CHAT.md`

## 📄 License

MIT

## 👨‍💻 Author

**Jaime Motta**

- GitHub: https://github.com/Itmanco
- Live demo: https://itmanco.github.io/ClassRoom/
