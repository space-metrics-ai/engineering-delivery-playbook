<p align="center">
  <img src="logo.png" alt="Engineering Delivery Playbook Logo" width="640">
</p>

<p align="center">
  <strong>AI-powered agents and knowledge bases to elevate your engineering team's delivery.</strong>
</p>

<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#development-flow">Flow</a> •
  <a href="#agents">Agents</a> •
  <a href="#knowledge-base">Knowledge</a> •
  <a href="resources/">Resources</a>
</p>

<p align="center">
  <a href="https://github.com/space-metrics-ai/engineering-delivery-playbook/releases"><img src="https://img.shields.io/github/v/release/space-metrics-ai/engineering-delivery-playbook" alt="Release"></a>
  <a href="https://www.npmjs.com/package/eng-delivery-playbook"><img src="https://img.shields.io/npm/v/eng-delivery-playbook" alt="npm"></a>
  <img src="https://img.shields.io/badge/agents-10-blue" alt="Agents">
  <img src="https://img.shields.io/badge/knowledge_bases-13-green" alt="Knowledge Bases">
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

---

## Getting Started

### 1. Install the playbook

**npm (recommended):**
```bash
npx eng-delivery-playbook
```

**GitHub Packages:**
```bash
npm config set @space-metrics-ai:registry https://npm.pkg.github.com
npx @space-metrics-ai/eng-delivery-playbook
```

**curl:**
```bash
curl -fsSL https://raw.githubusercontent.com/space-metrics-ai/engineering-delivery-playbook/main/install.sh | bash
```

The installer will:
1. Copy all agents to `./agents/`
2. Ask which agent you want to use
3. Auto-configure `CLAUDE.md` and `.cursorrules`

**Switch agents later:**
```bash
cp agents/frontend.md CLAUDE.md && cp agents/frontend.md .cursorrules
```

Structure after install:

```
your-project/
└── agents/
    ├── backend.md
    ├── frontend.md
    ├── mobile.md
    ├── devops.md
    ├── backend-reviewer.md
    ├── frontend-reviewer.md
    ├── mobile-reviewer.md
    ├── devops-reviewer.md
    ├── consultant.md
    ├── ai-metrics.md
    └── knowledge/
        ├── design-patterns.md
        ├── engineering-principles.md
        ├── testing-strategies.md
        └── ... (13 knowledge bases)
```

### 2. Start building

```bash
edp speckit start "Your feature description here" be
```

This runs the full workflow automatically: specify → clarify → plan → tasks → implement.

That's it. Now follow the [Development Flow](#development-flow) below.

---

## Development Flow

<p align="center">
  <img src="context-vs-onboarding.png" alt="Engineering Delivery Playbook" width="600">
</p>

> **AI usage should scale with your business context.** If you're new to the codebase or domain (Day 0-30), use AI sparingly—focus on learning and understanding first. As your context grows (Day 60-120), AI becomes a force multiplier. Remember: AI is an assistant, not a replacement for domain knowledge. You must understand what you're building to validate AI outputs effectively.

```
SPECIFY ──▶ CLARIFY ──▶ PLAN ──▶ TASKS ──▶ IMPLEMENT ──▶ REVIEW ──▶ SHIP
```

### 1. Build (automated)

Use the automated workflow to specify, plan, and implement in one command:

```bash
edp speckit start "Add avatar upload: max 5MB, JPEG/PNG, resize 200x200, S3 storage" be
```

This automatically runs:
1. Switches to Backend Engineer
2. `/speckit.specify` - Define requirements
3. `/speckit.clarify` - Resolve ambiguities
4. `/speckit.plan` - Create technical design
5. `/speckit.tasks` - Break into tasks
6. `/speckit.implement` - Build the feature

**Agent shortcuts:** `be` (backend), `fe` (frontend), `mob` (mobile), `ops` (devops)

### 2. Review

Switch to the reviewer agent:

```bash
edp switch be-review
```

Then ask:
```
"Review my implementation for security, error handling, and test coverage"
```

**Review format:** `blocker:` | `issue:` | `suggestion:` | `nit:`

### 3. Ship

```bash
git add . && git commit -m "feat(users): add avatar upload"
gh pr create
```

---

## CLI Reference

```bash
edp                      # Install agents (interactive)
edp switch <agent>       # Switch to a different agent
edp list                 # List all available agents
edp speckit <cmd>        # SpecKit workflow automation
```

### SpecKit Commands

Automate the full spec-driven development workflow:

```bash
edp speckit start "<feature>" <agent>   # Start full workflow
edp speckit init                        # Initialize .specify directory
edp speckit status                      # Show workflow status
```

**Example - full automated flow:**
```bash
edp speckit start "user authentication with OAuth" be
```

This will:
1. Switch to Backend Engineer agent
2. Run `/speckit.specify`
3. Run `/speckit.clarify`
4. Run `/speckit.plan`
5. Run `/speckit.tasks`
6. Run `/speckit.implement`

All steps run automatically without confirmation prompts.

### Agent Commands

**Available agents:**

| Command | Agent |
|---------|-------|
| `edp switch backend` | Backend Engineer |
| `edp switch frontend` | Frontend Engineer |
| `edp switch mobile` | Mobile Engineer |
| `edp switch devops` | DevOps Engineer |
| `edp switch backend-reviewer` | Backend Reviewer |
| `edp switch frontend-reviewer` | Frontend Reviewer |
| `edp switch mobile-reviewer` | Mobile Reviewer |
| `edp switch devops-reviewer` | DevOps Reviewer |
| `edp switch consultant` | Tech Consultant |

**Aliases:** `be`, `fe`, `mob`, `ops`, `be-review`, `fe-review`, `mob-review`, `ops-review`, `consult`

---

## Quick Prompts

```bash
# Specify
/speckit.specify "Add logout: clear session, redirect to login"

# Implement
"Add DELETE /api/auth/session: invalidate JWT, return 204"

# Test
"Write tests: success, already logged out, invalid token"

# Review
"Review this diff for security: <paste>"
```

---

## Agents

### Engineers

| Agent | Technologies | Link |
|-------|--------------|------|
| **Backend** | Java, Go, Node.js, TypeScript, Kotlin, Python | [View](agents/backend.md) |
| **Frontend** | React, Vue.js, TypeScript, Next.js, Nuxt | [View](agents/frontend.md) |
| **Mobile** | Flutter, Android (Kotlin), iOS (Swift) | [View](agents/mobile.md) |
| **DevOps** | Kubernetes, Terraform, Docker, AWS/GCP/Azure | [View](agents/devops.md) |

### Reviewers

| Agent | Focus | Link |
|-------|-------|------|
| **Backend** | Security, performance, patterns | [View](agents/backend-reviewer.md) |
| **Frontend** | Accessibility, Core Web Vitals | [View](agents/frontend-reviewer.md) |
| **Mobile** | Platform guidelines, performance | [View](agents/mobile-reviewer.md) |
| **DevOps** | Security, reliability, IaC | [View](agents/devops-reviewer.md) |

### Specialists

| Agent | Purpose | Link |
|-------|---------|------|
| **Tech Consultant** | Architecture advice (no code) | [View](agents/consultant.md) |
| **AI Metrics** | Track AI usage and ROI | [View](agents/ai-metrics.md) |

---

## Knowledge Base

### Fundamentals

| Topic | Link |
|-------|------|
| Design Patterns | [View](agents/knowledge/design-patterns.md) |
| Engineering Principles | [View](agents/knowledge/engineering-principles.md) |
| System Design | [View](agents/knowledge/system-design.md) |
| Testing Strategies | [View](agents/knowledge/testing-strategies.md) |

### Platform

| Topic | Link |
|-------|------|
| Frontend Development | [View](agents/knowledge/frontend-development.md) |
| Mobile Development | [View](agents/knowledge/mobile-development.md) |
| DevOps Practices | [View](agents/knowledge/devops-practices.md) |

### Process

| Topic | Link |
|-------|------|
| Spec-Kit | [View](agents/knowledge/spec-kit.md) |
| Code Review | [View](agents/knowledge/code-review-guidelines.md) |
| PR Templates | [View](agents/knowledge/pr-templates.md) |
| Labels | [View](agents/knowledge/labels-conventions.md) |
| CI/CD Gates | [View](agents/knowledge/cicd-quality-gates.md) |
| AI Metrics | [View](agents/knowledge/ai-metrics.md) |

---

## Quality Standards

| Standard | Target |
|----------|--------|
| PR Size | < 400 lines |
| Code Coverage | >= 80% (new code) |
| Review Response | < 4 hours |
| Security Scan | No critical/high |

---

## Context Levels

| Level | Days | AI Usage |
|-------|------|----------|
| **Onboarding** | 0-30 | Learning assistant |
| **Ramping** | 30-60 | Pair programmer |
| **Contributing** | 60-90 | Accelerator |
| **Established** | 90+ | Force multiplier |

---

## Resources

> **[View All →](resources/)**

| Category | Highlights |
|----------|------------|
| Newsletters | THE CODE, Every, JP |
| Courses | Claude Code beginner to advanced |
| GitHub | claude-code-cheat-sheet, awesome-mcp-servers |

---

## Changelog

### 1.3.0
- `edp speckit start` for automated full workflow (specify → clarify → plan → tasks → implement)
- `edp speckit init` to initialize .specify directory
- `edp speckit status` to check workflow status
- New knowledge base: `edp-speckit-commands.md`
- Agent selection with shortcuts (be, fe, mob, ops)

### 1.2.0
- `edp switch <agent>` command for easy agent switching
- `edp list` to show all available agents
- Short aliases (`be`, `fe`, `mob`, `ops`, `be-review`, etc.)
- CLI Reference section in README
- Simplified development flow documentation

### 1.1.0
- Interactive installer with agent selection
- Auto-configure `CLAUDE.md` and `.cursorrules`
- GitHub Packages support
- Dynamic version badges

### 1.0.0
- Initial release
- 10 agents (Backend, Frontend, Mobile, DevOps + Reviewers + Consultant)
- 13 knowledge bases
- npm package support
- curl installer

---

## Contributing

1. Fork → 2. Branch → 3. Follow structure → 4. PR

---

## License

MIT — Use and adapt freely.

---

<p align="center">
  <strong>AI is a tool, not a replacement for understanding.</strong>
</p>
