---
paths:
  - "docs/plan.md"
  - "docs/projects/**"
  - "docs/*.test.ts"
---

# The docs contract

`docs/plan.annotations.test.ts` and `docs/projects.index.test.ts` enforce these conventions. When
either fails, fix the docs, not the test.

## `docs/plan.md`

- After any edit, run the full `npm test`, not one test file. The annotations test makes one case
  per open milestone it reads, so a scoped run passes while CI fails. In Claude Code, a hook runs
  the suite after each edit.
- Every open milestone carries a routing annotation from creation. The legend at the top of the
  file defines it. Re-assess it whenever work touches the item, and drop it when you tick the
  item.
- A prose list that isn't a set of milestones goes in a blockquote. Otherwise the test reads its
  bullets as unannotated milestones.

## `docs/projects/`

- Name a file for what it is (`message_generation.md`), never for its status.
- Status lives in two places. The frontmatter `status:` is canonical, and the file's row in the
  Projects Index mirrors it. The test checks that the folder, the index, and the frontmatter agree.
- `status:` is one of `idea`, `in-progress`, or `done`.
- `kind:` is one of `spec`, `quality`, `infra`, or `research`. Each kind maps to one `### `
  sub-header in the Projects Index, and a file's row sits under its kind's sub-header. To change
  the set, edit `CONTRACT` in `docs/projects.index.test.ts` and the sub-headers together.
- Each index row is an inline link, `[name](projects/name.md)`. The test rejects bare text,
  because a WYSIWYG editor that round-trips through HTML once flattened these links. Edit
  markdown as plain text. To recover, run `git checkout -- docs/plan.md`.
- Each project file contains, in order: frontmatter (`status`, `kind`, a `phases` array, and a
  one-line `summary`), `## Status`, `## Phased Plan`, `## Todo` (a checklist per phase), and then
  `## Design` sections. `docs/projects/_example_spec.md` shows the shape.
- When you create a project file, add its row to the Projects Index. We recommend you also add
  `→ see docs/projects/…` notes to the related milestone lines.
- `docs/logs/` and `docs/snapshots/` aren't projects. They have no status and stay out of the
  index.
