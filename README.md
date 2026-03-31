<p align="center">
  <img src="logo.png" alt="Engineering Delivery Playbook Logo" width="640">
</p>

<p align="center">
  <strong>AI-powered agents, memory architecture, and spec-driven workflows to elevate your engineering team's delivery.</strong>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a> •
  <a href="#development-flow">Flow</a> •
  <a href="#agents">Agents</a> •
  <a href="#ai-agent-memory-architecture">Memory</a> •
  <a href="#openspec-integration">OpenSpec</a> •
  <a href="#claudemd-optimization">CLAUDE.md</a> •
  <a href="#knowledge-base">Knowledge</a>
</p>

<p align="center">
  <a href="https://github.com/space-metrics-ai/engineering-delivery-playbook/releases"><img src="https://img.shields.io/github/v/release/space-metrics-ai/engineering-delivery-playbook" alt="Release"></a>
  <a href="https://www.npmjs.com/package/eng-delivery-playbook"><img src="https://img.shields.io/npm/v/eng-delivery-playbook" alt="npm"></a>
  <img src="https://img.shields.io/badge/agents-15-blue" alt="Agents">
  <img src="https://img.shields.io/badge/knowledge_bases-14-green" alt="Knowledge Bases">
  <img src="https://img.shields.io/badge/memory-5_types-red" alt="Memory Types">
  <img src="https://img.shields.io/badge/openspec-integrated-purple" alt="OpenSpec">
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

---

## What Is This?

A turnkey framework that gives your AI coding agents (Claude Code, Cursor, Copilot, Windsurf, etc.) everything they need to deliver production-grade code:

| Feature | What |
|---------|------|
| **15 agents** | Java, Kotlin, Go, Python, Rust, Node, React, Vue, Android, iOS, Flutter, DevOps, Reviewer, Consultant, AI Metrics |
| **14 knowledge bases** | Design patterns, testing, system design, CLAUDE.md best practices |
| **5-type memory** | Persistent context that survives across sessions |
| **OpenSpec** | Spec-driven development — AI builds the *right* thing |
| **Lean CLAUDE.md** | ~600 tokens, not 10k+ — follows Boris Cherny's best practices |
| **Auto-detect** | Agent auto-selected based on your codebase |

---

## Quick Start

### 1. Install

```bash
npx eng-delivery-playbook
```

<details>
<summary>Alternative methods</summary>

```bash
# GitHub Packages
npm config set @space-metrics-ai:registry https://npm.pkg.github.com
npx @space-metrics-ai/eng-delivery-playbook

# curl
curl -fsSL https://raw.githubusercontent.com/space-metrics-ai/engineering-delivery-playbook/main/install.sh | bash
```
</details>

### 2. Start building

```bash
# Just describe the feature — agent is auto-detected from your codebase
eng-play openspec start "Add avatar upload: max 5MB, JPEG/PNG, resize 200x200, S3 storage"

# Or specify an agent explicitly
eng-play openspec start "responsive dashboard" fe
```

That's it. The CLI auto-detects the best agent, generates a structured prompt, and kicks off the OpenSpec workflow.

---

## Development Flow

```
PROPOSE ──▶ DESIGN ──▶ TASKS ──▶ IMPLEMENT ──▶ REVIEW ──▶ SHIP
   │           │          │          │             │          │
   ▼           ▼          ▼          ▼             ▼          ▼
 OpenSpec   Technical   Break     Build with    Reviewer   Merge
 proposal   approach    down      agent         agent      & deploy
```

### 1. Propose

```bash
eng-play openspec start "Add remember me checkbox with 30-day sessions"
```

Generates `openspec/prompt.md` with Environment, Goal, State, Actions. Then tell your AI:

```
"Read openspec/prompt.md and execute the full workflow"
```

### 2. Implement

The agent runs `/opsx:propose` then `/opsx:apply` automatically.

### 3. Review

```bash
eng-play switch reviewer
```
```
"Review my implementation for security, error handling, and test coverage"
```

### 4. Ship

```bash
/opsx:archive
git add . && git commit -m "feat(users): add remember me"
gh pr create
```

---

## Agents

### Backend

| Agent | Stack | Alias |
|-------|-------|-------|
| **Java** | Spring Boot, JPA, Maven/Gradle | `java` |
| **Kotlin** | Ktor, Spring, Coroutines | `kt` |
| **Go** | stdlib, Gin/Chi, GORM/sqlx | `go` |
| **Python** | FastAPI, Django, SQLAlchemy | `py` |
| **Rust** | Actix/Axum, Tokio, SQLx | `rs` |
| **Node.js** | Express, Fastify, NestJS, TypeScript | `ts` |

### Frontend

| Agent | Stack | Alias |
|-------|-------|-------|
| **React** | React 19, Next.js 15, TanStack Query | `next` |
| **Vue** | Vue 3, Nuxt 3, Pinia | `nuxt` |

### Mobile

| Agent | Stack | Alias |
|-------|-------|-------|
| **Android** | Kotlin, Jetpack Compose, Hilt | `droid` |
| **iOS** | Swift, SwiftUI, Combine | `swift` |
| **Flutter** | Dart, Riverpod/Bloc, go_router | `fl`, `dart` |

### Infrastructure & Review

| Agent | Purpose | Alias |
|-------|---------|-------|
| **DevOps** | K8s, Terraform, Docker, CI/CD | `ops` |
| **Reviewer** | Tech-agnostic code review | `review` |
| **Consultant** | Architecture advice (no code) | `consult` |

```bash
eng-play switch java       # Full name
eng-play switch py         # Alias
eng-play list              # Show all
```

---

## AI Agent Memory Architecture

The `.AGENT/` directory implements a **5-type cognitive memory system** — persistent context across sessions.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    AI AGENT MEMORY ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  .AGENT/                                                                │
│  │                                                                      │
│  ├── working_memory/              "What am I doing now?"                │
│  │   ├── context.json               Current conversation and goals      │
│  │   └── stack.json                  Current task stack                  │
│  │                                                                      │
│  ├── procedural_memory/           "How do I do this?"                   │
│  │   ├── AGENTS.md                   Agent rules and behavior           │
│  │   └── skills/                     Reusable workflows                 │
│  │       ├── code_review.md            PR review steps                  │
│  │       └── deploy_pipeline.md        Deployment checklist             │
│  │                                                                      │
│  ├── semantic_memory/             "What do I know?"                     │
│  │   ├── project/                    Project information                │
│  │   │   ├── architecture.md           System design                    │
│  │   │   └── conventions.md            Coding standards                 │
│  │   └── entities/                   Key actors and services            │
│  │       ├── people.json               Team members                     │
│  │       └── services.json             Internal services                │
│  │                                                                      │
│  ├── episodic_memory/             "What happened before?"               │
│  │   ├── conversations/              Conversation logs                  │
│  │   │   └── 2025-03-14_debug_session.json                             │
│  │   └── decisions/                  Important decisions                │
│  │       └── 2025-03-15_switch_vitest.md                               │
│  │                                                                      │
│  └── meta_memory/                 "How can I improve memory?"           │
│      ├── memory_config.json          Memory configuration               │
│      └── reflections.jsonl           Learning reflections               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Memory Types

| Type | Question | Purpose | Persistence |
|------|----------|---------|-------------|
| **Working** | What am I doing now? | Active session context | Session |
| **Procedural** | How do I do this? | Skills & agent rules | Permanent |
| **Semantic** | What do I know? | Architecture, team, services | Permanent |
| **Episodic** | What happened before? | Conversations & decisions | Rolling |
| **Meta** | How can I improve? | Memory config & reflections | Permanent |

### How It Works

```
Session starts → Load working memory (context)
       │
       ├── Read procedural memory (skills, rules)
       ├── Read semantic memory (architecture, team)
       │
Session ends  → Save to episodic memory (conversations, decisions)
       │
Over time     → Meta memory optimizes recall
```

### Setup

```bash
eng-play memory init          # Initialize .AGENT/
eng-play memory status        # Check status
eng-play memory init --force  # Reset to defaults
```

### Customization

| File | Customize |
|------|-----------|
| `semantic_memory/project/architecture.md` | Your system design |
| `semantic_memory/project/conventions.md` | Your coding standards |
| `semantic_memory/entities/people.json` | Your team members |
| `semantic_memory/entities/services.json` | Your services |
| `procedural_memory/skills/*.md` | Add custom workflows |

---

## OpenSpec Integration

[OpenSpec](https://openspec.dev/) — lightweight spec-driven framework, universal planning layer for 30+ AI coding agents.

### Why Specs?

| Without | With OpenSpec |
|---------|---------------|
| AI guesses | AI reads structured specs |
| Context lost between sessions | Specs persist in repo |
| Review code diffs only | Review **intent** via spec deltas |

### Commands

| Command | Description |
|---------|-------------|
| `/opsx:propose <feature>` | Create proposal with specs, design, tasks |
| `/opsx:apply` | Implement from proposal |
| `/opsx:verify` | Validate against specs |
| `/opsx:archive` | Archive completed changes |
| `/opsx:continue` | Resume in-progress work |

### Spec Format

```markdown
## Requirements
- The system SHALL support "remember me" with extended 30-day sessions

## Scenarios
GIVEN a user checks "remember me"
WHEN they log in successfully
THEN a 30-day session token is created
```

### Spec Deltas — Review Intent, Not Just Code

```diff
- The system SHALL expire sessions after a configured duration.
+ The system SHALL support configurable session expiration periods.
+ The system SHALL support "remember me" with extended 30-day sessions.
```

---

## CLAUDE.md Optimization

Based on [Boris Cherny's workflow](https://alirezarezvani.medium.com/your-claude-md-is-probably-wrong-7-mistakes-boris-cherny-never-makes-6d3e5e41f4b7) (Staff Engineer @ Anthropic).

### The Problem

Most devs: **500+ lines (10k+ tokens)**. Above 32k tokens, models lose 50%+ recall.

### Our Solution

`eng-play switch` generates a **lean CLAUDE.md (~30 lines, ~600 tokens)** that points Claude to read agent files on demand, instead of dumping everything upfront.

```
Before: CLAUDE.md = full agent (~500 lines, ~15k tokens)  ← context stuffing
After:  CLAUDE.md = lean pointer (~30 lines, ~600 tokens) ← on-demand loading
```

### What's in the lean CLAUDE.md

```markdown
# CLAUDE.md

## Context
my-project — Active agent: Backend Engineer.
Full agent rules: agents/backend.md

## Agent
Read and follow agents/backend.md for all guidelines.
Reference agents/knowledge/ for patterns and principles.

## Standards
- Follow conventions in agents/backend.md
- PR size < 400 lines, coverage >= 80%
- Use OpenSpec (/opsx:propose, /opsx:apply)

## Memory
Read .AGENT/ for persistent context.

## Out of Scope
- Don't modify CI/CD without asking
- Don't commit to main directly

## Learnings
<!-- Add from PRs: - [YYYY-MM-DD] description -->
```

### The 7 Anti-Patterns (Avoided)

1. **Context Stuffing** — Lean pointer, not full dump
2. **Static Memory** — Learnings section, monthly audit
3. **Instruction Collision** — Single source per topic
4. **Over-Documentation** — Only non-obvious conventions
5. **Missing Scope** — Explicit Out of Scope section
6. **Temporal Confusion** — Current State with dates
7. **Team Sync Gap** — CLAUDE.md in git, team contributes

> Full guide: [agents/knowledge/claude-md-best-practices.md](agents/knowledge/claude-md-best-practices.md)

---

## CLI Reference

```bash
eng-play                                    # Install (interactive)
eng-play switch <agent>                     # Switch agent
eng-play list                               # List agents
eng-play openspec start "<feature>"         # Start workflow (auto-detect agent)
eng-play openspec start "<feature>" <agent> # Start with specific agent
eng-play openspec init                      # Initialize openspec/
eng-play openspec status                    # Show openspec status
eng-play memory init                        # Initialize .AGENT/
eng-play memory status                      # Show memory status
eng-play memory init --force                # Reset .AGENT/
```

> `edp` still works as an alias for backward compatibility.

### Auto-Detect Agent

When you omit the agent from `eng-play openspec start`, the CLI scans your codebase:

| Signal | Agent |
|--------|-------|
| `Cargo.toml` | Rust |
| `go.mod`, `cmd/`, `internal/` | Go |
| `pom.xml`, `build.gradle` | Java |
| `build.gradle.kts` | Kotlin |
| `pyproject.toml`, `requirements.txt` | Python |
| `pubspec.yaml` | Flutter |
| `Podfile`, `Package.swift` | iOS |
| `AndroidManifest.xml` | Android |
| `package.json` + React/Next | React |
| `package.json` + Vue/Nuxt | Vue |
| `package.json` + Express/Fastify/NestJS | Node.js |
| `main.tf`, `Dockerfile` | DevOps |

### Generated Prompt Format

`openspec/prompt.md` uses a structured Environment/Goal/State/Actions format:

```markdown
## Environment
- Project: my-app
- Agent: Backend Engineer (auto-detected)
- Git: yes | Tests: yes | CI/CD: yes | Memory: .AGENT/ active

## Goal
Add user authentication with OAuth

## State
- Agent: Backend Engineer (switched)
- OpenSpec: initialized

## Actions
1. /opsx:propose — Generate proposal, specs, design, tasks
2. /opsx:apply — Implement all tasks
3. /opsx:verify — Validate against specs
```

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
| OpenSpec | [View](agents/knowledge/openspec.md) |
| OpenSpec Commands | [View](agents/knowledge/openspec-commands.md) |
| CLAUDE.md Best Practices | [View](agents/knowledge/claude-md-best-practices.md) |
| Code Review | [View](agents/knowledge/code-review-guidelines.md) |
| PR Templates | [View](agents/knowledge/pr-templates.md) |
| Labels | [View](agents/knowledge/labels-conventions.md) |
| CI/CD Gates | [View](agents/knowledge/cicd-quality-gates.md) |
| AI Metrics | [View](agents/knowledge/ai-metrics.md) |

---

## Quality Standards

| Standard | Target | Why |
|----------|--------|-----|
| PR Size | < 400 lines | Large PRs get rubber-stamped |
| Coverage | >= 80% new code | 100% is diminishing returns |
| Review | < 4 hours | Slow reviews kill momentum |
| Security | No critical/high | Non-negotiable |

---

## Context Levels

| Level | Days | AI Usage |
|-------|------|----------|
| **Onboarding** | 0-30 | Learning assistant — explore, don't ship |
| **Ramping** | 30-60 | Pair programmer — AI helps, you validate |
| **Contributing** | 60-90 | Accelerator — AI handles boilerplate |
| **Established** | 90+ | Force multiplier — AI amplifies deep context |

---

## Project Structure

```
your-project/
├── agents/                      # 15 technology-specific agents
│   ├── java.md, kotlin.md, go.md, python.md, rust.md, node.md
│   ├── react.md, vue.md
│   ├── android.md, ios.md, flutter.md
│   ├── devops.md, reviewer.md, consultant.md, ai-metrics.md
│   └── knowledge/               # 14 knowledge bases
├── .AGENT/                      # 5-type cognitive memory
│   ├── working_memory/
│   ├── procedural_memory/
│   ├── semantic_memory/
│   ├── episodic_memory/
│   └── meta_memory/
└── openspec/                    # Spec-driven development
    ├── specs/
    └── changes/
```

---

## Changelog

### 2.1.1
- **OpenSpec auto-install** — `npx eng-delivery-playbook` now installs `@fission-ai/openspec` CLI globally and creates `openspec/` directory automatically

### 2.1.0
- **15 technology-specific agents** replace 4 generic ones
- Java, Kotlin, Go, Python, Rust, Node.js, React, Vue, Android, iOS, Flutter
- Unified Code Reviewer replaces 4 separate reviewers
- Lean agents (~100 lines each) — no knowledge base duplication
- Smart auto-detect maps to specific technology (Cargo.toml → Rust, go.mod → Go, etc.)

### 2.0.0
- **`eng-play` CLI** replaces `edp` (backward compatible alias kept)
- **Auto-detect agent** — `eng-play openspec start` scans codebase, no agent arg needed
- **Structured prompt format** — Environment/Goal/State/Actions in `openspec/prompt.md`
- **Lean CLAUDE.md** — ~30 lines (~600 tokens) following Boris Cherny's best practices
- **CLAUDE.md Best Practices** knowledge base added

### 1.5.0
- OpenSpec integration replaces SpecKit
- Complete README rewrite
- Updated all agents with OpenSpec auto-flow

### 1.4.0
- `.AGENT/` AI Agent Memory Architecture (5 memory types)
- `edp memory init/status` commands

### 1.3.0
- Automated full workflow (specify > clarify > plan > tasks > implement)
- Agent selection with shortcuts (be, fe, mob, ops)

### 1.2.0
- `edp switch <agent>` and `edp list`
- Short aliases

### 1.1.0
- Interactive installer, auto-configure CLAUDE.md/.cursorrules

### 1.0.0
- Initial release — 10 agents, 13 knowledge bases

---

## Contributing

1. Fork > 2. Branch > 3. Follow structure > 4. PR

---

## License

MIT

---

<p align="center">
  <strong>AI is a tool, not a replacement for understanding.</strong>
</p>
