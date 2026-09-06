# Developer Profile

## Project role

Classroom Manager is a portfolio and learning project demonstrating practical full-stack application design with Vue and Firebase, including domain modeling, privileged backend operations, multi-tenant authorization, and explainable planning logic.

## Skills demonstrated by the project

- Vue 3 component architecture
- JavaScript application/service design
- Firebase Authentication
- Cloud Firestore schema design and real-time listeners
- Firebase callable Cloud Functions and Admin SDK
- Multi-school identity/authorization modeling
- Canonical UID and role separation
- Security-rule design and emulator-based regression testing
- Account lifecycle and administrator lockout protections
- Audit/event modeling with system vs school scope
- Internationalization with EN/JA catalogs
- Responsive UI behavior
- Algorithmic search/optimization
- Explainable recommendation design
- Excel document generation and print layout
- Git/GitHub workflow and GitHub Pages deployment
- Technical documentation and architecture decision tracking

## Engineering themes

The project intentionally emphasizes:

- explicit ownership of school/class data
- separation of system-level and school-level roles
- trusted backend boundaries for cross-account privileged operations
- incremental security hardening rather than UI-only authorization
- stable historical references and archive semantics
- separation of UI, persistence, export, and algorithm logic
- bilingual user experience
- emulator-first testing for privileged Firebase changes
- small, reviewable commits
- documentation as part of the implementation checkpoint

## Portfolio narrative

The application began as a simpler classroom/seating project and evolved into a structured multi-school management system. The current code demonstrates migration from legacy UI architecture to a Dashboard/Class Workspace model, introduction of canonical membership-based authorization, callable user administration, scoped audit history, and protections against administrator lockout.

Current engineering work is focused on completing membership/role-aware Firestore authorization and automated regression coverage before expanding the Teachers domain.
