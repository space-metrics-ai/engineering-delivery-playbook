<p align="center">
  <img src="logo.png" alt="Engineering Delivery Playbook Logo" width="640">
</p>

<p align="center">
  <strong>Curated context profiles for AI coding tools — not agents, not magic, just good defaults.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/eng-delivery-playbook"><img src="https://img.shields.io/npm/v/eng-delivery-playbook" alt="npm"></a>
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

---

## What Is This?

A collection of **curated system prompts** (we call them "profiles") that configure how AI coding tools behave for specific technology stacks.

Each profile is a Markdown file with battle-tested conventions, patterns, and guidelines for a given stack. When your AI reads it, it writes code the way a senior engineer on that stack would.

- **14 profiles**: Java, Kotlin, Go, Python, Rust, Node.js, React, Vue, Android, iOS, Flutter, DevOps, Code Reviewer, Tech Consultant
- **14 knowledge bases**: Design patterns, testing strategies, system design, code review guidelines, and more
- **Memory architecture**: Persistent context that survives across sessions
- **OpenSpec integration**: Spec-driven development workflow
- **Lean CLAUDE.md**: ~600 tokens pointing to profiles on demand, not 10k+ dumped upfront

**These are not autonomous agents.** They don't make decisions, don't run tools, don't loop. They're structured context that makes your existing AI tools (Claude Code, Cursor, Copilot, etc.) better at writing code for your stack.

---

## Why Not Just Write Your Own CLAUDE.md?

You absolutely can. But most teams end up with one of two problems:

1. **Too long** (500+ lines, 10k+ tokens) — context stuffing that degrades model recall
2. **Too generic** ("write clean code, follow best practices") — no real signal

This playbook gives you:

- **Stack-specific conventions** curated per technology (not generic "best practices")
- **Lean CLAUDE.md** (~600 tokens) that points to detailed profiles on demand — following [Boris Cherny's approach](https://alirezarezvani.medium.com/your-claude-md-is-probably-wrong-7-mistakes-boris-cherny-never-makes-6d3e5e41f4b7)
- **Knowledge bases** the AI can pull from when it needs depth on patterns, testing, or system design
- **Zero setup** — `npx eng-delivery-playbook` and you're configured
- **A starting point, not a straitjacket** — customize from there

---

## Quick Start

```bash
npx eng-delivery-playbook
```

This installs profiles, knowledge bases, and memory architecture into your project. Then:

```bash
eng-play switch java       # Switch to Java profile
eng-play switch py         # Use aliases
eng-play list              # Show all profiles
```

### Spec-Driven Workflow

```bash
eng-play openspec start "
  context: We have a billing service.
  goals: Add usage-based billing API.
  requirements:
    - POST /api/billing/usage — record API calls per tenant
    - GET /api/billing/invoices/:tenant_id — list invoices
    - Pricing tiers: free (1k calls), pro (100k), enterprise (unlimited)"
```

The CLI auto-detects your stack, generates a structured prompt, and kicks off the OpenSpec workflow: PROPOSE > DESIGN > TASKS > IMPLEMENT > REVIEW > SHIP.

---

## Profiles

### Backend

| Profile | Stack | Alias |
|---------|-------|-------|
| **Java** | Spring Boot, JPA, Maven/Gradle | `java` |
| **Kotlin** | Ktor, Spring, Coroutines | `kt` |
| **Go** | stdlib, Gin/Chi, GORM/sqlx | `go` |
| **Python** | FastAPI, Django, SQLAlchemy | `py` |
| **Rust** | Actix/Axum, Tokio, SQLx | `rs` |
| **Node.js** | Express, Fastify, NestJS, TypeScript | `ts` |

### Frontend

| Profile | Stack | Alias |
|---------|-------|-------|
| **React** | React 19, Next.js 15, TanStack Query | `next` |
| **Vue** | Vue 3, Nuxt 3, Pinia | `nuxt` |

### Mobile

| Profile | Stack | Alias |
|---------|-------|-------|
| **Android** | Kotlin, Jetpack Compose, Hilt | `droid` |
| **iOS** | Swift, SwiftUI, Combine | `swift` |
| **Flutter** | Dart, Riverpod/Bloc, go_router | `fl`, `dart` |

### Infrastructure & Review

| Profile | Purpose | Alias |
|---------|---------|-------|
| **DevOps** | K8s, Terraform, Docker, CI/CD | `ops` |
| **Reviewer** | Tech-agnostic code review | `review` |
| **Consultant** | Architecture advice (no code) | `consult` |

---

## CLI Reference

```bash
eng-play                                      # Install (interactive)
eng-play switch <profile>                     # Switch profile
eng-play list                                 # List profiles
eng-play openspec start "<feature>"           # Start workflow (auto-detect)
eng-play openspec start "<feature>" <profile> # Start with specific profile
eng-play memory init                          # Initialize .AGENT/ memory
eng-play memory status                        # Show memory status
```

### Auto-Detection

When you omit the profile from `eng-play openspec start`, the CLI scans your codebase:

| Signal | Profile |
|--------|---------|
| `Cargo.toml` | Rust |
| `go.mod` | Go |
| `pom.xml`, `build.gradle` | Java |
| `build.gradle.kts` | Kotlin |
| `pyproject.toml`, `requirements.txt` | Python |
| `pubspec.yaml` | Flutter |
| `package.json` + React/Next | React |
| `package.json` + Vue/Nuxt | Vue |
| `Dockerfile`, `main.tf` | DevOps |

---

## Memory Architecture

The `.AGENT/` directory provides persistent context across sessions with 5 memory types: working, procedural, semantic, episodic, and meta. Initialize with `eng-play memory init`.

See [.AGENT/procedural_memory/PROFILES.md](.AGENT/procedural_memory/PROFILES.md) for details.

---

## OpenSpec

[OpenSpec](https://openspec.dev/) provides spec-driven development — AI reads structured specs instead of guessing. Specs persist in the repo, enabling review of **intent** (spec deltas) alongside code diffs.

See [profiles/knowledge/openspec.md](profiles/knowledge/openspec.md) for the full guide.

---

## Examples

_Coming soon: before/after examples and links to real PRs generated with this workflow._

If you've used this playbook in a project, [open an issue](https://github.com/space-metrics-ai/engineering-delivery-playbook/issues) — we'd love to feature it.

---

## Changelog

### 3.0.0 (Breaking)
- **Renamed "agents" to "profiles"** — honest terminology, these are context configurations not autonomous agents
- **Removed AI Metrics** profile and knowledge base
- **Rewrote README** — shorter, honest positioning, no vanity badges
- **Added CONTRIBUTING.md** — proper contribution guide
- **14 profiles, 14 knowledge bases** — curated per technology stack

<details>
<summary>Previous versions</summary>

### 2.1.x
- OpenSpec auto-install, structured prompt format

### 2.0.0
- `eng-play` CLI, auto-detect, lean CLAUDE.md

### 1.x
- Initial release through memory architecture
</details>

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT

---

<p align="center">
  <strong>AI is a tool, not a replacement for understanding.</strong>
</p>
