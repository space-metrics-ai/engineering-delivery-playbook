# AI Agents

This folder contains AI agent definitions that establish personas, expertise, and behavioral guidelines for AI-assisted development across different specializations.

---

## Available Agents

### Backend

| Agent | Role | Technologies | Link |
|-------|------|--------------|------|
| **Backend Engineer** | Senior Engineer | Java, Go, Node.js, TypeScript, Kotlin, Python | [View](backend.md) |
| **Backend Reviewer** | Code Reviewer | PR standards, CI/CD, Conventional Comments | [View](backend-reviewer.md) |

**Backend Engineer** - Expert in:
- Languages: Java, Go, Node.js, TypeScript, Kotlin, Python
- Patterns: GoF 23, CQRS, Event Sourcing, Saga
- Principles: SOLID, KISS, DRY, Clean Architecture
- Testing: Unit, Integration, Mutation, Contract

**Backend Reviewer** - Enforces:
- Conventional Comments (blocker, issue, suggestion, nit)
- PR size limits (< 400 lines)
- CI/CD quality gates
- Security and performance standards

---

### Frontend

| Agent | Role | Technologies | Link |
|-------|------|--------------|------|
| **Frontend Engineer** | Senior Engineer | React, Vue.js, TypeScript, Next.js, Nuxt | [View](frontend.md) |
| **Frontend Reviewer** | Code Reviewer | A11y, Performance, UX, Core Web Vitals | [View](frontend-reviewer.md) |

**Frontend Engineer** - Expert in:
- Frameworks: React, Vue.js, Next.js, Nuxt
- State: Zustand, Pinia, TanStack Query, Redux Toolkit
- Styling: Tailwind CSS, CSS Modules, styled-components
- Testing: Jest, Vitest, Playwright, Testing Library

**Frontend Reviewer** - Enforces:
- Accessibility (WCAG AA compliance)
- Core Web Vitals (LCP, INP, CLS)
- TypeScript strict mode
- Security (XSS prevention)

---

### Mobile

| Agent | Role | Technologies | Link |
|-------|------|--------------|------|
| **Mobile Engineer** | Senior Engineer | Flutter, Android (Kotlin), iOS (Swift) | [View](mobile.md) |
| **Mobile Reviewer** | Code Reviewer | Performance, UX, Platform guidelines | [View](mobile-reviewer.md) |

**Mobile Engineer** - Expert in:
- Cross-platform: Flutter/Dart, Riverpod, Bloc
- Android: Kotlin, Jetpack Compose, Coroutines, Hilt
- iOS: Swift, SwiftUI, Combine, async/await
- Patterns: MVVM, MVI, Clean Architecture

**Mobile Reviewer** - Enforces:
- Platform guidelines (Material 3, HIG)
- Performance (60fps, no ANR, memory leaks)
- Accessibility (touch targets, screen readers)
- Testing (device coverage, golden tests)

---

### DevOps

| Agent | Role | Technologies | Link |
|-------|------|--------------|------|
| **DevOps Engineer** | Senior Engineer | Kubernetes, Terraform, Docker, CI/CD | [View](devops.md) |
| **DevOps Reviewer** | Code Reviewer | Security, Reliability, IaC standards | [View](devops-reviewer.md) |

**DevOps Engineer** - Expert in:
- Cloud: AWS, GCP, Azure, multi-cloud strategies
- Containers: Kubernetes, Docker, Helm, Service Mesh
- IaC: Terraform, Pulumi, CloudFormation, Ansible
- CI/CD: GitHub Actions, GitLab CI, ArgoCD, Tekton

**DevOps Reviewer** - Enforces:
- Security (secrets management, least privilege)
- Reliability (resource limits, probes, PDBs)
- IaC best practices (modules, state management)
- Pipeline quality gates

---

### Consultants

| Agent | Role | Focus | Link |
|-------|------|-------|------|
| **Tech Consultant** | Advisor | All technologies, strategic decisions | [View](consultant.md) |

**Tech Consultant** - Provides:
- Strategic guidance without writing code
- Probing questions and assumption challenging
- Trade-off analysis and decision frameworks
- Industry best practices across all domains
- Risk assessment and mitigation strategies

> **Note**: Consultant agents are advisors only. They help teams think through problems and make informed decisions but do not implement solutions.

---

### Analytics

| Agent | Role | Focus | Link |
|-------|------|-------|------|
| **AI Metrics** | Analytics Specialist | AI usage measurement, productivity tracking | [View](ai-metrics.md) |

**AI Metrics Agent** - Provides:
- Multi-tool AI usage tracking (Copilot, Cursor, Claude, ChatGPT, etc.)
- Utilization, impact, and ROI measurement frameworks
- Developer productivity analytics
- Adoption trend analysis and benchmarking
- Data-driven recommendations for AI tool investment

> **Note**: This agent helps organizations measure and optimize their AI tool investments across engineering teams.

---

## Knowledge Base

The `knowledge/` subfolder contains detailed reference materials:

### Backend Knowledge
| File | Description |
|------|-------------|
| [design-patterns.md](knowledge/design-patterns.md) | GoF 23 patterns + modern patterns |
| [engineering-principles.md](knowledge/engineering-principles.md) | SOLID, KISS, DRY, GRASP |
| [system-design.md](knowledge/system-design.md) | Big O, architecture, distributed systems |
| [testing-strategies.md](knowledge/testing-strategies.md) | Unit, mutation, integration testing |

### Frontend Knowledge
| File | Description |
|------|-------------|
| [frontend-development.md](knowledge/frontend-development.md) | React/Vue patterns, state, performance |

### Mobile Knowledge
| File | Description |
|------|-------------|
| [mobile-development.md](knowledge/mobile-development.md) | Flutter/Android/iOS patterns |

### DevOps Knowledge
| File | Description |
|------|-------------|
| [devops-practices.md](knowledge/devops-practices.md) | CI/CD, Kubernetes, Terraform, observability |

### Review & Quality
| File | Description |
|------|-------------|
| [code-review-guidelines.md](knowledge/code-review-guidelines.md) | Conventional Comments, review process |
| [pr-templates.md](knowledge/pr-templates.md) | PR templates for various change types |
| [labels-conventions.md](knowledge/labels-conventions.md) | GitHub labels taxonomy |
| [cicd-quality-gates.md](knowledge/cicd-quality-gates.md) | Pipeline checks, branch protection |

### AI & Productivity
| File | Description |
|------|-------------|
| [ai-metrics.md](knowledge/ai-metrics.md) | AI usage measurement, multi-tool tracking, ROI frameworks |

**[View Full Knowledge Base Index →](knowledge/index.md)**

---

## How to Use

### For AI Systems
```
You are a Senior [Backend/Frontend/Mobile] Engineer.
Follow the guidelines in agents/[role].md.
Reference the knowledge base for specific patterns.
```

### For Development Teams
1. Use agent definitions to configure AI assistants
2. Reference knowledge base during code reviews
3. Adapt templates to your project needs
4. Customize quality gates for your pipeline

### For Individual Engineers
- Study the knowledge base to level up skills
- Use checklists during self-review
- Reference patterns when designing solutions

---

## Agent Summary

| Specialization | Engineer | Reviewer |
|----------------|----------|----------|
| **Backend** | [backend.md](backend.md) | [backend-reviewer.md](backend-reviewer.md) |
| **Frontend** | [frontend.md](frontend.md) | [frontend-reviewer.md](frontend-reviewer.md) |
| **Mobile** | [mobile.md](mobile.md) | [mobile-reviewer.md](mobile-reviewer.md) |
| **DevOps** | [devops.md](devops.md) | [devops-reviewer.md](devops-reviewer.md) |

| Consultant | Focus | Link |
|------------|-------|------|
| **Tech Consultant** | All technologies | [consultant.md](consultant.md) |

| Analytics | Focus | Link |
|-----------|-------|------|
| **AI Metrics** | AI usage & productivity | [ai-metrics.md](ai-metrics.md) |

---

## Adding New Agents

To add a new agent:

1. Create `<agent-name>.md` in this folder
2. Define: Identity, Expertise, Behavioral Guidelines
3. Create corresponding knowledge base file if needed
4. Update this README with the new agent
5. Update the main project README

---

*Agents provide consistent, high-quality AI assistance across engineering teams.*
