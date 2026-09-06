# Documentation Index

This directory is the maintained documentation set for Classroom Manager.

**Last synchronized with source:** 2026-09-06

## Start here

| Document | Purpose |
| --- | --- |
| `../README.md` | Public project overview, features, setup, deployment |
| `PROJECT_CONTEXT.md` | Current product state, roles, current milestone |
| `ARCHITECTURE.md` | Application architecture and ownership/security boundaries |
| `FIRESTORE_SCHEMA.md` | Collections, identity model, audit schema, current rule status |
| `ROADMAP.md` | Product/engineering milestones |
| `TODO.md` | Current actionable backlog |
| `CHANGELOG.md` | Completed milestone history |
| `FIREBASE_BILLING_RUNBOOK.md` | Safe Cloud Functions billing/deployment/monitoring/shutdown procedure |
| `AUDIT_ROADMAP.md` | Audit coverage, scope rules, security-hardening stages |

## Seating and planning

| Document | Purpose |
| --- | --- |
| `PLANNING_ENGINE.md` | Product behavior and recommendation philosophy |
| `SEATING_ENGINE.md` | Technical algorithm notes and API |
| `PLANNING_ENGINE_ROADMAP.md` | Future engine capabilities |

## Internationalization

| Document | Purpose |
| --- | --- |
| `INTERNATIONALIZATION.md` | Locale initialization, translation rules, remaining work |

## Development continuity

| Document | Purpose |
| --- | --- |
| `AI_CONTEXT.md` | Compact technical source-of-truth for AI-assisted development |
| `START_NEW_CHAT.md` | Copyable handoff for a new development conversation |
| `DECISIONS.md` | Important architecture/product decisions |
| `MIGRATION_PROGRESS.md` | Completed legacy migration and remaining security migration |
| `CONTRIBUTING.md` | Development, emulator, commit, and documentation practices |
| `DEVELOPER_PROFILE.md` | Portfolio/developer context |

## Source of truth

When documents conflict, use this order:

1. Current source code and Firestore rules
2. `README.md`
3. `PROJECT_CONTEXT.md` and `ARCHITECTURE.md`
4. `FIRESTORE_SCHEMA.md` and specialized technical documents
5. `ROADMAP.md` / `TODO.md`
6. `CHANGELOG.md` and historical notes

`Project Markdown.md` at the repository root is a historical pointer and is not current project planning.

## Synchronization rule

Do not append isolated “latest update” fragments indefinitely. When a milestone changes the current state, rewrite the relevant sections/files so the documentation reads as one coherent snapshot. Keep historical detail in `CHANGELOG.md` and durable rationale in `DECISIONS.md`.
