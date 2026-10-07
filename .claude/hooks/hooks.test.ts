/**
 * End-to-end tests for the Claude Code hooks in this folder. Each test runs a hook script the
 * way Claude Code does: hook JSON on stdin, then the exit code decides the outcome
 * (0 lets the tool call through, 2 blocks it or reports a failure to Claude).
 */

import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, describe, expect, it } from "vitest";

const hooksDir = dirname(fileURLToPath(import.meta.url));
const scratch: string[] = [];

function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "starterpack-hooks-"));
  scratch.push(dir);
  return dir;
}

function runHook(script: string, input: unknown) {
  const run = spawnSync("node", [join(hooksDir, script)], {
    input: JSON.stringify(input),
    encoding: "utf8",
  });
  return { code: run.status, stderr: run.stderr };
}

function repoOn(branch: string): string {
  const dir = tempDir();
  execFileSync("git", ["init", "-q", "-b", branch], { cwd: dir });
  return dir;
}

afterAll(() => {
  for (const dir of scratch) rmSync(dir, { recursive: true, force: true });
});

describe("no-commit-on-main", () => {
  const bash = (command: string, cwd: string) => ({
    tool_name: "Bash",
    tool_input: { command },
    cwd,
  });

  it("blocks a commit on main", () => {
    const { code, stderr } = runHook("no-commit-on-main.mjs", bash('git commit -m "x"', repoOn("main")));
    expect(code).toBe(2);
    expect(stderr).toMatch(/feature branch/);
  });

  it("blocks a chained commit on master", () => {
    const cmd = "git add docs/plan.md && git commit -m x";
    expect(runHook("no-commit-on-main.mjs", bash(cmd, repoOn("master"))).code).toBe(2);
  });

  it("checks the checkout named by git -C", () => {
    const main = repoOn("main");
    const feature = repoOn("feature/x");
    expect(runHook("no-commit-on-main.mjs", bash(`git -C ${main} commit -m x`, feature)).code).toBe(2);
    expect(runHook("no-commit-on-main.mjs", bash(`git -C ${feature} commit -m x`, main)).code).toBe(0);
  });

  it("allows a commit on a feature branch", () => {
    expect(runHook("no-commit-on-main.mjs", bash("git commit -m x", repoOn("feature/x"))).code).toBe(0);
  });

  it("ignores other git commands on main", () => {
    const main = repoOn("main");
    for (const cmd of ["git status", "git log --oneline", "git switch -c feature/x", "echo commit"]) {
      expect(runHook("no-commit-on-main.mjs", bash(cmd, main)).code).toBe(0);
    }
  });

  it("passes through input it can't read", () => {
    expect(runHook("no-commit-on-main.mjs", { tool_name: "Bash" }).code).toBe(0);
  });
});

describe("test-after-plan-edit", () => {
  /** A fake repo whose `npm test` passes or fails on demand, so the hook never recurses into this suite. */
  function fakeRepo(passes: boolean): string {
    const dir = tempDir();
    mkdirSync(join(dir, "docs", "projects"), { recursive: true });
    const script = passes ? "node -e \"process.exit(0)\"" : "node -e \"console.log('contract broke'); process.exit(1)\"";
    writeFileSync(join(dir, "package.json"), JSON.stringify({ name: "fake", scripts: { test: script } }));
    return dir;
  }
  const edit = (file_path: string) => ({ tool_name: "Edit", tool_input: { file_path } });

  it("reports a failing suite after a plan.md edit", () => {
    const repo = fakeRepo(false);
    const { code, stderr } = runHook("test-after-plan-edit.mjs", edit(join(repo, "docs", "plan.md")));
    expect(code).toBe(2);
    expect(stderr).toMatch(/contract broke/);
  });

  it("runs after a docs/projects/ edit", () => {
    const repo = fakeRepo(false);
    expect(runHook("test-after-plan-edit.mjs", edit(join(repo, "docs", "projects", "x.md"))).code).toBe(2);
  });

  it("stays quiet when the suite passes", () => {
    const repo = fakeRepo(true);
    expect(runHook("test-after-plan-edit.mjs", edit(join(repo, "docs", "plan.md"))).code).toBe(0);
  });

  it("skips files outside the docs contract", () => {
    const repo = fakeRepo(false);
    for (const file of ["README.md", "docs/concept.md", "docs/logs/x.md", "src/plan.md"]) {
      expect(runHook("test-after-plan-edit.mjs", edit(join(repo, file))).code).toBe(0);
    }
  });
});
