# Contributing

## Setup

Install Node.js 26 with `nvm use`, then install dependencies and Chromium:

```sh
npm install
npx playwright install chromium
```

Keep `package-lock.json` in sync with workspace dependency changes.

## Development

Start the blank Vite development surface with `npm run dev` when application integration work needs it. Start the component workshop with:

```sh
npm run storybook
```

The UI architecture, accessibility contract, token policy, and primitive workflow are documented in [docs/UI-FOUNDATION.md](docs/UI-FOUNDATION.md).

## Checks

`npm run format`, `npm run format:check`, and `npm run lint` target local changes by default, files changed by a pull request in CI, and the whole tree on `main`. Pass `--all` to target the whole tree explicitly.

Run the complete local gate with:

```sh
npm run check -- --all
```

It runs formatting, linting, type checking, unit tests, Chromium Storybook tests, the production build, and the static Storybook build. The individual UI commands are `npm run test:ui`, `npm run build`, and `npm run storybook:build`.

Biome provides code and configuration formatting, linting, and import organization. Prettier formats Markdown, which Biome does not yet support. TypeScript, Vitest, Storybook, and Playwright provide compile-time, unit, accessibility, and browser coverage.

## Git hooks

Git hooks run Biome on staged files and enforce Conventional Commits. The hook commands are also available as `npm run lint-staged` and `npm run commitlint`; pipe a message to the latter when using Jujutsu.

## Continuous integration

GitHub Actions installs Playwright Chromium, runs the complete gate, and validates commit messages on pull requests and merges to `main`.
