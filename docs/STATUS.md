# Current status and priorities

## Implemented

Phase 2 provides a React application shell with hash navigation, a campaign
placeholder, sample army inspection, a collection placeholder, appearance
settings, and missing-page/render-error fallbacks. Base UI primitives, semantic
styles, Storybook, strict TypeScript, Biome, and CI are in place.

There is no playable battle, campaign simulation, content schema, game-state
store, save format, or backend. Only the appearance preference persists.
Company values and status labels are deterministic display fixtures.

## Verification evidence

Phase 2's production and Storybook builds, formatting, lint, and type checking
ran successfully in the cloud workspace. Actual desktop and 390px/320px phone
screenshots were inspected; navigation and selection were exercised and those
phone widths had no horizontal overflow. This does not certify all accessibility
or visual behavior. Local Storybook tests were blocked by missing Chromium and
browser-download timeouts. Use each PR's CI results for that exact revision;
do not infer a pass from these historical observations.

Phase 2.5 adds deterministic workflow regression tests and isolates Storybook
appearance state. A test's presence is not proof it ran: PR descriptions must
record the commands, results, environmental limitations, and inspected artifacts.
The owner judges gameplay feel, balance, and visual quality.

## Priorities

- **Current — accepted:** Phase 2.5 development workflow adoption, after Phase 2.
- **Next — recommendation, not an accepted specification:** typed game data and
  a functional muster leading to a small playable battle using agreed rules.
  Resolve consequential rules questions before encoding them.
- **Later possibilities:** campaign exploration, authored world art, and a card
  editor. No implementation order or full production roadmap is accepted here.

Update this page when capabilities or priorities change; put per-run logs and
screenshots in PR artifacts rather than copying test totals into this document.
