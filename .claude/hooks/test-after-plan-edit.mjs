#!/usr/bin/env node
/**
 * Claude Code PostToolUse hook (Edit, Write, MultiEdit): runs the full `npm test` after any
 * edit to `docs/plan.md` or a file in `docs/projects/`.
 *
 * Why: `docs/plan.annotations.test.ts` generates one case per open milestone it reads from
 * `docs/plan.md`. A scoped run of one test file passes locally while CI fails on a milestone
 * nobody looked at. Running the whole suite right after the edit closes that gap.
 *
 * The repo root is derived from the edited file's path, so the hook tests the checkout that
 * changed, worktrees included. On failure it exits 2, which shows the test output to Claude.
 */

import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

/** The repo root for a docs-contract file, or null when the path isn't one. */
function contractRoot(filePath) {
  const p = filePath.replace(/\\/g, "/");
  const m = p.match(/^(.*)\/docs\/(?:plan\.md|projects\/[^/]+\.md)$/);
  return m ? m[1] || "/" : null;
}

function main() {
  let input;
  try {
    input = JSON.parse(readFileSync(0, "utf8"));
  } catch {
    process.exit(0);
  }
  const filePath = input?.tool_input?.file_path;
  if (typeof filePath !== "string") process.exit(0);
  const root = contractRoot(filePath);
  if (!root) process.exit(0);

  const run = spawnSync("npm", ["test", "--silent"], {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (run.status === 0) process.exit(0);

  const output = `${run.stdout ?? ""}${run.stderr ?? ""}`.trim().split("\n").slice(-40).join("\n");
  process.stderr.write(
    `The docs contract failed after editing ${filePath}. Fix the docs, not the test.\n` +
      `(If dependencies are missing in this checkout, run \`npm install\` first.)\n\n${output}\n`,
  );
  process.exit(2);
}

main();
