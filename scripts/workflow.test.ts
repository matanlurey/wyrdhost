import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import process from "node:process";
import { afterEach, describe, expect, it } from "vitest";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0))
    rmSync(root, { recursive: true, force: true });
});
function fixture() {
  const cwd = mkdtempSync(join(tmpdir(), "wyrdhost-check-"));
  roots.push(cwd);
  const bin = join(cwd, "bin");
  mkdirSync(bin);
  const log = join(cwd, "invocations");
  for (const name of ["biome", "prettier"]) {
    writeFileSync(
      join(bin, name),
      '#!/bin/sh\nprintf "%s\\n" "$@" >> "$CHECK_LOG"\nexit "${CHECK_EXIT:-0}"\n',
      { mode: 0o755 },
    );
  }
  execFileSync("git", ["init", "-b", "task"], { cwd });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "--allow-empty",
      "-m",
      "initial",
    ],
    { cwd },
  );
  writeFileSync(join(cwd, ".git/info/exclude"), "bin/\ninvocations\n");
  const env = {
    ...process.env,
    PATH: `${bin}:${process.env["PATH"]}`,
    CHECK_LOG: log,
    GITHUB_BASE_REF: "",
    GITHUB_REF_NAME: "task",
  };
  return { cwd, log, env };
}
describe("local verification scope", () => {
  it("accepts a clean task branch without invoking lint", () => {
    const f = fixture();
    expect(spawnSync("bash", [resolve("scripts/lint.sh")], f).status).toBe(0);
  });
  it("checks untracked paths with spaces and propagates lint failures", () => {
    const f = fixture();
    writeFileSync(join(f.cwd, "new module.ts"), "export {};\n");
    expect(
      spawnSync("bash", [resolve("scripts/lint.sh")], {
        ...f,
        env: { ...f.env, CHECK_EXIT: "1" },
      }).status,
    ).toBe(1);
    expect(readFileSync(f.log, "utf8")).toContain("new module.ts\n");
  });
  it("formats new Markdown and source files using their existing tools", () => {
    const f = fixture();
    writeFileSync(join(f.cwd, "new guide.md"), "# Guide\n");
    writeFileSync(join(f.cwd, "new module.ts"), "export {};\n");
    expect(
      spawnSync("bash", [resolve("scripts/format.sh"), "--check"], f).status,
    ).toBe(0);
    const log = readFileSync(f.log, "utf8");
    expect(log).toContain("new guide.md\n");
    expect(log).toContain("new module.ts\n");
  });
});
