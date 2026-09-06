# Internationalization

**Last verified against source:** 2026-09-06

## Overview

Classroom Manager uses Vue I18n with aligned English and Japanese catalogs:

```text
src/i18n/
├── index.js
└── locales/
    ├── en.json
    └── ja.json
```

Supported locales are `en` and `ja`; English is the fallback.

## Initial locale selection

Priority:

1. previously saved application locale
2. browser default language
3. English fallback

Browser locale is normalized to its base language:

```text
ja-JP → ja
en-US → en
es-CO → en
```

## Persistence

Changing language updates the Vue I18n locale, persists the preference in local storage, and updates `document.documentElement.lang`.

## Current UI coverage

Current catalogs cover the modern application including:

- login/profile/settings and navigation
- Dashboard
- school/no-school flows
- Students, Courses, Buildings, Rooms, Classes
- Class Workspace, enrollments, seating plans, planning UI
- Admin Console
- Admin Schools/Users
- user create/edit/archive/reactivate UI
- membership management and status/error messages
- Activity Log filters/details/actions
- translated audit changed-field labels
- Admin Users Refresh (`Refresh` / `更新`)
- inactive-account screen

The old Classroom/Home UI has been removed and is no longer a localization concern.

## Translation architecture

### Components

Components translate display text:

```vue
{{ $t("navigation.students") }}
```

Dynamic messages use interpolation:

```js
this.$t("example.key", { value })
```

### Services and Functions

Services/Functions should validate and return stable technical/domain errors. They should not import Vue I18n or decide display language. UI surfaces translate known error codes/messages when appropriate.

### Seating Engine

The engine returns structured information rather than prose so the UI can render explanations in the selected language.

## Adding or changing user-visible text

1. Add/update the key in `en.json`.
2. Add/update the equivalent key in `ja.json`.
3. Use `$t(...)` rather than hardcoded bilingual text.
4. Run lint/build.
5. Test both languages, interpolation, and narrow layouts.

## Rules

- Keep EN/JA key structures aligned.
- Do not translate stored IDs or domain identifiers.
- Do not store translated planning violations.
- Do not add one-language Admin/security text.
- Prefer stable error codes for privileged backend errors that the UI can map to localized messages.

## Remaining work

- friendly localized Firebase Authentication errors
- review raw service/domain error presentation
- review browser-native validation
- localized Excel export labels
- final Japanese terminology pass
- representative bilingual screenshots
- long-string/narrow-screen testing

## Excel export

The current Excel export contains print-oriented labels such as teacher/whiteboard/desk. These should eventually resolve from the selected application locale rather than remain hardcoded in the export service.
