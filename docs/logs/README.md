# docs/logs/

Append-only field logs — running records of observations made while using or testing the
product (e.g. `prompt_quality_observations.md`, `ux_quality_observations.md`).

**Conventions**

- **Append, don't fix inline.** When you notice something worth recording during a test or
  review, add a dated entry here — don't detour to fix it mid-task. Fixes get triaged later.
- **Logs never reach `done`.** They have no lifecycle status and are **intentionally absent
  from the Projects Index** (`docs/projects.index.test.ts` only governs `docs/projects/`).
- **Drained by remediation sprints,** not by individual edits. Periodically triage entries into
  `docs/plan.md` milestones or `docs/projects/` files.

See `_example_log.md` for the entry format.
