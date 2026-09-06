#!/usr/bin/env bash
set -euo pipefail

scope=()
if [[ ${1:-} == --all ]]; then
  scope=(-- --all)
fi

npm run format:check "${scope[@]}"
npm run lint "${scope[@]}"
npm run typecheck
npm test
