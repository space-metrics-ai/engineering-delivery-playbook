# Engineering Agents Knowledge Base Index

This directory contains modular knowledge bases that support the Engineering Agents. Each file focuses on a specific domain for easier maintenance and evolution.

---

## Structure

```
agents/
│   # Agent Definitions
├── backend.md                      # Backend Engineer
├── backend-reviewer.md             # Backend Reviewer
├── frontend.md                     # Frontend Engineer
├── frontend-reviewer.md            # Frontend Reviewer
├── mobile.md                       # Mobile Engineer
├── mobile-reviewer.md              # Mobile Reviewer
├── devops.md                       # DevOps Engineer
├── devops-reviewer.md              # DevOps Reviewer
├── consultant.md                   # Tech Consultant (advisory)
├── ai-metrics.md                   # AI Metrics Agent (analytics)
│
└── knowledge/
    ├── index.md                    # This file
    │
    │   # Backend
    ├── design-patterns.md          # GoF 23 + Modern patterns
    ├── engineering-principles.md   # SOLID, KISS, DRY, GRASP
    ├── system-design.md            # Architecture & Big O
    ├── testing-strategies.md       # Unit, Mutation, Integration
    │
    │   # Frontend
    ├── frontend-development.md     # React/Vue patterns
    │
    │   # Mobile
    ├── mobile-development.md       # Flutter/Android/iOS patterns
    │
    │   # DevOps
    ├── devops-practices.md         # CI/CD, K8s, Terraform, SRE
    │
    │   # Code Review & Quality
    ├── code-review-guidelines.md   # Review process & feedback
    ├── pr-templates.md             # PR template standards
    ├── labels-conventions.md       # GitHub labels & naming
    ├── cicd-quality-gates.md       # CI/CD pipeline checks
    │
    │   # AI & Productivity
    └── ai-metrics.md               # AI usage measurement & ROI
```

---

## Backend Knowledge

| File | Description |
|------|-------------|
| [design-patterns.md](design-patterns.md) | All 23 GoF patterns + Repository, CQRS, Event Sourcing, Saga |
| [engineering-principles.md](engineering-principles.md) | SOLID with examples, KISS, DRY, YAGNI, GRASP, Clean Architecture |
| [system-design.md](system-design.md) | Big O reference, architectural patterns, distributed systems, CAP |
| [testing-strategies.md](testing-strategies.md) | Unit, mutation, integration testing with frameworks per language |

---

## Frontend Knowledge

| File | Description |
|------|-------------|
| [frontend-development.md](frontend-development.md) | React/Vue component patterns, state management, performance, a11y, testing |

**Covers:**
- Component patterns (Compound, Render Props, HOC)
- State management (Zustand, Pinia, TanStack Query)
- Performance optimization (memo, lazy loading, code splitting)
- Accessibility patterns (focus management, ARIA)
- Testing (React Testing Library, Vue Test Utils, Playwright)

---

## Mobile Knowledge

| File | Description |
|------|-------------|
| [mobile-development.md](mobile-development.md) | Flutter/Android/iOS architecture, patterns, performance, testing |

**Covers:**
- Architecture patterns (MVVM, MVI, Clean Architecture)
- Platform-specific patterns (Compose, SwiftUI, Flutter widgets)
- State management comparison by platform
- Performance optimization
- Testing strategies per platform

---

## DevOps Knowledge

| File | Description |
|------|-------------|
| [devops-practices.md](devops-practices.md) | CI/CD, Kubernetes, Terraform, observability, SRE practices |

**Covers:**
- DevOps principles (CALMS, Three Ways)
- CI/CD patterns (Blue-Green, Canary, GitOps)
- Infrastructure as Code (Terraform, Pulumi)
- Container orchestration (Kubernetes, Docker)
- Observability (Golden Signals, RED/USE methods)
- Security practices (secrets, container security)
- Reliability engineering (SLO/SLI, incident response)
- Cost optimization (FinOps)

---

## Code Review & Quality

| File | Description |
|------|-------------|
| [code-review-guidelines.md](code-review-guidelines.md) | Conventional Comments, review checklist, feedback techniques |
| [pr-templates.md](pr-templates.md) | Standard + specialized templates (bug, feature, refactor, hotfix) |
| [labels-conventions.md](labels-conventions.md) | Label taxonomy with colors, automation setup |
| [cicd-quality-gates.md](cicd-quality-gates.md) | Pipeline checks, branch protection, SonarQube integration |

---

## AI & Productivity

| File | Description |
|------|-------------|
| [ai-metrics.md](ai-metrics.md) | Multi-tool AI usage measurement, productivity tracking, ROI frameworks |

**Covers:**
- AI tools landscape (Copilot, Cursor, Claude, ChatGPT, etc.)
- Three pillars framework: Utilization, Impact, Cost
- Data collection methods (telemetry, git tags, surveys)
- KPIs and benchmarks for AI adoption
- Reporting templates and dashboards
- Maturity model for AI-native development

---

## Usage Guide

### For Backend Development
1. Reference `backend.md` for identity and behavior
2. Use `design-patterns.md` for pattern implementation
3. Use `engineering-principles.md` for best practices
4. Use `testing-strategies.md` for test implementation

### For Frontend Development
1. Reference `frontend.md` for identity and behavior
2. Use `frontend-development.md` for patterns and practices
3. Use `testing-strategies.md` for general testing concepts

### For Mobile Development
1. Reference `mobile.md` for identity and behavior
2. Use `mobile-development.md` for platform-specific patterns
3. Use `testing-strategies.md` for general testing concepts

### For DevOps Development
1. Reference `devops.md` for identity and behavior
2. Use `devops-practices.md` for infrastructure patterns
3. Use `cicd-quality-gates.md` for pipeline requirements

### For Technical Consulting
1. Reference `consultant.md` for advisory approach
2. Use all knowledge bases for cross-domain expertise
3. Apply Socratic method and decision frameworks

### For AI Metrics & Analytics
1. Reference `ai-metrics.md` for agent identity and behavior
2. Use `ai-metrics.md` knowledge for measurement frameworks
3. Apply three pillars model (Utilization, Impact, Cost)
4. Design data collection pipelines
5. Create dashboards and reporting

### For Code Reviews
1. Reference `*-reviewer.md` files for review standards
2. Use `code-review-guidelines.md` for comment conventions
3. Use `pr-templates.md` for PR structure
4. Use `cicd-quality-gates.md` for pipeline requirements

---

## Maintenance Guidelines

### Adding New Knowledge
1. Identify the appropriate category
2. Add content following existing format
3. Include code examples where applicable
4. Update this index

### Code Examples
Prefer examples in:
- **Backend**: Java, Go, TypeScript, Python, Kotlin
- **Frontend**: TypeScript (React), TypeScript (Vue)
- **Mobile**: Dart (Flutter), Kotlin (Android), Swift (iOS)

---

*Knowledge bases are designed for easy reference and continuous evolution.*
