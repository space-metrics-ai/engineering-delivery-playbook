# OpenSpec Commands

Custom commands for automated spec-driven development workflow using OpenSpec.

---

## CRITICAL: Auto-Execution Rules

When you see `/eng-play openspec start` OR when user says "execute the workflow" OR when `openspec/prompt.md` exists:

**YOU MUST EXECUTE ALL PHASES AUTOMATICALLY WITHOUT STOPPING.**

### Rules:

- Do NOT ask "Should I continue?"
- Do NOT ask "Ready for the next step?"
- Do NOT wait for user confirmation
- IMMEDIATELY proceed to next phase after each completes
- The ONLY reason to stop is a fatal error

---

## /eng-play openspec start

Starts the full OpenSpec workflow automatically.

**Syntax:**
```
/eng-play openspec start "<feature-description>" <agent>
```

**Agents:** `be` (backend), `fe` (frontend), `mob` (mobile), `ops` (devops)

**Example:**
```
/eng-play openspec start "user authentication with OAuth" be
```

---

## Execution Flow (ALL AUTOMATIC)

When triggered, execute ALL phases in sequence:

```
[1/3] Switching agent...
```
Switch to the specified agent.

```
[2/3] Running /opsx:propose...
```
Create specification for the feature. Generates proposal, specs, design, and tasks.

```
[3/3] Running /opsx:apply...
```
Implement the feature following the generated tasks. Write code and tests.

---

## IMPORTANT BEHAVIOR

1. **NO PAUSES** - Execute all 3 phases without stopping
2. **NO CONFIRMATIONS** - Never ask "should I continue?" or "ready?"
3. **PROGRESS ONLY** - Show `[X/3]` progress markers
4. **ERRORS ONLY** - Only stop if there's an actual error
5. **AUTO-DECIDE** - Make reasonable decisions instead of asking

When in doubt: **KEEP GOING. DO NOT STOP.**

---

## Other Commands

- `/opsx:propose <feature>` - Create a new feature proposal
- `/opsx:apply` - Execute implementation tasks
- `/opsx:verify` - Validate implementation against specs
- `/opsx:archive` - Archive completed changes
- `/opsx:continue` - Resume in-progress work
- `eng-play openspec status` - Show workflow status
