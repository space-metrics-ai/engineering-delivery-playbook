# Labels & Conventions Knowledge Base

## Label System Overview

Labels provide at-a-glance context for issues and PRs. A well-designed label system:
- Enables quick triage and filtering
- Communicates status without reading details
- Helps prioritize work
- Tracks metrics and trends

---

## Label Categories

### Type Labels
**Purpose**: Categorize the nature of the change
**Prefix**: `type:`
**Color Family**: Blues (#0052CC base)

| Label | Hex Color | Use When |
|-------|-----------|----------|
| `type: bug` | #d73a4a | Fixing something broken |
| `type: feature` | #0052CC | Adding new functionality |
| `type: enhancement` | #1D76DB | Improving existing functionality |
| `type: refactor` | #5319E7 | Restructuring without behavior change |
| `type: docs` | #0075ca | Documentation only changes |
| `type: chore` | #666666 | Maintenance, dependencies, configs |
| `type: test` | #BFD4F2 | Adding or fixing tests |
| `type: security` | #B60205 | Security-related changes |
| `type: performance` | #FBCA04 | Performance improvements |

---

### Priority Labels
**Purpose**: Indicate urgency for triage
**Prefix**: `priority:` or `P1`-`P4`
**Color Family**: Urgency spectrum (red → green)

| Label | Hex Color | Definition | SLA |
|-------|-----------|------------|-----|
| `priority: critical` / `P1` | #B60205 | Service down, data loss, security breach | < 4 hours |
| `priority: high` / `P2` | #D93F0B | Major feature broken, significant impact | < 24 hours |
| `priority: medium` / `P3` | #FBCA04 | Normal priority, standard queue | < 1 week |
| `priority: low` / `P4` | #0E8A16 | Nice to have, when time permits | Backlog |

---

### Size Labels
**Purpose**: Estimate review effort, track PR size
**Prefix**: `size:`
**Color Family**: Purples (light → dark with size)

| Label | Hex Color | Lines Changed | Review Time |
|-------|-----------|---------------|-------------|
| `size: XS` | #E5CCFF | 1-50 | ~15 min |
| `size: S` | #D4ACF7 | 51-200 | ~30 min |
| `size: M` | #C295F0 | 201-400 | ~1 hour |
| `size: L` | #A66EE8 | 401-800 | Split recommended |
| `size: XL` | #8B45DE | 800+ | Must split |

**Automation**: Can be auto-applied via GitHub Actions:
```yaml
name: PR Size Label
on: [pull_request]
jobs:
  size-label:
    runs-on: ubuntu-latest
    steps:
      - uses: codelytv/pr-size-labeler@v1
        with:
          xs_max_size: 50
          s_max_size: 200
          m_max_size: 400
          l_max_size: 800
```

---

### Status Labels
**Purpose**: Track progress through workflow
**Prefix**: `status:`
**Color Family**: State-based (green/yellow/red)

| Label | Hex Color | Meaning |
|-------|-----------|---------|
| `status: draft` | #666666 | Work in progress, not ready |
| `status: ready-for-review` | #0E8A16 | Awaiting reviewer |
| `status: in-review` | #FBCA04 | Currently being reviewed |
| `status: changes-requested` | #D93F0B | Author needs to address feedback |
| `status: approved` | #28A745 | Approved, ready to merge |
| `status: blocked` | #B60205 | Waiting on external dependency |
| `status: on-hold` | #666666 | Intentionally paused |
| `status: needs-rebase` | #D93F0B | Conflicts need resolution |

---

### Review Labels
**Purpose**: Request specialized reviews
**Prefix**: `review:` or `needs:`
**Color Family**: Pastels for visibility without urgency

| Label | Hex Color | Use When |
|-------|-----------|----------|
| `review: needs-security` | #F9D0C4 | Security team review required |
| `review: needs-arch` | #FEF2C0 | Architecture review required |
| `review: needs-dba` | #C2E0C6 | Database changes need DBA |
| `review: needs-qa` | #BFD4F2 | QA validation required |
| `review: needs-devops` | #D4C5F9 | Infrastructure/deployment review |
| `review: needs-product` | #FBCA04 | Product team sign-off |

---

### Effort Labels
**Purpose**: Story point or effort estimation
**Prefix**: `effort:` or `points:`
**Color Family**: Gradient

| Label | Hex Color | Effort |
|-------|-----------|--------|
| `effort: 1` | #C2E0C6 | Trivial, < 1 hour |
| `effort: 2` | #A2D4AB | Small, few hours |
| `effort: 3` | #7DC98F | Medium, ~1 day |
| `effort: 5` | #52B86A | Large, 2-3 days |
| `effort: 8` | #2CA056 | Very large, ~1 week |
| `effort: 13` | #1A7F42 | Epic, needs breakdown |

---

### Special Labels
**Purpose**: Flags and special states

| Label | Hex Color | Meaning |
|-------|-----------|---------|
| `breaking-change` | #B60205 | Introduces breaking changes |
| `do-not-merge` | #B60205 | Do not merge under any circumstances |
| `needs-discussion` | #D4C5F9 | Requires team discussion |
| `good-first-issue` | #7057FF | Good for newcomers |
| `help-wanted` | #008672 | Open for external contribution |
| `hacktoberfest` | #FF7518 | Hacktoberfest eligible |
| `duplicate` | #CFD3D7 | Duplicate issue/PR |
| `wontfix` | #FFFFFF | Won't be addressed |
| `invalid` | #E4E669 | Not valid issue/PR |
| `stale` | #CFD3D7 | No activity, may close |

---

## Naming Conventions

### Label Names
- Use lowercase with hyphens: `type: feature-request`
- Keep prefix short: `type:` not `category-type:`
- Be specific but concise: `needs-dba` not `requires-database-administrator-review`

### Color Strategy
1. **Group by prefix** - Same prefix = same color family
2. **Severity = warmth** - Red (urgent) → Yellow (attention) → Green (ok)
3. **Contrast** - Labels should be readable on both light/dark themes
4. **Consistency** - Once set, don't change colors frequently

### Emoji Usage
Optional but helpful for visual scanning:

| With Emoji | Without |
|------------|---------|
| `🐛 type: bug` | `type: bug` |
| `✨ type: feature` | `type: feature` |
| `📄 type: docs` | `type: docs` |
| `🔒 type: security` | `type: security` |
| `⚡ type: performance` | `type: performance` |
| `🚨 priority: critical` | `priority: critical` |

---

## Label Application Rules

### Required Labels
Every PR should have:
1. One `type:` label
2. One `priority:` label (for issues)
3. `size:` label (auto-applied recommended)

### Mutually Exclusive
Only one from each group:
- Type (one type per PR)
- Priority (one priority level)
- Size (one size)

### Stackable
Can have multiple:
- Review labels (may need multiple reviewers)
- Status labels are replaced, not stacked

---

## Automation Setup

### GitHub Actions: Auto-label PRs
```yaml
name: Auto Label
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v5
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```

### Labeler Config (.github/labeler.yml)
```yaml
# Type labels based on files changed
'type: docs':
  - changed-files:
      - any-glob-to-any-file: ['**/*.md', 'docs/**']

'type: test':
  - changed-files:
      - any-glob-to-any-file: ['**/*test*', '**/*spec*']

'type: chore':
  - changed-files:
      - any-glob-to-any-file: ['package.json', 'yarn.lock', '.github/**']

# Review labels based on files
'review: needs-dba':
  - changed-files:
      - any-glob-to-any-file: ['**/migrations/**', '**/sql/**']

'review: needs-security':
  - changed-files:
      - any-glob-to-any-file: ['**/auth/**', '**/security/**']
```

### Stale Bot Configuration
```yaml
# .github/stale.yml
daysUntilStale: 30
daysUntilClose: 7
staleLabel: stale
markComment: >
  This issue has been automatically marked as stale due to inactivity.
  It will be closed in 7 days if no further activity occurs.
closeComment: >
  This issue has been closed due to inactivity.
exemptLabels:
  - priority: critical
  - priority: high
  - do-not-merge
```

---

## Label Cleanup Script

```bash
#!/bin/bash
# Delete unused labels across repos

labels_to_delete=(
  "invalid"
  "wontfix"
  # Add more
)

for label in "${labels_to_delete[@]}"; do
  gh label delete "$label" --yes
done
```

## Label Sync Across Repos

```yaml
# .github/labels.yml - managed by github-label-sync
- name: "type: bug"
  color: "d73a4a"
  description: "Something isn't working"

- name: "type: feature"
  color: "0052CC"
  description: "New functionality"

# ... define all labels
```

Sync command:
```bash
npx github-label-sync --labels .github/labels.yml owner/repo
```
