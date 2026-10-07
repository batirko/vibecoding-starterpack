# CLAUDE.md

Agent guide for <!-- FILL: your product name -->. This repo follows the vibecoding-starterpack
contract: `npm test` checks the docs as well as the code, and CI fails when a convention breaks.
Area rules load from `.claude/rules/` when you work in matching files.

## The one principle

<!-- FILL: the single principle that settles a decision when the other rules don't. Make it
     operational, with a ✅ / ❌ example, so an agent can apply it without asking. Mirror it in
     docs/concept.md. CLAUDE.example.md shows this and the other slots filled. -->

## Hard invariants

<!-- FILL: the numbered rules no change may break, each with its reason. Examples: a privacy
     guarantee, an architectural boundary, a product principle. This is the only copy:
     docs/plan.md → "Standing rules across all phases" points here. -->

## Where state lives

This file holds rules every session needs. It doesn't record progress.

- `docs/plan.md` holds the current phase, scope, and open work. Check it before you add
  functionality.
- Record what shipped in `docs/plan.md` and `docs/mechanics/`, never here. A status section
  here goes stale, and the next session follows it as a rule.

## Document map

| File | Read it when… |
| --- | --- |
| `docs/concept.md` | You need the why: philosophy, persona, positioning, non-goals. |
| `docs/plan.md` | You need the current phase, open milestones, their routing, or the Projects Index. |
| `docs/projects/` | You work on a specific feature or subsystem. Each file is a self-contained spec. |
| `docs/mechanics/` | You change built behaviour. These files describe what runs, not designs. |
| `docs/logs/` | You notice a rough edge during a test. Append an entry; don't fix it inline. |
| `docs/snapshots/` | You want a dated review. Its findings feed the plan's backlog. |

When a code change alters a documented mechanic, update its `docs/mechanics/` file in the same
task.

## The docs contract

`.claude/rules/docs-contract.md` holds the conventions for `docs/plan.md` and `docs/projects/`.
After any edit to `docs/plan.md`, run the full `npm test`. The annotations test makes one case
per open milestone, so a scoped run misses failures. In Claude Code, a hook runs it for you.

## Working alongside parallel sessions

Assume another agent may be editing this repo right now.

- **Work on a feature branch, never on `main`.** Open a PR when done, one feature per PR. A
  commit on `main` skips review and can tangle with another session's work. In Claude Code, a
  hook blocks it.
- **Stay inside your lane's files.** Lanes are drawn so their hub files don't overlap. If your
  task needs a hub file another lane owns, the work isn't parallel-safe. Flag it instead.
- **Keep edits to shared low-churn files small**, such as shared types or global styles. Only one
  lane bumps a shared version at a time.
- **Use a worktree per session.** Claude Code creates session worktrees under
  `.claude/worktrees/`, which git, Vitest, and `check:fill` ignore. With another tool, use
  `git worktree add .claude/worktrees/<branch> -b <branch>`. Remove it when you're done.
- **Rebase before you finalize.** `main` may have moved. Rebase or merge `main`, then rerun the
  checks.
- **Clean up shared dev state you seed,** such as a dev server on a fixed port or fixtures.

Hub files are the single-writer bottlenecks. This table is the only list; `/orchestrate` reads it.

<!-- FILL: one row per hub file or shared resource, with the rule for touching it, as a
     `| File or resource | Rule |` table. docs/plan.md is a hub in every project. -->

## Handoffs

The reader of a handoff has none of your context: a person returning cold, or a fresh agent.

- **To the user**, for a decision or a wrap-up: lead with what changed for someone using the
  product, or the key decision and why. State the tradeoff and recommend one option. Cut the
  edit-by-edit story; keep the reasoning the decision needs.
- **To another session:** hand over the goal, the fixed constraints, and where to look, not a
  finished design. Say what's decided and what the session decides itself.
- **When you write several prompts at once,** each one states the orchestration: which sessions
  run, what each owns, which files are off-limits, and what's shared. A session that doesn't
  know its neighbours exist collides with them.

## Commands

```
npm test             # vitest run: the docs contract, the hook tests, and your tests
npm run test:watch   # vitest watch mode
npm run check:fill   # lists leftover FILL slots; a pre-ship gate, not part of npm test
```

<!-- FILL: add only the commands an agent can't guess from package.json: dev server ports,
     commands with side effects, prerequisites such as env files. -->
