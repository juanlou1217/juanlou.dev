---
name: pull-request
description: Push the current feature branch and open a draft GitHub pull request.
user-invocable: true
disable-model-invocation: true
allowed-tools:
  - Bash
  - Read
  - Grep
argument-hint: '[optional: PR title or base branch]'
---

# Pull request

Run this workflow only when the user explicitly invokes it. Creating a pull request is an external side effect and includes the branch push required to create it.

## Workflow

1. Inspect `git status`, the current branch, configured remotes, recent commits, and any existing pull request for the branch.
2. Resolve the base branch in this order: explicit argument, repository default branch from GitHub, then `origin/HEAD`. Do not assume `main`.
3. Refuse to create a feature pull request from the resolved default/base branch. Never switch branches or rewrite history implicitly.
4. Review `git log <base>..HEAD`, `git diff <base>...HEAD`, and the repository PR template if one exists.
5. Keep uncommitted workspace changes out of the PR and report them. Do not auto-commit or sweep unrelated files into the branch.
6. Run or confirm the checks relevant to the committed diff. Record real results; do not pre-check a template item that was not verified.
7. Push the current branch with upstream tracking when needed, then create a draft pull request with `gh pr create --draft`.
8. Read the created PR back, confirm title/base/head/body, and return its URL plus any remaining local changes or failed checks.

## Title and body

- Prefer a Conventional Commit-style title that summarizes the whole PR.
- Fill the current repository template rather than relying on a memorized version.
- Explain why, what changed, impact area, and the actual validation performed.
- Remove placeholder instructions and HTML comments from the submitted body.
- Use a temporary body file or another quoting-safe mechanism for multiline text.

Treat `$ARGUMENTS` as a title or base-branch hint only when it matches repository state. Add labels, reviewers, assignees, or issue links only when the user supplied them or project automation already defines them.

## Safety

- Do not force-push, merge, mark ready, deploy, or mutate issues as part of this workflow.
- If authentication, permissions, branch protection, or CI blocks creation, report the exact blocker and preserve the local branch state.
