# Working on Wyrdhost

Follow the setup, formatting, and validation instructions in [CONTRIBUTING.md](CONTRIBUTING.md).

## User Preferences

- Keep the game local. Do not create, connect, publish, or deploy unless the
  user explicitly requests it.
- When possible use an in-app browser for previews, and reuse an existing tab.
- The user does gameplay testing and provides feedback on mechanics and visuals.
  Do not drive gameplay, launch another browser, or run automated browser
  playtests unless explicitly asked.
- Static scene staging and captures in the in-app browser allowed upon request.
- Code-level tests, type checking, and production builds are appropriate.
- Keep the local development server available while the user tests. Avoid
  unnecessary reloads during their play session.
- Commit coherent changes as checkpoints and push each checkpoint to origin,
  as requested by the user
- This is an unreleased prototype for the user’s own testing. Prefer the
  cleanest current design over backward compatibility. When replacing a system,
  update its callers/tests and remove obsolete implementations, exports,
  adapters, and legacy-only tests. Do not keep old features or build
  compatibility layers for hypothetical consumers. Old save formats may be
  invalidated when a design change requires it; migrations are not required at
  this stage. Mention any resulting test-progress reset. Git checkpoints provide
  the history.
