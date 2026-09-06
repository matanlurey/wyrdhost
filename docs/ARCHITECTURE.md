# Current architecture

## Entry points and dependencies

`apps/game/src/main.tsx` mounts React StrictMode and `app/App.tsx`, and imports
the shared CSS layers. Vite builds a static browser app. `App` subscribes to the
location hash, validates the destination, and provides the error boundary and
toast provider. `AppShell` renders navigation and the selected screen.

Dependency direction is application → UI primitives → Base UI / React.
`src/ui` must not import `src/app`. Stories import actual components; production
entry points must not import stories or their review fixtures. There is no
separate game-rules package yet. Do not introduce one solely to satisfy a diagram.

`src/ui/styles` defines the base layers and tokens. `app/theme.css` maps raw
heraldic pigments to semantic roles inside the shell. CSS Modules own component
layout. Portal primitives have their own base styles; shell theme scoping does
not yet guarantee that every portal receives application theme overrides.

## State, content, and persistence

React state in App.tsx owns sample location and Company selection. The sample
content is colocated in that file. It is not a shared content schema or combat
model, and there is no rules/presentation separation to claim yet.

The application explicitly enables appearance persistence through AppShell's
`persistAppearance` prop. Storage reads validate the known appearance value;
failed reads use the default, and failed writes leave session UI usable.
Storybook leaves persistence off and supplies deterministic initial appearance.
No game saves are read or written. Hash navigation and document titles remain
browser concerns; AppShell stories stage screens through props rather than
providing a full router integration test.

## Contracts to protect

- Unknown routes render a fallback; sample values do not imply gameplay rules.
- Primitives remain independent of application screens.
- Storybook uses the same components without writing production preferences.
- UI labels and focus remain readable; state must not rely on faction color.
- A failed browser suite is not replaced by a successful static build.

The shell remains a single large module. Split responsibilities when a concrete
feature needs it; a generic state store, transactions, replay, save migrations,
and simulation infrastructure would be premature today.
