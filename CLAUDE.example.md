# CLAUDE.md FILL slots — worked example

> **This is a filled example of the `<!-- FILL -->` slots in [`CLAUDE.md`](CLAUDE.md), not a live
> guide.** `CLAUDE.md` is already ~90% written for you (document map, `docs/projects/`
> conventions, parallel-session discipline, commands scaffold); only a handful of slots need your
> product's specifics. This file shows each of those slots filled, using *this template itself* as
> the subject, so you can see the target before you edit the real file. Copy the shape, not the
> words. It sits at repo root, outside `docs/projects/`, so the docs contract never scans it.

## Product name

> Slot: `CLAUDE.md` line 4 — `Product name: <!-- FILL -->`.

**vibecoding-starterpack** — a project scaffold whose documentation is a tested contract.

## The one principle that governs everything

> Slot: `CLAUDE.md` → "The one principle that governs everything". This is the tie-breaker every
> other rule defers to; mirror it in `docs/concept.md` → "The governing principle".

**If a convention matters, it has a test; if it has no test, it is a suggestion, not a rule.**
When a decision is ambiguous, ask whether you'd accept the thing silently drifting — if not, it
needs enforcement, not just prose.

- ✅ Adding a new doc genre → also add the check that keeps it honest (a `### ` sub-header + a
  `CONTRACT` entry), so an empty or mis-filed genre fails CI.
- ❌ Adding a genre and only *describing* it in a heading → it drifts within weeks and nothing
  catches it.

## Hard invariants (do not violate)

> Slot: `CLAUDE.md` → "Hard invariants". These mirror `docs/plan.md` → "Standing rules across all
> phases". Keep the two lists identical.

1. **Docs stay under CI.** If a convention matters, it has a test. Never weaken a contract test to
   make a docs edit pass — fix the docs.
2. **Status lives in exactly two places** — a project file's frontmatter (canonical) and its
   Projects Index row (mirror). Never encode status in a filename.
3. **One feature per PR; branch off `main`; never commit straight to `main`.**
4. **`npm test` must pass on a fresh clone.** No pre-ship gate (e.g. `check:fill`) may be wired
   into `npm test` if it would fail on the seeded skeleton.

## Hub files (parallel-session bottlenecks)

> Slot: `CLAUDE.md` → "Working alongside parallel sessions" → the hub-files `<!-- FILL -->`. List
> the high-churn, single-writer files two lanes must not edit at once.

- `docs/plan.md` — the roadmap, Projects Index, and routing table all live here; single-writer.
- `CLAUDE.md` — the operational guide; changes here affect every session.
- `docs/projects.index.test.ts` / `docs/plan.annotations.test.ts` — the `CONTRACT` blocks; only
  one lane changes a contract at a time, in lockstep with the docs it governs.

## Commands

> Slot: `CLAUDE.md` → "Commands" → the trailing `<!-- FILL -->`. An agent should be able to build,
> test, and run from this block alone.

```
npm install          # install deps
npm test             # vitest run (single pass) — includes the docs-contract tests
npm run test:watch   # vitest watch mode
npm run check:fill   # list any leftover <!-- FILL slots (pre-ship gate; not part of npm test)
```

## Status

> Slot: `CLAUDE.md` → "Status". One short paragraph that defers to `docs/plan.md` — don't let it
> become a second source of truth.

Phase 1 — "Make the skeleton real." The tested-docs contract is in place and green; the seeded
example project files and milestones are being replaced with real ones. See `docs/plan.md` for the
authoritative current phase and scope.
