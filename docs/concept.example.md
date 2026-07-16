# Concept — worked example

> **This is a filled example of [`concept.md`](concept.md), not a live doc.** It fills every
> `<!-- FILL -->` slot using this template's *own* philosophy as the subject, so you can see the
> shape of a finished "why" document before you write yours. Your real `concept.md` describes
> *your* product; delete its prompts and write it in this voice. This file is not under the docs
> contract — it lives at `docs/` root, outside `docs/projects/`, so the index test never scans it.

## The problem

Give a coding agent a task and it does the task. Give it another next week and it does that one
too — but it won't remember the decision it made last week, and neither will the next agent, nor
you. Documentation is the shared memory, and documentation rots: the plan says Phase 3 while the
code is on Phase 5; a design doc written before the work becomes fiction six commits later; two
parallel sessions collide in one working tree and an afternoon of work vanishes in a stray
`git stash`. The usual fix — "write better docs and a nicer `CLAUDE.md`" — buys a week, because a
convention that lives only in prose is enforced only by goodwill, and goodwill loses to a busy
agent optimizing for "close the ticket."

## The core idea

A convention is worthless until something *fails* when you break it — so put the docs under CI and
turn them into a tested contract that goes red on drift, exactly the way a type error does.

## The governing principle

**If a convention matters, it has a test; if it has no test, it is a suggestion, not a rule.**
When you're unsure whether to enforce something, ask whether you'd accept it silently drifting.

- ✅ The Projects Index must mirror each file's frontmatter status → `projects.index.test.ts`
  asserts folder ↔ index ↔ frontmatter agree, so a stale status turns CI red.
- ❌ "Please keep the index tidy" written in a heading, with nothing checking it → within a month
  the index and the files disagree and no one notices until an agent builds against a stale row.

## Persona and use case

A developer — often working *through* AI agents rather than only alongside them — who runs one or
more coding sessions against the same repo and is tired of re-explaining decisions that already
got made. They reach for this at repo-creation time, or when a project first starts spawning
parallel agent sessions and the drift starts to bite. Narrow first persona: the solo builder
orchestrating several agents, not yet a large team with process of its own.

## What it is not

- **Not a skills or plugin bundle.** Those are a treadmill someone else maintains; this is four
  conventions and their enforcement, with nothing to keep up to date.
- **Not a generator or CLI.** It's a template repo — no build step you don't control, no magic.
- **Not a framework.** The only dependency is Vitest, and only to run the two doc tests.

## Positioning

Against "just write a good `CLAUDE.md`": this concedes that prose alone is the right *starting*
point and adds the missing half — the tests that keep the prose honest. Against heavier
docs-governance tooling: this concedes far less coverage (four conventions, two tiny test files)
in exchange for zero lock-in and a 15-minute onboarding. It sits deliberately in the small,
boring, durable middle.

## Non-goals (early)

- No accounts, hosting, or SaaS layer — it's files in a repo.
- No enforcement of *code* conventions; the contract guards *docs*, on purpose.
- No opinion about what you build on top (framework, language, product domain).
- No automated remediation — the tests *name* drift; a human or agent fixes it.
