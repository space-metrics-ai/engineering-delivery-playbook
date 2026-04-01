# AI Profiles

Curated context configurations that establish personas, expertise, and behavioral guidelines for AI-assisted development across different technology stacks.

---

## Available Profiles

### Backend

| Profile | Role | Technologies | Link |
|---------|------|--------------|------|
| **Java** | Senior Engineer | Spring Boot, JPA, Maven/Gradle | [View](java.md) |
| **Kotlin** | Senior Engineer | Ktor, Spring, Coroutines | [View](kotlin.md) |
| **Go** | Senior Engineer | stdlib, Gin/Chi, GORM/sqlx | [View](go.md) |
| **Python** | Senior Engineer | FastAPI, Django, SQLAlchemy | [View](python.md) |
| **Rust** | Senior Engineer | Actix/Axum, Tokio, SQLx | [View](rust.md) |
| **Node.js** | Senior Engineer | Express, Fastify, NestJS, TypeScript | [View](node.md) |

### Frontend

| Profile | Role | Technologies | Link |
|---------|------|--------------|------|
| **React** | Senior Engineer | React 19, Next.js 15, TanStack Query | [View](react.md) |
| **Vue** | Senior Engineer | Vue 3, Nuxt 3, Pinia | [View](vue.md) |

### Mobile

| Profile | Role | Technologies | Link |
|---------|------|--------------|------|
| **Android** | Senior Engineer | Kotlin, Jetpack Compose, Hilt | [View](android.md) |
| **iOS** | Senior Engineer | Swift, SwiftUI, Combine | [View](ios.md) |
| **Flutter** | Senior Engineer | Dart, Riverpod/Bloc, go_router | [View](flutter.md) |

### Infrastructure & Review

| Profile | Role | Link |
|---------|------|------|
| **DevOps** | Senior Engineer — K8s, Terraform, Docker, CI/CD | [View](devops.md) |
| **Reviewer** | Tech-agnostic code reviewer | [View](reviewer.md) |
| **Consultant** | Architecture advisor (no code) | [View](consultant.md) |

---

## Knowledge Base

The `knowledge/` subfolder contains reference materials:

| File | Description |
|------|-------------|
| [design-patterns.md](knowledge/design-patterns.md) | GoF 23 patterns + modern patterns |
| [engineering-principles.md](knowledge/engineering-principles.md) | SOLID, KISS, DRY, GRASP |
| [system-design.md](knowledge/system-design.md) | Big O, architecture, distributed systems |
| [testing-strategies.md](knowledge/testing-strategies.md) | Unit, mutation, integration testing |
| [frontend-development.md](knowledge/frontend-development.md) | React/Vue patterns, state, performance |
| [mobile-development.md](knowledge/mobile-development.md) | Flutter/Android/iOS patterns |
| [devops-practices.md](knowledge/devops-practices.md) | CI/CD, Kubernetes, Terraform, observability |
| [code-review-guidelines.md](knowledge/code-review-guidelines.md) | Conventional Comments, review process |
| [pr-templates.md](knowledge/pr-templates.md) | PR templates for various change types |
| [labels-conventions.md](knowledge/labels-conventions.md) | GitHub labels taxonomy |
| [cicd-quality-gates.md](knowledge/cicd-quality-gates.md) | Pipeline checks, branch protection |
| [openspec.md](knowledge/openspec.md) | Spec-driven development guide |
| [claude-md-best-practices.md](knowledge/claude-md-best-practices.md) | CLAUDE.md optimization |

**[Full Index →](knowledge/index.md)**

---

## How to Use

### For AI Systems
```
You are a Senior [Backend/Frontend/Mobile] Engineer.
Follow the guidelines in profiles/[role].md.
Reference the knowledge base for specific patterns.
```

### For Development Teams
1. Use profile definitions to configure AI assistants
2. Reference knowledge base during code reviews
3. Adapt templates to your project needs

---

## Adding New Profiles

1. Create `profiles/<name>.md` following the existing format
2. Add the profile to the `AGENTS` object in `bin/cli.js`
3. Add aliases to the `ALIASES` object if appropriate
4. Update this README and the main project README

---

*Profiles provide consistent, high-quality AI assistance across engineering teams.*
