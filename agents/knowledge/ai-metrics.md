# AI Usage Metrics Knowledge Base

Comprehensive framework for measuring AI tool adoption, productivity impact, and ROI across engineering teams using multiple AI assistants.

---

## AI Tools Landscape

### Code Assistants

| Tool | Type | Key Features | Metrics Available |
|------|------|--------------|-------------------|
| **GitHub Copilot** | IDE-integrated | Code completion, chat, CLI | Acceptance rate, lines suggested, languages |
| **Cursor** | AI-first IDE | Code generation, codebase chat, composer | Acceptances, generations, chat usage |
| **Claude Code** | CLI/IDE | Agentic coding, multi-file edits, terminal | Tasks completed, tool calls, tokens |
| **ChatGPT** | Web/API | General purpose, code generation | Sessions, messages, code blocks |
| **Amazon CodeWhisperer** | IDE-integrated | AWS-optimized completions | Acceptances, security scans |
| **Tabnine** | IDE-integrated | Team-trained models | Completions, team patterns |
| **Codeium** | IDE-integrated | Free tier, enterprise | Acceptances by language |
| **Sourcegraph Cody** | IDE/Web | Codebase-aware, search integration | Context fetches, completions |

### Agentic Tools

| Tool | Capabilities | Measurable Outputs |
|------|--------------|-------------------|
| **Claude Code** | Multi-file edits, terminal, autonomous tasks | PRs created, files modified, test runs |
| **Devin** | Full autonomous development | Tasks completed, commits, deployments |
| **Sweep** | PR generation from issues | PRs opened, merge rate, time to PR |
| **Codegen agents** | Custom workflows | Pipeline executions, success rate |

### Supporting Tools

| Category | Tools | Metrics |
|----------|-------|---------|
| **Documentation** | Mintlify, GitBook AI | Docs generated, coverage |
| **Testing** | Codium, Diffblue | Tests generated, coverage delta |
| **Code Review** | CodeRabbit, Codacy AI | Reviews automated, issues found |
| **Debugging** | AI debuggers, log analyzers | Issues identified, time saved |

---

## Measurement Framework

### Three Pillars of AI Measurement

```
┌─────────────────────────────────────────────────────────────────┐
│                    AI MEASUREMENT FRAMEWORK                      │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   UTILIZATION   │     IMPACT      │            COST             │
│                 │                 │                             │
│ • Adoption rate │ • Productivity  │ • License costs             │
│ • Active users  │ • Quality       │ • API/token spend           │
│ • Usage freq.   │ • Velocity      │ • Infrastructure            │
│ • Feature usage │ • Satisfaction  │ • Training time             │
└─────────────────┴─────────────────┴─────────────────────────────┘
```

### Utilization Metrics

| Metric | Description | Calculation | Target |
|--------|-------------|-------------|--------|
| **Adoption Rate** | % of devs actively using AI tools | Active AI users / Total devs | >80% |
| **Daily Active Users** | Unique users per day | Count distinct users | Trending up |
| **Session Frequency** | How often devs engage | Sessions per user per day | 5-10 |
| **Feature Adoption** | Which capabilities used | Feature usage distribution | Balanced |
| **Tool Coverage** | AI tools per developer | Avg tools per dev | 2-3 |

### Impact Metrics

| Metric | Description | Data Source | Baseline Comparison |
|--------|-------------|-------------|---------------------|
| **Acceptance Rate** | AI suggestions accepted | Tool telemetry | Pre-AI baseline |
| **AI-Assisted PRs** | PRs with AI contribution | Git metadata/tags | % of total PRs |
| **Cycle Time Delta** | Time from commit to deploy | DORA metrics | Before/after AI |
| **Code Quality** | Defect rate, test coverage | SonarQube, tests | Historical trend |
| **Developer Satisfaction** | Self-reported productivity | Surveys | Quarterly NPS |

### Cost Metrics

| Metric | Description | Tracking Method |
|--------|-------------|-----------------|
| **Cost per Developer** | Total AI spend / headcount | Finance + usage data |
| **Cost per Suggestion** | Total spend / accepted suggestions | Aggregated telemetry |
| **ROI** | (Time saved × hourly rate) - costs | Survey + telemetry |
| **Token Efficiency** | Useful output / tokens consumed | API logs |

---

## Data Collection Methods

### 1. Tool-Native Telemetry

```yaml
github_copilot:
  source: GitHub Copilot Business API
  metrics:
    - acceptance_rate
    - suggestions_accepted
    - lines_of_code_accepted
    - languages_breakdown
    - editor_breakdown
  frequency: daily

cursor:
  source: Cursor analytics dashboard
  metrics:
    - completions_accepted
    - composer_generations
    - chat_messages
    - files_edited
  frequency: weekly

claude_code:
  source: Usage logs / API
  metrics:
    - conversations
    - tool_calls
    - files_modified
    - tokens_consumed
  frequency: per_session
```

### 2. Git-Based Tracking

```bash
# Tag commits with AI assistance
git commit -m "feat: add user auth

AI-Assisted: true
AI-Tools: cursor, claude-code
AI-Contribution: high"

# Query AI-assisted commits
git log --grep="AI-Assisted: true" --oneline | wc -l
```

### 3. PR Metadata

```yaml
# .github/PULL_REQUEST_TEMPLATE.md addition
## AI Assistance

- [ ] AI tools were used in this PR
- AI Tools Used: <!-- copilot, cursor, claude, chatgpt, other -->
- AI Contribution Level: <!-- none, low, medium, high -->
- Tasks AI helped with: <!-- coding, testing, docs, review, debugging -->
```

### 4. Developer Surveys

```markdown
## Monthly AI Usage Survey

1. How many hours per week do you use AI coding tools? [0-40]
2. Which tools do you use? [Multi-select]
3. For which tasks? [Coding, Testing, Docs, Review, Debugging]
4. Estimated productivity improvement? [0-100%]
5. What's your biggest AI productivity blocker?
6. What tasks do you wish AI could help with more?
```

### 5. Time Tracking Integration

```yaml
# Integrate with time tracking tools
toggl_categories:
  - coding_with_ai
  - coding_without_ai
  - ai_prompt_engineering
  - ai_output_review

harvest_tags:
  - ai-assisted
  - traditional
```

---

## Key Performance Indicators

### Leading Indicators (Predict Future Success)

| KPI | What It Measures | Why It Matters |
|-----|------------------|----------------|
| **Adoption Velocity** | Speed of AI tool adoption | Early predictor of impact |
| **Feature Exploration** | New AI features tried | Learning curve progress |
| **Prompt Sophistication** | Quality of AI prompts | Skill development |
| **Tool Switching** | Movement between tools | Finding optimal workflow |

### Lagging Indicators (Confirm Past Performance)

| KPI | What It Measures | Benchmark |
|-----|------------------|-----------|
| **PR Throughput** | PRs merged per developer | +20-40% vs baseline |
| **Cycle Time** | Commit to production | -15-30% vs baseline |
| **Bug Rate** | Defects per KLOC | Stable or improving |
| **Test Coverage** | % code covered by tests | +5-10% vs baseline |
| **Time to First Commit** | New dev onboarding speed | -30-50% vs baseline |

### Quality Indicators

| Metric | Healthy Range | Warning Signs |
|--------|---------------|---------------|
| **AI Code Review Rate** | 90%+ of AI code reviewed | Rubber-stamping AI output |
| **AI Code Rewrite Rate** | <30% requires major edits | Poor prompt quality |
| **Security Scan Pass Rate** | 95%+ on AI-generated code | AI introducing vulnerabilities |
| **Test Pass Rate** | Same as human-written code | Quality regression |

---

## Reporting Templates

### Weekly AI Usage Dashboard

```
┌────────────────────────────────────────────────────────────────┐
│                   WEEKLY AI USAGE REPORT                       │
│                   Week of: [DATE]                              │
├────────────────────────────────────────────────────────────────┤
│ UTILIZATION                                                    │
│ ├─ Active Users:        45/50 (90%)    ▲ +5% vs last week     │
│ ├─ Sessions:            1,247          ▲ +12%                  │
│ ├─ Avg Sessions/Dev:    27.7           ▲ +8%                   │
│ └─ Tool Distribution:                                          │
│    ├─ Copilot:  65%  ████████████████                         │
│    ├─ Cursor:   25%  ██████                                   │
│    └─ Claude:   10%  ██                                       │
├────────────────────────────────────────────────────────────────┤
│ IMPACT                                                         │
│ ├─ AI-Assisted PRs:     78/120 (65%)  ▲ +10%                  │
│ ├─ Acceptance Rate:     42%           ── stable                │
│ ├─ Avg Cycle Time:      2.3 days      ▼ -15%                  │
│ └─ Survey Satisfaction: 4.2/5         ▲ +0.3                  │
├────────────────────────────────────────────────────────────────┤
│ COST                                                           │
│ ├─ Total Spend:         $4,250                                 │
│ ├─ Cost/Developer:      $85/mo                                 │
│ └─ Est. Hours Saved:    180 hrs       ROI: 3.2x               │
└────────────────────────────────────────────────────────────────┘
```

### Monthly Trend Report

```markdown
## Monthly AI Metrics - [MONTH YEAR]

### Executive Summary
- AI adoption reached [X]% (+/-Y% MoM)
- Estimated productivity gain: [X]%
- ROI: [X]x on tool investment

### Adoption Trends
| Week | Active Users | Sessions | Acceptance Rate |
|------|--------------|----------|-----------------|
| W1   | 42           | 980      | 38%             |
| W2   | 44           | 1,102    | 40%             |
| W3   | 45           | 1,247    | 42%             |
| W4   | 47           | 1,389    | 43%             |

### Tool Usage Breakdown
[Chart: Stacked bar by tool by week]

### Impact on Delivery
| Metric          | Pre-AI Baseline | Current | Delta |
|-----------------|-----------------|---------|-------|
| PRs/Dev/Week    | 3.2             | 4.1     | +28%  |
| Cycle Time      | 3.1 days        | 2.3 days| -26%  |
| Bug Rate        | 2.1/KLOC        | 1.8/KLOC| -14%  |

### Developer Feedback
- Top benefit: "Faster boilerplate generation"
- Top challenge: "Inconsistent code style"
- Feature request: "Better codebase context"
```

---

## Implementation Checklist

### Phase 1: Foundation (Weeks 1-2)

- [ ] Inventory all AI tools in use across teams
- [ ] Set up tool-native telemetry collection
- [ ] Create baseline measurements (pre-AI metrics)
- [ ] Design PR template additions for AI tracking
- [ ] Configure git commit conventions

### Phase 2: Data Collection (Weeks 3-4)

- [ ] Deploy PR template changes
- [ ] Communicate commit tagging guidelines
- [ ] Launch first developer survey
- [ ] Set up data aggregation pipeline
- [ ] Create initial dashboards

### Phase 3: Analysis (Weeks 5-8)

- [ ] Establish weekly reporting cadence
- [ ] Calculate initial ROI estimates
- [ ] Identify adoption blockers
- [ ] Benchmark against industry data
- [ ] Document learnings and patterns

### Phase 4: Optimization (Ongoing)

- [ ] A/B test tool configurations
- [ ] Share best practices across teams
- [ ] Refine measurement methodology
- [ ] Track skill development over time
- [ ] Adjust tool mix based on data

---

## Anti-Patterns to Avoid

### Measurement Anti-Patterns

| Anti-Pattern | Why It's Harmful | Better Approach |
|--------------|------------------|-----------------|
| **Lines of Code** | Incentivizes bloat | Focus on PRs, cycle time |
| **Raw Suggestion Count** | Quantity ≠ Quality | Use acceptance rate + quality metrics |
| **Individual Rankings** | Creates competition | Team-level metrics |
| **Daily Micrometrics** | Analysis paralysis | Weekly trends |
| **Ignoring Quality** | Tech debt accumulation | Pair productivity with quality |

### Adoption Anti-Patterns

| Anti-Pattern | Symptom | Resolution |
|--------------|---------|------------|
| **Mandate without training** | Low adoption, frustration | Invest in enablement |
| **No time for learning** | Superficial usage | Dedicated exploration time |
| **One-size-fits-all** | Poor fit for some roles | Role-specific recommendations |
| **Ignoring security** | Sensitive data in prompts | Clear usage policies |

---

## Benchmarks and Targets

### Industry Benchmarks (2025-2026)

| Metric | Median | Top Quartile |
|--------|--------|--------------|
| AI Tool Adoption | 75% | 90%+ |
| Acceptance Rate | 35% | 45%+ |
| AI-Assisted PRs | 50% | 70%+ |
| Productivity Gain (self-reported) | 25% | 40%+ |
| ROI on AI Investment | 2x | 4x+ |

### Maturity Model

```
Level 1: EXPLORING
├─ <25% adoption
├─ Individual tool choice
├─ No measurement
└─ Ad-hoc usage

Level 2: ADOPTING
├─ 25-50% adoption
├─ Standard tool selection
├─ Basic usage tracking
└─ Some best practices

Level 3: SCALING
├─ 50-75% adoption
├─ Multi-tool strategy
├─ Comprehensive metrics
└─ Team-level optimization

Level 4: OPTIMIZING
├─ 75-90% adoption
├─ Integrated AI workflows
├─ ROI-driven decisions
└─ Continuous improvement

Level 5: TRANSFORMING
├─ 90%+ adoption
├─ AI-native development
├─ Predictive analytics
└─ Industry leadership
```

---

## Survey Templates

### Quarterly Developer Experience Survey

```yaml
survey:
  name: "AI Tools Developer Experience"
  frequency: quarterly

  sections:
    - name: "Usage Patterns"
      questions:
        - type: scale
          question: "How often do you use AI coding tools?"
          options: [Never, Rarely, Sometimes, Often, Always]

        - type: multi_select
          question: "Which AI tools do you use regularly?"
          options: [Copilot, Cursor, Claude, ChatGPT, Cody, Other]

        - type: multi_select
          question: "What tasks do you use AI for?"
          options:
            - Code completion
            - Code generation
            - Bug fixing
            - Test writing
            - Documentation
            - Code review
            - Learning/exploration

    - name: "Productivity Impact"
      questions:
        - type: scale_1_10
          question: "How much has AI improved your productivity?"

        - type: percentage
          question: "What % of your code involves AI assistance?"

        - type: open
          question: "What's your biggest AI productivity win?"

    - name: "Challenges"
      questions:
        - type: multi_select
          question: "What limits your AI tool usage?"
          options:
            - Learning curve
            - Trust in output
            - Code quality concerns
            - Security policies
            - Tool performance
            - Context limitations

        - type: open
          question: "What would make AI tools more useful for you?"

    - name: "Satisfaction"
      questions:
        - type: nps
          question: "How likely are you to recommend AI tools to peers?"
```

---

*This knowledge base provides the foundation for comprehensive AI usage measurement across engineering organizations.*
