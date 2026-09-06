# Contributing / Development Workflow

Classroom Manager is currently developed as a focused portfolio/learning project. These rules keep changes understandable, testable, and reversible.

## Before changing code

1. Identify ownership: application, system administration, school, class, room, or seating engine.
2. Check the current source rather than relying on historical planning notes.
3. Preserve Firebase Authentication UID as canonical identity.
4. Do not use legacy `users/{uid}.role` as an authorization fallback.
5. Preserve stable Firestore IDs and historical references.
6. Do not weaken Firestore rules to make an Admin UI query convenient; use an appropriately scoped backend boundary.

## Development cycle

Baseline checks:

```bash
cd ~/Projects/ClassRoom
git status
npm run lint
npm run build
```

During frontend development:

```bash
npm run serve
```

For privileged Firebase work, start the full emulator set with the existing dataset:

```bash
firebase emulators:start \
  --only functions,auth,firestore \
  --import=./emulator-data \
  --export-on-exit=./emulator-data
```

Do not start an empty emulator unless the test explicitly requires one.

Before committing:

```bash
git diff --check
git diff
git status
```

For Functions changes also run:

```bash
cd functions
npm run lint
node --check index.js
cd ..
```

## Staging

Prefer staging the exact intended files rather than blindly staging local/generated artifacts.

```bash
git add path/to/file another/file
```

Always review:

```bash
git status
```

To unstage:

```bash
git restore --staged path/to/file
```

## Secrets and local artifacts

Never commit:

```text
serviceAccountKey.json
school-structure.json
emulator-data/
emulator-data.zip
firebase-debug.log
firestore-debug.log
```

Administrative scripts may reference ignored local credentials but must never embed secrets.

## Commit style

Prefer small, descriptive commits:

```text
feat: add room teacher position
feat: add admin account lifecycle
fix: scope user audit events to memberships
docs: refresh project documentation
refactor: remove legacy classroom workflow
```

Avoid combining unrelated cleanup with a feature unless necessary.

## Architecture rules

- Firestore access belongs in services unless the operation is a trusted privileged backend operation.
- School-owned operations require explicit `schoolId` context.
- Class-owned operations require explicit `classId` context.
- Firebase Auth UID is canonical for `users/{uid}` and `members/{uid}`.
- Global role = `users/{uid}.systemRole`; school role = membership role.
- Inactive user accounts must not regain access through stale client state.
- The seating engine remains independent from Vue/Firebase.
- User-facing text belongs in aligned EN/JA Vue I18n keys.
- Archive referenced records rather than deleting them when history matters.
- Clear selected class when school context changes.

## Audit rules

Audit destination follows the affected resource, not the actor.

For target-user update/archive/reactivate operations:

- one audit record per target-user school membership
- no duplicate System audit when memberships exist
- exactly one System audit when there are zero memberships

Do not change this rule without updating `DECISIONS.md`, `ARCHITECTURE.md`, `FIRESTORE_SCHEMA.md`, and the regression tests/checklist.

## Dependencies

Do not use forced upgrades casually:

```bash
npm audit fix --force
```

Toolchain modernization should use a dedicated branch and regression testing.

## Documentation

Update the documentation pack as a coherent current-state snapshot when changing:

- identity/authorization/account lifecycle
- Firestore schema/rules
- navigation or Dashboard behavior
- audit scope/events
- school/class ownership
- planning objectives
- export behavior
- deployment/emulator workflow
- major roadmap status

`README.md` is the public entry point. `PROJECT_CONTEXT.md`, `ARCHITECTURE.md`, `FIRESTORE_SCHEMA.md`, `AI_CONTEXT.md`, and `START_NEW_CHAT.md` must not contradict the current source tree.
