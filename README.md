 📚 Classroom Manager

**English** | [日本語](README.ja.md)

Classroom Manager is a Vue 3 and Firebase web application for managing school data and creating explainable, teacher-controlled classroom seating plans.

The project is designed around explicit school and class context, real-time Firestore data, bilingual English/Japanese support, explainable seating recommendations, and practical classroom workflows.

It is being developed as both a functional school-management application and a portfolio project focused on maintainable frontend architecture, domain modeling, Firebase integration, internationalization, and explainable planning logic.

---

## 🌐 Live Demo

The application is deployed with GitHub Pages.

> **Live application:** (https://itmanco.github.io/ClassRoom/)

Deployment is handled through the project's `gh-pages` configuration.

---

## 🚀 Current Status

Classroom Manager currently supports the core school-management and seating-plan workflow end to end:

```text
School
  ↓
Class
  ↓
Enrollment
  ↓
Seating Plan
  ↓
Recommendation
  ↓
Classroom Preview
  ↓
Print-ready Excel Export
```

The application currently includes:

- Firebase Authentication
- Persistent authenticated sessions
- Firestore-backed user profiles
- Multi-school user context
- Active-school selection
- Dedicated no-school state
- Student management
- Course management
- Building management
- Room management
- Class management
- Class Workspace
- Student enrollment
- Seating-plan creation and history
- Manual seat assignment
- Explainable seating-plan recommendations
- Classroom-style seating visualization
- Configurable room geometry
- Configurable desks per row
- Configurable teacher position
- Room-layout preview
- Print-ready Excel seating-plan export
- A4 landscape print configuration
- English/Japanese interface
- Responsive navigation
- GitHub Pages deployment

The current structural milestone is replacing the legacy Classroom/Home page with a school Dashboard.

---

## 🎯 Product Philosophy

The application follows several core principles.

### School context is explicit

School-owned data is always accessed through a `schoolId`.

This prevents data belonging to different schools from being accidentally mixed.

### Class workflows belong to a class

Enrollments and seating plans are class-owned operations and are grouped inside the Class Workspace.

### Archive instead of destructive deletion

Records that may be referenced historically should normally be archived rather than permanently deleted.

### Recommend, don't decide

The seating engine proposes arrangements and explains trade-offs.

The teacher remains responsible for the final seating decision.

### Keep domain logic separate from presentation

Firestore access lives in service modules.

The seating engine is framework-independent and does not depend on Vue.

### Internationalization is part of the architecture

User-facing application text should use Vue I18n rather than being hard-coded into components.

### Physical layout and seating assignments are different concerns

A saved seating plan determines **who sits where**.

The current room configuration determines **how the physical classroom is rendered**.

This distinction is particularly important for previews and Excel exports.

---

## 🧭 Main Application Workflow

```text
Authenticated User
└── Active School
    ├── Students
    ├── Courses
    ├── Buildings
    ├── Rooms
    └── Classes
        └── Class Workspace
            ├── Overview
            ├── Students / Enrollments
            └── Seating Plans
                ├── Manual assignment
                ├── Sequential assignment
                ├── Recommendation engine
                ├── Classroom preview
                └── Excel export
```

---

# ✨ Features

## Authentication and User Profile

The application uses Firebase Authentication and Firestore-backed user profiles.

Current functionality includes:

- Firebase email/password authentication
- Auth-state restoration when the application starts
- User profile loading from Firestore
- Profile editing
- Sign out
- School membership information
- Active-school preference
- Dedicated handling for authenticated users without an assigned school

Changing a Firebase password does not automatically invalidate an already authenticated client session; normal Firebase Authentication session behavior applies.

---

## Multi-school Context

A user profile can contain school membership and an active-school preference.

Example:

```js
{
  activeSchool: "school_japan",
  schools: ["school_japan"],
  role: "admin"
}
```

The application loads the schools available to the authenticated user and allows the user to select the active school.

Changing schools resets school/class-specific UI state so that data from different schools is not mixed.

Current school membership is profile-based.

Stronger server-enforced membership and role authorization remains future work.

---

## Students

Student Management currently supports:

- Create students
- Edit students
- Search student records
- Archive students
- Real-time Firestore updates
- Stable student IDs
- School-scoped storage

Student IDs remain stable so historical seating plans can continue to reference the same student records.

---

## Courses

Course Management supports:

- Create courses
- Edit courses
- Archive courses
- Stable course codes
- School-scoped storage

Courses provide the academic context used by classes.

---

## Buildings and Rooms

Buildings represent the school's physical facilities.

Rooms define the physical classroom layout.

Room data includes:

- Room code
- Room name
- Building
- Floor
- Room number
- Desk count
- Seats per desk
- Desks per row
- Calculated capacity
- Teacher position
- Active/archive state

Supported teacher positions are:

```text
front-left
front-right
back-left
back-right
```

Room Management also includes a classroom-layout preview so the physical configuration can be checked before it is used by seating plans or exports.

The `desksPerRow` setting is important because the same number of desks can represent different physical classroom arrangements.

For example:

```text
9 desks
2 seats per desk
3 desks per row
Capacity: 18
```

---

## Classes

A class connects academic and physical school context.

Current class information includes:

- Course
- Room
- Academic year
- Semester
- Active/archive state

The **Manage Class** action opens the Class Workspace.

---

## Class Workspace

The Class Workspace groups class-owned workflows into a single context.

```text
Class Workspace
├── Overview
├── Students
│   └── EnrollmentManager
└── Seating Plans
    └── SeatingPlanManager
```

This keeps enrollment and seating operations associated with the class they belong to.

Enrollment and seating-plan managers support an optional `classId`, allowing them to operate as embedded class workflows.

---

# 🪑 Seating Plans

The seating-plan workflow currently supports:

- Manual seat assignment
- Sequential assignment
- Saved seating-plan history
- Editing
- Archiving
- Classroom-style visualization
- Physical desk grouping
- Configurable seats per desk
- Configurable desks per row
- Whiteboard/front-of-room representation
- Teacher position from room configuration
- Multiple generated recommendations
- Excel export of saved plans

A seating plan stores student assignments independently from the current physical room presentation.

This allows an existing seating plan to be printed again after certain room-layout settings have changed.

---

## Seating Recommendation Engine

The seating engine is framework-independent and evaluates historical seating plans when generating recommendations.

Current objective priority:

1. Avoid repeated desk partners
2. Avoid repeated desks
3. Avoid repeated exact seats
4. Use a random tie-break when higher-priority objectives are equal

The engine returns structured recommendation candidates rather than translated UI text.

Results can include:

- Candidate assignments
- Objective counts
- Constraint violations
- Quality information
- Search statistics

Translation and presentation remain responsibilities of the UI layer.

This keeps the planning engine independent of Vue and Vue I18n.

---

# 📄 Print-ready Excel Seating Plans

Saved seating plans can be exported as `.xlsx` files using **ExcelJS**.

The export is designed as a printable classroom document rather than a raw spreadsheet dump.

The generated workbook includes:

- Class code
- Class name
- Building
- Classroom code
- Current physical room layout
- Configurable desks per row
- Physical desk grouping
- Student names in assigned seats
- Teacher-desk position
- Whiteboard representation
- Seating-plan name
- Academic year
- Semester
- Printed date and time
- Desk-layout summary
- Room capacity
- Class-based timestamped filename

### Print configuration

The generated workbook uses:

- A4 paper size
- Landscape orientation
- Fit-to-page printing
- One-page width
- One-page height
- Explicit print area
- Horizontal page centering
- Vertical page centering
- Compact print margins

This functionality is implemented in:

```text
src/services/seatingPlanExportService.js
```

using ExcelJS.

---

## Current Room Geometry vs. Saved Assignments

Excel export intentionally separates physical room configuration from student assignment data.

```text
Saved Seating Plan
        ↓
Determines who sits where

Current Room
        ↓
Determines how the classroom is drawn
```

The current room provides physical information such as:

- `deskCount`
- `seatsPerDesk`
- `desksPerRow`
- `teacherPosition`

The saved seating plan provides the student assignments.

As a result, changes such as:

```text
desksPerRow: 2 → 3
teacherPosition: front-left → back-right
```

can appear in newly generated Excel files without requiring the seating plan to be recreated.

Changes to the number of desks or seats per desk require additional care because old assignments may reference positions that no longer exist.

---

# 🌐 Internationalization

Classroom Manager currently supports:

- English (`en`)
- Japanese (`ja`)

Initial language behavior:

1. Use the previously saved application language when available.
2. Otherwise inspect the browser language.
3. Use Japanese when the browser language resolves to `ja`.
4. Use English for unsupported languages.

The user can change the language from within the application.

The selected language is persisted locally.

New user-facing application text should use Vue I18n.

See:

```text
docs/INTERNATIONALIZATION.md
```

---

# 🔥 Firestore Model

The primary Firestore structure is:

```text
users/{uid}

schools/{schoolId}
├── students/{studentId}
├── buildings/{buildingId}
├── rooms/{roomId}
├── courses/{courseId}
└── classes/{classId}
    ├── enrollments/{studentId}
    └── seatingPlans/{seatingPlanId}
```

School-owned data is scoped under the school document.

Class-owned data is scoped under the corresponding class.

See:

```text
docs/FIRESTORE_SCHEMA.md
```

---

# 🏗️ Architecture

At a high level:

```text
App.vue
│
├── Firebase authentication/session
├── User profile
├── Available schools
├── Active school
├── Top-level navigation
└── Selected class
        │
        ▼
Vue pages / components
        │
        ├── Management pages
        ├── Class Workspace
        ├── Room preview
        └── Seating-plan UI
        │
        ▼
Service layer
        │
        ├── Firestore services
        └── Excel export service
                │
                └── ExcelJS
        │
        ▼
Firebase

SeatingPlanManager
        │
        ▼
Framework-independent Seating Engine
```

The application intentionally separates:

- Vue presentation
- Firestore persistence
- School/class domain workflows
- Seating recommendation logic
- Excel document generation

See:

```text
docs/ARCHITECTURE.md
```

---

# 🧰 Technology Stack

## Frontend

- Vue 3.2
- Vue CLI 5
- JavaScript
- CSS
- Vue I18n 11

## Backend / Services

- Firebase Authentication
- Cloud Firestore
- Firebase Admin SDK for local administrative and migration scripts

## Seating-plan Export

- ExcelJS

## Tooling and Deployment

- ESLint
- Babel
- npm
- Git
- GitHub
- GitHub Pages
- `gh-pages`

---

# 📁 Project Structure

```text
src/
├── App.vue
├── assets/
│   └── logo.png
├── components/
│   ├── LanguageSelector.vue
│   ├── LoginModal.vue
│   ├── NavigationMenu.vue
│   ├── SchoolSelector.vue
│   └── UserProfileCard.vue
├── engine/
│   └── seating/
│       ├── SeatingEngine.js
│       └── constraints/
│           ├── AvoidPreviousDesks.js
│           ├── AvoidPreviousPartners.js
│           ├── AvoidPreviousSeat.js
│           └── history.js
├── i18n/
│   ├── index.js
│   └── locales/
│       ├── en.json
│       └── ja.json
├── pages/
│   ├── BuildingManager.vue
│   ├── ClassManager.vue
│   ├── ClassroomPage.vue
│   ├── ClassWorkspace.vue
│   ├── CourseManager.vue
│   ├── EnrollmentManager.vue
│   ├── NoSchoolPage.vue
│   ├── ProfilePage.vue
│   ├── RoomManager.vue
│   ├── SeatingPlanManager.vue
│   ├── SettingsPage.vue
│   └── StudentManager.vue
└── services/
    ├── buildingService.js
    ├── classroomService.js
    ├── classService.js
    ├── courseService.js
    ├── enrollmentService.js
    ├── roomService.js
    ├── schoolService.js
    ├── seatingPlanExportService.js
    ├── seatingPlanService.js
    ├── studentService.js
    └── userService.js

scripts/
├── createTestSchool.js
├── exportSchoolStructure.js
└── migrateStudents.js

docs/
├── AI_CONTEXT.md
├── ARCHITECTURE.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DECISIONS.md
├── DEVELOPER_PROFILE.md
├── DOCUMENTATION_INDEX.md
├── FIRESTORE_SCHEMA.md
├── INTERNATIONALIZATION.md
├── MIGRATION_PROGRESS.md
├── PLANNING_ENGINE.md
├── PLANNING_ENGINE_ROADMAP.md
├── PROJECT_CONTEXT.md
├── ROADMAP.md
├── SEATING_ENGINE.md
├── START_NEW_CHAT.md
└── TODO.md
```

The following files are currently legacy code during the transition to the newer architecture:

```text
src/pages/ClassroomPage.vue
src/components/MyClassroom.vue
src/components/StudentDesk.vue
src/services/classroomService.js
```

They are scheduled for review/removal as the Dashboard replaces the legacy home workflow.

---

# 💻 Local Development

## Requirements

You need:

- Node.js
- npm
- A Firebase project
- Firebase web configuration
- Optional Firebase Admin service-account credentials for local administrative scripts

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run serve
```

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

---

# 🔐 Firebase Configuration and Secrets

Frontend Firebase configuration is initialized by:

```text
src/firebase-init.js
```

Administrative scripts use a local service-account file:

```text
serviceAccountKey.json
```

This file must **never be committed**.

The repository `.gitignore` also excludes generated/local administrative data including:

```text
serviceAccountKey.json
school-structure.json
```

Before committing administrative scripts, verify that credentials are referenced from ignored local files and are not embedded directly in source code.

A useful check before committing is:

```bash
git status
```

and, when necessary:

```bash
git check-ignore -v serviceAccountKey.json school-structure.json
```

---

# 🛠️ Administrative Scripts

## Student Migration

Run:

```bash
npm run migrate:students
```

This script is used to migrate legacy student data into the current school-scoped structure.

---

## School Structure Export

Run:

```bash
node scripts/exportSchoolStructure.js
```

This utility exports school/user structure for local inspection and documentation.

The generated:

```text
school-structure.json
```

is intentionally ignored by Git.

---

## Test School

Run:

```bash
node scripts/createTestSchool.js
```

This is a development utility used for multi-school testing.

IDs and the intended Firebase environment should always be reviewed before running administrative scripts.

---

# 🚀 Deployment

The project uses `gh-pages` for GitHub Pages deployment.

The project contains the npm command:

```json
"deploy": "npm run build && gh-pages -d dist"
```

A typical deployment check is:

```bash
npm run lint
npm run build
npm run deploy
```

After deployment, verify:

- Application loading
- Firebase Authentication
- Firestore connectivity
- Navigation
- Active-school restoration
- English/Japanese language switching
- Class Workspace
- Seating-plan generation
- Excel export

---

# ⚠️ Current Technical Debt

The project is actively evolving.

Known areas for future improvement include:

- Legacy `ClassroomPage.vue` and related classroom components/services
- Dashboard/Home replacement
- Stronger server-enforced authorization
- Automated test coverage
- Production logging/error handling review
- Some service/browser validation messages are not yet fully localized
- Vue CLI vendor bundle size
- Future migration from Vue CLI to a more modern toolchain such as Vite

These are tracked in the project documentation rather than hidden as implementation details.

---

# 🗺️ Roadmap

## Next — Dashboard

The immediate structural milestone is a new school Dashboard.

Planned first version:

- Replace the legacy Classroom/Home page
- Show the active school
- Show active student count
- Show class count
- Show room count
- Show course count
- Provide an area for recent class/seating activity
- Provide an area for future messages and announcements

The first Dashboard should remain intentionally simple.

Activity tracking and messaging can be introduced incrementally after the Dashboard structure exists.

---

## Teacher Management

Teacher management is planned as a proper domain feature rather than an Excel-only field.

Planned functionality includes:

- Teacher directory
- Teacher records
- Assign one or more teachers to a class
- Designate one teacher as the main teacher
- Display assigned teachers in Class Workspace
- Display the main teacher in class details
- Use teacher information in future Dashboard features
- Print the main teacher's name on Excel seating plans

A likely class relationship is:

```js
{
  teacherIds: [
    "teacher_001",
    "teacher_002"
  ],
  mainTeacherId: "teacher_001"
}
```

The Excel exporter should resolve the main teacher from application data rather than storing a teacher name directly inside export configuration.

---

## Future Planning Features

The seating engine is intentionally designed so additional constraints can be introduced later.

Possible future objectives include:

- Student placement preferences
- Front/back seating requirements
- Accessibility requirements
- Additional history-aware constraints
- Teacher-defined seating rules
- More detailed recommendation explanations
- Additional recommendation comparison tools

---

# 📖 Documentation

The repository contains a larger documentation pack under `/docs`.

Start with:

```text
docs/DOCUMENTATION_INDEX.md
```

Important documents include:

- `ARCHITECTURE.md`
- `FIRESTORE_SCHEMA.md`
- `DECISIONS.md`
- `SEATING_ENGINE.md`
- `PLANNING_ENGINE.md`
- `INTERNATIONALIZATION.md`
- `ROADMAP.md`
- `TODO.md`
- `CHANGELOG.md`
- `PROJECT_CONTEXT.md`

The README is intended as the public project overview.

The `/docs` directory contains the deeper technical and architectural documentation.

---

# 👤 Author

Developed as a portfolio and learning project focused on practical application architecture and real school-domain workflows.

Key areas demonstrated by the project include:

- Vue application architecture
- Firebase Authentication
- Cloud Firestore modeling
- Multi-school context
- Domain-oriented service design
- Internationalization
- Explainable recommendation algorithms
- Historical seating constraints
- Excel document generation
- Print-layout configuration
- Responsive UI design
- Incremental migration of legacy application architecture

Classroom Manager continues to evolve toward a practical school/class management and classroom-planning application.