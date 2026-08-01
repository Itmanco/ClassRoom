# Room Management internationalization update

Files:

- `src/pages/RoomManager.vue` — complete replacement
- `locale-snippets/en.rooms.json` — merge `rooms` into `src/i18n/locales/en.json`
- `locale-snippets/ja.rooms.json` — merge `rooms` into `src/i18n/locales/ja.json`

Do not replace the entire locale file with the snippet. Merge the top-level `rooms` object into the existing JSON.

After copying:

```bash
npm run lint
npm run build
npm run serve
```

Test:

- building selector
- suggested room code
- calculated capacity
- building filter
- create/edit/archive
- English/Japanese switching
