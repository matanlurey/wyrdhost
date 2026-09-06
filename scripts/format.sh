#!/usr/bin/env bash
set -euo pipefail

mode=${1:?expected --write or --check}
shift

if [[ ${1:-} == --all || ${GITHUB_REF_NAME:-$(git branch --show-current)} == main ]]; then
  exec prettier "$mode" .
fi

if [[ -n ${GITHUB_BASE_REF:-} ]]; then
  base="origin/$GITHUB_BASE_REF...HEAD"
else
  base=HEAD
fi

files=()
while IFS= read -r -d '' file; do
  files+=("$file")
done < <(git diff --name-only --diff-filter=ACMR -z "$base")

((${#files[@]})) && prettier "$mode" --ignore-unknown "${files[@]}"
