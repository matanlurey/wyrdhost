# Contributing

## Setup

Install Node.js 26 with `nvm use`, then install dependencies with `npm install`.

## Checks

`npm run format`, `npm run format:check`, `npm run lint`, and `npm run check`
target local changes by default, files changed by a pull request in CI, and the
whole tree on `main`. Biome provides formatting, linting, and import
organization. TypeScript and Vitest provide type checking and tests.

Pass `--all` to target the whole tree explicitly.

## Git hooks

Git hooks run Biome on staged files and enforce Conventional Commits. The hook
commands are also available as `npm run lint-staged` and `npm run commitlint`;
pipe a message to the latter when using Jujutsu.

## Continuous integration

GitHub Actions runs the checks and validates commit messages on pull requests and
merges to `main`.
