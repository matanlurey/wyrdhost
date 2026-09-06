# UI Foundation

The game UI is a React 19 and Vite 8 workspace in `apps/game`. This foundation is deliberately limited to reusable styling, accessibility behavior, component development, and browser validation. It does not define the application shell, routing, gameplay state, or a final visual theme.

## Architecture

`apps/game/src/ui/styles/layers.css` is the single global CSS entry point. Import it once from the application and once from Storybook. The cascade order is fixed:

1. `reset` normalizes browser defaults.
2. `tokens` defines shared design decisions as custom properties.
3. `base` supplies document-level defaults.
4. `components` contains colocated component styles.
5. `utilities` contains accessibility and other reusable utilities.
6. `overrides` is reserved for explicit integration overrides.

Component styles use CSS Modules and enter the `components` layer. Prefer logical properties, dynamic viewport units, media queries, and container queries over JavaScript layout checks.

## Tokens

Tokens live in `apps/game/src/ui/styles/tokens.css`.

- Raw scales describe spacing, typography, radii, border widths, durations, easing, and z-index levels.
- Semantic color tokens describe roles such as canvas, panel, text, focus, accent, danger, and disabled states.
- Component tokens are added only when a component needs a stable decision that is not shared, such as a dialog width.
- Safe-area tokens wrap the four `env(safe-area-inset-*)` values and must be used by viewport-edge UI.

Use an existing token before adding one. Add a token only after a real component needs it. Keep theme-specific styling out of this layer until a theme exists.

## Primitives

Primitives are colocated under `apps/game/src/ui/primitives` with their CSS Modules and stories.

- `Button` is a native button with size and semantic variant props.
- `IconButton` requires a text label and hides its icon from assistive technology.
- `Dialog` provides a modal dialog with labelled title and description, focus management, scroll containment, and controlled or uncontrolled state.
- `AlertDialog` starts focus on the safe cancel action and requires an explicit destructive confirmation.
- `Drawer` is a bottom-only mobile sheet with swipe dismissal, focus management, safe-area padding, and scroll containment.
- `ToastProvider` and `useToast` provide queued neutral, success, warning, and danger feedback. Every event has a stable ID, so repeated events update one toast rather than creating spam. Danger feedback uses urgent announcement priority.

Use native semantic HTML for ordinary controls. Use Base UI only when a component needs focus trapping, dismissal gestures, live-region management, or another interaction model that is difficult to implement correctly with native HTML.

## Accessibility contract

The global accessibility stylesheet provides visible `:focus-visible` rings, disabled-state affordances, a visually-hidden utility, reduced-motion handling, increased-contrast and forced-colors adaptations, and 44 by 44 CSS-pixel coarse-pointer targets.

New primitives must preserve:

- a programmatic accessible name and description where applicable;
- complete keyboard operation and visible focus;
- focus entry, containment, and restoration for modal UI;
- explicit labels for icon-only controls;
- safe cancellation before destructive actions;
- long-content scrolling without trapping page or keyboard users;
- narrow-screen layout without horizontal overflow;
- safe-area insets for UI attached to viewport edges;
- reduced-motion behavior without removing state feedback.

## Storybook and browser tests

Run Storybook from the repository root:

```sh
npm run storybook
```

Stories include narrow phone, phone, large phone, tablet, and desktop viewport presets. Colocate stories with a primitive and cover its meaningful states, long content, keyboard behavior, narrow screens, and reduced motion. Add `play` assertions for semantics and interaction behavior. Storybook accessibility violations fail the browser suite.

Chromium tests use Vitest and Playwright. Every story runs once with default desktop input and motion settings and once with touch and reduced-motion emulation:

```sh
npm run test:ui
```

Install the browser once on a new machine:

```sh
npx playwright install chromium
```

The application shell owns safe-area padding for its full-screen layout. Viewport-edge primitives such as drawers and toasts consume the safe-area tokens directly; do not add safe-area padding to `body`.

## Adding a primitive

1. Confirm native HTML does not already provide the required behavior.
2. Reuse an existing primitive or installed Base UI behavior before writing interaction infrastructure.
3. Add the component and one colocated CSS Module. Use tokens instead of raw design values.
4. Add Storybook stories and focused browser assertions for the behavior the platform must protect.
5. Check keyboard, focus, accessible naming, long content, phone widths, coarse pointers, safe areas, reduced motion, and forced colors as applicable.
6. Run `npm run check -- --all`. This includes formatting, linting, type checking, unit and browser tests, the production build, and the Storybook build.
