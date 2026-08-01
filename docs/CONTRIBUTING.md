# Contributing to Classroom Manager

## Source of truth

Read relevant files under `docs/` before suggesting or implementing changes.

## Development principles

1. Explain architecture changes first.
2. Prefer small commits.
3. Preserve backward compatibility.
4. Avoid unrelated refactors.
5. Update documentation with behavior or architecture changes.
6. Explain reasoning.
7. Keep `TODO.md` synchronized.

## Workflow

```text
Feature branch
→ Implement
→ Manual test
→ npm run lint
→ npm run build
→ Update docs
→ Commit and push
→ Merge to main
→ Deploy
→ Tag milestone
```

## Internationalization rules

- No new hardcoded user-facing strings.
- Group translation keys by domain.
- Keep business logic language-independent.
- Planning Engine returns structured results, not English sentences.
- English remains the language for code, commits, and technical docs.
- Test titles, labels, placeholders, dialogs, loading, empty, success, and error states.
- Merge JSON keys into existing objects; avoid duplicate top-level keys.

## Validation rule

Browser-native validation is temporarily accepted in v0.8.0.

Localized application validation belongs to v0.8.1 and should not be mixed into page-translation commits.

## Testing checklist

- [ ] English works
- [ ] Japanese works
- [ ] Switching updates immediately
- [ ] Refresh preserves language
- [ ] Existing CRUD behavior remains unchanged
- [ ] `npm run lint` has no new errors
- [ ] `npm run build` succeeds
