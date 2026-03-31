# OpenSpec: Spec-Driven Development

A comprehensive guide to using [OpenSpec](https://openspec.dev/) for spec-driven development with AI coding agents.

---

## Overview

OpenSpec is a lightweight spec-driven framework that acts as a universal planning layer for AI coding agents. It enables developers to document system requirements and changes before implementation, creating persistent context that survives across chat sessions and team transitions.

**Philosophy:** Specifications become the source of truth that guides code generation. Review intent, not just code.

**Core Principles:**
- **Fluid, not rigid** — Specs adapt as understanding grows
- **Iterative, not waterfall** — Create specs incrementally during development
- **Built for brownfield** — Designed for mature codebases, not just greenfield
- **Scalable** — From personal projects to enterprise teams

---

## Getting Started

### Prerequisites

- Node.js 20.19.0+
- Supported AI coding agent (Claude Code, Cursor, Copilot, Windsurf, etc.)

### Installation

```bash
# Install globally
npm install -g @fission-ai/openspec@latest

# Initialize in your project
cd your-project
openspec init
```

No API keys or MCP setup required.

### Project Structure After Init

```
your-project/
└── openspec/
    ├── specs/              # Living specifications
    │   ├── auth-login/spec.md
    │   ├── auth-session/spec.md
    │   └── checkout-cart/spec.md
    └── changes/            # Change proposals
        └── add-remember-me/
            ├── proposal.md     Strategic rationale & scope
            ├── design.md       Technical approach
            ├── tasks.md        Implementation checklist
            └── specs/          Requirement changes (deltas)
```

---

## Core Workflow

### 1. Propose

Create a feature proposal with specs, design, and tasks:

```
/opsx:propose "Add remember me checkbox with 30-day sessions"
```

This generates:
- **proposal.md** — Strategic rationale and scope
- **specs/** — Requirements with SHALL assertions and GIVEN/WHEN/THEN scenarios
- **design.md** — Technical approach and architecture decisions
- **tasks.md** — Implementation checklist with dependencies

### 2. Apply

Execute the implementation tasks from the proposal:

```
/opsx:apply
```

### 3. Verify

Validate implementation against specs:

```
/opsx:verify
```

### 4. Archive

Archive completed changes:

```
/opsx:archive
```

---

## Commands Reference

### Essential Commands

| Command | Description |
|---------|-------------|
| `/opsx:propose <feature>` | Create a new feature proposal |
| `/opsx:apply` | Execute implementation tasks |
| `/opsx:verify` | Validate against specs |
| `/opsx:archive` | Archive completed changes |

### Extended Commands

| Command | Description |
|---------|-------------|
| `/opsx:new` | Initialize fresh proposals |
| `/opsx:continue` | Resume in-progress work |
| `/opsx:ff` | Fast-forward changes |
| `/opsx:sync` | Synchronize specifications |
| `/opsx:bulk-archive` | Archive multiple changes |
| `/opsx:onboard` | Team onboarding |

Enable extended workflow:
```bash
openspec config profile
openspec update
```

---

## Spec Format

### Requirements

Use SHALL assertions for clear, testable requirements:

```markdown
## Requirements
- The system SHALL expire sessions after a configured duration
- The system SHALL support "remember me" with extended 30-day sessions
- The system SHALL invalidate all sessions on password change
```

### Scenarios

Use GIVEN/WHEN/THEN for concrete, verifiable scenarios:

```markdown
## Scenarios

### Scenario: Remember Me Login
GIVEN a user checks "remember me"
WHEN they log in successfully
THEN a 30-day session token is created
AND the token is stored as a persistent cookie

### Scenario: Regular Login
GIVEN a user does NOT check "remember me"
WHEN they log in successfully
THEN a session token with default expiration is created
```

---

## Spec Deltas

OpenSpec generates spec deltas that show what changed in system intent. This enables reviewing **intent, not just code**:

```diff
- The system SHALL expire sessions after a configured duration.
+ The system SHALL support configurable session expiration periods.
+ The system SHALL support "remember me" with extended 30-day sessions.
```

---

## Integration with EDP

The Engineering Delivery Playbook integrates OpenSpec with agent switching:

```bash
# Full automated workflow
edp openspec start "user authentication with OAuth" be

# Manual workflow
edp switch backend           # Switch to Backend agent
/opsx:propose "feature"      # Create proposal
/opsx:apply                  # Implement
edp switch be-review         # Switch to Reviewer
# Review the implementation
/opsx:archive                # Archive when done
```

---

## Supported Tools

OpenSpec integrates natively with 30+ AI coding agents:

- Claude Code
- Cursor
- GitHub Copilot
- Windsurf
- Amazon Q
- Cline
- Gemini CLI
- Codex
- And 22+ more

---

## Best Practices

1. **Spec before code** — Always propose before implementing
2. **Keep specs granular** — One spec per capability (auth-login, auth-session, etc.)
3. **Use SHALL** — Clear, testable requirements avoid ambiguity
4. **Review deltas** — Check intent changes before merging
5. **Archive completed work** — Keep the workspace clean
6. **Iterate** — Specs evolve; update them as understanding grows

---

## Resources

- **Website:** https://openspec.dev
- **GitHub:** https://github.com/Fission-AI/OpenSpec
- **Discord:** https://discord.gg/YctCnvvshC
