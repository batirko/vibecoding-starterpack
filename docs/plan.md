# Plan

> The roadmap **and** the agent-routing table. Check the "Current phase" marker before
> adding functionality; every open milestone carries routing metadata (see the legend).
> This file is under CI — `docs/plan.annotations.test.ts` fails the build if an open
> milestone is missing its annotation. **Run `npm test` after every edit to this file.**

**Current phase: Phase 1 — "Make the skeleton real."** <!-- FILL: replace with your current phase and a one-line status. -->

> **Routing legend.** Open milestones below carry an annotation `— <readiness> <complexity> · <agent>` so it's clear what's ready, how hard, and who should build it. Completed (`[x]`) lines are left unannotated.
>
> - **Readiness:** 🟢 fully defined, ready to build · 🟡 mostly defined, decisions along the way · 🟠 not defined, needs pre-work/planning · 🔴 concept only, no design.
> - **Complexity:** Low · Med · High.
> - **Agent:** 🧠 capable/expensive (judgment, design, prompt-quality, architecture) · ⚙️ mid · 🔧 simple/mechanical (well-specified, low-decision).
>
> **This is required metadata, not decoration.** Every new open milestone (here or in any phase section) gets the annotation **on creation** — there is no unannotated open item. And it's **living:** whenever work touches an item, re-assess and update its annotation in the same change. **Readiness** moves the most. When an item is completed, drop the annotation as the `[x]` is added.

## Projects index

> Completeness contract: every file in `docs/projects/` appears here as exactly one row,
> named by a clickable `[name](projects/name.md)` link, grouped under the `### ` sub-header
> matching its `kind`, with a `Status` cell that mirrors the file's frontmatter. Enforced by
> `docs/projects.index.test.ts`. The links are load-bearing — don't let a WYSIWYG editor eat
> them (edit markdown as plain text; recover with `git checkout -- docs/plan.md`).

### Feature & platform specs

| Project | Status | Phases | One-line |
| --- | --- | --- | --- |
| [_example_spec](projects/_example_spec.md) | done | 1 | A worked `spec` example — delete once you have real specs. |

### Signal & philosophy quality

_No `quality` projects yet. Add rows here as `| [name](projects/name.md) | status | phases | one-line |`._

### Pipeline & dev infrastructure

| Project | Status | Phases | One-line |
| --- | --- | --- | --- |
| [_example_infra](projects/_example_infra.md) | done | 1 | A worked `infra` example — delete once you have real infra docs. |

### Research & synthesis

_No `research` projects yet. Add rows here as `| [name](projects/name.md) | status | phases | one-line |`._

## Phase 1 — Make the skeleton real

**Goal:** stand up the tested-docs contract and prove it guards drift.

Milestones:

- [ ] **Replace this example milestone with your first real one.** Keep the `— <readiness> <complexity> · <agent>` annotation format. — 🟢 Low · 🔧
- [x] **Genericize the two enforcement tests behind a CONTRACT block.** Shipped as the seeded skeleton.

**Exit criteria:**

- `npm test` passes on a fresh clone.
- Flipping a project's frontmatter status, or dropping a milestone's annotation, turns the suite red.

## Discovered / unscheduled

> Triage bin for work that surfaces mid-flight. Don't let items rot here — promote to a phase
> or a `docs/projects/` file, or close them. Top-level bullets here are open milestones, so
> they carry a routing annotation too (readiness · agent).

- **Example deferred idea** `(deferred)` — jot unscheduled work here so it survives the session that noticed it. — 🟠 · 🧠

## Standing rules across all phases

<!-- FILL: your project's hard invariants — the rules no phase is allowed to violate.
     Mirror them in CLAUDE.md → "Hard invariants". -->

1. Docs stay under CI: if a convention matters, it has a test.
2. One feature per PR; branch off `main`; never commit straight to `main`.
