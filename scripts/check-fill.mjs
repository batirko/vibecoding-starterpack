#!/usr/bin/env node
/**
 * Pre-ship gate: report leftover `<!-- FILL` template slots.
 *
 * This template ships with `<!-- FILL: … -->` prompts in CLAUDE.md, docs/concept.md,
 * and docs/plan.md. The docs-contract tests (docs/*.test.ts) guard *structure* but not
 * *emptiness* — a repo can ship with every slot untouched and `npm test` still passes.
 * This script closes that loop: it lists every remaining slot and exits non-zero if any
 * are found, so you can gate your own "is this repo actually filled in?" check.
 *
 * It is intentionally NOT part of `npm test`: the seeded skeleton is *supposed* to still
 * have FILL slots, and `npm test` must stay green on a fresh clone. Run it yourself once
 * you've made the template yours:  npm run check:fill
 *
 * Reminder it also prints (not enforced — see docs/concept.example.md on why that would be
 * brittle): the governing principle should read the same in CLAUDE.md and docs/concept.md.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The literal slot marker. Matches the placeholder, not prose that says "fill". */
const SLOT = "<!-- FILL";

/**
 * True if the line contains a *real* slot — an actual `<!-- FILL` HTML comment — rather than
 * a prose mention of the marker inside an inline-code span (`` `<!-- FILL: …` ``). The docs
 * themselves reference the marker to explain it; those are wrapped in backticks, so an
 * occurrence immediately preceded by a backtick is a mention, not a slot.
 */
function hasRealSlot(line) {
  for (let i = line.indexOf(SLOT); i !== -1; i = line.indexOf(SLOT, i + 1)) {
    if (line[i - 1] !== "`") return true;
  }
  return false;
}

/** Directories never worth scanning. */
const SKIP_DIRS = new Set([".git", "node_modules", ".worktrees"]);

/**
 * Files exempt from the check. `*.example.md` are deliberately-filled reference twins;
 * their prompts *describe* slots and legitimately contain the marker.
 */
const isExempt = (rel) => rel.endsWith(".example.md");

/** Recursively collect every *.md path under the repo, minus skipped dirs. */
function markdownFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) out.push(...markdownFiles(abs));
    else if (entry.endsWith(".md")) out.push(abs);
  }
  return out;
}

const findings = [];
for (const abs of markdownFiles(root)) {
  const rel = relative(root, abs);
  if (isExempt(rel)) continue;
  readFileSync(abs, "utf8").split("\n").forEach((line, i) => {
    if (hasRealSlot(line)) findings.push({ rel, lineNo: i + 1, line: line.trim() });
  });
}

if (findings.length === 0) {
  console.log("✓ No leftover <!-- FILL slots. Template looks filled in.");
  process.exit(0);
}

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.rel)) byFile.set(f.rel, []);
  byFile.get(f.rel).push(f);
}

console.error(`✗ ${findings.length} leftover FILL slot(s) in ${byFile.size} file(s):\n`);
for (const [rel, items] of byFile) {
  console.error(`  ${rel}`);
  for (const it of items) {
    const snippet = it.line.length > 100 ? it.line.slice(0, 97) + "…" : it.line;
    console.error(`    ${rel}:${it.lineNo}  ${snippet}`);
  }
  console.error("");
}
console.error(
  "Fill these in before shipping your repo. Worked examples: docs/concept.example.md, CLAUDE.example.md.",
);
console.error(
  "Also confirm by hand: the governing principle reads the same in CLAUDE.md and docs/concept.md.",
);
process.exit(1);
