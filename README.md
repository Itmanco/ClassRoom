# 🎓 Classroom Manager

A Vue 3 + Firebase application for managing classroom seating, students, and classroom layouts.

The project is currently being migrated from a single-classroom architecture to a scalable multi-school architecture.

---

## Current Features

- Firebase Authentication
- User session management
- Student management
- Classroom management
- Multiple classroom layouts
- Random seat assignment
- Manual seat editing
- Firestore realtime synchronization
- Persistent classroom layouts
- Multi-school architecture (currently in progress)

---

## Current Development Status

**Project Status:** 🚧 Active Development

The application is currently undergoing a major architectural migration.

### Current Migration

Legacy structure

```
artifacts/{appId}
```

↓

New structure

```
schools/{schoolId}
```

This migration allows the application to support multiple schools while keeping the existing functionality intact.

Current migration progress:

- ✅ Firebase Authentication
- ✅ User session initialization
- ✅ activeSchool implementation
- ✅ Service migration (`appId` → `schoolId`)
- 🚧 Firestore data migration
- ⏳ Legacy cleanup

For more details, see:

```
docs/MIGRATION_PROGRESS.md
```

---

## Planned Features

- Student editing
- Attendance management
- Teacher roles
- School administration
- Reports
- Analytics
- Mobile support

See the complete roadmap:

```
docs/ROADMAP.md
```

---

## Technology Stack

### Frontend

- Vue 3
- Vue Router
- Vite

### Backend

- Firebase Authentication
- Cloud Firestore
- Firebase Storage

---

## Project Structure

```
src/
    components/
    views/
    services/
    router/
    stores/

docs/
    PROJECT_CONTEXT.md
    FIRESTORE_SCHEMA.md
    MIGRATION_PROGRESS.md
    ROADMAP.md
    DECISIONS.md
    CONTRIBUTING_AI.md
```

---

## Authentication Flow

```
Firebase Authentication
        ↓
User Profile
        ↓
activeSchool
        ↓
Application Session
        ↓
Vue Components
        ↓
Firestore Services
```

---

## Firestore Structure

Current

```
schools
    schoolId
        students
        classrooms
        users
```

Legacy

```
artifacts
    appId
        students
        classrooms
```

---

## Local Setup

### Clone the repository

```bash
git clone https://github.com/Itmanco/ClassRoom.git
cd ClassRoom
```

### Install dependencies

```bash
npm install
```

### Configure Firebase

Create your Firebase project.

Enable:

- Authentication
- Cloud Firestore

Create your Firebase configuration file.

(See the Firebase documentation for details.)

### Start the development server

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Documentation

Additional documentation is available in the `docs/` directory.

| File | Description |
|------|-------------|
| PROJECT_CONTEXT.md | Project overview |
| FIRESTORE_SCHEMA.md | Firestore data model |
| MIGRATION_PROGRESS.md | Current migration status |
| ROADMAP.md | Planned features |
| DECISIONS.md | Architecture decisions |
| CONTRIBUTING_AI.md | Development guidelines |
| TODO.md | Current tasks |

---

## Current Goal

Complete the migration from:

```
artifacts/{appId}
```

to

```
schools/{schoolId}
```

while maintaining full compatibility with the existing application.

---

## License

MIT