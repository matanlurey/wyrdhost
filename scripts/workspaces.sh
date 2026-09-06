#!/usr/bin/env bash
set -euo pipefail

script=${1:?expected workspace script name}

shopt -s nullglob
manifests=(apps/*/package.json packages/*/package.json)
if ((${#manifests[@]} == 0)); then
  exit 0
fi

npm run "$script" --workspaces --if-present
