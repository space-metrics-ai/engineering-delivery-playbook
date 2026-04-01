# Pull Request Templates Knowledge Base

## Standard PR Template

```markdown
## Summary
<!-- Brief description of what this PR does and why -->

## Type of Change
<!-- Check all that apply -->
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] Feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Refactor (no functional changes)
- [ ] Documentation
- [ ] Chore (dependencies, configs, etc.)

## Changes Made
<!-- Bullet points of specific changes -->
-

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

### Test Instructions
<!-- Steps for reviewers to verify the changes -->
1.
2.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if applicable)
- [ ] No new warnings introduced
- [ ] Dependencies updated in lockfile

## Breaking Changes
<!-- Describe any breaking changes and migration steps -->
<!-- Delete this section if not applicable -->

## Screenshots/Recordings
<!-- For UI changes - delete if not applicable -->

## Related Issues
<!-- Link to related issues -->
Closes #
Related to #
```

---

## Specialized Templates

### Bug Fix Template

```markdown
## Bug Fix

### Problem
<!-- What was the bug? Include error messages, stack traces if applicable -->

### Root Cause
<!-- What caused the bug? -->

### Solution
<!-- How does this PR fix it? -->

### How to Reproduce (Before Fix)
1.
2.
3.

### Verification (After Fix)
1.
2.

## Changes Made
-

## Testing
- [ ] Unit test added to prevent regression
- [ ] Manually verified fix
- [ ] Tested related functionality for side effects

## Checklist
- [ ] Self-review completed
- [ ] Root cause understood (not just symptoms fixed)
- [ ] No new warnings introduced

## Related Issues
Fixes #
```

### Feature Template

```markdown
## Feature: [Feature Name]

### Description
<!-- What does this feature do? -->

### Motivation
<!-- Why is this feature needed? Link to RFC/design doc if available -->

### User Story
<!-- As a [role], I want [capability] so that [benefit] -->
As a _____, I want _____ so that _____.

## Implementation Details
<!-- High-level approach taken -->

### Key Changes
-

### API Changes
<!-- New endpoints, modified signatures, etc. -->

### Database Changes
<!-- New tables, columns, migrations -->
- [ ] Migration included
- [ ] Rollback tested

## Testing
- [ ] Unit tests cover new functionality
- [ ] Integration tests added
- [ ] Edge cases tested
- [ ] Performance tested (if applicable)

### Test Plan
1.
2.

## Feature Flag
<!-- Is this behind a feature flag? -->
- [ ] Yes - Flag name: `___`
- [ ] No

## Documentation
- [ ] README updated
- [ ] API docs updated
- [ ] User-facing docs updated

## Rollout Plan
<!-- How will this be released? -->

## Related Issues
Implements #
```

### Refactor Template

```markdown
## Refactor: [Component/Area]

### Motivation
<!-- Why is this refactor needed? -->
- [ ] Improve readability
- [ ] Reduce complexity
- [ ] Enable future work
- [ ] Fix technical debt
- [ ] Performance improvement

### Scope
<!-- What's being refactored? -->

### Approach
<!-- How are you refactoring? What pattern/principle applied? -->

## Changes Made
<!-- Be specific about structural changes -->
-

## What's NOT Changing
<!-- Clarify what behavior remains the same -->
-

## Risk Assessment
- [ ] Low risk - isolated changes
- [ ] Medium risk - touches core functionality
- [ ] High risk - wide-reaching changes

## Testing
- [ ] Existing tests still pass
- [ ] No new tests needed (behavior unchanged)
- [ ] Added tests for previously untested code

## Verification Steps
<!-- How to verify refactor doesn't break anything -->
1.

## Related Issues
Related to #
```

### Database Migration Template

```markdown
## Database Migration

### Migration Type
- [ ] Schema change (new table/column)
- [ ] Data migration
- [ ] Index change
- [ ] Both schema and data

### Description
<!-- What does this migration do? -->

### SQL Changes
```sql
-- Up migration
--

-- Down migration (rollback)
--
```

## Risk Assessment

### Impact
- [ ] Additive only (safe)
- [ ] Column/table removal (verify no usage)
- [ ] Data transformation (verify correctness)
- [ ] Index change (verify performance)

### Estimated Duration
<!-- How long will migration take in production? -->
- Development: ~___
- Staging: ~___
- Production (estimated): ~___

### Locking
- [ ] No table locks
- [ ] Brief lock expected
- [ ] Extended lock - maintenance window needed

## Rollback Plan
<!-- How to rollback if something goes wrong -->

## Testing
- [ ] Migration tested on copy of production data
- [ ] Rollback tested
- [ ] Application tested with new schema
- [ ] Performance verified

## Deployment Notes
<!-- Special instructions for deployment -->

## Checklist
- [ ] DBA review requested (if significant)
- [ ] Backup verified before migration
- [ ] Monitoring in place
- [ ] Rollback script tested
```

### Hotfix Template

```markdown
## HOTFIX: [Brief Description]

### Incident
<!-- Link to incident ticket/page -->
Related Incident:

### Severity
- [ ] P1 - Critical (service down)
- [ ] P2 - High (major feature broken)
- [ ] P3 - Medium (significant impact)

### Problem
<!-- What's broken? Impact? -->

### Fix
<!-- What does this hotfix do? -->

### Root Cause
<!-- Brief root cause (full RCA to follow) -->

## Changes Made
-

## Testing
- [ ] Fix verified in staging
- [ ] Regression test passed
- [ ] Minimal change (no scope creep)

## Rollback
<!-- How to rollback if fix causes issues -->

## Post-Merge
- [ ] Monitor dashboards after deploy
- [ ] Create follow-up ticket for proper fix (if applicable)
- [ ] Update incident timeline

## Approvals
<!-- Hotfixes may need expedited approval -->
- [ ] Oncall engineer approved
- [ ] Team lead approved (P1/P2)
```

### Dependency Update Template

```markdown
## Dependency Update

### Updated Dependencies
| Package | Old Version | New Version | Type |
|---------|-------------|-------------|------|
| | | | Major/Minor/Patch |

### Reason for Update
- [ ] Security vulnerability
- [ ] Bug fix needed
- [ ] New feature needed
- [ ] Routine maintenance

### Security Advisory
<!-- If security update, link to CVE/advisory -->

## Changelog Highlights
<!-- Key changes from dependency changelog -->
-

### Breaking Changes
<!-- Any breaking changes from the update? -->
- [ ] None
- [ ] Yes (details below)

## Testing
- [ ] All tests pass
- [ ] Manual smoke test
- [ ] Checked for deprecated APIs

## Checklist
- [ ] Lockfile updated
- [ ] Peer dependencies satisfied
- [ ] No conflicting versions
```

---

## Template Best Practices

### Do's

1. **Keep it concise** - Only include necessary sections
2. **Use checkboxes** - Easy to scan and verify
3. **Include examples** - Guide contributors
4. **Make sections optional** - Use "delete if not applicable"
5. **Link to resources** - Style guides, docs, etc.

### Don'ts

1. **Don't over-template** - Too long = ignored
2. **Don't require everything** - Mark what's truly required
3. **Don't be vague** - "Describe changes" vs specific prompts
4. **Don't forget mobile** - Many review PRs on mobile

---

## GitHub Template Setup

### Single Template
```
.github/
└── PULL_REQUEST_TEMPLATE.md
```

### Multiple Templates
```
.github/
└── PULL_REQUEST_TEMPLATE/
    ├── bug_fix.md
    ├── feature.md
    ├── refactor.md
    ├── hotfix.md
    └── dependency.md
```

To use: `?template=feature.md` in PR URL

### Template Configuration

```yaml
# .github/PULL_REQUEST_TEMPLATE/config.yml
blank_issues_enabled: false
contact_links:
  - name: Questions
    url: https://slack.com/your-channel
    about: Ask questions in Slack first
```
