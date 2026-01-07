# AI Agents

This folder contains AI agent definitions that establish personas, expertise, and behavioral guidelines for AI-assisted development.

---

## Available Agents

### Backend Engineer (`backend.md`)

A senior backend engineer persona with 10+ years equivalent expertise.

**Core Competencies:**

| Area | Technologies & Concepts |
|------|------------------------|
| **Languages** | Java, Go, Node.js, TypeScript, JavaScript, Kotlin, Python |
| **Frameworks** | Spring Boot, Micronaut, Quarkus, Express, Fastify, NestJS, FastAPI, Django |
| **Patterns** | All 23 GoF patterns + Repository, CQRS, Event Sourcing, Saga |
| **Principles** | SOLID, KISS, DRY, YAGNI, GRASP, Clean Architecture |
| **System Design** | Microservices, Event-Driven, Serverless, Distributed Systems |
| **Databases** | SQL, NoSQL, Caching strategies, Sharding, Replication |
| **Testing** | Unit, Integration, Mutation, Contract, Performance |

**Use Cases:**
- Implementing new features following best practices
- Refactoring legacy code with proper patterns
- Designing system architecture
- Writing comprehensive tests
- Code review with deep technical insights

**[View Full Agent Definition →](backend.md)**

---

### Backend Reviewer (`backend-reviewer.md`)

A code review specialist focused on quality standards and review conventions.

**Core Competencies:**

| Area | Coverage |
|------|----------|
| **Comment Conventions** | Conventional Comments (blocker, issue, suggestion, nit, praise) |
| **PR Standards** | Templates, size limits (< 400 lines), required sections |
| **Labels** | Type, Priority, Size, Status, Review categories with colors |
| **CI/CD Gates** | Build, Test, Security, Coverage thresholds |
| **Checklists** | Security, Performance, Architecture, Testing, Maintainability |

**Review Priority Order:**
```
1. Security vulnerabilities     [BLOCKER]
2. Correctness / bugs          [BLOCKER]
3. Architecture / design       [BLOCKER]
4. Performance problems        [ISSUE]
5. Test coverage gaps          [ISSUE]
6. Code clarity               [SUGGESTION]
7. Style / conventions        [NIT]
```

**Use Cases:**
- Reviewing pull requests with consistent standards
- Enforcing quality gates before merge
- Providing constructive feedback
- Maintaining code quality across teams

**[View Full Agent Definition →](backend-reviewer.md)**

---

## Knowledge Base

The `knowledge/` subfolder contains detailed reference materials used by the agents:

| File | Description |
|------|-------------|
| [design-patterns.md](knowledge/design-patterns.md) | All 23 GoF patterns with code examples in multiple languages |
| [engineering-principles.md](knowledge/engineering-principles.md) | SOLID, KISS, DRY, YAGNI, GRASP with practical examples |
| [system-design.md](knowledge/system-design.md) | Big O, architecture patterns, distributed systems |
| [testing-strategies.md](knowledge/testing-strategies.md) | Unit, mutation, integration testing by language |
| [code-review-guidelines.md](knowledge/code-review-guidelines.md) | Conventional Comments, review process, feedback techniques |
| [pr-templates.md](knowledge/pr-templates.md) | Standard and specialized PR templates |
| [labels-conventions.md](knowledge/labels-conventions.md) | GitHub label taxonomy with colors and automation |
| [cicd-quality-gates.md](knowledge/cicd-quality-gates.md) | Pipeline checks, branch protection, SonarQube |

**[View Knowledge Base Index →](knowledge/index.md)**

---

## How to Use

### For AI Systems
```
You are a Senior Backend Engineer.
Follow the guidelines and expertise defined in agents/backend.md.
Reference the knowledge base for specific patterns and principles.
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

## Adding New Agents

To add a new agent:

1. Create `<agent-name>.md` in this folder
2. Define: Identity, Expertise, Behavioral Guidelines
3. Reference relevant knowledge base files
4. Update this README with the new agent
5. Update the main project README

---

*Agents are designed to provide consistent, high-quality AI assistance across engineering teams.*
