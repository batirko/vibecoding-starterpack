# vibecoding-starterpack

**A project scaffold that makes a repo safe for AI agents to work in — especially several of them at once. The trick isn't more documentation. It's documentation that fails CI when it drifts.**

> Use this template → fill three files → `npm install && npm test`. You now have a repo whose
> conventions defend themselves. Keep reading for *why* each one exists — every rule here is
> paired with the concrete failure it prevents.

---

## The problem

Give a coding agent a task and it will do the task. Give it a task next week and it will do
that one too — but it won't remember the decision it made last week, and neither will the
next agent, and neither will you. Documentation is the shared memory. And documentation rots:

- **Agents drift.** The plan says Phase 3; the code is on Phase 5. A `projects/` file is marked
  `in-progress` in its frontmatter and `done` in the index. Nobody lied — the two facts just
  moved apart, one edit at a time.
- **Docs describe intent, not reality.** A design doc written before the work says what *should*
  happen. Six commits later it's fiction, and an agent that trusts it builds the wrong thing.
- **Parallel sessions collide.** Two agents, one working tree, same branch. One `git stash` and
  an afternoon of work is a ghost. Run enough sessions in parallel and this stops being rare.

The usual response is *write better docs and a nice `CLAUDE.md`*. That helps for a week. Then
entropy wins, because a convention that lives only in prose is a convention enforced only by
goodwill — and goodwill doesn't survive a busy agent optimizing for "close the ticket."

## The idea

**A convention is worthless until something fails when you break it.** So put the docs under CI.

This template ships two tiny [Vitest](https://vitest.dev) files that turn your documentation
into a *tested contract*. They don't test your code — they test your docs. If the plan and the
project files disagree, if a roadmap item is missing its routing metadata, if a load-bearing
link got flattened into plain text — `npm test` goes red. The same way a type error does.

That's the whole thesis. Everything below is one of four conventions plus the enforcement that
keeps it honest, each with the real-world failure that motivated it.

---

## The four pillars

### 1. Docs under CI

Two files do the work, both in [`docs/`](docs/):

- **[`projects.index.test.ts`](docs/projects.index.test.ts)** — a completeness contract between
  the files in `docs/projects/` and the Projects Index table in `docs/plan.md`. Every project
  file appears in the index exactly once, as a clickable link, under the sub-header matching its
  `kind`, with an index status that mirrors its frontmatter. No missing rows, no stale rows, no
  drift between the two places status is written.
- **[`plan.annotations.test.ts`](docs/plan.annotations.test.ts)** — a routing contract for
  `docs/plan.md`. Every open milestone must carry its routing annotation (pillar 2); every
  completed one must have dropped it.

Both are generic. The project-specific bits — your statuses, your kinds, your sub-header
labels, your markers — live in a single `CONTRACT` block at the top of each file. You edit that
block; you never touch the parsing logic.

> **War story: the link-eating editor.** The Projects Index rows are markdown links like
> `[name](projects/name.md)`. They *look* decorative. They are load-bearing — the completeness
> test follows them to check the folder against the index. Open `plan.md` in a WYSIWYG markdown
> editor that round-trips through HTML, and on save it silently re-serializes the file and
> strips the links inside table cells, leaving bare text. Everything still *looks* fine. The
> contract is now blind. This template ships a [`.vscode/settings.json`](.vscode/settings.json)
> that forces `*.md` to open as plain text, a test that rejects bare-text rows outright, and a
> one-line recovery (`git checkout -- docs/plan.md`). Three layers, because the failure is
> invisible until the test names it.

### 2. The plan as an agent router

`docs/plan.md` isn't just a roadmap — it's a dispatch table. Every open milestone carries a
compact annotation:

```
- [ ] Per-type precision floors in the ratchet — 🟡 Med · 🧠
```

That trailing `— 🟡 Med · 🧠` reads as: *mostly defined, medium complexity, needs a
capable/expensive agent.* A quick, mechanical task is `🟢 Low · 🔧`. The
[routing legend](docs/plan.md) defines the axes:

- **Readiness** 🟢🟡🟠🔴 — how well-specified the work is.
- **Complexity** Low · Med · High.
- **Agent** 🧠 (judgment/design) · ⚙️ (mid) · 🔧 (mechanical).

Now "which model, at what effort, on which task" is a lookup, not a guess — for a human
dispatcher or an orchestrator agent. And `plan.annotations.test.ts` guarantees the table is
never half-filled: an open milestone without its annotation fails CI.

> **War story: the scoped-run-passes, CI-fails gotcha.** The annotations test is *dynamic* — it
> generates one assertion per open milestone by reading `plan.md` at test time. Edit the plan,
> run the one test file you were touching, see green, push. CI runs the full suite against the
> whole plan and goes red on a milestone you never looked at. The lesson is baked into
> `CLAUDE.md`: **after any edit to `plan.md`, run the full `npm test`** — a partial run can't see
> a contract whose cases are generated from the very file you changed.

### 3. A genre taxonomy for docs

Not all docs are the same kind of true. Conflating "what we plan to build" with "what we built"
is how agents end up implementing fiction. So `docs/` is split by genre, and each genre has one
job:

| Directory | Holds | The rule |
| --- | --- | --- |
| [`concept.md`](docs/concept.md) | The *why* — philosophy, persona, positioning, non-goals. | Read it before making product judgment calls. |
| [`plan.md`](docs/plan.md) | The *when* — current phase, scope, the routing table. | The one source of truth for what's in scope now. |
| [`projects/`](docs/projects/) | The *what/how* — self-contained specs with a lifecycle. | Status in frontmatter; mirrored in the index; filename never encodes status. |
| [`mechanics/`](docs/mechanics/) | What's *actually built*. | Reality only, no speculation. Update in the same task that changes the mechanic. |
| [`logs/`](docs/logs/) | Append-only field observations. | Never reach `done`; never in the index. Append, don't fix inline. |
| [`snapshots/`](docs/snapshots/) | Dated point-in-time reviews. | Frozen. Findings feed the backlog. |

The payoff: an agent reading `mechanics/` knows it's describing running code, and an agent
reading `projects/` knows it's reading intent. They stop confusing the two.

### 4. Parallel-session discipline

If more than one agent might touch the repo at once — and if you're running parallel sessions,
they will — collaboration needs rules that don't depend on politeness:

- **Feature branch always; never straight on `main`. One feature per PR.**
- **Lanes own hub files.** Draw the work so the high-churn, single-writer files don't overlap
  between concurrent tasks. If your task needs a file another lane owns, that's the signal the
  work isn't actually parallel-safe — flag it instead of ploughing in.
- **A worktree per session** isolates branch and dirty state (and per-origin dev state).
- **Rebase before you finalize;** `main` moved under you while you worked.

> **War story: the collision that forced worktrees.** Two sessions, one clone, shared working
> tree. Session A checks out its branch; session B, mid-task, now has A's branch and its own
> uncommitted changes tangled together. Someone stashes to "clean up." The stash is never
> reapplied. A morning of work evaporates — no error, no red test, just gone. The fix isn't
> discipline-by-reminder, it's structural: `git worktree add` gives each session its own
> directory and its own HEAD, and the collision can't physically happen.

---

## Quickstart

1. **Use this template** (the green button on GitHub) to make your own repo.
2. **Fill the slots.** Search for `<!-- FILL:` — they're in [`CLAUDE.md`](CLAUDE.md),
   [`docs/concept.md`](docs/concept.md), and [`docs/plan.md`](docs/plan.md). Three files get you
   a working contract; the rest is optional depth. Two worked examples show the target shape:
   [`docs/concept.example.md`](docs/concept.example.md) fills the whole "why" doc, and
   [`CLAUDE.example.md`](CLAUDE.example.md) fills each of `CLAUDE.md`'s slots — both using this
   template itself as the subject.
3. **Verify it's live:** `npm install && npm test`. It passes on the seeded skeleton — that's
   your proof the contract is wired up.
4. **Make it yours.** Adjust the `CONTRACT` block in each `docs/*.test.ts` (your statuses,
   kinds, sub-header labels, markers). Replace the two `_example_*` project files with real
   ones. Delete the example milestones from the plan as real work lands.
5. **Confirm nothing's left blank:** `npm run check:fill`. It lists any remaining `<!-- FILL`
   slots and exits non-zero until they're gone — a pre-ship gate you run by hand. It's
   deliberately *not* part of `npm test` (the seeded skeleton is supposed to still have slots,
   and `npm test` must pass on a fresh clone).

A stranger should get from "Use this template" to a passing, docs-guarding repo in about 15
minutes. If you hit friction, that's a bug in this template — open an issue.

## What this is not

- **Not a skills or plugin bundle.** Those are a treadmill someone else is already running. This
  is a structure and four conventions, nothing to keep up to date.
- **Not a generator or CLI.** It's a template repo. No build step you don't control, no magic.
- **Not framework lock-in.** The only dependency is Vitest, and only to run the two doc tests.
  There's no React, no Vite app, no opinion about what you build on top.

## The reference implementation

These conventions were extracted from a real project — [writtten](https://github.com/batirko) —
where they earned their keep across many parallel agent sessions. Every war story above is a
real incident. This template is the distilled, product-agnostic core; that repo is what it looks
like fully loaded.

## License

[MIT](LICENSE).
