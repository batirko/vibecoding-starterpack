# AGENTS.md

This repo's guide for coding agents is **[CLAUDE.md](CLAUDE.md)**, whichever tool you use. This
file only points there, because a second copy would drift.

Claude Code loads the rule files below only when you work in matching paths. Other tools don't,
so read them yourself when the work fits:

- **[.claude/rules/docs-contract.md](.claude/rules/docs-contract.md)**: the tested conventions for
  `docs/plan.md` and `docs/projects/`. Read it before you edit either.

In Claude Code, hooks in `.claude/settings.json` enforce two rules from CLAUDE.md: no commits on
`main`, and a full `npm test` after each `docs/plan.md` edit. Other tools don't run those hooks,
so follow both rules yourself.
