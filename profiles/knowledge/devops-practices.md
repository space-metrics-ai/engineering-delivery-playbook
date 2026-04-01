# DevOps Practices Knowledge Base

Comprehensive reference for DevOps, SRE, and Platform Engineering practices covering infrastructure, CI/CD, observability, and operational excellence.

---

## Table of Contents

1. [DevOps Principles](#devops-principles)
2. [CI/CD Patterns](#cicd-patterns)
3. [Infrastructure as Code](#infrastructure-as-code)
4. [Container Orchestration](#container-orchestration)
5. [Observability](#observability)
6. [Security Practices](#security-practices)
7. [Reliability Engineering](#reliability-engineering)
8. [Cost Optimization](#cost-optimization)

---

## DevOps Principles

### The Three Ways

| Principle | Description | Practices |
|-----------|-------------|-----------|
| **Flow** | Accelerate delivery from Dev to Ops | CI/CD, small batches, WIP limits |
| **Feedback** | Fast feedback at all stages | Monitoring, testing, reviews |
| **Learning** | Continuous experimentation | Blameless postmortems, chaos engineering |

### CALMS Framework

| Pillar | Focus |
|--------|-------|
| **C**ulture | Collaboration, shared responsibility |
| **A**utomation | Eliminate manual toil |
| **L**ean | Eliminate waste, continuous improvement |
| **M**easurement | Data-driven decisions |
| **S**haring | Knowledge sharing, transparency |

### DevOps vs SRE vs Platform Engineering

| Role | Focus | Key Metrics |
|------|-------|-------------|
| **DevOps** | Culture, automation, delivery | Deployment frequency, lead time |
| **SRE** | Reliability, scalability, operations | SLOs, error budget, MTTR |
| **Platform** | Developer experience, self-service | Adoption, onboarding time |

---

## CI/CD Patterns

### Pipeline Stages

```
┌─────────┐    ┌──────────┐    ┌─────────┐    ┌──────────┐    ┌────────┐
│  Build  │───▶│   Test   │───▶│ Security│───▶│  Deploy  │───▶│ Verify │
└─────────┘    └──────────┘    └─────────┘    └──────────┘    └────────┘
     │              │               │              │              │
     ▼              ▼               ▼              ▼              ▼
  Compile        Unit            SAST/DAST     Staging      Smoke tests
  Package       Integration      Secrets       Production   Monitoring
  Artifacts     E2E             Compliance                  Rollback
```

### Deployment Strategies

| Strategy | Description | Use Case | Risk |
|----------|-------------|----------|------|
| **Rolling** | Gradual replacement | Stateless apps | Medium |
| **Blue-Green** | Switch between environments | Zero downtime | Low |
| **Canary** | Route % to new version | Risk mitigation | Low |
| **A/B Testing** | Feature experimentation | User testing | Low |
| **Recreate** | Stop all, deploy new | Stateful, dev | High |
| **Shadow** | Mirror traffic | Testing in prod | Very Low |

### Blue-Green Deployment

```
           ┌─────────────────────────────────┐
           │         Load Balancer           │
           └───────────────┬─────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
    ┌──────────────────┐     ┌──────────────────┐
    │   Blue (v1.0)    │     │   Green (v1.1)   │
    │   [ACTIVE]       │     │   [STANDBY]      │
    │   100% traffic   │     │   0% traffic     │
    └──────────────────┘     └──────────────────┘
              │                         │
              ▼                         ▼
    ┌──────────────────┐     ┌──────────────────┐
    │    Database      │◀───▶│    Database      │
    │   (shared or     │     │   (or migrated)  │
    │   migrated)      │     │                  │
    └──────────────────┘     └──────────────────┘
```

### Canary Deployment

```
                    ┌─────────────┐
                    │   Ingress   │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │ 90%                 10% │
              ▼                         ▼
    ┌──────────────────┐     ┌──────────────────┐
    │   Stable (v1.0)  │     │   Canary (v1.1)  │
    │   9 replicas     │     │   1 replica      │
    └──────────────────┘     └──────────────────┘
              │                         │
              └────────────┬────────────┘
                           ▼
              ┌──────────────────────┐
              │  Metrics & Alerts    │
              │  Error rate < 1%?    │
              │  Latency normal?     │
              └──────────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
          Promote                   Rollback
```

### GitOps Workflow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Developer  │───▶│   Git Push  │───▶│   CI Build  │
└─────────────┘    └─────────────┘    └──────┬──────┘
                                             │
                                             ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Production │◀───│  ArgoCD     │◀───│ Config Repo │
│  Cluster    │    │  (Pull)     │    │ (Update)    │
└─────────────┘    └─────────────┘    └─────────────┘
```

---

## Infrastructure as Code

### IaC Tool Comparison

| Tool | Language | State | Multi-Cloud | Learning Curve |
|------|----------|-------|-------------|----------------|
| **Terraform** | HCL | Remote | Excellent | Medium |
| **Pulumi** | Python/TS/Go | Remote | Excellent | Low (if you know lang) |
| **CloudFormation** | YAML/JSON | Managed | AWS only | Medium |
| **CDK** | Python/TS/Java | CF Stack | AWS focused | Medium |
| **Ansible** | YAML | Stateless | Good | Low |
| **Crossplane** | YAML | K8s CRD | Excellent | High |

### Terraform Module Design

```
modules/
├── vpc/
│   ├── main.tf          # Resources
│   ├── variables.tf     # Input variables
│   ├── outputs.tf       # Output values
│   ├── versions.tf      # Provider constraints
│   └── README.md        # Documentation
├── eks/
├── rds/
└── s3/

environments/
├── dev/
│   ├── main.tf          # Module calls
│   ├── backend.tf       # State config
│   ├── providers.tf     # Provider config
│   └── terraform.tfvars # Environment values
├── staging/
└── prod/
```

### Terraform Best Practices

| Practice | Description |
|----------|-------------|
| Remote state | S3 + DynamoDB for locking |
| State per environment | Isolation and blast radius |
| Module versioning | Tag releases, use version constraints |
| Variable validation | Validate inputs early |
| Sensitive data | Mark sensitive, use secrets manager |
| Resource tagging | Consistent tagging strategy |
| Plan before apply | Always review plan output |
| Import existing | Use `terraform import` for existing resources |

### State Management

```hcl
# backend.tf - Production
terraform {
  backend "s3" {
    bucket         = "company-terraform-state"
    key            = "prod/infrastructure/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"

    # Role for cross-account access
    role_arn       = "arn:aws:iam::PROD_ACCOUNT:role/TerraformStateAccess"
  }
}
```

---

## Container Orchestration

### Kubernetes Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Control Plane                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  API Server  │  │  Scheduler   │  │ Controller Mgr   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                       etcd                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   Worker 1    │    │   Worker 2    │    │   Worker 3    │
│  ┌─────────┐  │    │  ┌─────────┐  │    │  ┌─────────┐  │
│  │ kubelet │  │    │  │ kubelet │  │    │  │ kubelet │  │
│  ├─────────┤  │    │  ├─────────┤  │    │  ├─────────┤  │
│  │kube-prxy│  │    │  │kube-prxy│  │    │  │kube-prxy│  │
│  ├─────────┤  │    │  ├─────────┤  │    │  ├─────────┤  │
│  │container│  │    │  │container│  │    │  │container│  │
│  │ runtime │  │    │  │ runtime │  │    │  │ runtime │  │
│  └─────────┘  │    │  └─────────┘  │    │  └─────────┘  │
└───────────────┘    └───────────────┘    └───────────────┘
```

### Resource Management

| Resource | Request | Limit | Notes |
|----------|---------|-------|-------|
| **CPU** | Guaranteed allocation | Throttled if exceeded | Measured in millicores |
| **Memory** | Guaranteed allocation | OOMKilled if exceeded | Measured in Mi/Gi |
| **Storage** | PVC request | PVC limit | Depends on storage class |

### Quality of Service (QoS)

| Class | Condition | Priority |
|-------|-----------|----------|
| **Guaranteed** | requests == limits for all containers | Highest |
| **Burstable** | requests < limits | Medium |
| **BestEffort** | No requests or limits | Lowest (evicted first) |

### Pod Disruption Budget

```yaml
# Ensure minimum availability during maintenance
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2          # OR maxUnavailable: 1
  selector:
    matchLabels:
      app: myapp
```

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 3
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
```

---

## Observability

### The Three Pillars

| Pillar | Purpose | Tools |
|--------|---------|-------|
| **Metrics** | Quantitative measurements | Prometheus, Datadog, CloudWatch |
| **Logs** | Event records | ELK, Loki, Splunk |
| **Traces** | Request flow | Jaeger, Zipkin, OpenTelemetry |

### Golden Signals (SRE)

| Signal | Description | Example Metrics |
|--------|-------------|-----------------|
| **Latency** | Time to serve requests | p50, p95, p99 response time |
| **Traffic** | Demand on system | Requests per second |
| **Errors** | Rate of failures | 5xx rate, error count |
| **Saturation** | Resource utilization | CPU, memory, disk, connections |

### RED Method (Microservices)

| Metric | Description |
|--------|-------------|
| **R**ate | Requests per second |
| **E**rrors | Failed requests per second |
| **D**uration | Distribution of request latency |

### USE Method (Resources)

| Metric | Description |
|--------|-------------|
| **U**tilization | % time resource is busy |
| **S**aturation | Queue length, work waiting |
| **E**rrors | Error events count |

### Prometheus Query Examples

```promql
# Request rate
sum(rate(http_requests_total[5m])) by (service)

# Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m])) * 100

# 95th percentile latency
histogram_quantile(0.95,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)

# Memory usage percentage
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes)
/ node_memory_MemTotal_bytes * 100

# Pod restart rate
sum(increase(kube_pod_container_status_restarts_total[1h])) by (pod)
```

### Alert Severity Levels

| Level | Response Time | Examples |
|-------|---------------|----------|
| **P1 - Critical** | Immediate | Service down, data loss |
| **P2 - High** | < 1 hour | Degraded performance, errors spiking |
| **P3 - Medium** | < 4 hours | Single component issue, warnings |
| **P4 - Low** | < 24 hours | Non-urgent, optimization |
| **P5 - Info** | Next sprint | Monitoring, trends |

---

## Security Practices

### Defense in Depth

```
┌────────────────────────────────────────────────────┐
│                    Network Layer                    │
│  ┌─────────────────────────────────────────────┐   │
│  │               Application Layer              │   │
│  │  ┌───────────────────────────────────────┐  │   │
│  │  │           Container Layer             │  │   │
│  │  │  ┌─────────────────────────────────┐  │  │   │
│  │  │  │         Code Layer              │  │  │   │
│  │  │  │  ┌───────────────────────────┐  │  │  │   │
│  │  │  │  │       Data Layer          │  │  │  │   │
│  │  │  │  └───────────────────────────┘  │  │  │   │
│  │  │  └─────────────────────────────────┘  │  │   │
│  │  └───────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

### Secrets Management

| Tool | Use Case | Integration |
|------|----------|-------------|
| **HashiCorp Vault** | Enterprise secrets | K8s, AWS, Azure |
| **AWS Secrets Manager** | AWS native | Lambda, ECS, EKS |
| **External Secrets** | K8s operator | Multi-provider |
| **Sealed Secrets** | GitOps friendly | Flux, ArgoCD |
| **SOPS** | Encrypted files | Any |

### Container Security Checklist

```markdown
## Build Time
- [ ] Use minimal base images (distroless, alpine)
- [ ] Scan for vulnerabilities (Trivy, Snyk)
- [ ] No secrets in images
- [ ] Pin base image versions
- [ ] Multi-stage builds

## Runtime
- [ ] Run as non-root
- [ ] Read-only filesystem
- [ ] No privilege escalation
- [ ] Drop capabilities
- [ ] Resource limits

## Network
- [ ] Network policies
- [ ] Service mesh (mTLS)
- [ ] Ingress TLS
- [ ] No exposed ports

## Compliance
- [ ] Image signing
- [ ] Admission control
- [ ] Audit logging
- [ ] Policy enforcement
```

### Pod Security Standards

| Level | Description | Use Case |
|-------|-------------|----------|
| **Privileged** | Unrestricted | System pods only |
| **Baseline** | Minimal restrictions | Most workloads |
| **Restricted** | Hardened | Security-critical |

---

## Reliability Engineering

### SLO/SLI/SLA

| Term | Definition | Example |
|------|------------|---------|
| **SLI** | Metric that measures service | Request latency p99 |
| **SLO** | Target for SLI | p99 latency < 200ms |
| **SLA** | Customer commitment | 99.9% uptime guaranteed |
| **Error Budget** | Allowed failures | 100% - SLO = budget |

### Availability Targets

| Availability | Downtime/Year | Downtime/Month |
|--------------|---------------|----------------|
| 99% | 3.65 days | 7.3 hours |
| 99.9% | 8.76 hours | 43.8 minutes |
| 99.95% | 4.38 hours | 21.9 minutes |
| 99.99% | 52.6 minutes | 4.4 minutes |
| 99.999% | 5.26 minutes | 26.3 seconds |

### Incident Severity

| Severity | Impact | Response |
|----------|--------|----------|
| **SEV-1** | Complete outage | All hands, war room |
| **SEV-2** | Major degradation | On-call + backup |
| **SEV-3** | Minor impact | On-call only |
| **SEV-4** | Minimal impact | Normal hours |

### Chaos Engineering Experiments

| Experiment | Purpose | Tool |
|------------|---------|------|
| Pod kill | Test restart/recovery | Chaos Monkey, Litmus |
| Network latency | Test timeout handling | tc, Toxiproxy |
| Resource stress | Test limits | stress-ng |
| Zone failure | Test HA | Cloud console |
| Disk failure | Test persistence | dd, fsck |

---

## Cost Optimization

### Cloud Cost Strategies

| Strategy | Savings | Effort |
|----------|---------|--------|
| **Right-sizing** | 20-40% | Low |
| **Reserved/Savings Plans** | 30-70% | Medium |
| **Spot/Preemptible** | 60-90% | Medium |
| **Auto-scaling** | Variable | Medium |
| **Cleanup unused** | Immediate | Low |

### FinOps Practices

| Practice | Description |
|----------|-------------|
| **Tagging** | All resources tagged for allocation |
| **Showback** | Report costs to teams |
| **Chargeback** | Bill teams for usage |
| **Budgets** | Alert on thresholds |
| **Anomaly detection** | Catch spikes early |

### Cost Monitoring Queries

```promql
# Kubernetes cost estimation
sum(
  container_memory_usage_bytes
  * on(node) group_left(instance_type)
  kube_node_labels
) by (namespace)

# Underutilized pods (CPU)
avg(rate(container_cpu_usage_seconds_total[1h])) by (pod)
/
avg(kube_pod_container_resource_requests{resource="cpu"}) by (pod)
< 0.5
```

---

## Quick Reference

### Common Commands

```bash
# Kubernetes
kubectl get pods -A                    # All pods
kubectl logs -f deploy/app             # Follow logs
kubectl exec -it pod/app -- sh         # Shell into pod
kubectl rollout undo deploy/app        # Rollback
kubectl top pods                       # Resource usage

# Terraform
terraform init                         # Initialize
terraform plan -out=plan.tfplan        # Create plan
terraform apply plan.tfplan            # Apply plan
terraform state list                   # List resources
terraform import resource.name id      # Import existing

# Docker
docker build -t app:v1 .               # Build image
docker scan app:v1                     # Scan vulnerabilities
docker compose up -d                   # Start services
docker system prune -a                 # Cleanup

# Helm
helm install app ./chart               # Install
helm upgrade app ./chart               # Upgrade
helm rollback app 1                    # Rollback
helm template app ./chart              # Render templates
```

---

*This knowledge base provides reference material for DevOps engineers and reviewers.*
