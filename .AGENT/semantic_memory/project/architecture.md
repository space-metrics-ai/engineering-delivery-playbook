# Architecture - System Design

## Overview

Document your project's architecture here. This file helps the AI agent understand your system design and make informed decisions.

## Template

### System Components

```
[Client] → [API Gateway] → [Services] → [Database]
                              ↓
                          [Queue/Events]
                              ↓
                        [Workers/Consumers]
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | _e.g., React, Next.js_ |
| Backend | _e.g., Node.js, Go_ |
| Database | _e.g., PostgreSQL, MongoDB_ |
| Cache | _e.g., Redis_ |
| Queue | _e.g., SQS, RabbitMQ_ |
| Infrastructure | _e.g., AWS, GCP, Kubernetes_ |

### Key Design Decisions

1. **Decision**: _What was decided_
   - **Context**: _Why this decision was made_
   - **Consequences**: _What this means for the project_

### API Patterns

- REST / GraphQL / gRPC
- Authentication method
- Rate limiting strategy
- Versioning approach

### Data Flow

Describe how data flows through your system for key operations.

---

_Update this file as your architecture evolves._
