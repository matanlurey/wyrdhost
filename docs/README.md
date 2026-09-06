# Wyrdhost documentation

Start with [current status and priorities](STATUS.md), then [architecture](ARCHITECTURE.md).
[CONTRIBUTING](../CONTRIBUTING.md) owns executable setup and verification instructions;
[AGENTS](../AGENTS.md) owns the task workflow.

[UI Foundation](UI-FOUNDATION.md) is the accepted primitive and accessibility contract.
[Phase 2](PHASE-2.md) records the implemented shell and its accepted visual direction;
it is not a gameplay specification.

## Decision language

- **Proposed:** an option or recommendation, not permission to implement it.
- **Accepted:** intended behavior approved by the owner, not proof it exists.
- **Implemented:** supported by code; verification must be reported separately.
- **Superseded:** retained history with a link to its replacement.

Use these labels for ambiguous decisions or specifications, not every document.
Code and tests evidence implementation; accepted specifications describe intent.
If they conflict, report the discrepancy before changing either to hide it.
Keep meaningful history in Git or mark a retained decision superseded. Do not
maintain competing current guides. No separate gameplay specification has been
adopted in this repository yet; sample UI values are not rules.
