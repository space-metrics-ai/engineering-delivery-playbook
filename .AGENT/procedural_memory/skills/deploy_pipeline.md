# Deploy Pipeline - Deployment Checklist

## Pre-Deploy

- [ ] All tests passing (unit, integration, e2e)
- [ ] Code reviewed and approved
- [ ] No critical/high security vulnerabilities
- [ ] Database migrations tested
- [ ] Feature flags configured (if applicable)
- [ ] Rollback plan documented
- [ ] Monitoring/alerting in place

## Deploy Steps

1. **Merge to main** — squash or rebase
2. **CI pipeline runs** — build, test, lint, security scan
3. **Deploy to staging** — verify in staging environment
4. **Smoke tests** — run critical path tests
5. **Deploy to production** — gradual rollout if possible
6. **Monitor** — watch metrics for 15-30 minutes

## Post-Deploy

- [ ] Verify key metrics are stable
- [ ] Check error rates
- [ ] Confirm feature works as expected
- [ ] Update status page if needed
- [ ] Notify team of deployment

## Rollback Triggers

- Error rate > 1% increase
- Latency p99 > 2x baseline
- Critical functionality broken
- Data integrity issues

## Rollback Steps

1. Revert the deployment
2. Verify rollback is successful
3. Notify team
4. Create incident report
5. Fix and re-deploy
