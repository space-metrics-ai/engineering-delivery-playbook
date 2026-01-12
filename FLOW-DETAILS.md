# Development Flow - Details

Deep dive into the development flow methodology and motivations.

> **Quick Reference:** See [README](README.md) for the complete flow on one page.

---

## Why Spec-Driven Development?

Traditional approach:
```
Vague idea → Start coding → Discover issues → Rewrite → Tech debt
```

Spec-driven approach:
```
Clear spec → AI understands context → Correct implementation → Ship fast
```

**The problem:** AI without context generates code that "works" but creates debt.

**The solution:** Specifications give AI the full picture before it writes a single line.

---

## The Flow Philosophy

### Specify First

Specs aren't bureaucracy—they're AI context. A 30-second spec saves hours of refactoring.

```
# Bad: vague, AI guesses
"Add user upload"

# Good: specific, AI knows exactly what to do
"Add avatar upload: POST /api/users/:id/avatar, max 5MB, JPEG/PNG, resize 200x200, S3"
```

### Plan When Uncertain

Not every task needs architecture review. Use Tech Consultant when:

- Multiple valid approaches exist
- Scaling is a concern
- You're unfamiliar with the domain
- Trade-offs aren't clear

Skip it for straightforward CRUD or well-understood patterns.

### Implement Incrementally

One thing at a time:

```
# Step 1: Core functionality
"Create the endpoint with validation"

# Step 2: Error handling
"Add error handling for all failure cases"

# Step 3: Tests
"Write tests covering success and error paths"
```

Don't ask for "endpoint + tests + docs + error handling" in one prompt.

### Review Before Ship

Self-review catches issues before teammates see them:

```
"Review my implementation for security and error handling"
```

This isn't about being perfect—it's about catching obvious issues early.

---

## Conventional Comments

Why we use them:

| Label | Meaning | Reviewer Intent |
|-------|---------|-----------------|
| `blocker:` | Must fix before merge | "This will break production" |
| `issue:` | Should fix | "This is a bug or oversight" |
| `suggestion:` | Consider changing | "This could be better" |
| `nit:` | Minor preference | "Take it or leave it" |

Clear labels prevent misunderstandings about severity.

---

## Context Levels Explained

Your effectiveness with AI depends on how well you know:

### Codebase Context
- Where things are
- How patterns are used
- Why decisions were made

### Domain Context
- Business rules
- Edge cases
- User expectations

### Team Context
- Code style preferences
- Review expectations
- Communication patterns

**New to a codebase?** Use AI to learn, not to ship unsupervised.

**Expert in the codebase?** Use AI as a force multiplier.

---

## Quality Gates

Why these specific thresholds:

| Standard | Target | Reasoning |
|----------|--------|-----------|
| PR Size < 400 lines | Reviewable in one session | Large PRs get rubber-stamped |
| Coverage >= 80% | Meaningful coverage | 100% is diminishing returns |
| Response < 4 hours | Fast iteration | Slow reviews kill momentum |
| No critical vulnerabilities | Ship safely | Security is non-negotiable |

---

## Productivity Patterns

### Be Specific

```
# Vague (AI guesses)
"Make it more secure"

# Specific (AI knows what to do)
"Add rate limiting: 100 requests per minute per user"
```

### Reference Existing Code

```
# Starting fresh (inconsistent)
"Create an auth middleware"

# Building on patterns (consistent)
"Create auth middleware following our existing validateToken pattern"
```

### Iterate Fast

```
# Trying to be perfect first time (slow)
Overthink → Overprompt → Overengineer

# Iterating fast (effective)
Quick draft → Review → Refine → Done
```

---

## When to Skip Steps

| Step | Skip When |
|------|-----------|
| Specify | Trivial change, well-understood task |
| Plan | Standard pattern, no architecture decisions |
| Review | Hotfix, already peer-reviewed approach |

The flow is a guide, not a ceremony. Use judgment.

---

## Anti-Patterns

### Over-prompting

```
# Too much at once
"Create endpoint with auth, validation, error handling, logging,
metrics, caching, rate limiting, tests, and documentation"

# Better: incremental
"Create the endpoint" → "Add validation" → "Add tests"
```

### Under-specifying

```
# Too vague
"Add notifications"

# What does this even mean?
- Push? Email? In-app?
- What triggers them?
- What's the payload?
```

### Skipping Review

Even AI-generated code needs human review. AI is confident but not always correct.

---

*For the quick reference flow, see [README](README.md).*
