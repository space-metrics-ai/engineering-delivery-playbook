<p align="center">
  <img src="context-vs-onboarding.png" alt="Engineering Delivery Playbook" width="600">
</p>

<h1 align="center">Engineering Delivery Playbook</h1>

<p align="center">
  <strong>AI-powered agents and knowledge bases to elevate your engineering team's delivery.</strong>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-daily-workflow">Daily Workflow</a> •
  <a href="#-agents">Agents</a> •
  <a href="#-knowledge-base">Knowledge Base</a> •
  <a href="resources/">Resources</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/agents-10-blue" alt="Agents">
  <img src="https://img.shields.io/badge/knowledge_bases-12-green" alt="Knowledge Bases">
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

---

## Why This Playbook?

**AI effectiveness scales with context.** Without guidance, AI generates code that "works" but creates tech debt. With the right context, AI becomes a force multiplier.

This playbook provides:

- **10 Specialized AI Agents** — Backend, Frontend, Mobile, DevOps engineers and reviewers, plus consultants
- **12 Knowledge Bases** — Design patterns, principles, testing strategies, and more
- **Practical Workflows** — Real examples of AI-assisted development throughout your day
- **Measurement Framework** — Track AI usage and ROI across multiple tools

---

## Highlights

```
✓ Copy-paste agent prompts for Claude, Cursor, ChatGPT, and any LLM
✓ Conventional Comments system for consistent code reviews
✓ PR templates, labels, and CI/CD quality gates ready to use
✓ Multi-tool AI metrics tracking (Copilot, Cursor, Claude, ChatGPT)
✓ Complete daily workflow guide with real examples
```

---

## Table of Contents

- [Quick Start](#-quick-start)
- [Daily Workflow](#-daily-workflow)
- [Agents](#-agents)
- [Knowledge Base](#-knowledge-base)
- [Project Structure](#-project-structure)
- [The Philosophy](#-the-philosophy)
- [Resources](#-resources)
- [Contributing](#-contributing)
- [License](#-license)

---

## Quick Start

### 1. Choose Your Agent

| I want to... | Use this agent | Quick prompt |
|--------------|----------------|--------------|
| Write backend code | [Backend Engineer](agents/backend.md) | `You are a Senior Backend Engineer. Follow agents/backend.md.` |
| Write frontend code | [Frontend Engineer](agents/frontend.md) | `You are a Senior Frontend Engineer. Follow agents/frontend.md.` |
| Write mobile code | [Mobile Engineer](agents/mobile.md) | `You are a Senior Mobile Engineer. Follow agents/mobile.md.` |
| Set up infrastructure | [DevOps Engineer](agents/devops.md) | `You are a Senior DevOps Engineer. Follow agents/devops.md.` |
| Review backend PRs | [Backend Reviewer](agents/backend-reviewer.md) | `You are a Backend Reviewer. Use Conventional Comments.` |
| Review frontend PRs | [Frontend Reviewer](agents/frontend-reviewer.md) | `You are a Frontend Reviewer. Focus on a11y and performance.` |
| Get architecture advice | [Tech Consultant](agents/consultant.md) | `You are a Tech Consultant. DO NOT write code. Advise only.` |
| Measure AI usage | [AI Metrics](agents/ai-metrics.md) | `You are an AI Metrics Specialist. Track multi-tool usage.` |

### 2. Set Up Your Tool

<details>
<summary><strong>Claude Code / Cursor</strong></summary>

Add to `.claude/settings.json` or Cursor rules:

```json
{
  "systemPrompt": "You are a Senior Backend Engineer following agents/backend.md from the engineering-delivery-playbook."
}
```

</details>

<details>
<summary><strong>ChatGPT / Custom GPT</strong></summary>

1. Copy the full content of the agent file (e.g., `agents/backend.md`)
2. Paste as "Instructions" in your Custom GPT
3. Add knowledge files from `agents/knowledge/` as needed

</details>

<details>
<summary><strong>CLI Usage</strong></summary>

```bash
# Claude Code
claude --system-prompt "$(cat agents/backend.md)"

# Any LLM CLI
cat agents/backend.md | your-llm-cli --system-prompt -
```

</details>

### 3. Follow the Daily Workflow

See the complete [Daily Workflow Guide](DAILY-WORKFLOW.md) for how to use agents throughout your day.

---

## Daily Workflow

> **[Read the Full Guide →](DAILY-WORKFLOW.md)**

A typical day using the playbook:

| Time | Phase | Agent | What You Do |
|------|-------|-------|-------------|
| 08:30 | Morning Sync | Reviewer Agents | Review assigned PRs |
| 09:00 | Planning | Tech Consultant | Discuss architecture for new features |
| 10:00 | Development | Engineer Agents | Code with AI assistance |
| 13:00 | Testing | Engineer Agents | Write tests with AI help |
| 15:00 | Code Review | Reviewer Agents | Review teammates' PRs |
| 16:30 | Wrap Up | Engineer Agents | Create PR, commit, track metrics |

### Example: Planning a Feature

```
Agent: Tech Consultant

"I need to implement real-time notifications. Our stack is Node.js + Flutter.
What architecture would you recommend? What are the trade-offs between
WebSockets, SSE, and polling for 50k DAU?"
```

### Example: Writing Code

```
Agent: Backend Engineer

"Create a WebSocket notification handler that:
1. Authenticates with JWT
2. Subscribes users to their channel
3. Handles reconnection gracefully
Use our existing patterns."
```

### Example: Reviewing Code

```
Agent: Backend Reviewer

"Review this PR for security, error handling, and test coverage.
Use Conventional Comments format (blocker, issue, suggestion, nit)."
```

---

## Agents

### Engineer Agents

Build features with senior-level expertise.

| Agent | Technologies | Link |
|-------|--------------|------|
| **Backend** | Java, Go, Node.js, TypeScript, Kotlin, Python | [View](agents/backend.md) |
| **Frontend** | React, Vue.js, TypeScript, Next.js, Nuxt | [View](agents/frontend.md) |
| **Mobile** | Flutter, Android (Kotlin), iOS (Swift) | [View](agents/mobile.md) |
| **DevOps** | Kubernetes, Terraform, Docker, AWS/GCP/Azure | [View](agents/devops.md) |

### Reviewer Agents

Enforce quality standards with Conventional Comments.

| Agent | Focus Areas | Link |
|-------|-------------|------|
| **Backend** | Security, performance, patterns, testing | [View](agents/backend-reviewer.md) |
| **Frontend** | Accessibility, Core Web Vitals, UX | [View](agents/frontend-reviewer.md) |
| **Mobile** | Platform guidelines, performance, UX | [View](agents/mobile-reviewer.md) |
| **DevOps** | Security, reliability, IaC standards | [View](agents/devops-reviewer.md) |

### Specialist Agents

| Agent | Purpose | Link |
|-------|---------|------|
| **Tech Consultant** | Architecture advice (no coding) | [View](agents/consultant.md) |
| **AI Metrics** | Track AI tool usage and ROI | [View](agents/ai-metrics.md) |

---

## Knowledge Base

Reference materials for patterns, principles, and best practices.

### Engineering Fundamentals

| Topic | What's Inside | Link |
|-------|---------------|------|
| **Design Patterns** | GoF 23 + CQRS, Event Sourcing, Saga | [View](agents/knowledge/design-patterns.md) |
| **Engineering Principles** | SOLID, KISS, DRY, Clean Architecture | [View](agents/knowledge/engineering-principles.md) |
| **System Design** | Big O, distributed systems, CAP theorem | [View](agents/knowledge/system-design.md) |
| **Testing Strategies** | Unit, integration, mutation testing | [View](agents/knowledge/testing-strategies.md) |

### Platform-Specific

| Topic | What's Inside | Link |
|-------|---------------|------|
| **Frontend** | React/Vue patterns, state management, a11y | [View](agents/knowledge/frontend-development.md) |
| **Mobile** | Flutter/Android/iOS patterns, MVVM, MVI | [View](agents/knowledge/mobile-development.md) |
| **DevOps** | CI/CD, Kubernetes, Terraform, SRE | [View](agents/knowledge/devops-practices.md) |

### Process & Quality

| Topic | What's Inside | Link |
|-------|---------------|------|
| **Code Review** | Conventional Comments, review checklists | [View](agents/knowledge/code-review-guidelines.md) |
| **PR Templates** | Standard + specialized templates | [View](agents/knowledge/pr-templates.md) |
| **Labels** | GitHub label taxonomy and automation | [View](agents/knowledge/labels-conventions.md) |
| **CI/CD Gates** | Quality gates, branch protection | [View](agents/knowledge/cicd-quality-gates.md) |
| **AI Metrics** | Multi-tool usage tracking, ROI frameworks | [View](agents/knowledge/ai-metrics.md) |

---

## Project Structure

```
eng-delivery-playbook/
│
├── README.md                      # You are here
├── DAILY-WORKFLOW.md              # Engineer's daily workflow guide
│
├── agents/                        # AI Agent Definitions
│   ├── backend.md                 # Backend Engineer
│   ├── backend-reviewer.md        # Backend Reviewer
│   ├── frontend.md                # Frontend Engineer
│   ├── frontend-reviewer.md       # Frontend Reviewer
│   ├── mobile.md                  # Mobile Engineer
│   ├── mobile-reviewer.md         # Mobile Reviewer
│   ├── devops.md                  # DevOps Engineer
│   ├── devops-reviewer.md         # DevOps Reviewer
│   ├── consultant.md              # Tech Consultant
│   ├── ai-metrics.md              # AI Metrics Agent
│   │
│   └── knowledge/                 # Knowledge Bases
│       ├── design-patterns.md
│       ├── engineering-principles.md
│       ├── system-design.md
│       ├── testing-strategies.md
│       ├── frontend-development.md
│       ├── mobile-development.md
│       ├── devops-practices.md
│       ├── code-review-guidelines.md
│       ├── pr-templates.md
│       ├── labels-conventions.md
│       ├── cicd-quality-gates.md
│       └── ai-metrics.md
│
└── resources/                     # Learning Resources
    └── README.md                  # Curated AI/Claude Code resources
```

---

## The Philosophy

### Context-Driven AI Usage

**Your AI effectiveness depends on your business context.**

| Your Context Level | Days | How to Use AI |
|-------------------|------|---------------|
| **Onboarding** | 0-30 | Learning assistant — explore, ask questions |
| **Ramping** | 30-60 | Pair programmer — implement with supervision |
| **Contributing** | 60-90 | Accelerator — complex tasks, light review |
| **Established** | 90+ | Force multiplier — full leverage |

### The Context Maturity Matrix

Rate yourself on each dimension:

| Dimension | Low | Medium | High |
|-----------|-----|--------|------|
| **Codebase** | Can navigate | Understands patterns | Knows history |
| **Domain** | Basic terms | Business rules | Edge cases |
| **Architecture** | Component names | Data flow | Trade-offs |
| **Team** | Names/roles | Responsibilities | Communication |
| **Process** | Basic workflow | Quality gates | Why they exist |

**Score**: 4-5 High = Full AI leverage | 2-3 High = Supervised | 0-1 High = Learning mode

### Key Standards

| Standard | Threshold |
|----------|-----------|
| PR Size | < 400 lines |
| Code Coverage | >= 80% (new code) |
| Review Response | < 4 hours |
| Security Scan | No critical/high vulnerabilities |
| Accessibility | WCAG AA compliance |

---

## Resources

> **[View All Resources →](resources/)**

### Quick Links

| Category | Highlights |
|----------|------------|
| **Newsletters** | THE CODE, Every, JP, Joe Njenga |
| **Courses** | Claude Code beginner to advanced |
| **GitHub Repos** | claude-code-cheat-sheet, awesome-mcp-servers |
| **YouTube** | Setup guides, workflows, multi-agent dev |
| **Creators** | Ray Amjad, Joe Njenga, Daniel Avila |

---

## Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-addition`)
3. **Follow** the existing structure and formatting
4. **Include** code examples in multiple languages where applicable
5. **Update** relevant README files
6. **Submit** a Pull Request

### Guidelines

- Keep content practical and actionable
- Use tables for comparisons
- Include real-world examples
- Reference related knowledge bases

---

## License

MIT License — Use and adapt freely.

---

<p align="center">
  <strong>AI is a tool, not a replacement for understanding.</strong><br>
  The best results come from humans with context guiding AI with capabilities.
</p>

<p align="center">
  <a href="#-quick-start">Back to top</a>
</p>
