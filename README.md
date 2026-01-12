# Engineering Delivery Playbook

A comprehensive collection of AI-powered engineering agents and knowledge bases designed to standardize and elevate software engineering practices across teams.

---

## Summary

> **Quick access to all playbook content with descriptions.**

### Agents

| Agent | Description | Link |
|-------|-------------|------|
| **Backend Engineer** | Senior engineer expert in Java, Go, Node.js, TypeScript, Kotlin, Python. Covers design patterns (GoF 23), SOLID principles, Clean Architecture, system design, and testing strategies. | [View](agents/backend.md) |
| **Backend Reviewer** | Code review specialist enforcing PR standards, Conventional Comments (blocker, issue, suggestion, nit), CI/CD quality gates, security and performance checks. | [View](agents/backend-reviewer.md) |
| **Frontend Engineer** | Senior engineer expert in React, Vue.js, TypeScript, Next.js, Nuxt. Covers state management, component patterns, accessibility (WCAG), Core Web Vitals, and modern tooling. | [View](agents/frontend.md) |
| **Frontend Reviewer** | Code review specialist enforcing accessibility standards, Core Web Vitals (LCP, INP, CLS), TypeScript strict mode, XSS prevention, and UX best practices. | [View](agents/frontend-reviewer.md) |
| **Mobile Engineer** | Senior engineer expert in Flutter/Dart, Android (Kotlin/Compose), iOS (Swift/SwiftUI). Covers MVVM, MVI, Clean Architecture, and platform-specific patterns. | [View](agents/mobile.md) |
| **Mobile Reviewer** | Code review specialist enforcing platform guidelines (Material 3, HIG), performance (60fps, no ANR), memory management, and mobile accessibility. | [View](agents/mobile-reviewer.md) |
| **DevOps Engineer** | Senior engineer expert in Kubernetes, Docker, Terraform, AWS/GCP/Azure. Covers GitOps, CI/CD pipelines, observability, and infrastructure automation. | [View](agents/devops.md) |
| **DevOps Reviewer** | Infrastructure review specialist enforcing security, reliability, IaC best practices, secrets management, and pipeline quality gates. | [View](agents/devops-reviewer.md) |
| **Tech Consultant** | Advisory agent (no coding). Provides strategic guidance, asks probing questions, challenges assumptions, presents trade-offs, and helps teams make informed technical decisions. | [View](agents/consultant.md) |
| **AI Metrics** | Analytics specialist for measuring AI tool usage across multiple assistants (Copilot, Cursor, Claude, ChatGPT). Tracks utilization, productivity impact, and ROI. | [View](agents/ai-metrics.md) |

### Knowledge Base

| Topic | Description | Link |
|-------|-------------|------|
| **Design Patterns** | All 23 Gang of Four patterns with code examples. Modern patterns: Repository, CQRS, Event Sourcing, Saga, Circuit Breaker. | [View](agents/knowledge/design-patterns.md) |
| **Engineering Principles** | SOLID principles with detailed examples. KISS, DRY, YAGNI, WET, GRASP. Law of Demeter, Composition over Inheritance, Clean Architecture. | [View](agents/knowledge/engineering-principles.md) |
| **System Design** | Big O notation reference tables. Architectural patterns (Monolith, Microservices, Event-Driven, Serverless). Distributed systems, CAP theorem, database selection. | [View](agents/knowledge/system-design.md) |
| **Testing Strategies** | Testing pyramid and philosophy. Unit, mutation, integration testing. Frameworks by language (JUnit, pytest, Jest, Vitest). Test Containers, Pact, k6. | [View](agents/knowledge/testing-strategies.md) |
| **Frontend Development** | React/Vue component patterns (Compound, Render Props, Hooks). State management (Zustand, Pinia, TanStack Query). Performance, accessibility, security patterns. | [View](agents/knowledge/frontend-development.md) |
| **Mobile Development** | Flutter/Android/iOS architecture patterns. MVVM, MVI, Clean Architecture by platform. State management, performance optimization, platform-specific testing. | [View](agents/knowledge/mobile-development.md) |
| **DevOps Practices** | CI/CD patterns, deployment strategies (Blue-Green, Canary). Kubernetes, Terraform, Docker best practices. Observability, SRE, security, and cost optimization. | [View](agents/knowledge/devops-practices.md) |
| **Code Review Guidelines** | Conventional Comments system with prefixes. Review checklists for correctness, security, performance. Feedback techniques and response templates. | [View](agents/knowledge/code-review-guidelines.md) |
| **PR Templates** | Standard PR template with all sections. Specialized templates: Bug Fix, Feature, Refactor, Database Migration, Hotfix, Dependency Update. | [View](agents/knowledge/pr-templates.md) |
| **Labels Conventions** | Complete GitHub label taxonomy. Categories: Type, Priority, Size, Status, Review. Color codes and automation setup with GitHub Actions. | [View](agents/knowledge/labels-conventions.md) |
| **CI/CD Quality Gates** | Pipeline quality gates: build, test, security, coverage. SonarQube integration. Branch protection rules. Complete GitHub Actions examples. | [View](agents/knowledge/cicd-quality-gates.md) |
| **AI Metrics** | Multi-tool AI usage measurement framework. Tracks Copilot, Cursor, Claude, ChatGPT usage. Utilization, impact, and ROI metrics. Dashboards and surveys. | [View](agents/knowledge/ai-metrics.md) |

### Resources

| Category | Description | Link |
|----------|-------------|------|
| **Newsletters** | AI engineering newsletters: THE CODE, Every, JP, Joe Njenga. Featured articles on Claude Code and AI-assisted development. | [View](resources/#newsletters) |
| **Courses** | Structured learning paths for Claude Code. Beginner to advanced courses on agentic coding and AI-assisted software engineering. | [View](resources/#long-courses) |
| **GitHub Repos** | Curated repositories: claude-code-cheat-sheet, claude-code-template, awesome-claude-skills, awesome-mcp-servers, claude-code-workflows. | [View](resources/#github-repositories) |
| **YouTube Tutorials** | Video guides: Setup and installation, workflows for 2025, Claude Code skills, multi-agent development, practical projects. | [View](resources/#youtube-tutorials) |
| **Creators to Follow** | Industry experts sharing AI development insights on LinkedIn (Ray Amjad, Joe Njenga, Daniel Avila) and X (Thariq, Boris Cherny). | [View](resources/#creators-to-follow) |

---

## The Philosophy: Context-Driven AI Usage

<p align="center">
  <img src="context-vs-onboarding.png" alt="Context vs Onboarding - AI Usage Model" width="600">
</p>

**AI effectiveness scales with business context.** The more you understand the "why" behind the code, the better you can leverage AI for the "how".

| Stage | Days | Context | AI Role |
|-------|------|---------|---------|
| **Onboarding** | 0-30 | Low | Learning assistant - explore, ask questions |
| **Ramping** | 30-60 | Medium | Pair programmer - implement with supervision |
| **Contributing** | 60-90 | High | Accelerator - complex tasks, light review |
| **Established** | 90+ | Expert | Force multiplier - full leverage |

```
Without Context: AI generates → Code that "works" → Tech debt
With Context:    Human guides → AI generates → Value delivered
```

---

## Project Structure

```
eng-delivery-playbook/
├── README.md                    # You are here
├── DAILY-WORKFLOW.md            # Engineer's daily workflow guide
├── context-vs-onboarding.png    # AI usage philosophy
│
├── agents/                      # AI Agent Definitions
│   ├── README.md                # Agents overview
│   │
│   │   # Backend
│   ├── backend.md               # Backend Engineer
│   ├── backend-reviewer.md      # Backend Reviewer
│   │
│   │   # Frontend
│   ├── frontend.md              # Frontend Engineer
│   ├── frontend-reviewer.md     # Frontend Reviewer
│   │
│   │   # Mobile
│   ├── mobile.md                # Mobile Engineer
│   ├── mobile-reviewer.md       # Mobile Reviewer
│   │
│   │   # DevOps
│   ├── devops.md                # DevOps Engineer
│   ├── devops-reviewer.md       # DevOps Reviewer
│   │
│   │   # Consultants
│   ├── consultant.md            # Tech Consultant (advisory only)
│   │
│   │   # Analytics
│   ├── ai-metrics.md            # AI Metrics Agent
│
│   └── knowledge/               # Reference Materials
│       ├── index.md
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
│       └── ai-metrics.md            # AI usage measurement
│
└── resources/                   # Learning Resources
    └── README.md                # Curated AI/Claude Code resources
```

---

## Key Standards

| Standard | Threshold |
|----------|-----------|
| PR Size | < 400 lines |
| Code Coverage | >= 80% (new code) |
| Review Response | < 4 hours |
| Security Scan | No critical/high vulnerabilities |
| Accessibility | WCAG AA compliance |
| Performance | Core Web Vitals green |

---

## Context Maturity Matrix

Assess your AI readiness:

| Dimension | Low | Medium | High |
|-----------|-----|--------|------|
| **Codebase** | Can navigate | Understands patterns | Knows history |
| **Domain** | Basic terms | Business rules | Edge cases |
| **Architecture** | Component names | Data flow | Trade-offs |
| **Team** | Names/roles | Responsibilities | Communication |
| **Process** | Basic workflow | Quality gates | Why they exist |

**Score**: 4-5 High = Full AI leverage | 2-3 High = Supervised AI | 0-1 High = AI for learning

---

## Getting Started

### Quick Start by Agent

| Agent | Quick Setup | Full Guide |
|-------|-------------|------------|
| **Backend Engineer** | `You are a Senior Backend Engineer. Follow agents/backend.md.` | [View](agents/backend.md#getting-started) |
| **Backend Reviewer** | `You are a Senior Backend Reviewer. Follow agents/backend-reviewer.md.` | [View](agents/backend-reviewer.md#getting-started) |
| **Frontend Engineer** | `You are a Senior Frontend Engineer. Follow agents/frontend.md.` | [View](agents/frontend.md#getting-started) |
| **Frontend Reviewer** | `You are a Senior Frontend Reviewer. Follow agents/frontend-reviewer.md.` | [View](agents/frontend-reviewer.md#getting-started) |
| **Mobile Engineer** | `You are a Senior Mobile Engineer. Follow agents/mobile.md.` | [View](agents/mobile.md#getting-started) |
| **Mobile Reviewer** | `You are a Senior Mobile Reviewer. Follow agents/mobile-reviewer.md.` | [View](agents/mobile-reviewer.md#getting-started) |
| **DevOps Engineer** | `You are a Senior DevOps Engineer. Follow agents/devops.md.` | [View](agents/devops.md#getting-started) |
| **DevOps Reviewer** | `You are a Senior DevOps Reviewer. Follow agents/devops-reviewer.md.` | [View](agents/devops-reviewer.md#getting-started) |
| **Tech Consultant** | `You are a Tech Consultant. Follow agents/consultant.md. DO NOT write code.` | [View](agents/consultant.md#getting-started) |
| **AI Metrics** | `You are an AI Metrics Specialist. Follow agents/ai-metrics.md.` | [View](agents/ai-metrics.md#getting-started) |

### Claude Code / Cursor Setup

Add to `.claude/settings.json` or Cursor rules:

```json
{
  "systemPrompt": "You are a Senior [Backend/Frontend/Mobile/DevOps] Engineer following the guidelines in agents/[specialty].md from the engineering-delivery-playbook."
}
```

### For Teams
1. Clone this repository
2. Copy [PR templates](agents/knowledge/pr-templates.md) to `.github/`
3. Configure [labels](agents/knowledge/labels-conventions.md)
4. Set up [CI/CD gates](agents/knowledge/cicd-quality-gates.md)

### For Engineers
1. **Follow the [Daily Workflow Guide](DAILY-WORKFLOW.md)** - See how to use all tools throughout your day
2. Review the [context model](#the-philosophy-context-driven-ai-usage)
3. Study the [knowledge base](agents/knowledge/)
4. Check the [resources](resources/) to level up

---

## Contributing

1. Follow existing structure and formatting
2. Include code examples in multiple languages
3. Update relevant README files
4. Keep content practical and actionable

## License

MIT License - Use and adapt freely.

---

*AI is a tool, not a replacement for understanding. The best results come from humans with context guiding AI with capabilities.*
