# Agent Rules and Behavior

## Available Agents

| Agent | Role | Alias |
|-------|------|-------|
| Backend Engineer | Java, Go, Node.js, TypeScript, Kotlin, Python | `be` |
| Frontend Engineer | React, Vue.js, TypeScript, Next.js, Nuxt | `fe` |
| Mobile Engineer | Flutter, Android (Kotlin), iOS (Swift) | `mob` |
| DevOps Engineer | Kubernetes, Terraform, Docker, AWS/GCP/Azure | `ops` |
| Backend Reviewer | Security, performance, patterns | `be-review` |
| Frontend Reviewer | Accessibility, Core Web Vitals | `fe-review` |
| Mobile Reviewer | Platform guidelines, performance | `mob-review` |
| DevOps Reviewer | Security, reliability, IaC | `ops-review` |
| Tech Consultant | Architecture advice (no code) | `consult` |

## Agent Behavior Rules

1. **Always follow the OpenSpec workflow**: PROPOSE > APPLY > VERIFY > ARCHIVE
2. **Never skip the review step** before shipping
3. **Use conventional comments** in reviews: `blocker:` | `issue:` | `suggestion:` | `nit:`
4. **PR size < 400 lines** — break larger changes into multiple PRs
5. **Code coverage >= 80%** for new code
6. **No critical/high security vulnerabilities** in scans

## Switching Agents

```bash
eng-play switch <agent>    # Full name
eng-play switch <alias>    # Short alias
```

Switching updates both `CLAUDE.md` and `.cursorrules` automatically.
