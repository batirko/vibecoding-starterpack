# vibecoding-starterpack — extraction plan

> Distill the working conventions of [writtten](https://github.com/batirko) (`~/Projects/writtten`) into a public, reusable scaffolding repo: a project structure + ruleset that makes a repo safe and productive for AI-agent-driven development — especially multiple parallel agent sessions. Working name: **vibecoding-starterpack** (naming is an open decision, see below).

## What this is (and is not)

**The pitch:** most "AI coding starter" repos are a CLAUDE.md template plus vibes. This one ships **enforcement** — documentation that has a test suite, a plan that doubles as an agent-routing table, and conventions whose drift fails CI instead of relying on goodwill.

**Deliverable shape:** a GitHub **template repo** ("Use this template" button) whose README is an essay: *"How I make a repo safe for parallel AI agents"* — each convention paired with the concrete failure it prevents. The repo is the artifact of the write-up, not the other way around. Promo value lives in the essay; adoption value lives in the tests.

**Not in scope:** competing on bundled skills/plugins (a treadmill others already run), any product-specific machinery from writtten (the `__sidecar__` harness internals, eval pipeline, Gemini quota logic), or a CLI generator (maybe later — see Phase 3).

## The four pillars (what actually transfers)

1. **Docs under CI.** `projects.index.test.ts` + `plan.annotations.test.ts` make the plan, the projects index, and per-file frontmatter a *tested contract*. This is the headline feature and the rarest idea.
2. **The plan as an agent router.** Every open milestone carries `— <readiness> <complexity> · <agent>` metadata (🟢🟡🟠🔴 · Low/Med/High · 🧠⚙️🔧), enforced by a dynamic test. Turns a roadmap into a dispatch table for "which model/effort does this task need."
3. **The docs genre taxonomy.** `concept` (why) · `plan` (when) · `projects/` (specs with lifecycle) · `mechanics/` (what's actually built — no speculation) · `logs/` (append-only observation logs, never "done") · `snapshots/` (point-in-time reviews). Keeps agents from confusing design intent with reality.
4. **Parallel-session discipline.** Lane ownership over hub files, worktree-per-session, one-feature-per-PR, rebase-before-finalize, shared-dev-server etiquette.

## Extraction map — source file → template file

| Source (writtten)                        | → Template                                    | Treatment |
| ---------------------------------------- | --------------------------------------------- | --------- |
| `CLAUDE.md`                              | `CLAUDE.md`                                   | **Rewrite around slots.** Keep: one-principle slot, document map table, docs conventions, hard-invariants section, parallel-sessions section, commands block. Add `<!-- FILL: … -->` markers for product-specific content. Drop: browser-testing tables, `__sidecar__` API, quota notes (replace with a short "build a dev observability surface" pointer). |
| `docs/projects.index.test.ts`            | `docs/projects.index.test.ts`                 | **Genericize.** Hoist `VALID_STATUSES`, `VALID_KINDS`, `KIND_BY_HEADER` into a top-of-file `CONTRACT` config block users edit. Logic is already project-agnostic. |
| `docs/plan.annotations.test.ts`          | `docs/plan.annotations.test.ts`               | **Genericize.** Hoist the backlog-section names (`"Phase 6"`, `"Discovered"`) and the marker sets into the same config block. Consider making bullet-backlog sections opt-in via a `<!-- milestones: bullets -->` marker in plan.md instead of hardcoded section names. |
| `docs/plan.md`                           | `docs/plan.md`                                | **Skeleton + legend.** Keep the routing legend verbatim (it's good prose), the "Current phase" marker convention, the Projects Index with kind sub-headers, a "Discovered / unscheduled" section. Seed with 2–3 example milestones so the dynamic tests have cases and newcomers see the format. |
| `docs/projects/` (any one `done` file)   | `docs/projects/_example_project.md`           | **One worked example.** Show required anatomy: frontmatter (`status`/`kind`/`phases`/`summary`), `## Status`, `## Phased Plan`, `## Todo`, design sections. Content genericized. |
| `docs/mechanics/` (structure only)       | `docs/mechanics/README.md`                    | **Convention stub.** "Behavioural docs for implemented mechanics; update in the same task that changes the mechanic; no speculation." |
| `docs/logs/` (structure only)            | `docs/logs/README.md` + one empty log         | **Convention stub.** Append-only, never `done`, intentionally absent from the Projects Index; drained by remediation sprints. |
| `docs/snapshots/` (structure only)       | `docs/snapshots/README.md`                    | **Convention stub.** Point-in-time reviews; feed the Discovered backlog. |
| `docs/concept.md` shape                  | `docs/concept.md`                             | **Slot template.** Philosophy / persona / positioning / non-goals headings with fill-in prompts. |
| `.vscode/settings.json` (md-as-text)     | `.vscode/settings.json`                       | **Copy.** The WYSIWYG-link-eating defense. |
| Worktree/lane conventions (CLAUDE.md §)  | CLAUDE.md § + README essay section            | **Rewrite as generic advice** with the writtten war story as illustration. |
| `package.json` (test tooling only)       | `package.json`                                | **Minimal.** vitest + the two doc tests wired to `npm test`. Framework-agnostic otherwise — the template must not assume Vite/React. |
| — (new)                                  | `README.md`                                   | **The essay.** See outline below. |
| — (new)                                  | `LICENSE`                                     | MIT. |

## README essay outline (the promo unit)

1. The problem: agents (and humans) drift; docs rot; parallel sessions collide.
2. The idea: conventions are worthless without enforcement → put docs under CI.
3. Pillar walk-through, each with its war story from a real project (link-eating WYSIWYG incident; the scoped-test-passes-CI-fails gotcha; the branch/dirty-state collision that forced worktree-per-session).
4. Quickstart: use template → fill CLAUDE.md slots → `npm i && npm test` (should pass on the seeded skeleton) → delete examples as real content lands.
5. What this is not (no skills bundle, no generator, no framework lock-in).

## Phases

> Routing legend as in writtten: `— <readiness> <complexity> · <agent>` (🟢 ready · 🟡 mostly · 🟠 needs pre-work · 🔴 concept | 🧠 capable · ⚙️ mid · 🔧 mechanical). Dogfooding note: this repo should itself pass its own two doc tests before it ships.

### Phase 1 — Extract & genericize (the core, ~a day)

- [ ] Repo scaffold: `package.json` (vitest only), `.vscode/settings.json`, `.gitignore`, MIT LICENSE — 🟢 Low · 🔧
- [ ] Genericize `projects.index.test.ts` with an editable `CONTRACT` config block — 🟢 Low · ⚙️
- [ ] Genericize `plan.annotations.test.ts` (config block; decide bullet-backlog opt-in mechanism) — 🟡 Med · ⚙️
- [ ] `docs/plan.md` skeleton with routing legend + seeded example milestones that make both tests pass — 🟢 Low · ⚙️
- [ ] `docs/projects/_example_project.md` + genre-stub READMEs (mechanics/logs/snapshots) + `concept.md` slot template — 🟢 Low · 🔧
- [ ] CLAUDE.md template with FILL slots — 🟡 Med · 🧠
- [ ] CI workflow (GitHub Actions: `npm test` on PR) — 🟢 Low · 🔧

### Phase 2 — The essay & publish

- [ ] Write README essay (outline above; war stories sourced from writtten's docs/snapshots and git history) — 🟡 Med · 🧠
- [ ] Dogfood check: fresh-clone walkthrough as a first-time user; fix every point of confusion — 🟡 Med · 🧠
- [ ] Publish: mark as GitHub template repo, topics/tags, pin on profile — 🟢 Low · 🔧
- [ ] Optional distribution: short post (X/HN/r/ClaudeAI) linking the essay — 🟠 Low · 🧠

### Phase 3 — Later / only if it gets traction

- [ ] Extract the two tests as a standalone `npx docs-contract` package or Claude Code plugin (adoptable without the whole methodology) — 🟠 Med · 🧠
- [ ] A `/new-project-file` skill that scaffolds a projects/ file + index row in one step — 🔴 Low · ⚙️
- [ ] Runner-agnostic test variants (node:test, no vitest dependency) — 🔴 Med · ⚙️

## Open decisions (to settle before Phase 1 completes)

1. **Name.** `vibecoding-starterpack` is descriptive but generic. Alternatives to consider: something signaling the enforcement angle (`docs-contract`, `tested-docs-starter`, `agent-safe-repo`). Also: "vibecoding" may age poorly / carry a low-rigor connotation that undercuts the "enforcement" pitch.
2. **Default kinds.** Keep writtten's four (`spec`/`quality`/`infra`/`research`) as defaults, or ship two (`spec`/`infra`) and document how to extend? Fewer defaults = less ceremony on day one.
3. **Bullet-backlog opt-in.** Marker comment in plan.md vs. config in the test file. Marker keeps the contract visible where it applies.
4. **How much writtten to name.** Linking the live repo as "the reference implementation" is honest and good promo, but it exposes readers to lots of product context; probably link it once, prominently.
5. **Agent-tool neutrality.** CLAUDE.md is Claude Code-native. Ship `AGENTS.md` too (the emerging cross-tool convention), or a note on symlinking? Broadens audience at small cost.

## Success criteria

- A stranger can `Use this template`, fill three files, and have `npm test` guarding their docs within 15 minutes.
- The README reads as a standalone essay worth sharing even by people who never install the template.
- Zero writtten-specific residue in the template files (grep for `sidecar`, `writtten`, `Gemini`, `observation` before publishing).
