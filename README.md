#📚 Classroom Manager

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

Classroom Manager currently supports the core school-management, administration, and seating-plan workflows end to end:

```text
Authenticated User
  ↓
Dashboard / Active School
  ↓
School domain management
  ↓
Class Workspace
  ↓
Enrollment + Seating Plans
  ↓
Recommendation / Manual Adjustment
  ↓
Classroom Preview
  ↓
Print-ready Excel Export
```

The application currently includes:

- Firebase Authentication with persistent sessions
- Firestore-backed user profiles with active/inactive account state
- Firebase Authentication UID as the canonical user identifier
- Global `system-admin` authorization via `users/{uid}.systemRole`
- School authorization via `schools/{schoolId}/members/{uid}`
- System Admin school/user administration
- School Admin scoped user and membership management
- User profile editing from Admin Users
- User archive/reactivate with inactive-account access blocking
- Protection against self-archive/self-role removal and archiving the last active System Admin
- Administrative Activity Log with system/school scope filters and expandable change details
- Resource-scoped user audit distribution across every affected school membership, with system fallback only for users with no memberships
- Callable Cloud Functions for privileged account/user administration
- Local Firebase Authentication / Firestore / Functions emulator workflow with reusable imported emulator data
- Multi-school context and active-school selection
- Dedicated no-school state
- Dashboard with active student, class, room, and course summaries
- Student, course, building, room, and class management
- Class Workspace with enrollments and seating plans
- Manual seat assignment and explainable seating recommendations
- Classroom-style seating visualization and room-layout preview
- Configurable room geometry, desk grouping, and teacher position
- Print-ready Excel seating-plan export with A4 landscape setup
- English/Japanese interface and responsive navigation
- GitHub Pages deployment tooling

The current security milestone is hardening membership identity/immutability and replacing the remaining broad school-domain Firestore rules with membership/role-aware authorization. Teacher management is the next major product-domain module after this security/documentation checkpoint.

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
- Admin-managed profile editing for approved fields
- Global account archive/reactivate state
- Inactive-account access blocking
- Sign out
- School membership information
- Active-school preference
- Dedicated handling for authenticated users without an assigned school

Changing a Firebase password does not automatically invalidate an already authenticated client session; normal Firebase Authentication session behavior applies.

---

## Multi-school Context and Authorization

Firebase Authentication UID is the canonical user identifier. System-wide privilege and school-specific access are intentionally separated.

```text
Firebase Authentication uid
├── users/{uid}
│   ├── systemRole: system-admin | null
│   └── active: true | false
└── schools/{schoolId}/members/{uid}
    ├── userUid: uid
    ├── role: school-admin | teacher | student
    └── active: true | false
```

The application resolves available schools from active membership documents and stores an `activeSchool` preference.

Changing schools resets school/class-specific UI state so that data from different schools is not mixed.

System Admin has global administration. An active `school-admin` membership grants Admin access only for that school. School Admin can create users for the active school and manage other users' memberships there.

School Admin user discovery is performed through a scoped callable backend rather than broad direct client reads of other `/users/{uid}` profiles. Global account archive/reactivate is System-Admin-only; inactive accounts are blocked from normal application access. Critical protections prevent self-archive/self-role removal and protect the final active System Admin.

Legacy `users.schools[]` / `users.role` fields may remain in historical data, but membership documents are the authorization source of truth for school access and legacy role fields are not authorization fallbacks.

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
systemAuditLogs/{logId}

schools/{schoolId}
├── members/{uid}
├── auditLogs/{logId}
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
        ├── Dashboard / Management pages
        ├── Admin Console
        ├── Class Workspace
        ├── Room preview
        └── Seating-plan UI
        │
        ├───────────────┐
        ▼               ▼
Service layer      Callable Functions
        │               │
        ├── Firestore    └── privileged Admin SDK operations
        └── XLSX export
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
- Cloud Functions for Firebase
- Firebase Emulator Suite (Auth / Firestore / Functions)
- Firebase Admin SDK for callable Functions and local administrative/migration scripts

## Seating-plan Export

- `ExcelJS`

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
├── components/
│   ├── LanguageSelector.vue
│   ├── LoginModal.vue
│   ├── NavigationMenu.vue
│   ├── SchoolSelector.vue
│   └── UserProfileCard.vue
├── engine/seating/
│   ├── SeatingEngine.js
│   └── constraints/
│       ├── AvoidPreviousDesks.js
│       ├── AvoidPreviousPartners.js
│       ├── AvoidPreviousSeat.js
│       └── history.js
├── i18n/
│   ├── index.js
│   └── locales/
│       ├── en.json
│       └── ja.json
├── pages/
│   ├── AdminAuditLog.vue
│   ├── AdminPage.vue
│   ├── AdminSchoolManager.vue
│   ├── AdminUserManager.vue
│   ├── BuildingManager.vue
│   ├── ClassManager.vue
│   ├── ClassWorkspace.vue
│   ├── CourseManager.vue
│   ├── DashboardPage.vue
│   ├── EnrollmentManager.vue
│   ├── NoSchoolPage.vue
│   ├── ProfilePage.vue
│   ├── RoomManager.vue
│   ├── SeatingPlanManager.vue
│   ├── SettingsPage.vue
│   └── StudentManager.vue
└── services/
    ├── adminUserService.js
    ├── auditLogService.js
    ├── buildingService.js
    ├── classService.js
    ├── courseService.js
    ├── enrollmentService.js
    ├── membershipService.js
    ├── roomService.js
    ├── schoolService.js
    ├── seatingPlanExportService.js
    ├── seatingPlanService.js
    ├── studentService.js
    └── userService.js

functions/
└── index.js

scripts/
├── createTestSchool.js
├── exportSchoolStructure.js
└── migrateStudents.js

docs/
├── AI_CONTEXT.md
├── ARCHITECTURE.md
├── AUDIT_ROADMAP.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DECISIONS.md
├── DEVELOPER_PROFILE.md
├── DOCUMENTATION_INDEX.md
├── FIREBASE_BILLING_RUNBOOK.md
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

The legacy Classroom/Home components and `classroomService.js` have been removed. `DashboardPage.vue` is the current default home page.

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

For Admin/auth/security work, run the full Firebase emulator set with the existing dataset in another terminal:

```bash
firebase emulators:start \
  --only functions,auth,firestore \
  --import=./emulator-data \
  --export-on-exit=./emulator-data
```

Development mode connects the frontend to Auth `:9099`, Firestore `:8080`, and Functions `:5001`. Do not start an empty emulator unless that is intentional.

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
emulator-data/
emulator-data.zip
```

Before committing administrative scripts, verify that credentials are referenced from ignored local files and are not embedded directly in source code.

A useful check before committing is:

```bash
git status
```

and, when necessary:

```bash
git check-ignore -v serviceAccountKey.json school-structure.json emulator-data/ emulator-data.zip
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

The project is actively evolving. The legacy Classroom/Home implementation has already been removed and the Dashboard is now the default application page.

Known areas for future improvement include:

- Membership identity/immutability enforcement (`memberId == userUid`, immutable `userUid`)
- Membership/role-aware Firestore authorization for students, buildings, rooms, courses, classes, enrollments, and seating plans
- Moving remaining privileged membership mutations from direct client writes to trusted Cloud Functions
- Broader automated test coverage and CI
- Production logging/error handling review
- Friendly localization of remaining Firebase/service/browser validation errors
- Localized Excel export labels
- Vue CLI vendor bundle size and a future Vue CLI → Vite migration review

These are tracked in the project documentation rather than hidden as implementation details.

---

# 🗺️ Roadmap

## Current checkpoint — Admin/security hardening

The Dashboard migration is complete. The current engineering checkpoint is to finish the authorization boundary around the canonical membership model before expanding the next major domain module.

Current priorities:

- Enforce membership document identity and `userUid` immutability
- Harden school-domain Firestore rules so access depends on active membership/role rather than only an active account
- Continue moving privileged membership operations behind trusted backend validation
- Add automated regression coverage for critical Admin/security flows
- Keep Activity Log coverage consistent as additional domain operations are added

---

## Teacher Management

Teacher management is planned as the next major product-domain module rather than an Excel-only field.

Planned functionality includes:

- Teacher directory and teacher records
- Assign one or more teachers to a class
- Designate one teacher as the main teacher
- Display assigned teachers in Class Workspace and class details
- Use teacher information in Dashboard/class workflows
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

## Admin identity, account lifecycle, audit scope, and local Firebase development

Firebase Authentication UID is the canonical identity used by `users/{uid}` and `schools/{schoolId}/members/{uid}`. System-wide privilege is stored as `users/{uid}.systemRole`; school-specific access is stored in the membership document. Legacy profile role fields are not authorization fallbacks.

Privileged account operations are implemented with callable Cloud Functions: `createUser`, `getSchoolUsers`, `updateManagedUser`, `setManagedUserActive`, and `setSystemRole`. Archived users have `users/{uid}.active === false`; the application blocks normal authenticated access for those accounts.

Audit scope is based on the affected resource, not the actor. For `user.updated`, `user.archived`, and `user.reactivated`, a target user with memberships receives one school audit event in every affected school and no duplicate system event. A target with zero memberships receives one `systemAuditLogs` event.

For development, Authentication, Firestore, and Functions run together in the Firebase Emulator Suite using the persisted `./emulator-data` import/export workflow so privileged changes do not modify production data. Production Cloud Functions deployment requires Blaze; see `docs/FIREBASE_BILLING_RUNBOOK.md` before enabling billing.
