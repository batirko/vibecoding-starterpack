---
status: done
kind: infra
phases: [1]
summary: A worked example of an `infra` project file — pipeline/dev-infrastructure work. Delete this once you have real infra docs.
---

# Example infra — pipeline / dev-infrastructure project file

> **This is a template example.** Its purpose is to give the second `kind` a row in the
> Projects Index (so the index contract exercises grouping) and to model the anatomy for
> non-feature work. Delete it when you have real content.

## Status

> Canonical status lives in the frontmatter above and is mirrored in the Projects Index.

**Status: `done`** — illustration only.

## Phased Plan

| Phase | Contribution |
| --- | --- |
| **Phase 1** | Demonstrate a second `kind` grouped under its own index sub-header. |

## Todo

- [x] Land under the "Pipeline & dev infrastructure" sub-header in the index.
- [ ] Replace with a real infra doc (CI, build tooling, release process, …). _(Example.)_

## Design

### What an `infra` doc is for

An `infra` project (`kind: infra`) documents pipeline and developer-infrastructure work — the
test harness, CI, build/release tooling, dev observability. It answers "how do we build and
ship" rather than "what does the product do." Group it under "Pipeline & dev infrastructure".

### Kinds and grouping

The four default kinds — `spec` · `quality` · `infra` · `research` — each map to one `### `
sub-header in the Projects Index (see the `CONTRACT.kindByHeader` map in
`docs/projects.index.test.ts`). To add or rename a kind, edit that map and the matching
sub-header in `docs/plan.md` together.
