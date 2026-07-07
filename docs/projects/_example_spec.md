---
status: done
kind: spec
phases: [1]
summary: A worked example of a `spec` project file — shows the required anatomy (frontmatter, Status, Phased Plan, Todo, Design). Delete this once you have real specs.
---

# Example spec — feature project file

> **This is a template example.** It exists so the docs tests have a case and newcomers
> can see the required shape. Delete it (and its Projects Index row) when you add real
> content. Copy its structure for every `docs/projects/` file.

## Status

> Canonical status lives in the frontmatter above and is mirrored in the Projects Index
> in `docs/plan.md`. Keep the two in sync — `docs/projects.index.test.ts` enforces it.

**Status: `done`** — this example is complete as an illustration; there is nothing to build.

## Phased Plan

How this project's work maps onto the plan's phases.

| Phase | Contribution |
| --- | --- |
| **Phase 1** | Demonstrate the project-file anatomy that the index contract expects. |

## Todo

Checklist scoped per phase. Open items stay `- [ ]`; completed items become `- [x]`.

- [x] Show the mandated section order (Status → Phased Plan → Todo → Design).
- [ ] Replace this file with a real spec. _(Left open on purpose as an example.)_

## Design

The substance of the spec: the design decisions, the interfaces, the tricky bits.

### What a `spec` is for

A `spec` (`kind: spec`) is a self-contained design doc for a feature or platform capability —
the *what* and *how* of one slice of the product. Group it under the "Feature & platform
specs" sub-header in the Projects Index.

### Filename & status discipline

Filenames are **status-free and stable** — name the file for what it *is*
(`message_generation_workflow.md`), never its lifecycle. Status lives only in the frontmatter
`status:` field (canonical) and the Projects Index row (mirror). Renaming a file to encode
status is exactly the drift these tests prevent.
