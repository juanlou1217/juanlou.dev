---
name: commit
description: Create one Conventional Commit from explicitly selected local changes.
user-invocable: true
disable-model-invocation: true
allowed-tools:
  - Bash
  - Read
  - Grep
argument-hint: '[optional: scope or commit message]'
---

# Commit

Run this workflow only when the user explicitly invokes it. A request to edit, fix, or write files does not authorize a commit.

## Workflow

1. Inspect `git status`, the staged diff, and the unstaged diff. Do not use `-uall`.
2. Identify the files that belong to the user's current task. Preserve unrelated staged, unstaged, and untracked work; if ownership is genuinely ambiguous, ask before staging it.
3. Check intended files for secrets, generated noise, and accidental large artifacts.
4. Stage explicit paths only. Never use `git add .` or `git add -A`.
5. Review the final staged diff and run `git diff --check`.
6. Create one new commit unless the user explicitly requested a different split.
7. Verify with `git status --short` and `git log -1 --oneline`, then report the commit hash and any remaining changes.

## Message

Use Conventional Commits:

```text
<type>(<optional-scope>): <imperative subject>

<optional body explaining why>
```

Choose the narrowest accurate type: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `build`, `ci`, `style`, `chore`, or `revert`. Keep the subject concise, lowercase unless a proper noun requires otherwise, and omit the final period. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer.

Treat `$ARGUMENTS` as a hint. If it is a complete message, validate it against the actual staged diff rather than using it blindly.

## Safety

- Do not commit credentials, `.env` files, user-specific IDE state, package caches, or unrelated generated artifacts.
- Do not amend, reset, rewrite history, push, or open a pull request unless the user explicitly asks for that separate action.
- If validation fails because of the intended change, fix it before committing when that remains within scope. Report unrelated or unavailable checks instead of hiding them.
