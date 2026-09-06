#!/usr/bin/env bash
set -euo pipefail

# Always verify the full tree; --all remains accepted for existing callers.
if [[ $# -gt 1 || ( $# -eq 1 && $1 != --all ) ]]; then
  echo "usage: npm run check [-- --all]" >&2
  exit 2
fi
npm run format:check -- --all
npm run lint -- --all
npm run typecheck
npm test
npm run build
