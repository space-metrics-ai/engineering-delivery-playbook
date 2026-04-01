# Code Review Guidelines Knowledge Base

## Review Philosophy

### Why We Review Code

1. **Catch Defects Early** - Issues found in review are 15x cheaper than post-release
2. **Share Knowledge** - Spread context and patterns across the team
3. **Maintain Quality** - Ensure consistency and standards
4. **Improve Design** - Fresh eyes catch architectural issues
5. **Mentorship** - Junior developers learn from feedback

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Assume Good Intent** | The author tried their best |
| **Critique Code, Not People** | "This code..." not "You..." |
| **Be Specific** | Point to exact issues with examples |
| **Offer Solutions** | Don't just criticize, suggest fixes |
| **Timebox Reviews** | Respond within hours, not days |

---

## Conventional Comments

### Label Reference

Every comment MUST have a label prefix:

```
<label>: <subject>

[detailed explanation]

[code suggestion]
```

| Label | Severity | Blocks? | Use For |
|-------|----------|---------|---------|
| `blocker:` | Critical | **YES** | Security, data loss, crashes |
| `issue:` | High | **YES** | Bugs, significant problems |
| `suggestion:` | Medium | No | Improvements, better approaches |
| `question:` | - | No | Seeking clarification |
| `nitpick:` | Low | No | Style, minor preferences |
| `thought:` | - | No | Future consideration |
| `praise:` | - | No | Positive reinforcement |
| `convention:` | Varies | Varies | Team standards |

### Examples by Category

#### Blocker Examples
```markdown
blocker: SQL injection vulnerability

User input is concatenated directly into the query string.
This allows attackers to execute arbitrary SQL.

Use parameterized queries:
​```java
PreparedStatement stmt = conn.prepareStatement(
    "SELECT * FROM users WHERE id = ?"
);
stmt.setLong(1, userId);
​```
```

```markdown
blocker: Race condition in concurrent access

Multiple threads can modify `userCache` simultaneously without synchronization.
This will cause data corruption under load.

Consider using ConcurrentHashMap or adding synchronization.
```

#### Issue Examples
```markdown
issue: Missing null check will cause NPE

`user.getAddress().getCity()` will throw if address is null.
This is a common path when users haven't set their address.

Consider:
​```java
Optional.ofNullable(user.getAddress())
    .map(Address::getCity)
    .orElse("Unknown");
​```
```

```markdown
issue: N+1 query problem

This loop executes a query per user. With 1000 users, that's 1000 queries.
This will cause severe performance issues.

Fetch all orders in a single query with a JOIN or batch fetch.
```

#### Suggestion Examples
```markdown
suggestion: Consider extracting to a helper method

This validation logic is repeated in 3 places. Extracting to a
`validateOrderRequest()` method would:
- Reduce duplication
- Make testing easier
- Centralize the rules

Not blocking, but would improve maintainability.
```

```markdown
suggestion: Stream API might be cleaner here

This for-loop with manual list building could be simplified:
​```java
List<String> names = users.stream()
    .filter(User::isActive)
    .map(User::getName)
    .collect(Collectors.toList());
​```

Personal preference - current code is also fine.
```

#### Question Examples
```markdown
question: Why are we caching this for 24 hours?

The user profile can change frequently (email, preferences).
Is there a specific reason for this long TTL?

Asking to understand, not necessarily suggesting a change.
```

```markdown
question: Should this handle the empty list case differently?

Currently returns null for empty input. Is that intentional?
Some callers might expect an empty list back instead.
```

#### Nitpick Examples
```markdown
nit: Prefer `isEmpty()` over `size() == 0`

More readable and potentially more efficient for some collection types.
​```java
if (users.isEmpty()) { ... }
​```
```

```markdown
nit: Consider alphabetizing these imports

Makes it easier to scan and find specific imports.
Not important, just a preference.
```

#### Praise Examples
```markdown
praise: Excellent error handling!

The retry logic with exponential backoff is exactly right.
Thanks for handling all the edge cases.
```

```markdown
praise: Great test coverage

These tests cover the happy path and all the edge cases I can think of.
The test names are clear and descriptive too.
```

---

## Review Checklist

### Correctness
- [ ] Code does what the PR description claims
- [ ] Logic is sound and handles edge cases
- [ ] Error paths are handled appropriately
- [ ] No obvious bugs or off-by-one errors
- [ ] Concurrent code is thread-safe

### Security
- [ ] No SQL injection (parameterized queries used)
- [ ] No XSS (output properly escaped)
- [ ] No SSRF (URLs validated)
- [ ] Input validated at boundaries
- [ ] No hardcoded secrets
- [ ] Auth/authz properly checked
- [ ] Sensitive data not logged

### Performance
- [ ] No N+1 queries
- [ ] Appropriate database indexes
- [ ] No memory leaks (resources closed)
- [ ] Pagination for large datasets
- [ ] No unnecessary computation
- [ ] Caching considered where appropriate

### Architecture
- [ ] Follows existing patterns in codebase
- [ ] Appropriate abstraction level
- [ ] No unnecessary coupling
- [ ] Single responsibility maintained
- [ ] Changes are cohesive

### Testing
- [ ] Tests exist for new functionality
- [ ] Tests actually test the behavior
- [ ] Happy path covered
- [ ] Error cases covered
- [ ] Edge cases covered
- [ ] Tests aren't brittle

### Maintainability
- [ ] Code is readable
- [ ] Complex logic has comments
- [ ] No dead code
- [ ] Meaningful names
- [ ] Functions are appropriately sized
- [ ] No magic numbers/strings

---

## Review Process

### Before Reviewing

1. **Read the PR description** - Understand context first
2. **Check CI status** - Don't review if builds are failing
3. **Assess size** - Request split if > 400 lines
4. **Note your time** - Set aside focused time

### During Review

```
1. SKIM THE DIFF
   └── Get overall picture of changes

2. UNDERSTAND THE ARCHITECTURE
   └── How does this fit in the system?

3. CHECK THE TESTS FIRST
   └── Tests reveal intent

4. REVIEW FILE BY FILE
   └── Focus on changed code

5. TRACK YOUR COMMENTS
   └── Note blockers vs suggestions

6. LOOK FOR PATTERNS
   └── Same issue in multiple places?
```

### After Review

| If | Then |
|----|----|
| Only praise/nits | **Approve** |
| Only suggestions/questions | **Approve** |
| Any `issue:` comments | **Request Changes** |
| Any `blocker:` comments | **Request Changes** + ping author |
| Major concerns | Request sync discussion |

---

## Feedback Techniques

### What to Avoid

| Don't | Do |
|-------|-----|
| "This is wrong" | "This might cause X because..." |
| "You should..." | "Consider..." or "What about..." |
| "Why didn't you..." | "What was the reason for..." |
| "Obviously..." | [Don't say it] |
| "Just..." | [Implies it's easy] |

### Frame as Questions

```markdown
# Instead of:
"This variable name is bad"

# Try:
"question: What does `d` represent here? A more descriptive name
like `durationMs` might help future readers."
```

### Provide Context

```markdown
# Instead of:
"Use dependency injection"

# Try:
"suggestion: Consider using dependency injection here

This would make the class easier to test since we could mock
the UserRepository. Currently, we'd need integration tests
for any method that touches the database.

Example:
​```java
public UserService(UserRepository repository) {
    this.repository = repository;
}
​```
"
```

### Acknowledge Trade-offs

```markdown
"suggestion: Consider caching this result

The trade-off is added complexity vs performance gain.
Given this is called ~1000 times per request,
caching might be worth it.

But if you've profiled and it's not a bottleneck,
feel free to leave as-is."
```

---

## Special Review Types

### Security Reviews
- Flag with `review: needs-security` label
- Focus on OWASP Top 10
- Check for secrets in code/config
- Verify auth/authz logic
- Review cryptographic usage

### Database Reviews
- Flag with `review: needs-dba` label
- Check migration is reversible
- Verify indexes exist for queries
- Review for locking concerns
- Check for production data impact

### Architecture Reviews
- Flag with `review: needs-arch` label
- Review system boundaries
- Check for coupling/cohesion
- Verify patterns are appropriate
- Consider future maintainability

---

## Review Metrics

### Healthy Team Metrics

| Metric | Target | Warning |
|--------|--------|---------|
| Time to first review | < 4 hours | > 24 hours |
| Review cycles | < 2 | > 3 |
| Comments per PR | 3-7 | > 15 |
| PR merge time | < 24 hours | > 48 hours |
| Review coverage | 100% | < 95% |

### Anti-Patterns to Watch

- **Rubber stamping**: Approving without reading
- **Nitpick storms**: 20+ comments on style
- **Ghost reviewing**: Never responding to follow-ups
- **Hero reviewing**: One person reviews everything
- **Review procrastination**: Days before first response

---

## Templates

### First-Time Contributor Response
```markdown
Welcome to the project! Thanks for your first contribution!

I've left some feedback below. Don't worry about the number
of comments - we're thorough with all PRs, not just new contributors.

A few things that would help:
- [Specific asks]

Feel free to ask questions on any feedback you don't understand.
We're here to help!
```

### Approval Message
```markdown
LGTM! Nice work on [specific positive].

Left a few optional nits - address if you agree, otherwise
feel free to merge.
```

### Request Changes Message
```markdown
Thanks for the PR! Found a few things that need addressing
before we can merge:

**Must fix:**
- [List blocking issues]

**Should consider:**
- [List suggestions]

Let me know if you have questions about any of the feedback.
Happy to hop on a call if that's easier.
```
