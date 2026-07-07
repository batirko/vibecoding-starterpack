# docs/mechanics/

Behavioural docs for **implemented** mechanics — what is *actually built*, not what is
planned. One file per mechanic (e.g. `evaluation-triggers.md`, `release-and-deploy.md`).

**Conventions**

- **Describe reality, not intent.** No speculation, no roadmap — that lives in `docs/plan.md`
  and `docs/projects/`. If it isn't built yet, it doesn't belong here.
- **Update in the same task that changes the mechanic.** When you change code that alters a
  documented behaviour, update the corresponding file here as part of the same PR. A mechanics
  doc that lags the code is worse than none.
- These files are **not** in the Projects Index — they have no lifecycle status; they either
  describe a live mechanic or they're deleted.
