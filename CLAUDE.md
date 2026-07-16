# CLAUDE.md

> Operational guide for AI coding agents (and humans). **Read this first, every session.**
> Product name: <!-- FILL: your product name -->.
>
> This repo is a **vibecoding-starterpack** template: its documentation is a *tested
> contract*. Conventions here aren't etiquette — they're enforced by `npm test`. If you
> break one, CI turns red. Fill the `<!-- FILL: … -->` slots and delete the `_example_*`
> files as real content lands.

## The one principle that governs everything

<!-- FILL: the single principle that resolves ambiguity when a decision is unclear. Make it
     operational, with a ✅ / ❌ example, so an agent can apply it without asking. This is the
     tie-breaker every other rule defers to. Mirror it in docs/concept.md.
     For a filled example of this and the other FILL slots below, see CLAUDE.example.md. -->

## Document map — read what's relevant to your task

| File | Read it when… |
| --- | --- |
| `docs/concept.md` | You need the *why* — philosophy, persona, positioning, non-goals. |
| `docs/plan.md` | You need to know what phase we're in and what's in/out of scope right now. Also the agent-routing table. |
| `docs/projects/` | Deeper design docs for a specific feature/subsystem. Each file is a self-contained spec with status, phased plan, and per-phase todo. |
| `docs/mechanics/` | Behavioural docs for *implemented* mechanics (what's actually built). **When you change code that alters a documented mechanic, update the matching file here in the same task.** |
| `docs/logs/` | Append-only field logs. When you observe a rough edge during any test, **append an entry** — don't fix it inline. Logs never reach `done` and are intentionally **not** in the Projects Index. |
| `docs/snapshots/` | Point-in-time reviews of quality, test sessions, roadmap observations. Findings feed the "Discovered" backlog. |

**Always check `docs/plan.md` for the current phase before adding functionality.**

**Plan items carry required routing metadata.** After **any** edit to `docs/plan.md`, run the
full `npm test`: `docs/plan.annotations.test.ts` is dynamic (one assertion per open milestone),
so a missing or malformed annotation only surfaces there. Prose lists that aren't milestones
belong in a blockquote, or the annotations test will read them as un-annotated milestones.

### docs/projects/ conventions

The heart of the contract. `docs/projects.index.test.ts` enforces all of this:

- **Filenames are stable and status-free.** Name a file for what it *is*
  (`message_generation_workflow.md`), never its status. Status lives in exactly two places:
  the file's YAML frontmatter `status:` field (**canonical**), mirrored in the Projects Index
  table in `docs/plan.md` (**mirror**). The test asserts folder ↔ index ↔ frontmatter agree.
- **Index links are load-bearing — don't let a WYSIWYG editor eat them.** Each index row must
  stay an inline link `[name](projects/name.md)`; the test rejects bare text. Edit markdown as
  **plain text** (`.vscode/settings.json` forces it in VS Code) or in **Obsidian**; avoid
  HTML-round-tripping editors that strip links inside table cells. Recovery:
  `git checkout -- docs/plan.md`.
- **`status:` is one of** `idea` · `in-progress` · `done`.
- **Files are grouped by genre via the `kind:` field** — one of `spec` · `quality` · `infra`
  · `research`. Each `kind` maps to one `### ` sub-header in the Projects Index; a row must sit
  under the sub-header matching its `kind`. (To change the set, edit `CONTRACT` in
  `docs/projects.index.test.ts` and the sub-headers in `docs/plan.md` together.)
- **Living logs are not projects.** `docs/logs/` and `docs/snapshots/` have no status and stay
  out of the Projects Index.
- **Each project file contains, in order:** (1) YAML frontmatter (`status`, `kind`, `phases`
  array, one-line `summary`); (2) `## Status`; (3) `## Phased Plan`; (4) `## Todo` (checklist,
  scoped per phase); (5) `## Design` sections. See `docs/projects/_example_spec.md`.
- **When you create a project file,** at minimum add its row to the Projects Index (the
  completeness contract); ideally also add `→ see docs/projects/…` notes on the relevant
  milestone lines in `docs/plan.md`.

## Hard invariants (do not violate)

<!-- FILL: the rules no change is allowed to break, numbered. These mirror the "Standing rules
     across all phases" at the end of docs/plan.md. Examples: privacy guarantees, an
     architectural boundary, a product principle that must never be compromised. -->

## Working alongside parallel sessions

**Assume another agent may be editing this repo right now.** Work is often split into parallel
lanes run in separate sessions. Never assume you're the only writer.

- **Always work on a dedicated feature branch, never directly on `main`.** Branch at the start
  of a task; open a PR when done. One feature per PR.
- **Stay inside your lane's files.** Draw lanes so their **hub files don't overlap** — the big
  single-writer bottlenecks. If your task needs to edit a hub file owned by another lane,
  that's a signal the work isn't actually parallel-safe — flag it rather than plough in.
  <!-- FILL: list this project's hub files (the high-churn, single-writer bottlenecks). -->
- **Coordinate on shared low-churn files** (shared types, global styles, schema-version bumps):
  keep edits minimal and localized; only one lane bumps a shared version at a time.
- **Use a worktree per session** to isolate branch/dirty state (and per-origin dev state):
  `git worktree add ../.worktrees/<branch> <branch>`. Tear it down when done.
- **Rebase before you finalize.** `main` may have moved under you. Rebase (or merge `main`) and
  re-run the checks before opening/merging the PR.
- **Shared dev resources** (a dev server on a fixed port, shared fixtures) may already be in use
  by a concurrent session — clean up global state you seed so you don't leave it for the next.

## Commands

```
npm install          # install deps
npm test             # vitest run (single pass) — includes the docs-contract tests
npm run test:watch   # vitest watch mode
```

<!-- FILL: add your project's dev/build/lint/format commands here. The commands block is a
     Phase-0 deliverable — an agent should be able to build, test, and run from this section
     alone. -->

## Status

<!-- FILL: one paragraph mirroring the "Current phase" marker in docs/plan.md. Keep it short
     and defer to docs/plan.md — don't let this drift into a second source of truth. -->
