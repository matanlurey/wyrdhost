# Contributing

## Cloud-compatible setup

Use Node 26 from `.nvmrc` (`nvm use` if nvm is installed), then `npm ci`.
The committed npm lockfile is authoritative. Use `npm install` when intentionally
changing dependencies and commit its lockfile changes. No secrets, environment
variables, local-PC files, or pre-running servers are needed for ordinary checks.

Start the application with `npm run dev`, or the component workshop with
`npm run storybook`. Both start their own server. A localhost URL is only usable
inside that environment; requested remote previews need an authorized hosting path.

## Verification

```sh
npm run check
```

This default always checks the full tree: formatting, lint, TypeScript,
deterministic Node-environment Vitest tests, and the production app build.
`npm run check -- --all` remains equivalent for existing callers.

Browser checks are separately runnable and required for UI/component/story changes,
accessibility or theme changes, and browser configuration changes:

```sh
npx playwright install --with-deps chromium
npm run check:ui
```

This runs Storybook interaction/accessibility tests and its static build. CI runs
both gates on pull requests and main. Browser installation needs network access;
if unavailable, report the exact blocker and obtain CI evidence before merging.
A build cannot substitute for browser tests. The individual commands are `npm test`,
`npm run typecheck`, `npm run test:ui`, `npm run build`, and `npm run storybook:build`.

`npm run format`, `npm run format:check`, and `npm run lint` scope to local changes
and untracked files, PR differences in CI, or the full tree on main. Pass `-- --all`
to explicitly check everything. Biome handles code; Prettier handles Markdown.
No broad formatting migration is expected for a focused task.

## Repeatable visual review

Use Application/Shell in Storybook: Army is a representative mixed-faction muster;
NarrowPhone covers long names at 320px; Phone uses 390px; Desktop uses 1280px;
HighContrast covers an alternate appearance. IsolatedSettings checks that changing
theme does not write storage. All render the actual AppShell with persistence off.
Existing primitive stories cover dialogs, drawers, toasts, and interaction edges.

Story viewport presets are manual review controls. The Vitest browser contexts
exercise desktop and touch/reduced motion; they do not prove that every viewport
preset was screenshot-tested. Inspect real phone and wide renders for overflow,
legibility, targets, focus and console errors. Record the viewport, story, revision,
and observations alongside screenshots in review artifacts. Do not commit transient
captures or use live saves to stage a scene. Static build success, play assertions,
inspected screenshots, and owner visual approval are separate evidence.

## Workflow and CI

Read [AGENTS](AGENTS.md) for proportional readiness reviews and task delivery,
[docs](docs/README.md) for current decisions, and [UI Foundation](docs/UI-FOUNDATION.md)
for the component contract. Update affected documentation with behavior changes.

Hooks run Biome/Prettier on staged files and enforce Conventional Commits.
Use task branches and focused PRs. GitHub Actions uses Node from `.nvmrc`, `npm ci`,
read-only repository permissions, both verification gates, and commitlint. Branch
protection is outside this repository change; the owner can require the existing
Check job separately. No Codex environment settings are configured by these files.
