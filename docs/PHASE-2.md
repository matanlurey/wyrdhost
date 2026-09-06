# Phase 2: application shell

The shell builds on React, Base UI, CSS Modules, semantic tokens, and Storybook.
It provides Campaign, Army, Collection, Settings, and an unknown-route fallback.
Hash navigation supports static hosting and browser history without a server
rewrite. An error boundary handles render failures. No gameplay is implemented.

## Visual direction

“An old fantasy world. A modern instrument for commanding it.”

Blue-black surfaces and warm ivory text keep the command interface restrained.
Command gold is reserved for meaningful emphasis; selection and keyboard focus
have different treatments. Raw pigments are separate from semantic tokens.
Alegreya headings and Source Sans 3 body text are self-hosted. The optional high
contrast preference persists locally; reduced motion follows the operating
system. Faction identity never recolors the whole interface.

Campaign uses an explicitly labelled schematic placeholder. Army fixtures expose
long names, mixed factions, casualties, Ordered and Spent states, and selection.
These are visual test data, not new rules or production artwork. Collection
remains a placeholder; unavailable gameplay actions explain their status.

Mobile uses safe-area-aware bottom navigation. Wider screens use a side rail and
adjacent inspectors. Storybook includes 390px and 320px layouts, screen states,
and an army selection interaction. Future world art should be colorful and
coherent; text and controls remain at native resolution.

## Review

Review the hosted preview and actual screenshots before opening a PR. Check
phone widths, long content, keyboard navigation, preference persistence, and
selection. Run the complete CONTRIBUTING gate with Chromium installed; browser
inspection does not substitute for the automated accessibility suite.
