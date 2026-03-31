# Code Review - PR Review Steps

## Workflow

1. **Read the PR description** — understand the intent before looking at code
2. **Check the diff size** — flag if > 400 lines
3. **Review file by file** — focus on logic, not style
4. **Run tests locally** — verify they pass
5. **Check for security issues** — OWASP top 10
6. **Write comments** — use conventional format

## Comment Format

```
blocker: [description] — Must fix before merge
issue: [description] — Should fix, bug or oversight
suggestion: [description] — Consider changing
nit: [description] — Minor preference, take it or leave it
```

## Checklist

- [ ] PR description is clear and complete
- [ ] Tests cover happy path and edge cases
- [ ] No hardcoded secrets or credentials
- [ ] Error handling is appropriate
- [ ] No N+1 queries or performance issues
- [ ] API contracts are documented
- [ ] Breaking changes are flagged
- [ ] Code follows project conventions

## Response Time

- Target: < 4 hours
- Escalate blockers immediately
