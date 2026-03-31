# CLAUDE.md Best Practices

Based on Boris Cherny's workflow (Staff Engineer @ Anthropic, Claude Code creator).

---

## Golden Rule

**~100 lines (~2.5k tokens)**. Not 500+ lines (10k+ tokens). Less is more.

---

## The 7 Anti-Patterns

### 1. Context Stuffing
Don't dump everything. Above 32k tokens, models lose 50%+ recall precision.

### 2. Static Memory
Update CLAUDE.md regularly. Add learnings from PRs. Monthly audit.

### 3. Instruction Collision
One source of truth per topic. No contradictory rules.

### 4. Over-Documentation
Don't document what Claude already knows (syntax, public APIs, obvious patterns).

### 5. Missing Scope Boundaries
Define what Claude should NOT do.

### 6. Temporal Confusion
Date your current state. Mark migrations with deadlines.

### 7. Team Sync Gap
CLAUDE.md checked in git. Whole team contributes.

---

## Template

```markdown
# CLAUDE.md

## Context
[2-3 sentences about the project]

## Standards
[Concise list - one line each]

## Architecture
[Folder structure and responsibilities - bullet points]

## Out of Scope
[What Claude should NOT do]

## Learnings
[Errors fixed in PRs, patterns discovered - with dates]

## Current State (YYYY-MM)
[What's in migration/change - with deadlines]
```

---

## Example (~50 lines, ~1k tokens)

```markdown
# CLAUDE.md

## Context
Logistics API in Kotlin/Ktor. Processes 50M events/day.

## Standards
- Kotlin style: ktlint
- Tests: coverage 80%+, JUnit 5 + MockK
- Commits: conventional commits (feat/fix/chore)

## Architecture
- domain/: business logic, zero IO
- infra/: adapters (DB, HTTP, Kafka)
- api/: HTTP handlers, input validation

## Out of Scope
- Don't modify terraform/, k8s/
- Don't suggest product features
- Don't commit to main directly

## Learnings
- BigDecimal for monetary values
- @Transactional in integration tests
- Kafka listeners need idempotency key

## Current State (2026-03)
- Migrating JUnit 4 -> 5 (80% done)
- Ktor 2.x -> 3.x planned Q2
```

---

## Token Budget

| Section | Max Lines | Purpose |
|---------|-----------|---------|
| Context | 3 | What is this project |
| Standards | 5-8 | Non-obvious conventions |
| Architecture | 5-10 | Folder map |
| Out of Scope | 3-5 | Guardrails |
| Learnings | 5-10 | Rolling corrections |
| Current State | 3-5 | Active migrations |
| **Total** | **~50-100** | **~1-2.5k tokens** |
