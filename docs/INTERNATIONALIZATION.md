# Internationalization

## Overview

Classroom Manager uses Vue I18n with English and Japanese catalogs.

``` text
src/i18n/
├── index.js
└── locales/
    ├── en.json
    └── ja.json
```

## Supported locales

``` text
en
ja
```

English is the fallback locale.

## Initial locale selection

The application uses this priority:

1.  Previously saved application locale
2.  Browser default language
3.  English fallback

Browser locale is normalized to its base language. Examples:

``` text
ja-JP → ja
en-US → en
es-CO → en
```

Only supported locales are selected.

## Persistence

The selected locale is stored in local storage using the application
language key.

Changing the language:

-   Updates `i18n.global.locale`
-   Persists the locale
-   Updates `document.documentElement.lang`

This means a user choice takes precedence over browser language on later
visits.

## UI coverage

The current localization system covers the modern management
application, including:

-   Navigation
-   Settings
-   Student Management
-   Course Management
-   Building Management
-   Room Management
-   Class Management
-   Class Workspace
-   Enrollment Management
-   Seating Plan Management
-   Planning Engine UI
-   Profile
-   School/no-school flows

The legacy Classroom page is transitional and should be removed rather
than used as the standard for new localization work.

## Login/authentication

Login UI and authentication error presentation should be reviewed as
part of the final localization/UX pass. Raw Firebase error messages
should not be the long-term user-facing experience.

## Translation architecture

### Components

Components translate display text:

``` vue
{{ $t("navigation.students") }}
```

Dynamic messages use interpolation:

``` js
this.$t("example.key", {
  value
})
```

### Services

Services should:

-   Validate data
-   Throw meaningful technical/domain errors
-   Avoid importing Vue I18n
-   Avoid deciding display language

### Seating Engine

The engine returns structured data:

``` js
{
  type: "previous-partner",
  studentA,
  studentB
}
```

The UI converts that into English or Japanese.

## Adding a translation

1.  Add the key to `en.json`.
2.  Add the equivalent key to `ja.json`.
3.  Replace hardcoded UI text with `$t(...)`.
4.  Run lint/build.
5.  Test both languages.
6.  Test interpolation and narrow/mobile layouts.

## Rules

-   Do not add new hardcoded user-facing English/Japanese text when a
    translation key is appropriate.
-   Keep locale key structures aligned between `en.json` and `ja.json`.
-   Do not translate IDs or stored domain identifiers.
-   Do not store translated engine violations.
-   Prefer neutral domain terminology that works consistently across
    languages.

## Remaining work

-   Review raw Firebase authentication errors
-   Review browser-native validation
-   Review service/domain error presentation
-   Final Japanese terminology pass
-   Check Excel export labels for localization
-   Add representative English/Japanese screenshots
-   Test long translations on small screens

## Excel export

The current Excel export contains print-oriented labels such as
teacher/whiteboard/desk. These should eventually use localized export
labels based on the selected application language rather than remain
hardcoded in the export service.
