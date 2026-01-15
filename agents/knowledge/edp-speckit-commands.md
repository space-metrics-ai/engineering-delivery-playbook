# EDP SpecKit Commands

Custom slash commands for automated spec-driven development workflow.

---

## Quick Commands

### /edp speckit start

Starts the full SpecKit workflow automatically without waiting for confirmation between steps.

**Syntax:**
```
/edp speckit start <feature-description> <agent-type>
```

**Agent types:**
- `be` or `backend` - Backend development
- `fe` or `frontend` - Frontend development
- `mob` or `mobile` - Mobile development
- `ops` or `devops` - DevOps/Infrastructure

**Examples:**
```
/edp speckit start "user authentication with OAuth" be
/edp speckit start "dashboard analytics" fe
/edp speckit start "push notifications" mob
```

---

## Command Execution Flow

When `/edp speckit start` is invoked, execute the following phases **automatically** and **sequentially** without asking for confirmation:

### Phase 1: Agent Switch
- Switch to the specified agent type using `edp switch <agent>`
- Confirm the switch was successful

### Phase 2: Specify
- Run `/speckit.specify` with the feature description
- Create initial specification document
- Save to `.specify/specs/`

### Phase 3: Clarify
- Run `/speckit.clarify` automatically
- Generate clarifying questions based on the spec
- Answer questions based on best practices for the agent type
- If questions require user input, use AskUserQuestion tool

### Phase 4: Plan
- Run `/speckit.plan` automatically
- Create technical architecture based on clarified specs
- Include component diagrams, data flow, and API contracts

### Phase 5: Tasks
- Run `/speckit.tasks` automatically
- Generate actionable task breakdown with dependencies
- Mark parallel vs sequential tasks

### Phase 6: Implement
- Run `/speckit.implement` automatically
- Begin implementation following the task list
- Use TDD approach when applicable

---

## Execution Rules

1. **No Confirmation Required**: Do NOT ask "Should I continue?" between phases
2. **Progress Updates**: Show a brief status update when moving to each phase
3. **Error Handling**: If a phase fails, stop and report the error
4. **Context Preservation**: Each phase must have access to previous phase outputs
5. **Agent Context**: Apply the switched agent's expertise throughout all phases

---

## Status Output Format

When executing, show progress like:

```
[1/6] Switching to Backend Engineer...
[2/6] Running /speckit.specify...
[3/6] Running /speckit.clarify...
[4/6] Running /speckit.plan...
[5/6] Running /speckit.tasks...
[6/6] Running /speckit.implement...
```

---

## Other Commands

### /edp speckit status

Shows current SpecKit workflow status:
- Current phase
- Completed phases
- Pending phases
- Active agent

### /edp speckit resume

Resumes from the last completed phase if workflow was interrupted.

### /edp speckit reset

Clears SpecKit state and allows starting fresh.

---

## Integration Notes

This command integrates with:
- **EDP CLI**: Uses `edp switch` for agent switching
- **SpecKit CLI**: Uses `/speckit.*` commands for each phase
- **Playbook Agents**: Applies agent expertise during implementation

For manual step-by-step execution, use individual `/speckit.*` commands instead.
