---
description: Plan the next 2-3 parallel sessions, define non-colliding lanes, and write their start prompts
argument-hint: "[how many sessions, or a focus area]"
---

Plan the next round of parallel work on this repo and write the prompts that start it.

$ARGUMENTS

You are the orchestrator. You don't do the work — you decide who does what, prove the lanes
can't collide, and hand each session enough context to reason from the code instead of from
your guesses.

## 1. Read the state before you split it

- `docs/plan.md` — the current phase, every open milestone, and its routing annotation
  (readiness · complexity · agent). Also "Discovered / unscheduled".
- The most recent files in `docs/snapshots/` — what the last review found.
- `git log`, `git branch -a`, `git worktree list` — what just landed and what's still in flight.
- `ListAgents` — sessions already running in this repo. A live session is a lane you don't own.
  Say so in your report rather than planning over the top of it.

## 2. Count the readiness before you route anything

Readiness decides what kind of round this is, so read it before you draw a single lane. Count it
over the candidates you'd actually pick from — not over the whole plan.

**If most of them aren't 🟢, the round's job is to make them 🟢.** Route definition work instead
of build work. A lane that settles the open questions in one `docs/projects/` file — writes the
decisions down, points the plan at them, re-annotates the milestone in the same change — is a
finished lane. It isn't a warm-up for the real one.

Hand a 🟠 item to a build session and you don't skip the design work. You just move it somewhere
you can't see. The session decides alone, under build pressure, and the reasoning stays in a
transcript that dies while the code lands. What you get back is a milestone that still isn't
defined and a decision nobody can find.

Definition lanes collide less than build lanes, because each one mostly writes its own project
file. The hub rules in the next section still apply, and `docs/plan.md` is still a hub. The cap
still applies too.

**One 🟢 lane can still run alongside** — take it if it finishes something a reader can see.
Don't stall the product to write documents.

## 3. Draw lanes that can't collide

A lane is a coherent goal, not a pile of tickets. Prefer one lane that finishes a reader-visible
thing over three that each move a number.

**Cap it at three lanes.** A round that fans out further than that tends to grow a merge queue
faster than anyone can clear it — and verification, not routing, is the first thing that gets
dropped when that happens. Verification is also the one part of orchestrating that can't be
automated, so it's the last thing you want to lose. Treat three as a default you can override,
not a hard ceiling — but if you're going past it, say why in your report.

Draw the boundary at the **hub files** — the single-writer bottlenecks. Two lanes that write the
same hub file are not parallel, however different their goals sound.

<!-- FILL: list this repo's hub files and shared resources as a table, one row each — the file
     or resource, and the rule for touching it. Start from the hub-file list in CLAUDE.md →
     "Working alongside parallel sessions", but be more specific here: name the actual paths
     (a generated dataset, a rendered site directory, a shared API token, a `CONTRACT` block in
     a docs test) and the exact rule for each — who owns it, whether others may read it, whether
     it's one-writer-at-a-time or prepend-only. `docs/plan.md` is a hub in every project; keep
     that row and add the rest. -->

Then check each lane against the others for these, and write the answer down:

- Does it write a file another lane writes?
- Does it change data another lane measures or renders? If yes, that's a **coordination point**,
  not a blocker — name it and say who tells whom.
- Does it need the network?
- Does it need something another lane produces? Say whether the dependent lane waits or stubs.

Park anything that can't be made safe. Explain why it's parked — a parked item is a decision,
not an oversight.

## 4. Write one prompt per lane

Follow `CLAUDE.md` → "Writing prompts for other sessions". Hand over context, not a solution.
Each prompt contains:

- **The goal**, in terms of what changes for a reader or for the project's answer.
- **What's already known and decided**, with pointers to the file that holds it. Include the
  constraints that are genuinely fixed — invariants, contract tests, prior decisions.
- **What the session determines itself.** Say which is which, explicitly.
- **Scope**: in, out, and the priority order inside it. Name what's out of bounds by path.
- **The orchestration picture** — the table of all lanes, who owns what, the shared-file rules
  above, and the coordination points that involve this lane.
- **The working rules**: branch off `main`, worktree per session, one feature per PR, `npm test`
  after any `docs/plan.md` edit, rebase before finalizing.

## 5. Set up the back-channel

Tell every lane it can reach the others and you directly: `ListAgents` to find names,
`SendMessage({to: "<name>", message: "..."})` to reach one. Give them the rule, not just the
mechanism — message when it changes what someone builds (a shared field's shape, a premise
that just broke, a file outside your lane, a real block), never for status. Name yourself as
the orchestrator and ask each lane for one line on start: its session name and branch.

Say the quiet part: in the ideal case nobody needs this and the work just lands.

## 6. Run the round

Planning is the easy half. These rules are what a round that overran its lane count cost to
learn, once, in the reference implementation this template was extracted from — they're worth
carrying forward even though the incident isn't this repo's own history.

- **One open PR per lane.** A stack of PRs means every merge at the bottom forces a retarget and
  a rebase up the stack, by hand, for both sides. A lane merges before it opens the next.
- **A lane resolves its own conflicts.** Routing them through you makes one session the serial
  bottleneck for the whole round and puts its mistakes into other people's branches. If a PR does
  not merge cleanly, it goes back.
- **Verify claims, don't just merge them.** This is the job. Re-run the number against the file,
  check the rule a judge actually applied, drive the browser rather than reading the stylesheet.
  The expensive errors are the plausible claims nobody checked.
- **Never `git add -A`.** It's how an unrelated file — a stray config, a local secret, someone
  else's in-progress work — ends up swept into a commit nobody meant to make. Stage the paths you
  meant to change.

**Before trusting any new check, break it on purpose.** Delete the thing it watches and confirm it
goes red, then put it back. A green result carries no information until someone has seen the red
one. It costs one clone and one deleted line.

## 7. Report back

Write the prompts to the scratchpad as separate files so they can be pasted straight into new
sessions, and send them. Then, in chat: what each lane will change about the product, why these
lanes and not others, what you parked, and the one or two coordination points that are real.
Lead with the lanes, not with what you read. If the readiness count made this a definition round,
say so first — it's the difference between a round that ships and a round that unblocks.
