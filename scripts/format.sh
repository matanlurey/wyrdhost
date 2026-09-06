#!/usr/bin/env bash
set -euo pipefail

mode=${1:?expected --write or --check}
shift

if [[ ${1:-} == --all || ${GITHUB_REF_NAME:-$(git branch --show-current)} == main ]]; then
  if [[ $mode == --write ]]; then
    biome format --write .
    exec prettier --write "**/*.md"
  fi
  biome format .
  exec prettier --check "**/*.md"
fi

if [[ -n ${GITHUB_BASE_REF:-} ]]; then
  base="origin/$GITHUB_BASE_REF...HEAD"
else
  base=HEAD
fi

biome_files=()
markdown_files=()
while IFS= read -r -d '' file; do
  if [[ $file == *.md ]]; then
    markdown_files+=("$file")
  else
    biome_files+=("$file")
  fi
done < <(git diff --name-only --diff-filter=ACMR -z "$base")

if ((${#biome_files[@]})); then
  if [[ $mode == --write ]]; then
    biome format --write --files-ignore-unknown=true "${biome_files[@]}"
  else
    biome format --files-ignore-unknown=true "${biome_files[@]}"
  fi
fi

if ((${#markdown_files[@]})); then
  if [[ $mode == --write ]]; then
    prettier --write "${markdown_files[@]}"
  else
    prettier --check "${markdown_files[@]}"
  fi
fi
