# AGENTS.md

This repo's operational guide for AI coding agents lives in **[CLAUDE.md](CLAUDE.md)** — read
it first, every session. It is the single source of truth regardless of which tool you use.

`AGENTS.md` exists so cross-tool agents that look for this filename are pointed to the same
place; it is intentionally a thin pointer, not a second copy (a second copy would drift).

Start here:

- **[CLAUDE.md](CLAUDE.md)** — the one principle, document map, `docs/projects/` conventions,
  hard invariants, parallel-session discipline, and commands.
- **[docs/plan.md](docs/plan.md)** — current phase, scope, and the routing table for open work.
- **[docs/concept.md](docs/concept.md)** — the *why*.

> Prefer a real `AGENTS.md` with content? Some teams symlink it: `ln -sf CLAUDE.md AGENTS.md`.
> This template ships a pointer instead so the two files can say slightly different things
> (this note) without a symlink's all-or-nothing coupling.
