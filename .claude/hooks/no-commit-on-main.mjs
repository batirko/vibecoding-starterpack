#!/usr/bin/env node
/**
 * Claude Code PreToolUse hook (Bash): refuses `git commit` while the target checkout is on
 * `main` or `master`.
 *
 * Why: parallel sessions share this repo. Work lands through a feature branch and a PR, so a
 * commit on `main` skips review and can tangle with another session's work. Prose alone
 * didn't hold this rule, so the hook enforces it for Claude Code. Branch protection on the
 * remote covers humans and other agents (see README → "Parallel-session discipline").
 *
 * It reads the hook's JSON from stdin, finds each `git … commit` in the command (honouring
 * `git -C <dir>`), and checks that checkout's current branch. Exit 2 blocks the call and
 * shows stderr to Claude. Anything it can't parse passes through: a hook that blocks on its
 * own bugs would stop all work.
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PROTECTED = new Set(["main", "master"]);

/** Directories targeted by each `git … commit` invocation in a shell command. */
function commitTargets(command, cwd) {
  const targets = [];
  for (const segment of command.split(/&&|\|\||[;|\n]/)) {
    const tokens = segment.trim().split(/\s+/);
    const gitAt = tokens.indexOf("git");
    if (gitAt === -1) continue;
    let dir = cwd;
    let i = gitAt + 1;
    // Skip git's global options to reach the subcommand.
    while (i < tokens.length && tokens[i].startsWith("-")) {
      if (tokens[i] === "-C" && i + 1 < tokens.length) {
        dir = resolve(dir, tokens[i + 1].replace(/^["']|["']$/g, ""));
        i += 2;
      } else if (tokens[i] === "-c" && i + 1 < tokens.length) {
        i += 2;
      } else {
        i += 1;
      }
    }
    if (tokens[i] === "commit") targets.push(dir);
  }
  return targets;
}

function currentBranch(dir) {
  try {
    // symbolic-ref also works on an unborn branch, before the first commit.
    return execFileSync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd: dir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null; // Detached HEAD or not a repo: nothing to protect.
  }
}

function main() {
  let input;
  try {
    input = JSON.parse(readFileSync(0, "utf8"));
  } catch {
    process.exit(0);
  }
  const command = input?.tool_input?.command;
  if (typeof command !== "string") process.exit(0);
  const cwd = input.cwd || process.cwd();

  for (const dir of commitTargets(command, cwd)) {
    const branch = currentBranch(dir);
    if (branch && PROTECTED.has(branch)) {
      process.stderr.write(
        `Blocked: this commit would land on \`${branch}\`. ` +
          "Create a feature branch first (`git switch -c <branch>`), commit there, and open a PR. " +
          "This repo never takes commits on main (see CLAUDE.md → Working alongside parallel sessions).\n",
      );
      process.exit(2);
    }
  }
  process.exit(0);
}

main();
