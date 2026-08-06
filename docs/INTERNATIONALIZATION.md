# Internationalization

## Goal

The application supports English and Japanese without coupling business logic to one language.

## Technology

- Vue I18n 11
- JSON locale catalogs

```text
src/i18n/
├── index.js
└── locales/
    ├── en.json
    └── ja.json
```

## Locale lifecycle

1. Read saved locale from `localStorage`.
2. Otherwise inspect browser locale.
3. Choose a supported language.
4. Fall back to English.
5. Update Vue I18n.
6. Update the document language.
7. Persist later changes from Settings.

## Completed areas

- Settings
- Navigation
- Student Management
- Course Management
- Building Management
- Room Management
- Class Management
- Class Workspace
- Enrollment Management
- Seating Plan Management
- Intelligent Seating Planner

## Remaining areas

- Legacy Classroom page
- Login and authentication messages
- Shared loading/empty/success/error review
- Confirmation-dialog review
- Japanese terminology review
- Screenshots
- Application-controlled validation

## Class Workspace localization

Localized workspace text includes:

- Workspace title and description
- Back action
- Tab names
- Overview labels
- Class-not-found state
- Loading and service errors

Embedded Enrollment and Seating Plan managers reuse their existing domain translation keys.

## Planning Engine localization

Localized text includes:

- Planner title and description
- Optimization attempts
- Preference labels
- Generate/regenerate actions
- Candidate labels
- Objective labels
- Quality labels
- Trade-offs
- Conflict explanations
- Generation and selection feedback

The engine itself remains language-independent.

## Translation rules

Translate:

- Titles
- Labels
- Buttons
- Placeholders
- Statuses
- Loading text
- Empty states
- Success messages
- Error messages
- Confirmation dialogs
- Dynamic explanations

Do not hardcode new user-facing text.

## Browser validation limitation

Native HTML validation text follows browser behavior and may not match the selected application locale.

A reusable application validation layer is planned for v0.8.1.

## Japanese terminology

| English | Japanese |
|---|---|
| Student | 生徒 |
| Course | 科目 |
| Building | 校舎 |
| Room | 教室 |
| Class | クラス |
| Enrollment | クラス所属 |
| Seating Plan | 座席表 |
| Class Workspace | クラスワークスペース |
| Intelligent Seating Planner | インテリジェント座席プランナー |
| Optimization attempts | 探索回数 |
| Trade-offs | 妥協点 |

Terminology should be reviewed with native educational-software expectations before v1.0.

## Definition of done

A translated page should:

- Have no visible hardcoded English
- Have matching English/Japanese keys
- Use interpolation for dynamic values
- Switch language without reload
- Preserve behavior
- Cover all UI states
- Pass lint and build checks
