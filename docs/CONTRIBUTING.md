# Contributing to Classroom Manager

## Workflow

```text
Feature branch
→ Implement
→ Manual test
→ npm run lint
→ npm run build
→ Update documentation
→ Commit and push
→ Merge to main
→ Deploy GitHub Pages
→ Tag milestone
```

## Internationalization rules

- No new hardcoded user-facing strings
- Group keys by domain
- Keep business logic language-independent
- Translate all UI states
- Keep code and technical docs in English
- Test language switching after dynamic results exist

## Validation rule

Browser-native validation is temporarily accepted during v0.8.0.
Localized application validation belongs to v0.8.1.
