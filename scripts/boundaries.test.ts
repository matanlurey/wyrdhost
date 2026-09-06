import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { expect, it } from "vitest";

const source = resolve("apps/game/src");
// The current source uses explicit relative file extensions and static imports.
// Cover import/export specifiers and literal dynamic imports without adding a parser.
function imports(file: string) {
  return Array.from(
    readFileSync(file, "utf8").matchAll(
      /(?:from\s*|import\s*(?:\(\s*)?)["']([^"']+)["']/g,
    ),
    (match) => match[1] ?? "",
  );
}
function files(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}
it("keeps UI primitives independent of application screens", () => {
  const violations: string[] = [];
  for (const file of files(join(source, "ui")).filter((path) =>
    /\.tsx?$/.test(path),
  )) {
    for (const dependency of imports(file)) {
      if (
        dependency.startsWith(".") &&
        resolve(dirname(file), dependency).startsWith(`${source}/app/`)
      ) {
        violations.push(`${file}: ${dependency}`);
      }
    }
  }
  expect(violations).toEqual([]);
});
it("keeps stories and review fixtures out of the production module graph", () => {
  const visited = new Set<string>();
  const pending = [join(source, "main.tsx")];
  const violations: string[] = [];
  while (pending.length) {
    const file = pending.pop();
    if (!file || visited.has(file)) continue;
    visited.add(file);
    for (const dependency of imports(file)) {
      if (/storybook|\.stories\.|story-fixtures|\/testing\//.test(dependency))
        violations.push(`${file}: ${dependency}`);
      if (dependency.startsWith(".") && /\.tsx?$/.test(dependency))
        pending.push(resolve(dirname(file), dependency));
    }
  }
  expect(violations).toEqual([]);
});
