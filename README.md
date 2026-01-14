<p align="center">
  <img src="logo.png" alt="Engineering Delivery Playbook Logo" width="640">
</p>

<h1 align="center">Engineering Delivery Playbook</h1>

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
  <img src="https://img.shields.io/badge/agents-10-blue" alt="Agents">
  <img src="https://img.shields.io/badge/knowledge_bases-13-green" alt="Knowledge Bases">
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

---

## Getting Started

### 1. Install the playbook

```bash
curl -fsSL https://raw.githubusercontent.com/space-metrics-ai/engineering-delivery-playbook/main/install.sh | bash
```

This downloads and copies the `agents/` folder to your project:

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

### 2. Install spec-kit

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init . --here --ai claude
```

### 3. Configure your AI tool

**Claude Code / Cursor:**
```json
{
  "systemPrompt": "You are a Senior Backend Engineer following agents/backend.md"
}
```

**ChatGPT:** Copy agent file → Paste as Instructions

**CLI:**
```bash
claude --system-prompt "$(cat agents/backend.md)"
```

### 4. Start building

```bash
/speckit.specify "Your feature description here"
/speckit.implement
```

That's it. Now follow the [Development Flow](#development-flow) below.

---

## Development Flow

<p align="center">
  <img src="context-vs-onboarding.png" alt="Engineering Delivery Playbook" width="600">
</p>

```
SPECIFY ──▶ PLAN ──▶ IMPLEMENT ──▶ TEST ──▶ REVIEW ──▶ SHIP
```

### 1. Specify

Use [spec-kit](https://github.com/github/spec-kit) to define what you're building.

```bash
# First time setup
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init . --here --ai claude
```

**Fast path:**
```
/speckit.specify "Add avatar upload: max 5MB, JPEG/PNG, resize 200x200, S3 storage"
/speckit.implement
```

**Full path (complex features):**
```
/speckit.specify    → Define requirements
/speckit.plan       → Technical design
/speckit.tasks      → Break into tasks
/speckit.implement  → Build it
```

### 2. Plan

For architecture decisions, consult before coding.

```
Agent: Tech Consultant

"Real-time notifications for 50k DAU. Node.js + Flutter.
WebSockets vs SSE vs Polling - which and why?"
```

### 3. Implement

```
Agent: Backend Engineer

"Create POST /api/users/:id/avatar:
- multipart/form-data, max 5MB
- Validate JPEG/PNG/WebP
- Resize 200x200 with Sharp
- Upload to S3, return CDN URL"
```

### 4. Test

```
Agent: Backend Engineer

"Write tests for avatar upload:
- Valid JPEG succeeds
- >5MB rejected
- Non-image rejected
- S3 failure handled
Use Jest, mock S3"
```

### 5. Review

```
Agent: Backend Reviewer

"Review my avatar implementation for:
- Security vulnerabilities
- Error handling
- Test coverage
Use Conventional Comments"
```

**Format:** `blocker:` | `issue:` | `suggestion:` | `nit:`

### 6. Ship

```bash
git add . && git commit -m "feat(users): add avatar upload"
gh pr create
```

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

## Contributing

1. Fork → 2. Branch → 3. Follow structure → 4. PR

---

## License

MIT — Use and adapt freely.

---

<p align="center">
  <strong>AI is a tool, not a replacement for understanding.</strong>
</p>
