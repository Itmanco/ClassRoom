# Contributing / Development Workflow

Classroom Manager is currently developed as a focused portfolio/learning
project. These rules keep changes understandable and reversible.

## Before changing code

1.  Understand which context owns the feature: application, school,
    class, room, or seating engine.
2.  Check whether the target file is modern or legacy.
3.  Avoid adding new functionality to `ClassroomPage.vue` unless
    required for migration.
4.  Preserve stable Firestore IDs and historical references.

## Development cycle

``` bash
git status
npm run lint
npm run build
```

During development:

``` bash
npm run serve
```

Before committing:

``` bash
git diff
git status
```

## Staging

`git add .` stages tracked modifications and new untracked files except
ignored files.

Always review:

``` bash
git status
```

after staging.

To unstage a file:

``` bash
git restore --staged path/to/file
```

## Secrets

Never commit:

``` text
serviceAccountKey.json
school-structure.json
```

Administrative scripts may reference the ignored service-account file
but must not embed credentials.

## Commit style

Prefer small, descriptive commits:

``` text
feat: add room teacher position
feat: export seating plans to excel
fix: reset class state on school change
docs: refresh project documentation
refactor: remove legacy classroom page
```

Avoid combining unrelated cleanup with a feature unless necessary.

## Architecture rules

-   Firestore access belongs in services.
-   School-owned operations require `schoolId`.
-   Class-owned operations require `classId`.
-   The seating engine must remain independent from Vue/Firebase.
-   UI translation belongs in Vue I18n.
-   Archive referenced records rather than deleting them.
-   Clear selected class when school context changes.

## Dependencies

Do not use forced upgrades casually:

``` bash
npm audit fix --force
```

Toolchain modernization should use a dedicated branch and regression
testing.

## Documentation

Update documentation when changing:

-   Firestore schema
-   Navigation
-   School/class ownership
-   Planning objectives
-   Export behavior
-   Deployment
-   Major roadmap status

`README.md` is the public entry point; specialized detail belongs under
`docs/`.
