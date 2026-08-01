# Internationalization

## Goal

The application should not assume one UI language.

Current languages:

- `en`
- `ja`

## Structure

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
3. Fall back to English.
4. Update Vue I18n.
5. Update `<html lang>`.
6. Persist Settings changes.

## Translation rules

Translate:

- Titles
- Labels
- Buttons
- Placeholders
- Statuses
- Loading states
- Empty states
- Success/error messages
- Confirmation dialogs
- Planning Engine explanations

Do not add new hardcoded user-facing strings.

## Business logic

Services and the Planning Engine should return structured data rather than translated prose.

Preferred:

```js
{
  type: "REPEATED_DESK",
  studentIds: ["12", "18"],
  count: 2,
}
```

## Current status

Completed:

- Settings
- Navigation
- Student Management
- Course Management

Remaining:

- Buildings
- Rooms
- Classes
- Enrollments
- Seating Plans
- Planning Engine UI
- Classroom
- Login

## Japanese terminology

| English | Japanese |
|---|---|
| Student | 生徒 |
| Course | 科目 |
| Building | 校舎 |
| Room | 教室 |
| Class | クラス |
| Enrollment | クラス所属 / 受講登録 |
| Seating Plan | 座席表 |
| Planning Engine | 座席配置プランニング |

Review terminology before v1.0.

## Browser validation limitation

HTML `required` messages may follow the browser language rather than the app locale.

Localized application validation is planned for v0.8.1.

## Definition of done for a page

- No visible hardcoded English
- Matching English/Japanese keys
- Dynamic values use interpolation
- Switches without reload
- Existing behavior unchanged
- All UI states translated
- Lint and build pass
