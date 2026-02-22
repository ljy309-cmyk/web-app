export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "subject-max-length": [2, "always", 100],
    "subject-case": [0],
  },
};
