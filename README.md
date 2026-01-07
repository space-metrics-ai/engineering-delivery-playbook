# Engineering Delivery Playbook

A comprehensive collection of AI-powered engineering agents and knowledge bases designed to standardize and elevate software engineering practices across teams.

## The Philosophy: Context-Driven AI Usage

<p align="center">
  <img src="context-vs-onboarding.png" alt="Context vs Onboarding - AI Usage Model" width="600">
</p>

### Understanding the Model

The diagram above represents our core philosophy for AI adoption in engineering teams. It illustrates the relationship between **business context**, **time at the company**, and **effective AI usage**.

#### The Axes

| Axis | Description |
|------|-------------|
| **Y-Axis (Business Context)** | The depth of understanding about the product, domain, architecture, and business rules |
| **X-Axis (Time/Tenure)** | Days at the company, from Day 0 (new hire) to Day 90+ (established) |
| **Dotted Line (AI Usage)** | The recommended level of AI assistance and autonomy |

#### The Principle

**AI effectiveness scales with business context.** The more you understand the "why" behind the code, the better you can leverage AI for the "how".

### AI Usage by Tenure Stage

| Stage | Days | Context Level | AI Usage Recommendation |
|-------|------|---------------|------------------------|
| **Onboarding** | 0-30 | Low | AI as **learning assistant** - Use for understanding patterns, asking questions, exploring codebase. Human review required for all outputs. |
| **Ramping** | 30-60 | Medium | AI as **pair programmer** - Use for implementation with moderate supervision. Validate against established patterns. |
| **Contributing** | 60-90 | High | AI as **accelerator** - Use for complex tasks with light review. Can trust AI for standard patterns. |
| **Established** | 90+ | Expert | AI as **force multiplier** - Full leverage for productivity. Guide AI with deep domain knowledge. |

### Why This Matters

```
Without Context:
  AI generates → Code that "works" → Doesn't fit the system → Tech debt

With Context:
  Human guides → AI generates → Code that fits → Value delivered
```

#### The Risks of Context-Free AI Usage

1. **Architectural Drift**: AI doesn't know your system's constraints and patterns
2. **Business Logic Errors**: AI can't infer domain rules not in the codebase
3. **Security Blind Spots**: AI may miss context-specific vulnerabilities
4. **Integration Issues**: AI doesn't understand cross-team dependencies

#### The Benefits of Context-Aware AI Usage

1. **Accelerated Delivery**: 10x faster with proper guidance
2. **Consistent Patterns**: AI enforces established conventions
3. **Knowledge Amplification**: Your expertise + AI capabilities
4. **Quality Maintenance**: Context enables proper validation

### Practical Guidelines

#### For New Team Members (Day 0-30)
```
DO:
✓ Use AI to understand existing code ("Explain this function")
✓ Use AI to learn project patterns ("Show me examples of...")
✓ Ask AI to explain business logic you find in code
✓ Have all AI-generated code reviewed by tenured team members

DON'T:
✗ Let AI make architectural decisions
✗ Trust AI for business rule implementation
✗ Skip code review because "AI wrote it"
✗ Use AI to write code you don't understand
```

#### For Ramping Engineers (Day 30-60)
```
DO:
✓ Use AI for boilerplate and standard patterns
✓ Leverage AI for test generation
✓ Ask AI to review your code against project standards
✓ Use AI to refactor with supervision

DON'T:
✗ Let AI modify core business logic unsupervised
✗ Trust AI for cross-service changes
✗ Skip validation of AI suggestions
```

#### For Established Engineers (Day 60+)
```
DO:
✓ Use AI as a force multiplier
✓ Guide AI with specific domain context
✓ Trust AI for implementation, verify for integration
✓ Use AI for complex refactoring with your oversight

DON'T:
✗ Assume AI knows recent changes
✗ Skip security review for sensitive areas
✗ Forget to update AI context when patterns change
```

### How This Playbook Helps

This playbook accelerates the context-building process by providing:

| Resource | How It Helps |
|----------|--------------|
| **Agent Definitions** | Establishes consistent AI behavior and expertise |
| **Design Patterns** | Documents the "approved" ways to solve problems |
| **Engineering Principles** | Codifies the team's values and trade-off decisions |
| **Review Guidelines** | Shows what "good" looks like in this organization |
| **PR Templates** | Captures the information needed for context transfer |

**The goal**: Reduce the time from Day 0 to effective AI usage by providing structured context upfront.

---

## Overview

This playbook provides structured guidelines, best practices, and reusable knowledge for backend engineering and code review processes. It's designed to be used as a reference for AI agents, development teams, and individual engineers seeking to maintain high-quality standards.

## Purpose

- **Standardize Engineering Practices**: Establish consistent patterns across teams
- **Accelerate Onboarding**: New team members can quickly learn established conventions
- **Enable Context-Aware AI**: Provide the context needed for AI to give accurate guidance
- **Reduce Cognitive Load**: Pre-defined templates, checklists, and conventions reduce decision fatigue
- **Improve Code Quality**: Systematic review processes catch issues early
- **Bridge the Context Gap**: Help engineers reach effective AI usage faster

## Structure

```
eng-delivery-playbook/
├── README.md                         # This file
├── context-vs-onboarding.png         # AI usage philosophy diagram
│
├── agents/                           # AI Agent Definitions
│   ├── backend.md                    # Backend Engineer Agent
│   ├── backend-reviewer.md           # Code Review Agent
│   └── knowledge/
│       ├── index.md                  # Knowledge base navigation
│       │
│       │   # Backend Engineering
│       ├── design-patterns.md        # GoF 23 + Modern patterns
│       ├── engineering-principles.md # SOLID, KISS, DRY, GRASP
│       ├── system-design.md          # Architecture & Big O
│       ├── testing-strategies.md     # Unit, Mutation, Integration
│       │
│       │   # Code Review & Quality
│       ├── code-review-guidelines.md # Review process & feedback
│       ├── pr-templates.md           # Pull request templates
│       ├── labels-conventions.md     # GitHub labels system
│       └── cicd-quality-gates.md     # CI/CD pipeline checks
│
└── resources/                        # Learning Resources
    └── ai-engineering-resources.md   # Curated AI/Claude Code resources
```

## Agents

### Backend Engineer Agent (`agents/backend.md`)

A senior backend engineer persona with deep expertise in:

| Area | Coverage |
|------|----------|
| **Languages** | Java, Go, Node.js, TypeScript, Kotlin, Python |
| **Patterns** | All 23 GoF design patterns + modern patterns |
| **Principles** | SOLID, KISS, DRY, YAGNI, GRASP, Clean Architecture |
| **System Design** | Microservices, Event-Driven, Serverless, Distributed Systems |
| **Testing** | Unit, Integration, Mutation, Contract, Performance |
| **Complexity** | Big O analysis, data structures, algorithms |

### Backend Reviewer Agent (`agents/backend-reviewer.md`)

A code review specialist focused on maintaining quality standards:

| Area | Coverage |
|------|----------|
| **Comment Conventions** | Conventional Comments (blocker, issue, suggestion, nit) |
| **PR Standards** | Templates, size limits, required sections |
| **Labels** | Type, Priority, Size, Status, Review categories |
| **CI/CD Gates** | Build, Test, Security, Coverage thresholds |
| **Checklists** | Security, Performance, Architecture, Testing |

## Knowledge Base

### Backend Engineering

#### Design Patterns (`knowledge/design-patterns.md`)
- **Creational**: Singleton, Factory Method, Abstract Factory, Builder, Prototype
- **Structural**: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **Behavioral**: Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor, Interpreter
- **Modern**: Repository, Unit of Work, CQRS, Event Sourcing, Saga, Circuit Breaker

#### Engineering Principles (`knowledge/engineering-principles.md`)
- SOLID principles with detailed code examples
- KISS, DRY, YAGNI, WET explained with practical guidance
- Law of Demeter, Composition over Inheritance
- GRASP principles for responsibility assignment
- Clean Architecture layers and dependencies

#### System Design (`knowledge/system-design.md`)
- Big O complexity reference tables
- Data structure operations cheat sheet
- Architectural patterns comparison (Monolith vs Microservices vs Serverless)
- Distributed systems patterns (Circuit Breaker, Saga, CQRS)
- CAP theorem and database selection guide
- Scalability patterns and caching strategies

#### Testing Strategies (`knowledge/testing-strategies.md`)
- Testing pyramid and philosophy
- Unit testing with AAA pattern and frameworks per language
- Mutation testing concepts and tools (PIT, Stryker, mutmut)
- Integration testing with Test Containers
- Contract testing with Pact
- Performance testing with k6

### Code Review & Quality

#### Code Review Guidelines (`knowledge/code-review-guidelines.md`)
- Conventional Comments system with label prefixes
- Review checklist (correctness, security, performance, architecture)
- Feedback techniques and anti-patterns
- Response templates for common scenarios

#### PR Templates (`knowledge/pr-templates.md`)
- Standard PR template with all required sections
- Specialized templates: Bug Fix, Feature, Refactor, Migration, Hotfix
- GitHub template setup instructions

#### Labels Conventions (`knowledge/labels-conventions.md`)
- Complete label taxonomy with colors
- Categories: Type, Priority, Size, Status, Review
- Automation setup with GitHub Actions
- Label sync across repositories

#### CI/CD Quality Gates (`knowledge/cicd-quality-gates.md`)
- Build, lint, and type check gates
- Testing gates (unit, integration, E2E)
- Security gates (SAST, dependency scan, secrets detection)
- Quality metrics (SonarQube integration)
- Branch protection configuration
- Complete GitHub Actions pipeline example

## Usage

### For AI Agents
Reference the agent files to establish persona and behavioral guidelines:
```
You are a Senior Backend Engineer. Follow the guidelines in agents/backend.md...
```

### For Development Teams
1. Copy relevant templates to your repository's `.github/` directory
2. Configure labels using the provided color scheme
3. Set up CI/CD quality gates in your pipeline
4. Reference checklists during code reviews
5. **Use the context model** to guide AI adoption in your team

### For Individual Engineers
- Use as a learning resource for design patterns and principles
- Reference during code reviews
- Consult for architecture decisions
- **Assess your context level** before relying on AI assistance

### For Engineering Managers
- Use the context model to set expectations for AI usage
- Track team members' progression through context stages
- Ensure proper review processes for context-appropriate AI usage

## Key Standards

| Standard | Threshold |
|----------|-----------|
| PR Size | < 400 lines (soft limit) |
| Code Coverage | >= 80% (new code) |
| Review Response | < 4 hours |
| Security Scan | No critical/high vulnerabilities |
| Build Time | < 5 minutes |

## The Context Maturity Matrix

Use this matrix to assess AI usage readiness:

| Dimension | Low Context | Medium Context | High Context |
|-----------|-------------|----------------|--------------|
| **Codebase** | Can navigate | Understands patterns | Knows history/decisions |
| **Domain** | Basic terms | Business rules | Edge cases/exceptions |
| **Architecture** | Component names | Data flow | Trade-offs/constraints |
| **Team** | Names/roles | Responsibilities | Communication patterns |
| **Process** | Basic workflow | Quality gates | Why they exist |

**AI Leverage Score**: Count "High Context" areas. 4-5 = Full AI leverage, 2-3 = Supervised AI, 0-1 = AI for learning only.

## Learning Resources

Accelerate your AI-assisted development skills with our curated collection of resources.

**[View All Resources →](resources/ai-engineering-resources.md)**

### Quick Links by Category

| Category | What You'll Find |
|----------|------------------|
| **[Newsletters](resources/ai-engineering-resources.md#newsletters)** | Stay updated with THE CODE, Every, and more |
| **[Long Courses](resources/ai-engineering-resources.md#long-courses)** | Structured learning paths for Claude Code |
| **[GitHub Repos](resources/ai-engineering-resources.md#github-repositories)** | Templates, cheat sheets, and awesome lists |
| **[YouTube Tutorials](resources/ai-engineering-resources.md#youtube-tutorials)** | Setup guides and workflow demonstrations |
| **[Creators to Follow](resources/ai-engineering-resources.md#creators-to-follow)** | Industry experts on LinkedIn and X |

### Featured Resources

- **[Claude Code Cheat Sheet](https://lnkd.in/dhW5b8eB)** - Quick reference for commands and shortcuts
- **[Claude Code for Everyone](https://lnkd.in/dXQ5U9d8)** - Beginner-friendly course
- **[Awesome MCP Servers](https://lnkd.in/dfqS3ZRp)** - Model Context Protocol integrations

## Contributing

1. Follow the existing structure and formatting
2. Include code examples in multiple languages where applicable
3. Update the index when adding new files
4. Keep content practical and actionable

## License

MIT License - Feel free to use and adapt for your organization.

---

**Built with expertise from industry best practices and modern engineering standards.**

*Remember: AI is a tool, not a replacement for understanding. The best results come from humans with context guiding AI with capabilities.*
