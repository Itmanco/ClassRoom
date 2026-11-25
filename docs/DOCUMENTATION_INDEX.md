# Documentation Index

This directory is the maintained documentation set for Classroom Manager.

**Last synchronized with source:** 2026-09-06
**Documentation audit:** In progress
**Audit baseline commit:** `36f00d4`

During an incremental documentation update, individual
documents may have different verification dates.

## Start here

| Document | Purpose |
| --- | --- |
| `../README.md` | Public project overview, features, setup, deployment |
| `../README.ja.md` | Japanese version of the public project overview, features, setup, deployment |
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
| `PLANNING_ENGINE.md` | Product behavior, recommendation philosophy, explainability, and teacher control |
| `SEATING_ENGINE.md` | Technical algorithm notes, API, historical constraints, and extension rules |
| `PLANNING_ENGINE_ROADMAP.md` | Implemented engine capabilities, testing and hardening, future objectives, and product boundaries |

## Internationalization

| Document | Purpose |
| --- | --- |
| `INTERNATIONALIZATION.md` | Localization architecture, locale initialization and persistence, bilingual UI coverage, translation rules, testing, and remaining work |

## Development continuity

| Document | Purpose |
| --- | --- |
| `AI_CONTEXT.md` | Compact technical context for AI-assisted development, current architecture, security boundaries, and development priorities |
| `START_NEW_CHAT.md` | Current development handoff, recovery instructions, working conventions, and verification commands |
| `DECISIONS.md` | Numbered architecture and product decisions, design rationale, and durable engineering principles |
| `MIGRATION_PROGRESS.md` | Legacy architecture migration, completed modernization, security migration, and remaining work |
| `CONTRIBUTING.md` | Development workflow, emulator usage, testing, security, commit standards, and documentation practices |
| `DEVELOPER_PROFILE.md` | Project portfolio narrative, demonstrated engineering skills, and development philosophy |
| `ClassRoom_Development_Handoff_2026-10-22.md` | Historical development checkpoint for school operating hours and room reservations (2026-10-22) |

## Source of truth

When documents conflict about the current implementation,
use this order:

1. Current source code, Cloud Functions, Firestore rules,
   and relevant application configuration
2. `README.md` and `README.ja.md`
3. `PROJECT_CONTEXT.md` and `ARCHITECTURE.md`
4. `FIRESTORE_SCHEMA.md` and specialized technical documents
5. `ROADMAP.md` / `TODO.md`
6. `CHANGELOG.md` and historical notes

Automated tests and verified runtime behavior provide
supporting evidence of implementation correctness.

`DECISIONS.md` records approved architecture and product
decisions, including their rationale. If the implementation
conflicts with an approved decision, investigate and document
the discrepancy rather than silently changing the decision
or assuming the implementation is correct.

`AI_CONTEXT.md` and `START_NEW_CHAT.md` summarize the current
project state for development continuity. They must remain
consistent with the source code and maintained documentation.

Distinguish between local implementation, tested behavior,
committed repository state, deployed functionality, and
verified production behavior. A GitHub commit alone does
not establish that a change has been deployed.

Roadmap and backlog entries describe planned work and must
not be treated as implemented functionality without
verification.

`Project Markdown.md` at the repository root is a historical
pointer and is not current project planning.

Dated development handoff documents are historical snapshots.
They preserve the context of their recorded checkpoints but
must not override the current implementation or maintained
development handoff.

## Synchronization rule

Do not append isolated “latest update” fragments indefinitely. When a milestone changes the current state, rewrite the relevant sections/files so the documentation reads as one coherent snapshot. Keep historical detail in `CHANGELOG.md` and durable rationale in `DECISIONS.md`.

### Preserve existing knowledge

Before updating documentation, inspect the existing content
and compare it with the relevant current implementation.

Preserve accurate technical explanations, examples,
architectural reasoning, approved decisions, relevant
historical context, and pending development plans.

Prefer focused, reviewable changes over unnecessary
full-document replacements. Remove or relocate information
only when its removal or relocation is justified.

### Documentation review workflow

For substantial documentation updates:

1. Inspect the existing document and relevant source code.
2. Identify accurate, outdated, missing, and historical
   information.
3. Propose focused changes and explain their purpose.
4. Review and obtain approval for the affected sections.
5. Apply only the approved changes.
6. Verify the resulting diff, technical accuracy, links,
   and consistency with related documents.
7. Commit the verified changes after authorization.

Do not overwrite existing documentation, commit, push,
or deploy changes without the required approval.

### Synchronize with development milestones

When completing a development milestone, identify and
update the affected documentation as part of the
milestone closure process.

Keep the English and Japanese README files aligned
when changing shared product information.

Update the architecture, schema, security, planning,
and operational documentation when their respective
implementation changes.

Keep `ROADMAP.md` and `TODO.md` aligned with the current
development priorities, `CHANGELOG.md` with completed
milestones, and `DECISIONS.md` with durable design rationale.

Keep `AI_CONTEXT.md` and `START_NEW_CHAT.md` aligned
with the latest verified development checkpoint.

### Preserve pending work

Distinguish completed functionality, approved pending work,
proposed improvements, known limitations, and deferred work.

Do not silently remove previously recorded development
plans during a documentation synchronization update.

Record changes in development priorities explicitly.

### Verification metadata

Update verification dates and repository commit references
only after reviewing the relevant document against the
corresponding implementation.

During an incremental documentation update, individual
documents may have different verification dates.

Updating the documentation index does not establish that
every referenced document has been verified.
