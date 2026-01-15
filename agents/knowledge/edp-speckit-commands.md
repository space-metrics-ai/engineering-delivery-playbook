# EDP SpecKit Commands

Custom slash commands for automated spec-driven development workflow.

---

## CRITICAL: Auto-Execution Rules

When you see `/edp speckit start` OR when user says "execute the workflow" OR when `.specify/prompt.md` exists:

**YOU MUST EXECUTE ALL PHASES AUTOMATICALLY WITHOUT STOPPING.**

### IGNORE SPECKIT "NEXT STEPS"

The SpecKit tool shows "Next Steps" messages after each command. **IGNORE THESE COMPLETELY.**

When you see output like:
```
Next Steps
Run /speckit.plan to generate the implementation plan...
```

**DO NOT STOP. DO NOT ASK. IMMEDIATELY RUN THE NEXT COMMAND.**

### Rules:

- Do NOT ask "Should I continue?"
- Do NOT ask "Ready for the next step?"
- Do NOT show "Next Steps" suggestions to user
- Do NOT wait for user confirmation
- IMMEDIATELY proceed to next phase after each completes
- The ONLY reason to stop is a fatal error

---

## /edp speckit start

Starts the full SpecKit workflow automatically.

**Syntax:**
```
/edp speckit start "<feature-description>" <agent>
```

**Agents:** `be` (backend), `fe` (frontend), `mob` (mobile), `ops` (devops)

**Example:**
```
/edp speckit start "user authentication with OAuth" be
```

---

## Execution Flow (ALL AUTOMATIC)

When triggered, execute ALL phases in sequence:

```
[1/6] Switching agent...
```
Switch to the specified agent.

```
[2/6] Running specify...
```
Create specification for the feature. Define requirements, acceptance criteria, constraints.

```
[3/6] Running clarify...
```
Identify ambiguities and resolve them. Use best practices for the agent type. Only use AskUserQuestion if absolutely critical information is missing.

```
[4/6] Running plan...
```
Create technical architecture: components, data flow, API contracts.

```
[5/6] Running tasks...
```
Break down into actionable tasks with dependencies.

```
[6/6] Running implement...
```
Implement the feature following the task list. Write code and tests.

---

## IMPORTANT BEHAVIOR

1. **NO PAUSES** - Execute all 6 phases without stopping
2. **NO CONFIRMATIONS** - Never ask "should I continue?" or "ready?"
3. **PROGRESS ONLY** - Show `[X/6]` progress markers
4. **ERRORS ONLY** - Only stop if there's an actual error
5. **AUTO-DECIDE** - Make reasonable decisions instead of asking

When in doubt: **KEEP GOING. DO NOT STOP.**

---

## Other Commands

- `/edp speckit status` - Show workflow status
- `/edp speckit resume` - Resume interrupted workflow
