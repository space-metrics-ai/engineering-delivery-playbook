# System Design Knowledge Base

## Algorithm Complexity (Big O)

### Time Complexity Chart

```
Performance (best to worst):
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
```

### Common Complexities with Examples

| Complexity | Name | Operations (n=1000) | Example Algorithms |
|------------|------|---------------------|-------------------|
| O(1) | Constant | 1 | Hash lookup, array index |
| O(log n) | Logarithmic | ~10 | Binary search, balanced BST |
| O(n) | Linear | 1,000 | Linear search, single loop |
| O(n log n) | Linearithmic | ~10,000 | Merge sort, quick sort (avg) |
| O(n²) | Quadratic | 1,000,000 | Bubble sort, nested loops |
| O(n³) | Cubic | 1,000,000,000 | Naive matrix multiplication |
| O(2ⁿ) | Exponential | 10^301 | Subset sum, traveling salesman |
| O(n!) | Factorial | 10^2567 | Permutations (brute force) |

### Data Structure Operations

| Structure | Access | Search | Insert | Delete | Space |
|-----------|--------|--------|--------|--------|-------|
| Array | O(1) | O(n) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1)* | O(1)* | O(n) |
| Stack | O(n) | O(n) | O(1) | O(1) | O(n) |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) |
| Hash Table | N/A | O(1)† | O(1)† | O(1)† | O(n) |
| BST | O(log n)† | O(log n)† | O(log n)† | O(log n)† | O(n) |
| AVL Tree | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Red-Black | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| Heap | O(1)‡ | O(n) | O(log n) | O(log n) | O(n) |
| Trie | O(k) | O(k) | O(k) | O(k) | O(n*k) |

*At known position, †Average case, ‡For min/max only

### Sorting Algorithms

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | No |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | Yes |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | No |
| Tim Sort | O(n) | O(n log n) | O(n log n) | O(n) | Yes |
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | Yes |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | O(k) | Yes |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) | Yes |

### Amortized Analysis

Some operations have occasional expensive operations but average out:

- **Dynamic Array (ArrayList)**: Insert is O(1) amortized
  - Usually O(1), occasionally O(n) for resize
  - Total: n operations = O(n), so amortized O(1) per operation

- **Hash Table**: Operations are O(1) amortized
  - Occasional O(n) rehashing

---

## Architectural Patterns

### Monolithic Architecture

```
┌─────────────────────────────────────┐
│           Monolith                  │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ UI  │ │ API │ │Biz  │ │ DB  │   │
│  │Layer│ │Layer│ │Logic│ │Layer│   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
└─────────────────────────────────────┘
```

**Advantages:**
- Simple to develop, test, deploy
- Easy debugging (single process)
- No network latency between components
- Transaction consistency

**Disadvantages:**
- Difficult to scale specific components
- Technology lock-in
- Deployment risk (all or nothing)
- Team coordination challenges at scale

**When to use:**
- Small to medium applications
- Early-stage startups
- Well-understood, stable domains
- Small teams

---

### Microservices Architecture

```
┌─────────┐   ┌─────────┐   ┌─────────┐
│ Service │   │ Service │   │ Service │
│    A    │   │    B    │   │    C    │
└────┬────┘   └────┬────┘   └────┬────┘
     │             │             │
     └──────┬──────┴──────┬──────┘
            │             │
       ┌────┴────┐   ┌────┴────┐
       │ Message │   │   API   │
       │  Queue  │   │ Gateway │
       └─────────┘   └─────────┘
```

**Advantages:**
- Independent deployment
- Technology diversity
- Fault isolation
- Scalability per service
- Team autonomy

**Disadvantages:**
- Distributed complexity
- Network latency
- Data consistency challenges
- Operational overhead
- Testing complexity

**When to use:**
- Large, complex applications
- Multiple teams
- High scalability requirements
- Diverse technology needs

---

### Event-Driven Architecture

```
┌──────────┐         ┌──────────────┐         ┌──────────┐
│ Producer │ ──────> │  Event Bus   │ ──────> │ Consumer │
│          │         │ (Kafka/SQS)  │         │          │
└──────────┘         └──────────────┘         └──────────┘
                            │
                            v
                     ┌──────────┐
                     │ Consumer │
                     │    2     │
                     └──────────┘
```

**Patterns:**

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Event Notification | Simple event emission | Decoupled notifications |
| Event-Carried State | Events contain full state | Reduce queries |
| Event Sourcing | Store events, not state | Audit, temporal queries |
| CQRS | Separate read/write models | Complex queries, scaling |

---

### Serverless Architecture

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│ Trigger │ ──> │  Function   │ ──> │  Database   │
│ (HTTP)  │     │  (Lambda)   │     │ (DynamoDB)  │
└─────────┘     └─────────────┘     └─────────────┘
```

**Advantages:**
- No server management
- Auto-scaling
- Pay per execution
- Rapid development

**Disadvantages:**
- Cold starts
- Execution limits
- Vendor lock-in
- Debugging challenges

---

## Distributed Systems Patterns

### Circuit Breaker

Prevents cascade failures by failing fast when a service is unhealthy.

```
States: CLOSED -> OPEN -> HALF-OPEN -> CLOSED
        (normal)  (fail fast)  (test)   (recovered)
```

```java
// Resilience4j example
@CircuitBreaker(name = "userService", fallbackMethod = "fallback")
public User getUser(Long id) {
    return userServiceClient.getUser(id);
}

public User fallback(Long id, Exception e) {
    return User.anonymous();
}
```

---

### Retry with Exponential Backoff

```
Attempt 1: immediate
Attempt 2: wait 1s
Attempt 3: wait 2s
Attempt 4: wait 4s
Attempt 5: wait 8s (+ jitter)
```

```python
import time
import random

def retry_with_backoff(func, max_retries=5, base_delay=1):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)
            jitter = random.uniform(0, delay * 0.1)
            time.sleep(delay + jitter)
```

---

### Bulkhead

Isolate failures to prevent resource exhaustion.

```
┌─────────────────────────────────────────┐
│              Application                │
│  ┌─────────────┐   ┌─────────────┐     │
│  │ Thread Pool │   │ Thread Pool │     │
│  │  Service A  │   │  Service B  │     │
│  │   (10)      │   │   (10)      │     │
│  └─────────────┘   └─────────────┘     │
└─────────────────────────────────────────┘
```

---

### Saga Pattern

Manage distributed transactions across services.

**Choreography (Event-based):**
```
Order Created -> Payment Charged -> Inventory Reserved -> Order Confirmed
     |                |                   |
     v                v                   v
(Compensate)   (Refund Payment)   (Release Inventory)
```

**Orchestration (Coordinator-based):**
```
┌─────────────┐
│ Orchestrator│
└──────┬──────┘
       │
  ┌────┼────┬────┐
  v    v    v    v
 Svc  Svc  Svc  Svc
  A    B    C    D
```

---

### CQRS (Command Query Responsibility Segregation)

```
Commands (Write)          Queries (Read)
     │                         │
     v                         v
┌─────────┐              ┌─────────┐
│ Command │              │  Query  │
│ Handler │              │ Handler │
└────┬────┘              └────┬────┘
     │                        │
     v                        v
┌─────────┐   Sync/Async  ┌─────────┐
│ Write   │ ────────────> │  Read   │
│   DB    │               │   DB    │
└─────────┘               └─────────┘
```

---

## Scalability Patterns

### Horizontal vs Vertical Scaling

| Aspect | Horizontal | Vertical |
|--------|-----------|----------|
| Method | Add machines | Add resources |
| Cost | Linear | Exponential |
| Complexity | Higher | Lower |
| Limit | Virtually unlimited | Hardware limits |
| Downtime | None | Often required |

---

### Database Scaling

#### Read Replicas
```
┌────────────┐
│   Master   │ <── Writes
└─────┬──────┘
      │ Replication
┌─────┴─────┐
│     │     │
v     v     v
┌───┐ ┌───┐ ┌───┐
│ R │ │ R │ │ R │ <── Reads
└───┘ └───┘ └───┘
```

#### Sharding
```
Hash(user_id) % 4 = shard

┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ Shard 0 │  │ Shard 1 │  │ Shard 2 │  │ Shard 3 │
│ (0-24%) │  │(25-49%) │  │(50-74%) │  │(75-100%)│
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

---

### Caching Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Cache-Aside | App manages cache | General purpose |
| Read-Through | Cache loads from DB | Simplify app code |
| Write-Through | Write to cache and DB | Consistency priority |
| Write-Behind | Async write to DB | Performance priority |
| Refresh-Ahead | Proactive refresh | Predictable access |

#### Cache-Aside Pattern
```python
def get_user(user_id):
    # Try cache first
    user = cache.get(f"user:{user_id}")
    if user:
        return user

    # Miss - load from DB
    user = db.query(f"SELECT * FROM users WHERE id = {user_id}")

    # Populate cache
    cache.set(f"user:{user_id}", user, ttl=3600)

    return user
```

---

### Load Balancing

**Algorithms:**
- **Round Robin**: Equal distribution
- **Weighted Round Robin**: Based on capacity
- **Least Connections**: To least busy server
- **IP Hash**: Session affinity
- **Random**: Simple, effective

---

## CAP Theorem

**You can only guarantee 2 of 3:**
- **Consistency**: All nodes see same data
- **Availability**: Every request gets a response
- **Partition Tolerance**: System works despite network failures

```
        Consistency
           /\
          /  \
         /    \
        /  CP  \
       /________\
      /\        /\
     /  \  CA  /  \
    / AP \    /    \
   /______\  /______\
Availability  Partition
              Tolerance
```

**In practice (network partitions happen):**
- **CP**: Sacrifice availability (HBase, MongoDB)
- **AP**: Sacrifice consistency (Cassandra, DynamoDB)

---

## Database Selection Guide

| Requirement | Database Type | Examples |
|-------------|--------------|----------|
| ACID transactions | Relational | PostgreSQL, MySQL |
| Flexible schema | Document | MongoDB, CouchDB |
| Simple key-value | Key-Value | Redis, DynamoDB |
| Relationships | Graph | Neo4j, Neptune |
| Time series | Time Series | InfluxDB, TimescaleDB |
| Full-text search | Search | Elasticsearch, Solr |
| Wide column | Column Family | Cassandra, HBase |

---

## API Design Patterns

### REST Maturity Model

| Level | Description | Example |
|-------|-------------|---------|
| 0 | HTTP as tunnel | POST /api |
| 1 | Resources | GET /users/1 |
| 2 | HTTP Verbs | GET, POST, PUT, DELETE |
| 3 | HATEOAS | Hypermedia links |

### Rate Limiting

```
Token Bucket Algorithm:
- Bucket holds N tokens
- Tokens added at rate R per second
- Request costs 1 token
- Request rejected if no tokens

Sliding Window:
- Track requests in time window
- Reject if count exceeds limit
```

### Pagination

```json
// Offset-based (simple, has issues at scale)
GET /users?offset=20&limit=10

// Cursor-based (better for large datasets)
GET /users?cursor=eyJpZCI6MTAwfQ&limit=10

{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTEwfQ",
    "has_more": true
  }
}
```

---

## Observability

### Three Pillars

1. **Logs**: Discrete events
   - Structured logging (JSON)
   - Log levels (DEBUG, INFO, WARN, ERROR)
   - Correlation IDs

2. **Metrics**: Aggregated measurements
   - Counters, Gauges, Histograms
   - RED (Rate, Errors, Duration)
   - USE (Utilization, Saturation, Errors)

3. **Traces**: Request flow across services
   - Distributed tracing (Jaeger, Zipkin)
   - Span context propagation

### Key Metrics

| Category | Metrics |
|----------|---------|
| Latency | p50, p95, p99 response times |
| Traffic | Requests per second |
| Errors | Error rate, error types |
| Saturation | CPU, memory, disk, queue depth |
