# Engineering Profiles Knowledge Base Index

This directory contains modular knowledge bases that support the Engineering Profiles. Each file focuses on a specific domain for easier maintenance and evolution.

---

## Structure

```
profiles/
│   # Profile Definitions
├── java.md, kotlin.md, go.md, python.md, rust.md, node.md
├── react.md, vue.md
├── android.md, ios.md, flutter.md
├── devops.md, reviewer.md, consultant.md
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
    │   # Process
    ├── openspec.md                 # Spec-driven development
    └── claude-md-best-practices.md # CLAUDE.md optimization
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

---

## Mobile Knowledge

| File | Description |
|------|-------------|
| [mobile-development.md](mobile-development.md) | Flutter/Android/iOS architecture, patterns, performance, testing |

---

## DevOps Knowledge

| File | Description |
|------|-------------|
| [devops-practices.md](devops-practices.md) | CI/CD, Kubernetes, Terraform, observability, SRE practices |

---

## Code Review & Quality

| File | Description |
|------|-------------|
| [code-review-guidelines.md](code-review-guidelines.md) | Conventional Comments, review checklist, feedback techniques |
| [pr-templates.md](pr-templates.md) | Standard + specialized templates (bug, feature, refactor, hotfix) |
| [labels-conventions.md](labels-conventions.md) | Label taxonomy with colors, automation setup |
| [cicd-quality-gates.md](cicd-quality-gates.md) | Pipeline checks, branch protection, SonarQube integration |

---

## Usage Guide

### For Backend Development
1. Reference the relevant profile (e.g., `java.md`) for identity and behavior
2. Use `design-patterns.md` for pattern implementation
3. Use `engineering-principles.md` for best practices
4. Use `testing-strategies.md` for test implementation

### For Frontend Development
1. Reference `react.md` or `vue.md` for identity and behavior
2. Use `frontend-development.md` for patterns and practices

### For Mobile Development
1. Reference `android.md`, `ios.md`, or `flutter.md` for identity and behavior
2. Use `mobile-development.md` for platform-specific patterns

### For Code Reviews
1. Reference `reviewer.md` for review standards
2. Use `code-review-guidelines.md` for comment conventions
3. Use `pr-templates.md` for PR structure

---

*Knowledge bases are designed for easy reference and continuous evolution.*
