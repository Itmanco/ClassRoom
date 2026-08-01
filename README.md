# 📚 Classroom Manager

A modern classroom management application built with **Vue 3** and **Firebase** that helps schools manage students, classes, enrollments, and generate optimized seating arrangements while preserving teacher decision-making.

---

## 🚀 Live Demo

👉 **https://itmanco.github.io/ClassRoom/**

---

## 💻 Portfolio Project

This application was designed and developed as part of my software engineering portfolio.

It demonstrates practical experience with:

- Vue 3
- Firebase Authentication
- Cloud Firestore
- Vue I18n (English / 日本語)
- Git and GitHub workflow
- Modular application architecture
- Search and optimization algorithms
- GitHub Pages deployment

---

# ✨ Features

## School Management

- Multi-school architecture
- School-scoped Firestore collections
- Active school selection

---

## Student Management

- Create students
- Edit students
- Archive students
- Search students
- Immutable student IDs
- Real-time synchronization

---

## Course Management

- Create courses
- Edit courses
- Archive courses

---

## Building Management

- Manage school buildings
- Track number of floors
- Archive buildings

---

## Room Management

- Room capacity
- Building assignment
- Floor assignment
- Archive rooms

---

## Class Management

Each class connects:

- Course
- Room
- Academic year
- Semester

---

## Enrollment Management

- Assign students to classes
- Prevent duplicate enrollments
- Archive enrollments
- Reactivate enrollments

---

## Seating Plan Management

Teachers can:

- Create seating plans
- Save seating history
- Archive previous layouts
- Preview layouts before saving

---

# 🪑 Intelligent Seating Planner

One of the main goals of this project is to create an explainable seating recommendation engine.

Instead of generating a single random layout, the engine:

- analyzes historical seating data
- evaluates thousands of candidate layouts
- compares layouts using prioritized objectives
- presents the **three strongest recommendations**
- leaves the final decision to the teacher

### Optimization priorities

1. Avoid repeated desk partners
2. Avoid repeated desk assignments
3. Avoid repeated exact seat positions

This philosophy is summarized as:

> **Recommend, don't decide.**

The application supports teachers by providing optimized alternatives while preserving human judgment.

---

# 🌍 Internationalization

The application currently supports:

- 🇺🇸 English
- 🇯🇵 Japanese

Internationalized pages include:

- Navigation
- Settings
- Student Management
- Course Management
- Building Management
- Room Management
- Class Management
- Enrollment Management
- Seating Plan Management
- Intelligent Seating Planner

The remaining localization work focuses on:

- Legacy Classroom page
- Authentication messages
- Validation messages
- Shared UI messages

---

# 🏗 Architecture

The project follows a modular architecture.

```
Vue Components
        │
        ▼
Application Services
        │
        ▼
Planning Engine
        │
        ▼
Firebase Services
        │
        ▼
Cloud Firestore
```

The Planning Engine is intentionally independent from Vue and Firebase, making it easier to test and evolve.

---

# 🔥 Firestore Structure

```
schools/{schoolId}
├── students
├── buildings
├── rooms
├── courses
└── classes
    ├── enrollments
    └── seatingPlans
```

Every document belongs to a single school.

---

# 🛠 Technology Stack

## Frontend

- Vue 3
- Vue CLI 5
- Vue I18n 11
- JavaScript (ES6)
- CSS

## Backend

- Firebase Authentication
- Cloud Firestore

## Development

- Git
- GitHub
- GitHub Pages
- npm

---

# 🚀 Running Locally

Clone the repository:

```bash
git clone git@github.com:Itmanco/ClassRoom.git
cd ClassRoom
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run serve
```

Build the production version:

```bash
npm run build
```

Lint the project:

```bash
npm run lint
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

---

# 📅 Roadmap

## ✅ Completed

- School domain architecture
- Student Management
- Course Management
- Building Management
- Room Management
- Class Management
- Enrollment Management
- Seating Plan Management
- Intelligent Seating Planner
- English / Japanese localization foundation

## 🚧 In Progress

- Complete internationalization
- Shared validation framework
- Authentication localization

## 🔮 Future Plans

- User roles and permissions
- School administration
- Classroom zones
- Pinned students
- Support-seat preferences
- Automated testing
- GitHub Actions CI/CD
- Vite migration

---

# 📖 Documentation

Additional documentation is available in the `docs/` folder.

- AI_CONTEXT.md
- ROADMAP.md
- TODO.md
- CHANGELOG.md
- INTERNATIONALIZATION.md
- CONTRIBUTING.md
- PLANNING_ENGINE.md

---

# 📸 Screenshots

*Coming soon.*

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Jaime Motta**

GitHub:

https://github.com/Itmanco

Live Demo:

https://itmanco.github.io/ClassRoom/