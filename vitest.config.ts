import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Claude Code puts session worktrees under `.claude/worktrees/`. Each one is a full
    // checkout, so without this exclude every worktree's tests run twice from the main tree.
    exclude: [...configDefaults.exclude, ".claude/worktrees/**"],
  },
});
