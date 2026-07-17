# AI Context

This project is actively developed together with ChatGPT.

When continuing work:

- Read PROJECT_CONTEXT.md
- Read MIGRATION_PROGRESS.md
- Read FIRESTORE_SCHEMA.md
- Read DECISIONS.md

Important rules

- Never change architecture without discussion.
- Prefer small commits.
- Keep backward compatibility until migration finishes.
- Explain code before making major changes.
- Avoid unnecessary refactors.

Current goal

Finish migration from

artifacts/{appId}

to

schools/{schoolId}

Current school

school_japan

Legacy app

classroom-b81c6

Current issue

Student collection has not yet been fully migrated.