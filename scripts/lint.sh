#!/usr/bin/env bash
set -euo pipefail

if [[ ${1:-} == --all || ${GITHUB_REF_NAME:-$(git branch --show-current)} == main ]]; then
  exec biome lint .
fi

if [[ -n ${GITHUB_BASE_REF:-} ]]; then
  base="origin/$GITHUB_BASE_REF...HEAD"
else
  base=HEAD
fi

files=()
while IFS= read -r -d '' file; do
  files+=("$file")
done < <({ git diff --name-only --diff-filter=ACMR -z "$base"; git ls-files --others --exclude-standard -z; })

if ((${#files[@]})); then
  biome lint --files-ignore-unknown=true "${files[@]}"
fi
