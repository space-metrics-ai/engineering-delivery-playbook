# Engineering Principles Knowledge Base

## SOLID Principles (In Depth)

### S - Single Responsibility Principle (SRP)

**Definition:** A class should have only one reason to change.

**Key Insight:** "One reason to change" means one actor or stakeholder that would request changes.

#### Violation Example
```java
// Bad: Multiple responsibilities
class UserService {
    public void createUser(User user) {
        validate(user);           // Validation logic
        user.setId(generateId()); // ID generation
        saveToDatabase(user);     // Persistence
        sendWelcomeEmail(user);   // Notification
        logUserCreation(user);    // Logging
    }
}
```

#### Correct Implementation
```java
// Good: Single responsibility each
class UserValidator {
    public ValidationResult validate(User user) { ... }
}

class UserRepository {
    public User save(User user) { ... }
}

class NotificationService {
    public void sendWelcomeEmail(User user) { ... }
}

class UserService {
    private final UserValidator validator;
    private final UserRepository repository;
    private final NotificationService notifications;

    public User createUser(User user) {
        validator.validate(user);
        User saved = repository.save(user);
        notifications.sendWelcomeEmail(saved);
        return saved;
    }
}
```

---

### O - Open/Closed Principle (OCP)

**Definition:** Software entities should be open for extension but closed for modification.

**Key Insight:** Add new behavior by adding new code, not changing existing code.

#### Violation Example
```python
# Bad: Must modify class to add new shapes
class AreaCalculator:
    def calculate(self, shape):
        if shape.type == "circle":
            return 3.14 * shape.radius ** 2
        elif shape.type == "rectangle":
            return shape.width * shape.height
        elif shape.type == "triangle":  # Added later - modification!
            return 0.5 * shape.base * shape.height
```

#### Correct Implementation
```python
# Good: Open for extension via abstraction
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

# Adding new shape requires NO modification to existing code
class Triangle(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height

    def area(self) -> float:
        return 0.5 * self.base * self.height
```

---

### L - Liskov Substitution Principle (LSP)

**Definition:** Objects of a superclass should be replaceable with objects of subclasses without altering correctness.

**Key Insight:** Subclasses must honor the contract of their base class.

#### Violation Example
```typescript
// Bad: Square violates Rectangle's contract
class Rectangle {
    constructor(protected width: number, protected height: number) {}

    setWidth(width: number): void {
        this.width = width;
    }

    setHeight(height: number): void {
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    setWidth(width: number): void {
        this.width = width;
        this.height = width; // Violates expectation!
    }

    setHeight(height: number): void {
        this.width = height;
        this.height = height; // Violates expectation!
    }
}

// This fails with Square
function testRectangle(rect: Rectangle): void {
    rect.setWidth(5);
    rect.setHeight(4);
    console.assert(rect.area() === 20); // Fails for Square!
}
```

#### Correct Implementation
```typescript
// Good: Separate abstractions
interface Shape {
    area(): number;
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}
    area(): number { return this.width * this.height; }
}

class Square implements Shape {
    constructor(private side: number) {}
    area(): number { return this.side * this.side; }
}
```

---

### I - Interface Segregation Principle (ISP)

**Definition:** Clients should not be forced to depend on interfaces they don't use.

**Key Insight:** Many specific interfaces are better than one general-purpose interface.

#### Violation Example
```go
// Bad: Fat interface
type Worker interface {
    Work()
    Eat()
    Sleep()
}

// Robot can't eat or sleep!
type Robot struct{}

func (r Robot) Work() { fmt.Println("Working") }
func (r Robot) Eat()  { panic("Robots don't eat") }  // Forced to implement
func (r Robot) Sleep() { panic("Robots don't sleep") } // Forced to implement
```

#### Correct Implementation
```go
// Good: Segregated interfaces
type Workable interface {
    Work()
}

type Eatable interface {
    Eat()
}

type Sleepable interface {
    Sleep()
}

type Human struct{}
func (h Human) Work()  { fmt.Println("Working") }
func (h Human) Eat()   { fmt.Println("Eating") }
func (h Human) Sleep() { fmt.Println("Sleeping") }

type Robot struct{}
func (r Robot) Work() { fmt.Println("Working") }

// Functions accept only what they need
func doWork(w Workable) {
    w.Work()
}
```

---

### D - Dependency Inversion Principle (DIP)

**Definition:** High-level modules should not depend on low-level modules. Both should depend on abstractions.

**Key Insight:** Abstractions should not depend on details. Details should depend on abstractions.

#### Violation Example
```kotlin
// Bad: High-level depends on low-level
class MySQLUserRepository {
    fun save(user: User) { /* MySQL specific */ }
}

class UserService {
    private val repository = MySQLUserRepository() // Direct dependency!

    fun createUser(user: User) {
        repository.save(user)
    }
}
```

#### Correct Implementation
```kotlin
// Good: Both depend on abstraction
interface UserRepository {
    fun save(user: User)
    fun findById(id: Long): User?
}

class MySQLUserRepository : UserRepository {
    override fun save(user: User) { /* MySQL specific */ }
    override fun findById(id: Long): User? { /* MySQL specific */ }
}

class MongoUserRepository : UserRepository {
    override fun save(user: User) { /* MongoDB specific */ }
    override fun findById(id: Long): User? { /* MongoDB specific */ }
}

class UserService(private val repository: UserRepository) { // Injected abstraction
    fun createUser(user: User) {
        repository.save(user)
    }
}
```

---

## Additional Core Principles

### KISS (Keep It Simple, Stupid)

**Essence:** Simplicity should be a key goal. Avoid unnecessary complexity.

**Guidelines:**
- Start with the simplest solution that works
- Add complexity only when proven necessary
- If you can't explain it simply, it's too complex
- Clever code is often bad code

```python
# Bad: Over-engineered
def get_user_name(user_dict):
    return (lambda u: u.get('name', '') if u else '')(user_dict)

# Good: Simple and clear
def get_user_name(user_dict):
    if user_dict is None:
        return ''
    return user_dict.get('name', '')
```

---

### DRY (Don't Repeat Yourself)

**Essence:** Every piece of knowledge should have a single, unambiguous representation.

**Important:** DRY is about knowledge, not code. Identical code serving different purposes is NOT duplication.

```java
// These look similar but serve different business purposes - NOT duplication
class OrderValidator {
    boolean isValid(Order order) {
        return order.getTotal() > 0;
    }
}

class RefundValidator {
    boolean isValid(Refund refund) {
        return refund.getAmount() > 0;  // Same logic, different domain
    }
}
```

**When to abstract:**
- Rule of Three: Abstract after third occurrence
- Same knowledge, same reason to change

---

### YAGNI (You Aren't Gonna Need It)

**Essence:** Don't implement functionality until it's actually needed.

**Guidelines:**
- Implement things when needed, not when foreseen
- Predictions about future requirements are often wrong
- Unused code is maintenance burden
- Easier to add later than remove premature abstraction

```typescript
// Bad: Premature abstraction
interface DatabaseAdapter {
    connect(): Promise<void>;
    query(sql: string): Promise<any>;
    // Methods for 5 databases we'll "probably" use someday
}

// Good: Just what's needed now
class PostgresDatabase {
    async connect(): Promise<void> { /* ... */ }
    async query(sql: string): Promise<any> { /* ... */ }
}
```

---

### WET (Write Everything Twice)

**Essence:** Pragmatic alternative to aggressive DRY. Abstract only after real duplication patterns emerge.

**Rule:** Don't abstract until you have three instances showing the same pattern.

---

### Separation of Concerns (SoC)

**Essence:** Divide program into distinct sections, each addressing a separate concern.

**Layers:**
```
┌─────────────────────────┐
│   Presentation Layer    │  UI, API Controllers
├─────────────────────────┤
│    Application Layer    │  Use Cases, Orchestration
├─────────────────────────┤
│      Domain Layer       │  Business Logic, Entities
├─────────────────────────┤
│  Infrastructure Layer   │  Database, External Services
└─────────────────────────┘
```

---

### Law of Demeter (LoD)

**Essence:** Only talk to your immediate friends.

**A method should only call methods on:**
1. Itself (`this`)
2. Its parameters
3. Objects it creates
4. Its direct components

```java
// Bad: Train wreck
customer.getAddress().getCity().getZipCode();

// Good: Tell, don't ask
customer.getShippingZipCode();
```

---

### Composition over Inheritance

**Essence:** Favor object composition over class inheritance for code reuse.

**Why:**
- Inheritance creates tight coupling
- Changes to parent affect all children
- "Is-a" relationships are often misused
- Composition offers more flexibility

```go
// Bad: Inheritance (if Go had it)
// Dog extends Animal extends LivingThing...

// Good: Composition
type Dog struct {
    walker   Walker
    barker   Barker
    eater    Eater
}

func (d *Dog) Walk() { d.walker.Walk() }
func (d *Dog) Bark() { d.barker.Bark() }
```

---

### Fail Fast

**Essence:** Detect and report errors at the earliest possible moment.

```java
// Bad: Silent failure
public void processOrder(Order order) {
    if (order == null) {
        return;  // Silent failure - bugs hide here
    }
    // Process...
}

// Good: Fail fast
public void processOrder(Order order) {
    Objects.requireNonNull(order, "Order cannot be null");
    if (order.getItems().isEmpty()) {
        throw new IllegalArgumentException("Order must have items");
    }
    // Process...
}
```

---

### Principle of Least Astonishment (POLA)

**Essence:** Components should behave in ways that users expect.

```python
# Bad: Surprising behavior
def add(a, b):
    print(f"Adding {a} + {b}")  # Unexpected side effect
    return a + b

# Good: Expected behavior
def add(a, b):
    return a + b

def add_with_logging(a, b, logger):
    logger.info(f"Adding {a} + {b}")
    return a + b
```

---

### Command-Query Separation (CQS)

**Essence:** Methods should either change state OR return a value, not both.

```java
// Bad: Query with side effect
public User getNextUser() {
    currentIndex++;  // Side effect!
    return users.get(currentIndex);
}

// Good: Separated
public User getCurrentUser() {
    return users.get(currentIndex);
}

public void moveToNextUser() {
    currentIndex++;
}
```

---

## GRASP Principles

### Information Expert
Assign responsibility to the class that has the information needed.

### Creator
Assign class B responsibility to create class A if B contains/aggregates A, uses A, or has initializing data for A.

### Controller
Assign responsibility for handling system events to a non-UI class.

### Low Coupling
Assign responsibilities to minimize dependencies between classes.

### High Cohesion
Assign responsibilities to keep related behaviors together.

### Polymorphism
Use polymorphism when behavior varies by type.

### Pure Fabrication
Create a class that doesn't represent a domain concept when needed for low coupling/high cohesion.

### Indirection
Assign responsibility to an intermediate object to decouple components.

### Protected Variations
Identify points of predicted variation and create stable interfaces around them.

---

## Clean Architecture Principles

### Dependency Rule
Source code dependencies must point only inward, toward higher-level policies.

```
┌─────────────────────────────────────────┐
│           Frameworks & Drivers          │
│  ┌─────────────────────────────────┐    │
│  │     Interface Adapters          │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │    Application          │    │    │
│  │  │  ┌─────────────────┐    │    │    │
│  │  │  │    Entities     │    │    │    │
│  │  │  └─────────────────┘    │    │    │
│  │  └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
         Dependencies point inward →
```

### Entities
Enterprise-wide business rules. Most stable layer.

### Use Cases
Application-specific business rules. Orchestrate entity behavior.

### Interface Adapters
Convert data between use cases and external agencies.

### Frameworks & Drivers
Outermost layer. Databases, web frameworks, UI.
