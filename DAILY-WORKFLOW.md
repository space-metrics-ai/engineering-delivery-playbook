# Development Flow

A practical guide to AI-assisted development. Use these patterns to ship faster with higher quality.

---

## The Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DEVELOPMENT FLOW                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   SPECIFY ──▶ PLAN ──▶ IMPLEMENT ──▶ TEST ──▶ REVIEW ──▶ SHIP              │
│                                                                             │
│   spec-kit    Tech       Engineer     Engineer   Reviewer    PR +          │
│               Consultant Agent        Agent      Agent       Commit        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Specify (Optional but Recommended)

Use [spec-kit](https://github.com/github/spec-kit) to define what you're building. This gives AI full context.

```bash
# First time setup
specify init . --here --ai claude
```

**Fast path - just specify and implement:**
```
/speckit.specify
"Add user avatar upload: max 5MB, JPEG/PNG, resize to 200x200, store in S3"

/speckit.implement
```

**Full path - for complex features:**
```
/speckit.specify    → Define requirements
/speckit.plan       → Technical design
/speckit.tasks      → Break into tasks
/speckit.implement  → Build it
```

> See [Spec-Kit Knowledge Base](agents/knowledge/spec-kit.md) for all commands.

---

## 2. Plan (When Needed)

For architecture decisions, consult before coding.

```
Agent: Tech Consultant

"I need real-time notifications for 50k DAU.
Stack: Node.js + Flutter.
WebSockets vs SSE vs Polling - which and why?"
```

**Use when:**
- New architectural patterns
- Technology choices
- Scaling considerations
- Trade-off analysis

**Agent:** [Tech Consultant](agents/consultant.md)

---

## 3. Implement

Code with AI assistance using the appropriate Engineer Agent.

**Example:**
```
Agent: Backend Engineer

"Create POST /api/users/:id/avatar endpoint:
- Accept multipart/form-data, max 5MB
- Validate image type (JPEG, PNG, WebP)
- Resize to 200x200 using Sharp
- Upload to S3, return CDN URL
- Follow our existing patterns"
```

**Tips for fast implementation:**
- Be specific about requirements
- Reference existing patterns
- Ask for one thing at a time
- Iterate quickly

**Agents:**
- [Backend](agents/backend.md) | [Frontend](agents/frontend.md) | [Mobile](agents/mobile.md) | [DevOps](agents/devops.md)

---

## 4. Test

Use the same Engineer Agent to write tests.

```
Agent: Backend Engineer

"Write tests for the avatar upload endpoint:
- Success with valid JPEG
- Reject files > 5MB
- Reject non-image files
- Handle S3 failures gracefully
Use Jest, mock S3 client"
```

**Coverage targets:**
- 80% for new code
- Unit + Integration tests
- Edge cases and error paths

> See [Testing Strategies](agents/knowledge/testing-strategies.md)

---

## 5. Review

Get AI-assisted code review before submitting PR.

**Self-review your code:**
```
Agent: Backend Reviewer

"Review my avatar upload implementation for:
- Security vulnerabilities
- Error handling
- Test coverage gaps
Use Conventional Comments format"
```

**Review others' PRs:**
```
Agent: Backend Reviewer

"Review this PR: <paste diff>
Focus on security and correctness first"
```

**Conventional Comments format:**
```
blocker: SQL injection risk - must use parameterized query
issue: Missing null check could cause runtime exception
suggestion: Extract to PaymentValidator class for testability
nit: Use processPayment not handlePayment for consistency
```

**Agents:**
- [Backend Reviewer](agents/backend-reviewer.md) | [Frontend Reviewer](agents/frontend-reviewer.md) | [Mobile Reviewer](agents/mobile-reviewer.md) | [DevOps Reviewer](agents/devops-reviewer.md)

> See [Code Review Guidelines](agents/knowledge/code-review-guidelines.md)

---

## 6. Ship

Create PR and commit with proper messages.

**Generate PR description:**
```
Agent: Backend Engineer

"Create PR description for avatar upload feature.
Changes: new endpoint, S3 integration, 95% test coverage"
```

**Commit message format:**
```
feat(users): add avatar upload endpoint

- POST /api/users/:id/avatar with S3 storage
- Image validation and resizing
- 95% test coverage

Closes #123
```

> See [PR Templates](agents/knowledge/pr-templates.md)

---

## Quick Reference

### Which Agent?

| Task | Agent |
|------|-------|
| Define feature specs | `/speckit.specify` |
| Architecture advice | Tech Consultant |
| Write backend code | Backend Engineer |
| Write frontend code | Frontend Engineer |
| Write mobile code | Mobile Engineer |
| Infrastructure/DevOps | DevOps Engineer |
| Review code | *-Reviewer Agent |

### Fast Prompts

```bash
# Quick spec
/speckit.specify "Add logout button to header, clear session, redirect to login"

# Quick implementation
"Add logout endpoint: DELETE /api/auth/session, invalidate JWT, return 204"

# Quick test
"Write tests for logout: success case, already logged out, invalid token"

# Quick review
"Review this diff for security issues: <paste>"
```

---

## Example: Complete Feature Flow

**Task:** Add user avatar upload

```
# 1. SPECIFY (30 seconds)
/speckit.specify
"Avatar upload: POST /api/users/:id/avatar, max 5MB, JPEG/PNG, resize 200x200, S3 storage"

# 2. IMPLEMENT (AI generates code)
/speckit.implement

# 3. TEST (AI generates tests)
"Write tests for avatar upload: valid image, oversized file, wrong format, S3 failure"

# 4. REVIEW (self-check)
"Review my implementation for security and error handling"

# 5. SHIP
git add . && git commit -m "feat(users): add avatar upload"
gh pr create
```

**Total time:** Minutes, not hours.

---

## Productivity Tips

```
DO                                  DON'T
─────────────────────────────────────────────────────────
Be specific                         Be vague
"Add rate limiting: 100 req/min"    "Make it more secure"

One task at a time                  Multiple tasks at once
"Add the endpoint"                  "Add endpoint, tests, docs"
then "Write tests"

Reference patterns                  Start from scratch
"Use our existing auth middleware"  "Create authentication"

Iterate fast                        Perfect first try
Quick draft → refine → done         Overthink before starting
```

---

## Context Levels

Your AI effectiveness depends on your codebase familiarity:

| Level | Days | AI Usage |
|-------|------|----------|
| **Onboarding** | 0-30 | Learning assistant - ask questions, explore |
| **Ramping** | 30-60 | Pair programmer - implement with review |
| **Contributing** | 60-90 | Accelerator - complex tasks, light review |
| **Established** | 90+ | Force multiplier - full leverage |

---

*Ship faster. Ship better. Let AI handle the boilerplate while you focus on the logic.*
