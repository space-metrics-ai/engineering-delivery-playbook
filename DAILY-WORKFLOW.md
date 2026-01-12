# Engineer's Daily Workflow

A practical guide illustrating how to leverage AI agents and the playbook throughout your workday. This flow demonstrates the optimal way to use each tool for maximum productivity.

---

## The Day at a Glance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ENGINEER'S DAILY WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  08:30  ┌──────────────┐                                                   │
│    ●────│ Morning Sync │ Review PRs, plan the day                          │
│         └──────────────┘                                                   │
│              │                                                              │
│  09:00      ▼                                                              │
│    ●────┌──────────────┐                                                   │
│         │   Planning   │ Spec-kit specs, consult on architecture           │
│         └──────────────┘                                                   │
│              │                                                              │
│  10:00      ▼                                                              │
│    ●────┌──────────────┐                                                   │
│         │ Development  │ Code with AI assistance                           │
│         └──────────────┘                                                   │
│              │                                                              │
│  12:00      ▼                                                              │
│    ●────┌──────────────┐                                                   │
│         │    Lunch     │                                                   │
│         └──────────────┘                                                   │
│              │                                                              │
│  13:00      ▼                                                              │
│    ●────┌──────────────┐                                                   │
│         │   Testing    │ Write tests, validate quality                     │
│         └──────────────┘                                                   │
│              │                                                              │
│  15:00      ▼                                                              │
│    ●────┌──────────────┐                                                   │
│         │ Code Review  │ Review others' PRs                                │
│         └──────────────┘                                                   │
│              │                                                              │
│  16:30      ▼                                                              │
│    ●────┌──────────────┐                                                   │
│         │   Wrap Up    │ Create PR, document, commit                       │
│         └──────────────┘                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 08:30 - Morning Sync

### Review Pending PRs

Start by reviewing PRs assigned to you. Use the appropriate **Reviewer Agent** based on the PR type.

**Setup your AI assistant:**
```
You are a Senior Backend Code Reviewer.
Follow the guidelines in agents/backend-reviewer.md.
Use Conventional Comments for all feedback.
```

**Example prompt:**
```
Review this PR for a new user authentication endpoint:

<paste the diff here>

Focus on:
1. Security vulnerabilities
2. Error handling
3. Test coverage
4. API design consistency
```

**Agent to use:** [Backend Reviewer](agents/backend-reviewer.md) | [Frontend Reviewer](agents/frontend-reviewer.md) | [Mobile Reviewer](agents/mobile-reviewer.md) | [DevOps Reviewer](agents/devops-reviewer.md)

### Check CI/CD Status

If builds are failing, reference the quality gates:
- [CI/CD Quality Gates](agents/knowledge/cicd-quality-gates.md)

---

## 09:00 - Planning & Architecture

### For New Features: Spec-Driven Development

Before writing code, use **spec-kit** to create executable specifications that guide AI-assisted implementation.

**Initialize spec-kit (first time only):**
```bash
specify init . --here --ai claude
```

**Spec-kit Workflow:**
```
┌─────────────────────────────────────────────────────────────────┐
│                    SPEC-DRIVEN DEVELOPMENT FLOW                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. /speckit.constitution                                       │
│     Define project governance and decision principles           │
│                           │                                     │
│                           ▼                                     │
│  2. /speckit.specify                                            │
│     Write detailed requirements and acceptance criteria         │
│                           │                                     │
│                           ▼                                     │
│  3. /speckit.clarify                                            │
│     Refine ambiguous requirements through Q&A                   │
│                           │                                     │
│                           ▼                                     │
│  4. /speckit.plan                                               │
│     Create technical architecture and design decisions          │
│                           │                                     │
│                           ▼                                     │
│  5. /speckit.tasks                                              │
│     Break down into actionable tasks with dependencies          │
│                           │                                     │
│                           ▼                                     │
│  6. /speckit.implement                                          │
│     Execute implementation with spec context                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Example spec-kit session:**
```
Agent: Claude / Cursor / Copilot

/speckit.specify

"I need to implement a real-time notification system for our mobile app.

Requirements:
- Push notifications for new messages
- In-app notification center
- Read/unread status tracking
- Support for 50k DAU

Acceptance criteria:
- Notifications delivered within 2 seconds
- 99.9% delivery reliability
- Battery-efficient implementation on mobile"
```

The AI will guide you through creating a detailed spec, asking clarifying questions, and generating a structured implementation plan.

> See [Spec-Kit Knowledge Base](agents/knowledge/spec-kit.md) for detailed usage and all commands.

### Consult Tech Consultant for Architecture Decisions

After creating your spec, consult with the **Tech Consultant Agent** to validate your approach.

**Setup:**
```
You are a Senior Technology Consultant.
Follow the guidelines in agents/consultant.md.
DO NOT write code. Advise, question, and guide only.
```

**Example conversation:**
```
I need to implement a real-time notification system for our mobile app.
Our stack is:
- Backend: Node.js + PostgreSQL
- Mobile: Flutter
- Current scale: 50k DAU

What architecture approach would you recommend? What are the trade-offs
I should consider?
```

**What to expect:**
- Probing questions about requirements
- Trade-off analysis (WebSockets vs SSE vs Polling)
- Scalability considerations
- Technology recommendations with rationale

**Agent to use:** [Tech Consultant](agents/consultant.md)

### Break Down the Task

Once you have clarity, break down the work:

```markdown
## Feature: Real-time Notifications

### Tasks
1. [ ] Design notification event schema
2. [ ] Implement WebSocket server endpoint
3. [ ] Create notification service layer
4. [ ] Add Flutter WebSocket client
5. [ ] Write integration tests
6. [ ] Update API documentation
```

---

## 10:00 - Development Phase

### Coding with AI Assistance

Now switch to the appropriate **Engineer Agent** for implementation.

**Setup (Backend example):**
```
You are a Senior Backend Engineer.
Follow the guidelines in agents/backend.md.
Reference knowledge base for patterns: agents/knowledge/
```

### Workflow Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI-ASSISTED DEVELOPMENT FLOW                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. DESCRIBE THE TASK                                          │
│     "Implement a WebSocket handler for notification events     │
│      using our existing auth middleware"                       │
│                           │                                     │
│                           ▼                                     │
│  2. AI GENERATES CODE                                          │
│     - Reviews your codebase context                            │
│     - Applies patterns from knowledge base                     │
│     - Generates implementation                                 │
│                           │                                     │
│                           ▼                                     │
│  3. REVIEW & REFINE                                            │
│     - Check for security issues                                │
│     - Verify error handling                                    │
│     - Ensure it follows team patterns                          │
│                           │                                     │
│                           ▼                                     │
│  4. ITERATE                                                    │
│     "Add rate limiting to prevent abuse"                       │
│     "Handle reconnection logic"                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Example Development Session

**Prompt 1 - Initial implementation:**
```
Create a WebSocket notification handler in Node.js/TypeScript that:
1. Authenticates connections using our existing JWT middleware
2. Subscribes users to their notification channel
3. Handles graceful disconnection
4. Follows the Repository pattern for notification storage

Use our existing patterns from the codebase.
```

**Prompt 2 - Add error handling:**
```
Add comprehensive error handling:
1. Invalid token scenarios
2. Connection timeout handling
3. Reconnection backoff strategy
4. Proper logging with our Winston logger
```

**Prompt 3 - Security hardening:**
```
Review this implementation for security vulnerabilities:
- Rate limiting
- Message validation
- Protection against WebSocket abuse
- CORS configuration
```

**Agents to use:** [Backend](agents/backend.md) | [Frontend](agents/frontend.md) | [Mobile](agents/mobile.md) | [DevOps](agents/devops.md)

### Reference Knowledge Base

While coding, reference these resources:

| Need | Resource |
|------|----------|
| Design pattern help | [Design Patterns](agents/knowledge/design-patterns.md) |
| SOLID principles | [Engineering Principles](agents/knowledge/engineering-principles.md) |
| Architecture decisions | [System Design](agents/knowledge/system-design.md) |
| Frontend patterns | [Frontend Development](agents/knowledge/frontend-development.md) |
| Mobile patterns | [Mobile Development](agents/knowledge/mobile-development.md) |
| Infrastructure | [DevOps Practices](agents/knowledge/devops-practices.md) |

---

## 13:00 - Testing Phase

### Write Tests with AI

Switch focus to testing. The same Engineer Agent can help write tests.

**Prompt:**
```
Write comprehensive tests for the WebSocket notification handler:

1. Unit tests for the NotificationService
2. Integration tests for the WebSocket endpoint
3. Edge cases: auth failure, connection drops, rate limiting

Use Jest and our existing test utilities.
Include mocking for external dependencies.
```

### Testing Checklist

Reference [Testing Strategies](agents/knowledge/testing-strategies.md) for:

```markdown
## Test Coverage Checklist

### Unit Tests
- [ ] Happy path scenarios
- [ ] Error handling paths
- [ ] Edge cases (null, empty, max values)
- [ ] Mocked dependencies

### Integration Tests
- [ ] API endpoint behavior
- [ ] Database interactions
- [ ] External service calls

### Security Tests
- [ ] Authentication bypass attempts
- [ ] Input validation
- [ ] Rate limiting effectiveness
```

---

## 15:00 - Code Review

### Review Others' PRs

Use the **Reviewer Agents** to help review teammates' code.

**Prompt:**
```
Review this PR implementing a new payment processing flow.

<paste diff>

Check for:
1. Security vulnerabilities (especially payment data handling)
2. Error handling and rollback scenarios
3. Idempotency for retry scenarios
4. Test coverage adequacy
5. Documentation completeness

Use Conventional Comments format for feedback.
```

### Conventional Comments Format

From [Code Review Guidelines](agents/knowledge/code-review-guidelines.md):

```markdown
**blocker:** This exposes a SQL injection vulnerability.
The user input must be parameterized.

**issue:** Missing null check here could cause a runtime exception
when the user has no payment methods.

**suggestion:** Consider extracting this logic into a separate
PaymentValidator class for better testability.

**nit:** Inconsistent naming - other services use `processPayment`
not `handlePayment`.
```

### Review Priority Order

```
1. 🔴 Security vulnerabilities     [BLOCKER]
2. 🔴 Correctness / bugs           [BLOCKER]
3. 🟠 Architecture / design        [ISSUE]
4. 🟠 Performance concerns         [ISSUE]
5. 🟡 Test coverage gaps           [SUGGESTION]
6. 🟢 Code clarity                 [NIT]
7. 🟢 Style / conventions          [NIT]
```

---

## 16:30 - Wrap Up

### Create Your PR

Use the Engineer Agent to help prepare your PR.

**Prompt:**
```
Help me create a PR for the WebSocket notification feature.

Changes made:
- New WebSocket endpoint at /ws/notifications
- NotificationService with pub/sub pattern
- Flutter client integration
- 95% test coverage

Generate:
1. PR title following conventional commits
2. Description with summary, test plan, and screenshots section
3. List of files to review first
```

### PR Template

From [PR Templates](agents/knowledge/pr-templates.md):

```markdown
## Summary
Brief description of changes and why they were made.

## Changes
- Added WebSocket endpoint for real-time notifications
- Implemented NotificationService with Redis pub/sub
- Created Flutter WebSocketClient wrapper
- Added comprehensive test suite

## Test Plan
- [ ] Unit tests pass locally
- [ ] Integration tests pass
- [ ] Manual testing on staging
- [ ] Load tested with 1000 concurrent connections

## Screenshots
[If applicable]

## Checklist
- [x] Tests added/updated
- [x] Documentation updated
- [x] No security vulnerabilities
- [ ] Reviewed by: @teammate
```

### Commit with AI Assistance

**Prompt:**
```
Generate a commit message for these changes:
- New WebSocket notification system
- Redis pub/sub integration
- Flutter client updates
- Test coverage at 95%

Follow conventional commits format.
```

**Output:**
```
feat(notifications): add real-time WebSocket notification system

- Implement WebSocket endpoint with JWT authentication
- Add NotificationService with Redis pub/sub backend
- Create Flutter WebSocketClient with auto-reconnect
- Achieve 95% test coverage with integration tests

Closes #123
```

---

## Track Your AI Usage

### End of Day Metrics

Use the **AI Metrics Agent** to understand your AI tool effectiveness.

**Setup:**
```
You are an AI Usage Analytics Specialist.
Follow the guidelines in agents/ai-metrics.md.
```

**Tag your commits:**
```bash
git commit -m "feat(notifications): add WebSocket system

AI-Assisted: true
AI-Tools: claude-code, cursor
AI-Contribution: high"
```

**Weekly self-assessment:**
```markdown
## AI Usage This Week

### Tasks Completed with AI
- WebSocket notification system (high AI contribution)
- Bug fix in payment flow (medium AI contribution)
- Code reviews for 5 PRs (low AI contribution)

### Time Saved Estimate
- Boilerplate code: ~2 hours
- Test generation: ~1.5 hours
- Code review prep: ~1 hour

### What Worked Well
- AI-generated tests caught edge cases I missed
- Architecture consultation saved a wrong design decision

### Areas to Improve
- Need to provide more context for complex business logic
- Should review AI output more carefully for security
```

**Agent to use:** [AI Metrics](agents/ai-metrics.md)

---

## Quick Reference Card

### Which Agent When?

| Situation | Agent | Quick Setup |
|-----------|-------|-------------|
| Starting a new feature | Spec-kit | `/speckit.specify` then `/speckit.plan` |
| Architecture decisions | Tech Consultant | "Advise on architecture for..." |
| Writing backend code | Backend Engineer | "Implement a service that..." |
| Writing frontend code | Frontend Engineer | "Create a component that..." |
| Writing mobile code | Mobile Engineer | "Build a screen that..." |
| Infrastructure work | DevOps Engineer | "Create Terraform for..." |
| Reviewing backend PR | Backend Reviewer | "Review this PR for..." |
| Reviewing frontend PR | Frontend Reviewer | "Review this PR for..." |
| Reviewing mobile PR | Mobile Reviewer | "Review this PR for..." |
| Reviewing infra PR | DevOps Reviewer | "Review this IaC for..." |
| Measuring AI impact | AI Metrics | "Analyze our AI usage..." |

### Productivity Tips

```
┌─────────────────────────────────────────────────────────────────┐
│                      AI PRODUCTIVITY TIPS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✓ Provide context        Share relevant code, constraints,    │
│                           and business requirements             │
│                                                                 │
│  ✓ Be specific            "Add rate limiting" not "make safer" │
│                                                                 │
│  ✓ Iterate                Build features incrementally         │
│                                                                 │
│  ✓ Review everything      AI output needs human validation     │
│                                                                 │
│  ✓ Learn from AI          Understand the code it generates     │
│                                                                 │
│  ✗ Don't blindly copy     Always review for security/quality   │
│                                                                 │
│  ✗ Don't skip context     AI without context = tech debt       │
│                                                                 │
│  ✗ Don't over-rely        Build your own skills alongside AI   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Context Levels

From [The Philosophy](README.md#the-philosophy-context-driven-ai-usage):

| Your Context Level | AI Usage Style |
|-------------------|----------------|
| **Onboarding** (0-30 days) | Learning assistant - ask questions, explore |
| **Ramping** (30-60 days) | Pair programmer - implement with supervision |
| **Contributing** (60-90 days) | Accelerator - complex tasks, light review |
| **Established** (90+ days) | Force multiplier - full leverage |

---

## Daily Workflow Checklist

```markdown
## Morning
- [ ] Review assigned PRs using Reviewer Agents
- [ ] Check CI/CD status
- [ ] Plan day's tasks

## Planning
- [ ] Use spec-kit to define requirements (`/speckit.specify`)
- [ ] Create technical plan (`/speckit.plan`)
- [ ] Consult Tech Consultant for architecture validation
- [ ] Break down tasks into clear steps (`/speckit.tasks`)

## Development
- [ ] Use Engineer Agent for implementation
- [ ] Reference knowledge base for patterns
- [ ] Iterate on AI output
- [ ] Review for security and quality

## Testing
- [ ] Generate tests with AI assistance
- [ ] Cover edge cases and error paths
- [ ] Run full test suite

## Code Review
- [ ] Use Reviewer Agents for thorough reviews
- [ ] Apply Conventional Comments format
- [ ] Focus on security and correctness first

## Wrap Up
- [ ] Create PR with proper template
- [ ] Write clear commit messages
- [ ] Tag AI assistance in commits
- [ ] Track AI usage metrics
```

---

## Example: Full Feature Development

### Scenario: Add User Profile Picture Upload

**09:00 - Define Specs with spec-kit**
```
Agent: Claude / Cursor

/speckit.specify

"Feature: User Profile Picture Upload

Requirements:
- Users can upload profile pictures from their device
- Support JPEG, PNG, WebP formats
- Maximum file size: 5MB
- Generate thumbnails (200x200 and 50x50)
- Store securely with CDN delivery

Acceptance Criteria:
- Upload completes within 3 seconds
- Images served from CDN with <100ms latency
- Graceful fallback for upload failures
- Works on web and mobile clients"
```

**09:15 - Consult on Architecture**
```
Agent: Tech Consultant

"Based on my spec, what storage approach do you recommend?
1. Store in S3 with CloudFront CDN
2. Use a service like Cloudinary
3. Store in our existing PostgreSQL as base64

We have 100k users, budget is limited."
```

**10:00 - Backend Implementation**
```
Agent: Backend Engineer

"Implement a profile picture upload endpoint:
- POST /api/users/:id/avatar
- Accept multipart/form-data
- Resize to 200x200 and 50x50
- Store in S3 with our existing AWS setup
- Return CDN URLs for both sizes
- Add proper validation (max 5MB, image types only)"
```

**11:00 - Frontend Implementation**
```
Agent: Frontend Engineer

"Create an avatar upload component in React:
- Drag and drop support
- Image preview before upload
- Progress indicator
- Error handling with user-friendly messages
- Crop functionality using react-image-crop
- Integrate with our existing UserProfile page"
```

**14:00 - Write Tests**
```
Agent: Backend Engineer

"Write tests for the avatar upload endpoint:
- Success case with valid image
- Rejection of oversized files
- Rejection of non-image files
- Handling of S3 upload failures
- Authorization checks (users can only update own avatar)"
```

**15:00 - Self-Review**
```
Agent: Backend Reviewer

"Review my avatar upload implementation for:
- Security (file validation, path traversal, SSRF)
- Error handling completeness
- Test coverage gaps
- Performance considerations"
```

**16:30 - Create PR**
```
Agent: Backend Engineer

"Create PR description for the avatar upload feature.
Include test plan and security considerations."
```

---

*This workflow maximizes AI assistance while maintaining code quality, security, and your growth as an engineer.*
