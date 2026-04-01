# CI/CD Quality Gates Knowledge Base

## What Are Quality Gates?

Quality gates are automated checkpoints in your CI/CD pipeline that evaluate code against predefined criteria. They act as guardrails, preventing code that doesn't meet standards from progressing to the next stage.

**Key Principle**: Shift left - catch issues as early as possible where they're cheapest to fix.

---

## Quality Gate Categories

### 1. Build Gates

**Must Pass**: The code must compile and build successfully.

```yaml
build:
  name: Build
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Setup
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Compilation | 0 errors | Block |
| Build warnings | < 10 new | Warn |
| Build time | < 5 min | Alert |

---

### 2. Testing Gates

#### Unit Tests

```yaml
unit-tests:
  name: Unit Tests
  needs: build
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm run test:unit -- --coverage
    - name: Upload coverage
      uses: codecov/codecov-action@v4
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Test pass rate | 100% | Block |
| New code coverage | >= 80% | Block |
| Overall coverage | >= 75% | Warn |
| Test duration | < 5 min | Alert |

#### Integration Tests

```yaml
integration-tests:
  name: Integration Tests
  needs: build
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:15
      env:
        POSTGRES_PASSWORD: test
      options: >-
        --health-cmd pg_isready
        --health-interval 10s
        --health-timeout 5s
        --health-retries 5
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm run test:integration
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Test pass rate | 100% | Block |
| Test duration | < 15 min | Alert |

#### E2E Tests

```yaml
e2e-tests:
  name: E2E Tests
  needs: [build, integration-tests]
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npm run test:e2e
```

---

### 3. Code Quality Gates

#### Linting

```yaml
lint:
  name: Lint
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm run lint
    - run: npm run lint:styles  # CSS/SCSS
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Lint errors | 0 | Block |
| Lint warnings | 0 new | Warn |

#### Type Checking

```yaml
type-check:
  name: Type Check
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm run typecheck  # tsc --noEmit
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Type errors | 0 | Block |

#### Code Formatting

```yaml
format-check:
  name: Format Check
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm run format:check  # prettier --check
```

---

### 4. Security Gates

#### Static Application Security Testing (SAST)

```yaml
sast:
  name: Security Scan (SAST)
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Run Semgrep
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/security-audit
          p/secrets
          p/owasp-top-ten
```

| Severity | Action |
|----------|--------|
| Critical | Block immediately |
| High | Block |
| Medium | Warn, review required |
| Low | Inform |

#### Dependency Scanning

```yaml
dependency-scan:
  name: Dependency Audit
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm audit --audit-level=high

    # Or using Snyk
    - uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

| Severity | Action |
|----------|--------|
| Critical vulnerabilities | Block |
| High vulnerabilities | Block |
| Medium vulnerabilities | Warn |
| Outdated dependencies | Inform |

#### Secret Scanning

```yaml
secret-scan:
  name: Secret Detection
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

### 5. Performance Gates

#### Benchmark Tests

```yaml
performance:
  name: Performance Benchmarks
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npm run benchmark
    - name: Compare with baseline
      uses: benchmark-action/github-action-benchmark@v1
      with:
        tool: 'customSmallerIsBetter'
        output-file-path: benchmark-results.json
        fail-on-alert: true
        alert-threshold: '150%'  # Fail if 50% slower
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Response time regression | > 20% slower | Warn |
| Response time regression | > 50% slower | Block |
| Memory regression | > 30% increase | Warn |

#### Bundle Size

```yaml
bundle-size:
  name: Bundle Size Check
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci && npm run build
    - uses: preactjs/compressed-size-action@v2
      with:
        pattern: './dist/**/*.{js,css}'
        compression: 'gzip'
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Bundle size increase | > 10KB | Warn |
| Bundle size increase | > 50KB | Review required |

---

### 6. Code Metrics Gates

#### SonarQube Integration

```yaml
sonarqube:
  name: SonarQube Analysis
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - uses: sonarsource/sonarqube-scan-action@master
      env:
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
        SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
    - uses: sonarsource/sonarqube-quality-gate-action@master
      env:
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**SonarQube Quality Gate Conditions:**

| Metric | Condition | Threshold |
|--------|-----------|-----------|
| New Coverage | >= | 80% |
| New Duplicated Lines | <= | 3% |
| New Maintainability Rating | <= | A |
| New Reliability Rating | <= | A |
| New Security Rating | <= | A |
| New Security Hotspots Reviewed | = | 100% |

#### Complexity Checks

```yaml
complexity:
  name: Code Complexity
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: npm ci
    - run: npx eslint . --rule 'complexity: ["error", 10]'
```

| Check | Threshold | Action |
|-------|-----------|--------|
| Cyclomatic complexity | > 10 per function | Warn |
| Cyclomatic complexity | > 20 per function | Block |
| Cognitive complexity | > 15 per function | Warn |

---

### 7. Documentation Gates

```yaml
docs-check:
  name: Documentation Check
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Check for README
      run: |
        if [ ! -f README.md ]; then
          echo "README.md is required"
          exit 1
        fi
    - name: Check API docs
      run: npm run docs:check  # typedoc validation
    - name: Link checker
      uses: lycheeverse/lychee-action@v1
      with:
        args: --verbose --no-progress '**/*.md'
```

---

## Complete Pipeline Example

```yaml
name: CI/CD Pipeline

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  # Stage 1: Quick checks (parallel)
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run typecheck

  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run format:check

  # Stage 2: Build
  build:
    needs: [lint, type-check, format]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/

  # Stage 3: Tests (parallel)
  unit-tests:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - uses: codecov/codecov-action@v4

  integration-tests:
    needs: build
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:integration

  # Stage 4: Security (parallel with tests)
  security-scan:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: returntocorp/semgrep-action@v1
      - run: npm audit --audit-level=high

  # Stage 5: Quality Gate
  quality-gate:
    needs: [unit-tests, integration-tests, security-scan]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: sonarsource/sonarqube-scan-action@master
      - uses: sonarsource/sonarqube-quality-gate-action@master

  # Stage 6: Deploy (main only)
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: quality-gate
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: actions/download-artifact@v4
        with:
          name: build
      - run: echo "Deploy to production"
```

---

## Branch Protection Configuration

```yaml
# GitHub Branch Protection Rules
protection_rules:
  main:
    required_status_checks:
      strict: true
      contexts:
        - lint
        - type-check
        - build
        - unit-tests
        - integration-tests
        - security-scan
        - quality-gate
    required_pull_request_reviews:
      required_approving_review_count: 2
      dismiss_stale_reviews: true
      require_code_owner_reviews: true
    require_signed_commits: false
    require_linear_history: true
    restrictions:
      users: []
      teams: ["maintainers"]
    allow_force_pushes: false
    allow_deletions: false
```

---

## Quality Gate Failure Handling

### Escalation Matrix

| Gate | First Failure | Repeated Failures |
|------|---------------|-------------------|
| Build | Author fixes | Pair with senior |
| Unit Tests | Author fixes | Review test strategy |
| Security (Critical) | Immediate fix + notify security | Post-mortem |
| Coverage Drop | Add tests before merge | Review with team |
| Performance Regression | Profile and justify | Architecture review |

### Override Process

For exceptional cases where a gate needs to be bypassed:
1. Document reason in PR
2. Get approval from 2 senior engineers
3. Create follow-up ticket with deadline
4. Add `override-gate` label
5. Track in tech debt backlog
