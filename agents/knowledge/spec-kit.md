# Spec-Kit: Spec-Driven Development

A comprehensive guide to using [GitHub's spec-kit](https://github.com/github/spec-kit) for transforming specifications into executable implementations.

---

## Overview

Spec-kit revolutionizes software development by making specifications the primary artifact that generates working implementations. Instead of treating specs as preliminary scaffolding, spec-kit transforms them into directly generating working code through AI-assisted development.

**Philosophy:** Specifications become the source of truth that guides and generates code, rather than code being written from vague specifications.

---

## Getting Started

### Prerequisites

- Linux, macOS, or Windows
- Python 3.11+
- Git
- `uv` package manager
- Supported AI coding agent (Claude, Cursor, Copilot, Gemini, etc.)

### Installation

```bash
# Recommended: Install CLI globally
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize in your project
specify init <project-name> --ai claude

# Or initialize in current directory
specify init . --here --ai claude
```

### Project Structure After Init

```
your-project/
├── .specify/
│   ├── memory/          # AI context and conversation history
│   ├── scripts/         # Generated implementation scripts
│   ├── specs/           # Specification documents
│   └── templates/       # Reusable spec templates
```

---

## Slash Commands Reference

### Core Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/speckit.constitution` | Establish project governance | Once per project, defines principles |
| `/speckit.specify` | Define requirements | Starting a new feature |
| `/speckit.clarify` | Refine specifications | When requirements are ambiguous |
| `/speckit.plan` | Create technical architecture | After specs are finalized |
| `/speckit.tasks` | Generate task breakdown | Before implementation |
| `/speckit.implement` | Execute implementation | When ready to code |

### Optional Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/speckit.analyze` | Cross-artifact validation | Before implementation |
| `/speckit.checklist` | Quality assurance verification | Before PR submission |

---

## The Spec-Driven Workflow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SPEC-DRIVEN DEVELOPMENT                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Phase 1: CONSTITUTION                                                 │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │ /speckit.constitution                                            │  │
│   │ Define project-wide principles, coding standards, and           │  │
│   │ decision-making frameworks that guide all future development    │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│   Phase 2: SPECIFY                                                      │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │ /speckit.specify                                                 │  │
│   │ Write detailed requirements with:                                │  │
│   │ - User stories and acceptance criteria                          │  │
│   │ - Technical constraints and dependencies                        │  │
│   │ - Performance and security requirements                         │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│   Phase 3: CLARIFY                                                      │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │ /speckit.clarify                                                 │  │
│   │ AI asks probing questions to eliminate ambiguity:               │  │
│   │ - Edge cases and error scenarios                                │  │
│   │ - Integration points with existing systems                      │  │
│   │ - Data models and API contracts                                 │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│   Phase 4: PLAN                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │ /speckit.plan                                                    │  │
│   │ Create technical architecture:                                   │  │
│   │ - Component diagrams and data flow                              │  │
│   │ - Technology decisions with rationale                           │  │
│   │ - API contracts and data models                                 │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│   Phase 5: TASKS                                                        │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │ /speckit.tasks                                                   │  │
│   │ Break down into actionable items:                                │  │
│   │ - Dependency mapping between tasks                              │  │
│   │ - Parallel execution markers                                    │  │
│   │ - Test requirements per task                                    │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│   Phase 6: IMPLEMENT                                                    │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │ /speckit.implement                                               │  │
│   │ Execute with full context:                                       │  │
│   │ - AI has access to all specs, plans, and tasks                  │  │
│   │ - Test-driven implementation                                    │  │
│   │ - Consistent with constitution principles                       │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Command Deep Dive

### /speckit.constitution

Establishes the foundational principles for your project. Run this once per project.

**Example:**
```
/speckit.constitution

"Our project follows these principles:

Technology Stack:
- Backend: Node.js with TypeScript, Express
- Database: PostgreSQL with Prisma ORM
- Frontend: React with Next.js
- Mobile: Flutter

Coding Standards:
- All code must have 80%+ test coverage
- Use conventional commits
- Follow SOLID principles
- Maximum function length: 50 lines

Security Requirements:
- All inputs must be validated
- Use parameterized queries only
- JWT authentication with refresh tokens
- OWASP Top 10 compliance

Performance Standards:
- API responses < 200ms p95
- Page load < 3 seconds
- Database queries < 50ms"
```

### /speckit.specify

Defines detailed requirements for a feature.

**Example:**
```
/speckit.specify

"Feature: User Authentication System

Requirements:
1. Users can register with email and password
2. Users can login and receive JWT tokens
3. Password reset via email link
4. OAuth integration (Google, GitHub)
5. Rate limiting on auth endpoints

Acceptance Criteria:
- Registration validates email format and password strength
- JWT expires in 15 minutes, refresh token in 7 days
- Password reset link expires in 1 hour
- Failed login attempts locked after 5 tries
- All auth events logged for audit

Technical Constraints:
- Must integrate with existing user table
- Use existing email service for notifications
- Support horizontal scaling (stateless tokens)"
```

### /speckit.clarify

Refines ambiguous requirements through structured Q&A.

**Example:**
```
/speckit.clarify

"Clarify the OAuth integration requirements:
- Which OAuth providers are required for MVP?
- Should OAuth users also have password login option?
- How should we handle email conflicts?
- What user data do we need from OAuth providers?"
```

### /speckit.plan

Creates technical architecture and design decisions.

**Example:**
```
/speckit.plan

"Based on my authentication spec, create a technical plan including:
- Component architecture
- Database schema changes
- API endpoint design
- Security measures
- Integration points with existing services"
```

### /speckit.tasks

Generates actionable task breakdown with dependencies.

**Example output:**
```markdown
## Tasks for Authentication Feature

### Phase 1: Database (can be parallel)
- [ ] T1: Add OAuth provider columns to users table
- [ ] T2: Create refresh_tokens table
- [ ] T3: Create auth_events audit table

### Phase 2: Core Auth (sequential, depends on Phase 1)
- [ ] T4: Implement JWT service with refresh token logic
- [ ] T5: Create registration endpoint with validation
- [ ] T6: Create login endpoint with rate limiting

### Phase 3: OAuth (depends on T4)
- [ ] T7: Implement Google OAuth flow
- [ ] T8: Implement GitHub OAuth flow
- [ ] T9: Handle OAuth email conflict resolution

### Phase 4: Recovery (depends on T5, T6)
- [ ] T10: Implement password reset request endpoint
- [ ] T11: Implement password reset confirmation
- [ ] T12: Add email templates for auth notifications
```

### /speckit.implement

Executes implementation with full spec context.

**Example:**
```
/speckit.implement

"Start implementing the authentication feature.
Begin with Phase 1 database tasks.
Follow TDD approach - write tests first."
```

---

## Development Phases

Spec-kit supports three primary development contexts:

### Greenfield (0-to-1)

New projects where you're building from scratch.

```
/speckit.constitution   # Define all standards upfront
/speckit.specify        # Detailed feature specs
/speckit.plan           # Full architecture design
/speckit.tasks          # Complete breakdown
/speckit.implement      # Build it
```

### Brownfield (Iterative Enhancement)

Existing projects where you're adding or modifying features.

```
/speckit.specify        # Focus on the change
/speckit.clarify        # Understand impact on existing code
/speckit.plan           # Plan integration carefully
/speckit.tasks          # Include migration/compatibility tasks
/speckit.implement      # Implement with backward compatibility
```

### Creative Exploration

When exploring multiple approaches or prototyping.

```
/speckit.specify        # Define the problem space
/speckit.plan           # Create multiple solution options
/speckit.tasks          # Parallel implementation tracks
/speckit.analyze        # Compare approaches
```

---

## Best Practices

### Writing Good Specifications

```markdown
## Good Spec Structure

### Context
Why is this feature needed? What problem does it solve?

### Requirements
Numbered list of functional requirements

### Acceptance Criteria
Testable conditions that define "done"

### Technical Constraints
- Integration requirements
- Performance requirements
- Security requirements

### Out of Scope
What this feature explicitly does NOT include
```

### Iterating on Specs

1. **Start broad, then narrow** - Begin with high-level requirements, refine through clarification
2. **Use concrete examples** - "User can upload a 5MB image" vs "User can upload images"
3. **Define edge cases early** - What happens when things go wrong?
4. **Include non-functional requirements** - Performance, security, accessibility

### Team Collaboration

- **Review specs before implementation** - Catch issues early
- **Version control your specs** - Track changes to requirements
- **Link specs to PRs** - Maintain traceability
- **Update specs when requirements change** - Keep them as living documents

---

## Integration with Playbook Agents

Use spec-kit alongside the playbook agents:

| Phase | Spec-kit Command | Playbook Agent |
|-------|------------------|----------------|
| Architecture | `/speckit.plan` | Tech Consultant for validation |
| Implementation | `/speckit.implement` | Backend/Frontend/Mobile Engineer |
| Review | `/speckit.checklist` | Reviewer Agents |
| Quality | `/speckit.analyze` | AI Metrics for tracking |

**Workflow Example:**
```
1. /speckit.specify     → Define the feature
2. /speckit.clarify     → Refine requirements
3. Tech Consultant      → Validate architecture approach
4. /speckit.plan        → Create technical design
5. /speckit.tasks       → Break into tasks
6. /speckit.implement   → Use Engineer Agent to build
7. Reviewer Agent       → Review implementation
8. /speckit.checklist   → Final quality check
```

---

## CLI Reference

```bash
# Initialize new project
specify init <project-name> --ai claude

# Initialize in current directory
specify init . --here --ai claude

# Available flags
--ai [agent]        # Specify AI agent (claude, cursor, copilot, gemini)
--script [sh|ps]    # Shell script type (sh for Unix, ps for PowerShell)
--force             # Overwrite existing configuration
--no-git            # Skip git initialization
--debug             # Enable debug output
--github-token      # GitHub token for private repos
--ignore-agent-tools # Skip agent tool verification
```

---

## Troubleshooting

### Common Issues

**"AI doesn't have context"**
- Ensure you ran `/speckit.specify` before `/speckit.implement`
- Check that `.specify/` directory exists and has content

**"Specs are too vague"**
- Use `/speckit.clarify` to ask probing questions
- Add concrete examples and acceptance criteria

**"Tasks don't match requirements"**
- Run `/speckit.analyze` to validate cross-artifact consistency
- Regenerate tasks with `/speckit.tasks`

**"Implementation diverged from spec"**
- Use `/speckit.checklist` to verify alignment
- Update specs if requirements legitimately changed

---

## Resources

- [GitHub Repository](https://github.com/github/spec-kit)
- [Philosophy: Spec-Driven Development](https://github.blog/spec-driven-development)
- [Integration Guide](https://github.com/github/spec-kit#integration)

---

*Spec-kit enables predictable outcomes over improvisation, helping teams build high-quality software faster through specification-driven development.*
