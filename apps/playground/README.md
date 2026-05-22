# cogsbox-shape Playground

Private repo-only test app for exercising `cogsbox-shape` and `cogsbox-shape-db` in real client/server flows.

Run the API and web app in separate terminals:

```bash
pnpm --filter cogsbox-shape-playground dev:api
pnpm --filter cogsbox-shape-playground dev:web
```

The app tests:

- schema defaults
- `insert(...).full()` reconciliation
- partial `update(...).full()`
- server-side validation errors
- DB-backed derived fields
- optimistic client flows with TanStack Query
