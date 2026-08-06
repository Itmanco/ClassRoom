# Contributing

## Source of truth

Read relevant files under `docs/` before implementing changes.

## Principles

1. Explain architecture changes first.
2. Prefer small, reviewable commits.
3. Preserve backward compatibility when practical.
4. Avoid unrelated refactors.
5. Update documentation with behavior changes.
6. Keep the teacher's decision final.
7. Keep school and class context explicit.

## Workflow

```text
Create feature branch
→ Implement one focused change
→ Test manually
→ npm run lint
→ npm run build
→ Update documentation
→ Commit and push
→ Merge to main
→ Deploy GitHub Pages
```

## Suggested commit style

```text
feat: add class workspace navigation
refactor: embed enrollment management in class workspace
refactor: embed seating plan management in class workspace
refactor: simplify navigation with class workspace
docs: document class workspace architecture
```

## Internationalization

- No new hardcoded user-facing strings
- Add matching English and Japanese keys
- Use interpolation for dynamic text
- Keep service and engine output language-independent
- Test switching after dynamic results already exist

## Data integrity

- Do not change stable IDs casually
- Do not delete historical records without a migration plan
- Prefer archive flags for referenced records
- Preserve school and class ownership in paths

## Verification checklist

- [ ] Existing workflow still works
- [ ] English works
- [ ] Japanese works
- [ ] School context is correct
- [ ] Class context is correct
- [ ] No data from another class appears
- [ ] `npm run lint` has no new errors
- [ ] `npm run build` succeeds
- [ ] Git status is clean after commit
