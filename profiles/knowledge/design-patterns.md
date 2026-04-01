# Design Patterns Knowledge Base

## Gang of Four (GoF) - 23 Patterns

### Creational Patterns (5)

#### 1. Singleton
**Intent:** Ensure a class has only one instance and provide a global access point.

**Implementation Considerations:**
- Thread-safe initialization (double-checked locking, enum, holder pattern)
- Lazy vs eager initialization
- Testing difficulties (consider dependency injection instead)

**Code Example (Java - Thread-safe):**
```java
public class Singleton {
    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

**Code Example (Go):**
```go
var (
    instance *Singleton
    once     sync.Once
)

func GetInstance() *Singleton {
    once.Do(func() {
        instance = &Singleton{}
    })
    return instance
}
```

---

#### 2. Factory Method
**Intent:** Define an interface for creating objects, letting subclasses decide which class to instantiate.

**When to Use:**
- Class can't anticipate the type of objects it needs
- Class wants subclasses to specify the objects it creates
- Delegate responsibility to helper subclasses

**Code Example (TypeScript):**
```typescript
interface Product {
    operation(): string;
}

abstract class Creator {
    abstract factoryMethod(): Product;

    someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: ${product.operation()}`;
    }
}

class ConcreteCreatorA extends Creator {
    factoryMethod(): Product {
        return new ConcreteProductA();
    }
}
```

---

#### 3. Abstract Factory
**Intent:** Provide an interface for creating families of related objects without specifying concrete classes.

**When to Use:**
- System should be independent of how products are created
- System should be configured with one of multiple product families
- Family of products is designed to work together

**Code Example (Python):**
```python
from abc import ABC, abstractmethod

class AbstractFactory(ABC):
    @abstractmethod
    def create_product_a(self) -> AbstractProductA:
        pass

    @abstractmethod
    def create_product_b(self) -> AbstractProductB:
        pass

class ConcreteFactory1(AbstractFactory):
    def create_product_a(self) -> AbstractProductA:
        return ConcreteProductA1()

    def create_product_b(self) -> AbstractProductB:
        return ConcreteProductB1()
```

---

#### 4. Builder
**Intent:** Separate construction of a complex object from its representation.

**When to Use:**
- Object with many optional parameters
- Object needs to be created in multiple steps
- Different representations of the constructed object needed

**Code Example (Kotlin):**
```kotlin
data class User private constructor(
    val name: String,
    val email: String?,
    val age: Int?,
    val address: String?
) {
    class Builder(private val name: String) {
        private var email: String? = null
        private var age: Int? = null
        private var address: String? = null

        fun email(email: String) = apply { this.email = email }
        fun age(age: Int) = apply { this.age = age }
        fun address(address: String) = apply { this.address = address }

        fun build() = User(name, email, age, address)
    }
}

// Usage
val user = User.Builder("John")
    .email("john@example.com")
    .age(30)
    .build()
```

---

#### 5. Prototype
**Intent:** Create new objects by cloning existing ones.

**When to Use:**
- Object creation is expensive
- System should be independent of how products are created
- Classes to instantiate are specified at runtime

**Code Example (Java):**
```java
public interface Prototype extends Cloneable {
    Prototype clone();
}

public class ConcretePrototype implements Prototype {
    private String field;

    public ConcretePrototype(ConcretePrototype prototype) {
        this.field = prototype.field;
    }

    @Override
    public Prototype clone() {
        return new ConcretePrototype(this);
    }
}
```

---

### Structural Patterns (7)

#### 6. Adapter
**Intent:** Convert the interface of a class into another interface clients expect.

**Types:**
- Object adapter (composition)
- Class adapter (multiple inheritance - where supported)

**Code Example (Go):**
```go
type Target interface {
    Request() string
}

type Adaptee struct{}

func (a *Adaptee) SpecificRequest() string {
    return "Specific behavior"
}

type Adapter struct {
    adaptee *Adaptee
}

func (a *Adapter) Request() string {
    return a.adaptee.SpecificRequest()
}
```

---

#### 7. Bridge
**Intent:** Decouple abstraction from implementation so both can vary independently.

**Key Insight:** Composition over inheritance for varying dimensions.

**Code Example (TypeScript):**
```typescript
interface Implementation {
    operationImplementation(): string;
}

class Abstraction {
    constructor(protected implementation: Implementation) {}

    operation(): string {
        return `Abstraction: ${this.implementation.operationImplementation()}`;
    }
}

class ExtendedAbstraction extends Abstraction {
    operation(): string {
        return `Extended: ${this.implementation.operationImplementation()}`;
    }
}
```

---

#### 8. Composite
**Intent:** Compose objects into tree structures to represent part-whole hierarchies.

**Code Example (Python):**
```python
from abc import ABC, abstractmethod
from typing import List

class Component(ABC):
    @abstractmethod
    def operation(self) -> str:
        pass

class Leaf(Component):
    def operation(self) -> str:
        return "Leaf"

class Composite(Component):
    def __init__(self):
        self._children: List[Component] = []

    def add(self, component: Component):
        self._children.append(component)

    def operation(self) -> str:
        results = [child.operation() for child in self._children]
        return f"Branch({', '.join(results)})"
```

---

#### 9. Decorator
**Intent:** Attach additional responsibilities to objects dynamically.

**Code Example (Java):**
```java
interface Component {
    String operation();
}

class ConcreteComponent implements Component {
    public String operation() {
        return "ConcreteComponent";
    }
}

abstract class Decorator implements Component {
    protected Component wrappee;

    Decorator(Component component) {
        this.wrappee = component;
    }

    public String operation() {
        return wrappee.operation();
    }
}

class ConcreteDecorator extends Decorator {
    ConcreteDecorator(Component component) {
        super(component);
    }

    public String operation() {
        return "ConcreteDecorator(" + super.operation() + ")";
    }
}
```

---

#### 10. Facade
**Intent:** Provide a unified interface to a set of interfaces in a subsystem.

**Code Example (Go):**
```go
type Facade struct {
    subsystem1 *Subsystem1
    subsystem2 *Subsystem2
}

func NewFacade() *Facade {
    return &Facade{
        subsystem1: &Subsystem1{},
        subsystem2: &Subsystem2{},
    }
}

func (f *Facade) Operation() string {
    result := "Facade initializes subsystems:\n"
    result += f.subsystem1.Operation1()
    result += f.subsystem2.Operation1()
    return result
}
```

---

#### 11. Flyweight
**Intent:** Use sharing to support large numbers of fine-grained objects efficiently.

**Key Concepts:**
- Intrinsic state: Shared, stored in flyweight
- Extrinsic state: Varies, passed by client

**Code Example (TypeScript):**
```typescript
class Flyweight {
    constructor(private sharedState: string) {}

    operation(uniqueState: string): void {
        console.log(`Shared: ${this.sharedState}, Unique: ${uniqueState}`);
    }
}

class FlyweightFactory {
    private flyweights: Map<string, Flyweight> = new Map();

    getFlyweight(sharedState: string): Flyweight {
        if (!this.flyweights.has(sharedState)) {
            this.flyweights.set(sharedState, new Flyweight(sharedState));
        }
        return this.flyweights.get(sharedState)!;
    }
}
```

---

#### 12. Proxy
**Intent:** Provide a surrogate or placeholder for another object to control access.

**Types:**
- Virtual Proxy: Lazy initialization
- Protection Proxy: Access control
- Remote Proxy: Local representative for remote object
- Logging Proxy: Request logging

**Code Example (Python):**
```python
class Subject(ABC):
    @abstractmethod
    def request(self) -> None:
        pass

class RealSubject(Subject):
    def request(self) -> None:
        print("RealSubject: Handling request.")

class Proxy(Subject):
    def __init__(self, real_subject: RealSubject):
        self._real_subject = real_subject

    def request(self) -> None:
        if self._check_access():
            self._real_subject.request()
            self._log_access()

    def _check_access(self) -> bool:
        print("Proxy: Checking access prior to firing request.")
        return True

    def _log_access(self) -> None:
        print("Proxy: Logging the request.")
```

---

### Behavioral Patterns (11)

#### 13. Chain of Responsibility
**Intent:** Avoid coupling sender of a request to its receiver by giving multiple objects a chance to handle the request.

**Code Example (Java):**
```java
abstract class Handler {
    private Handler next;

    public Handler setNext(Handler handler) {
        this.next = handler;
        return handler;
    }

    public void handle(Request request) {
        if (next != null) {
            next.handle(request);
        }
    }
}

class ConcreteHandler extends Handler {
    public void handle(Request request) {
        if (canHandle(request)) {
            // Handle it
        } else {
            super.handle(request);
        }
    }
}
```

---

#### 14. Command
**Intent:** Encapsulate a request as an object, allowing parameterization and queuing.

**Code Example (Kotlin):**
```kotlin
interface Command {
    fun execute()
    fun undo()
}

class ConcreteCommand(private val receiver: Receiver) : Command {
    private var previousState: String? = null

    override fun execute() {
        previousState = receiver.state
        receiver.action()
    }

    override fun undo() {
        previousState?.let { receiver.state = it }
    }
}
```

---

#### 15. Iterator
**Intent:** Provide a way to access elements of a collection sequentially without exposing underlying representation.

**Code Example (Go):**
```go
type Iterator interface {
    HasNext() bool
    Next() interface{}
}

type Collection interface {
    CreateIterator() Iterator
}

type ConcreteIterator struct {
    collection *ConcreteCollection
    index      int
}

func (i *ConcreteIterator) HasNext() bool {
    return i.index < len(i.collection.items)
}

func (i *ConcreteIterator) Next() interface{} {
    item := i.collection.items[i.index]
    i.index++
    return item
}
```

---

#### 16. Mediator
**Intent:** Define an object that encapsulates how a set of objects interact.

---

#### 17. Memento
**Intent:** Capture and externalize an object's internal state without violating encapsulation.

---

#### 18. Observer
**Intent:** Define a one-to-many dependency so that when one object changes state, all dependents are notified.

**Code Example (TypeScript):**
```typescript
interface Observer {
    update(subject: Subject): void;
}

class Subject {
    private observers: Observer[] = [];
    private state: number = 0;

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) this.observers.splice(index, 1);
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    setState(state: number): void {
        this.state = state;
        this.notify();
    }
}
```

---

#### 19. State
**Intent:** Allow an object to alter its behavior when its internal state changes.

---

#### 20. Strategy
**Intent:** Define a family of algorithms, encapsulate each one, and make them interchangeable.

**Code Example (Python):**
```python
from abc import ABC, abstractmethod

class Strategy(ABC):
    @abstractmethod
    def execute(self, data: list) -> list:
        pass

class ConcreteStrategyA(Strategy):
    def execute(self, data: list) -> list:
        return sorted(data)

class ConcreteStrategyB(Strategy):
    def execute(self, data: list) -> list:
        return sorted(data, reverse=True)

class Context:
    def __init__(self, strategy: Strategy):
        self._strategy = strategy

    def set_strategy(self, strategy: Strategy):
        self._strategy = strategy

    def do_something(self, data: list) -> list:
        return self._strategy.execute(data)
```

---

#### 21. Template Method
**Intent:** Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.

---

#### 22. Visitor
**Intent:** Represent an operation to be performed on elements of an object structure.

---

#### 23. Interpreter
**Intent:** Define a representation for a grammar and an interpreter that uses the representation.

---

## Modern Patterns Beyond GoF

### Repository Pattern
Mediates between domain and data mapping layers.

### Unit of Work
Maintains a list of objects affected by a business transaction.

### Specification Pattern
Encapsulates business rules that can be combined.

### CQRS (Command Query Responsibility Segregation)
Separates read and write operations for a data store.

### Event Sourcing
Stores state as a sequence of events rather than current state.

### Circuit Breaker
Prevents cascading failures in distributed systems.

### Saga Pattern
Manages distributed transactions across microservices.
