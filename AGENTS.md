# Working on Wyrdhost

## Read first

1. [Documentation index](docs/README.md) and [current status](docs/STATUS.md).
2. [Architecture](docs/ARCHITECTURE.md) and the files affected by the task.
3. [CONTRIBUTING](CONTRIBUTING.md) for exact setup and verification.
4. [UI Foundation](docs/UI-FOUNDATION.md) and [Phase 2](docs/PHASE-2.md) for UI work.

GitHub is the source of truth. Documentation is durable project memory; distinguish
Proposed, Accepted, Implemented, and Superseded using the index's convention.
Surface conflicts between accepted intent, code, and tests; do not silently rewrite
one to conceal the discrepancy.

## Commands

Use Node 26 (`nvm use`) and `npm ci` with the committed lockfile. No credentials or
environment variables are required for ordinary development or tests.

- `npm run dev`: application.
- `npm run storybook`: component and staged-screen review.
- `npm run check`: full-tree formatting/lint, types, deterministic tests, app build.
- `npm run check:ui`: browser interaction/accessibility suite and Storybook build.
- `npx playwright install --with-deps chromium`: browser setup in a fresh cloud VM.
- `npm run format`: format changed and untracked files; `-- --all` for the whole tree.

CI runs both check commands. See CONTRIBUTING for focused commands and review.

## Boundaries and task size

Preserve React / Base UI / CSS Modules / semantic tokens / Storybook. Do not change
licensing, rules, framework, or external services without task authorization.
The current app is a shell with display fixtures, not a playable rules engine.
Keep primitives independent of application screens and review code out of the
production dependency graph. Keep staged reviews isolated from persistent state.

For small localized work: inspect, implement, add relevant regression coverage,
run affected checks, inspect changed UI when applicable, and update only affected
documentation. No specification is required for typos or routine spacing fixes.

Before cross-cutting work, write a short readiness review in the task or PR:

- Concrete risks and affected file locations.
- Contracts that must remain unchanged.
- Smallest prerequisite repairs and completion criteria.

Use this for shared schemas, persistence, public interfaces, coordinated state
changes, combat/activation rules, or previews that promise committed outcomes.
Reject generic cleanup and speculative abstractions. If a specification is needed,
record intended behavior, scope/non-goals, ownership/contracts, invariants, failure
handling, persistence implications, acceptance tests, and unresolved decisions.
Persist accepted specifications only when they guide continuing work. Continue
unblocked work; do not invent consequential game-design requirements.

## Verification and review

The owner judges gameplay feel, balance, and visual quality. Automated tests and
screenshots support that judgment. Use Storybook's real components and deterministic
fixtures for static UI checks; do not automate live gameplay without a request.
For UI changes, run check:ui and inspect relevant phone and desktop states, long
content, focus, targets, motion preferences, and overflow. Reuse the in-app browser
when available. A rendered fixture, an interaction assertion, an inspected screenshot,
and owner approval are different evidence; report each accurately.

Before a PR, review the final diff for scope, contradictory docs, real test value,
unnecessary dependencies, and accidental persistence or gameplay changes. An
independent read-only reviewer is useful for substantial changes, not mandatory
ceremony. Identify self-review honestly when used.

Report exact commands and failures. Missing Chromium, network restrictions, or
unavailable browser tooling mean verification is incomplete; never call it a pass.
Use CI for the exact commit and preserve failures for diagnosis. Do not disable a
gate to obtain green checks. Prefer PR artifacts to transient committed screenshots.

## Delivery and project memory

Work on a task branch. Commit coherent checkpoints with Conventional Commits and
push when requested. Never push directly to main or merge without authorization.
Update current status, architecture, or instructions alongside relevant behavior
changes. Keep per-run logs and initial audits in the PR unless they have durable value.
PRs state what changed and why, checks/results, visual evidence, remaining human
review, and deliberate deferrals.

Preserve preview-before-PR for user-visible design changes: supply a usable remote
preview and actual screenshots. Localhost is not a remote preview. Keep the game
local unless publishing is explicitly requested. Do not change repository settings,
secrets, branch protection, or external services as workflow housekeeping.
Keep a requested preview server available during the owner's testing session.

This is unreleased. Prefer a clean current implementation over speculative backward
compatibility. Remove obsolete callers and adapters when replacing a system. Old
save formats may be invalidated when an authorized design change needs it; report
any reset. Git provides history; do not retain legacy systems for hypothetical users.
