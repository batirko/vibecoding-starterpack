# CLAUDE.md FILL slots — worked example

> **This is a filled example of the `<!-- FILL -->` slots in [`CLAUDE.md`](CLAUDE.md), not a live
> guide.** It fills each slot using this template itself as the subject, so you can see the
> target before you edit the real file. Copy the shape, not the words. It sits at the repo root,
> outside `docs/projects/`, so the docs contract never scans it.

## Keeping CLAUDE.md healthy

Claude Code loads `CLAUDE.md` into every session, so every line costs attention every time.

- **Stay under 200 lines.** Claude Code warns above that, and adherence drops.
- **Put area rules in path-scoped files.** A rule for one part of the repo goes in
  `.claude/rules/<topic>.md` with `paths:` frontmatter, like `docs-contract.md`. List it in
  `AGENTS.md` for other tools.
- **Keep state out.** Phase, progress, and shipped work go in `docs/plan.md` and
  `docs/mechanics/`. A status section goes stale, and the next session follows it as a rule.
- **Keep one copy of each rule.** Point to it from anywhere else. Two copies drift, and when they
  conflict the model picks one arbitrarily.
- **Enforce what must hold.** Prose alone doesn't hold. Use a hook or a permission rule in
  `.claude/settings.json`, and keep one prose line with the reason for other agents.

## Product name

> Slot: the first line of `CLAUDE.md`.

**vibecoding-starterpack**, a project scaffold whose documentation is a tested contract.

## The one principle

> Slot: `CLAUDE.md` → "The one principle". This settles a decision when the other rules don't.
> Mirror it in `docs/concept.md` → "The governing principle".

**If a convention matters, it has a test; if it has no test, it's a suggestion, not a rule.**
When a decision is ambiguous, ask whether you'd accept the thing silently drifting. If not, it
needs enforcement, not just prose.

- ✅ Adding a new doc genre → also add the check that keeps it honest (a `### ` sub-header and a
  `CONTRACT` entry), so an empty or misfiled genre fails CI.
- ❌ Adding a genre and only describing it in a heading → it drifts within weeks and nothing
  catches it.

## Hard invariants

> Slot: `CLAUDE.md` → "Hard invariants". This is the only list. `docs/plan.md` → "Standing rules
> across all phases" points here instead of keeping a copy. Give each invariant its reason.

1. **Docs stay under CI.** Never weaken a contract test to make a docs edit pass; fix the docs.
   A weakened test passes silently, so nobody notices the contract is gone.
2. **Status lives in a project file's frontmatter, mirrored in its Projects Index row.** Never
   encode status in a filename. A third copy is one more place to drift.
3. **`npm test` passes on a fresh clone.** Don't wire a pre-ship gate such as `check:fill` into
   `npm test`. The seeded skeleton still has slots, so a new user's first run would fail.

## Hub files

> Slot: `CLAUDE.md` → "Working alongside parallel sessions" → the hub-file table. One row per
> file or shared resource that two lanes must not write at once, with the rule for each.
> `/orchestrate` reads this table when it plans a round.

| File or resource | Rule |
| --- | --- |
| `docs/plan.md` | Hub in every project. Each lane ticks only its own milestone lines. |
| `CLAUDE.md` | One lane at a time. A change here affects every session. |
| `CONTRACT` blocks in `docs/*.test.ts` | One lane at a time, in the same change as the docs they govern. |

## Commands

> Slot: `CLAUDE.md` → "Commands" → the trailing `<!-- FILL -->`. List only what an agent can't
> guess from `package.json`.

This template has no app, so it adds nothing. A real project might add:

```
npm run dev          # dev server on :5173; shared between sessions, so don't restart it
npm run db:reset     # wipes the local database; needs .env.local (copy .env.local.example)
```
