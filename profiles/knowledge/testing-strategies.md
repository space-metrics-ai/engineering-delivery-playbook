# Testing Strategies Knowledge Base

## Testing Philosophy

### Testing Mindset
- Tests are first-class citizens of the codebase
- Write tests that document behavior, not implementation
- Prefer deterministic tests over flaky tests
- Fast feedback loops enable confident changes

### Test Quality > Test Coverage
- 80% meaningful coverage beats 100% superficial coverage
- Focus on testing behavior, not implementation details
- Critical paths deserve more thorough testing

---

## Unit Testing

### Principles

#### Single Responsibility
Each test should verify one behavior. If a test name contains "and", it's testing too much.

```java
// Bad
@Test
void shouldCreateUserAndSendEmailAndLogAction() { }

// Good
@Test
void shouldCreateUserWithValidInput() { }

@Test
void shouldSendWelcomeEmailAfterUserCreation() { }
```

#### AAA Pattern (Arrange-Act-Assert)
```python
def test_calculate_discount():
    # Arrange
    cart = ShoppingCart()
    cart.add_item(Item(price=100))
    discount_service = DiscountService(percentage=10)

    # Act
    result = discount_service.apply(cart)

    # Assert
    assert result.total == 90
```

#### Descriptive Naming
```kotlin
// Formats:
// should_expectedBehavior_when_condition
// given_precondition_when_action_then_result
// methodName_stateUnderTest_expectedBehavior

@Test
fun `should return empty list when repository has no users`() { }

@Test
fun `given premium user when applying discount then reduces price by 20 percent`() { }
```

### Test Doubles

| Type | Purpose | Example Use |
|------|---------|-------------|
| **Dummy** | Fill parameters, never used | `createUser(new DummyLogger())` |
| **Stub** | Return canned answers | `when(repo.find(1)).thenReturn(user)` |
| **Spy** | Record interactions | `verify(emailService).send(any())` |
| **Mock** | Verify expectations | Full behavior verification |
| **Fake** | Working implementation | In-memory database |

### Framework-Specific Examples

#### Java (JUnit 5 + Mockito)
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void shouldReturnUserWhenExists() {
        // Arrange
        User expected = new User(1L, "John");
        when(userRepository.findById(1L)).thenReturn(Optional.of(expected));

        // Act
        User result = userService.getUser(1L);

        // Assert
        assertThat(result).isEqualTo(expected);
        verify(userRepository).findById(1L);
    }

    @Test
    void shouldThrowWhenUserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class,
            () -> userService.getUser(1L));
    }
}
```

#### Go (testing + testify)
```go
func TestUserService_GetUser(t *testing.T) {
    t.Run("returns user when exists", func(t *testing.T) {
        // Arrange
        mockRepo := new(MockUserRepository)
        service := NewUserService(mockRepo)
        expected := &User{ID: 1, Name: "John"}
        mockRepo.On("FindByID", 1).Return(expected, nil)

        // Act
        result, err := service.GetUser(1)

        // Assert
        assert.NoError(t, err)
        assert.Equal(t, expected, result)
        mockRepo.AssertExpectations(t)
    })

    t.Run("returns error when not found", func(t *testing.T) {
        mockRepo := new(MockUserRepository)
        service := NewUserService(mockRepo)
        mockRepo.On("FindByID", 1).Return(nil, ErrNotFound)

        _, err := service.GetUser(1)

        assert.ErrorIs(t, err, ErrNotFound)
    })
}
```

#### TypeScript (Jest/Vitest)
```typescript
describe('UserService', () => {
    let userService: UserService;
    let mockRepository: jest.Mocked<UserRepository>;

    beforeEach(() => {
        mockRepository = {
            findById: jest.fn(),
            save: jest.fn(),
        };
        userService = new UserService(mockRepository);
    });

    it('should return user when exists', async () => {
        const expected = { id: 1, name: 'John' };
        mockRepository.findById.mockResolvedValue(expected);

        const result = await userService.getUser(1);

        expect(result).toEqual(expected);
        expect(mockRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should throw when user not found', async () => {
        mockRepository.findById.mockResolvedValue(null);

        await expect(userService.getUser(1))
            .rejects.toThrow(UserNotFoundException);
    });
});
```

#### Python (pytest)
```python
import pytest
from unittest.mock import Mock, patch

class TestUserService:
    @pytest.fixture
    def mock_repository(self):
        return Mock(spec=UserRepository)

    @pytest.fixture
    def service(self, mock_repository):
        return UserService(mock_repository)

    def test_returns_user_when_exists(self, service, mock_repository):
        # Arrange
        expected = User(id=1, name="John")
        mock_repository.find_by_id.return_value = expected

        # Act
        result = service.get_user(1)

        # Assert
        assert result == expected
        mock_repository.find_by_id.assert_called_once_with(1)

    def test_raises_when_not_found(self, service, mock_repository):
        mock_repository.find_by_id.return_value = None

        with pytest.raises(UserNotFoundException):
            service.get_user(1)
```

#### Kotlin (Kotest + MockK)
```kotlin
class UserServiceTest : FunSpec({
    val mockRepository = mockk<UserRepository>()
    val service = UserService(mockRepository)

    test("should return user when exists") {
        val expected = User(1, "John")
        every { mockRepository.findById(1) } returns expected

        val result = service.getUser(1)

        result shouldBe expected
        verify { mockRepository.findById(1) }
    }

    test("should throw when not found") {
        every { mockRepository.findById(1) } returns null

        shouldThrow<UserNotFoundException> {
            service.getUser(1)
        }
    }
})
```

---

## Mutation Testing

### Concept

Mutation testing validates the quality of your test suite by:
1. Creating "mutants" - small changes to source code
2. Running tests against each mutant
3. Checking if tests "kill" the mutant (detect the change)

### Mutation Score

```
Mutation Score = (Killed Mutants / Total Mutants) × 100%
```

- **> 80%**: Good test quality
- **60-80%**: Acceptable, identify gaps
- **< 60%**: Tests need improvement

### Common Mutation Operators

| Category | Original | Mutated |
|----------|----------|---------|
| Arithmetic | `a + b` | `a - b` |
| Relational | `a > b` | `a >= b` |
| Equality | `a == b` | `a != b` |
| Logical | `a && b` | `a \|\| b` |
| Unary | `!flag` | `flag` |
| Return | `return x` | `return null` |
| Void Call | `method()` | *(removed)* |
| Increment | `i++` | `i--` |

### Tools by Language

#### Java - PIT (Pitest)
```xml
<!-- pom.xml -->
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>1.15.0</version>
    <configuration>
        <targetClasses>
            <param>com.example.service.*</param>
        </targetClasses>
        <targetTests>
            <param>com.example.service.*Test</param>
        </targetTests>
        <mutationThreshold>80</mutationThreshold>
    </configuration>
</plugin>
```

Run: `mvn org.pitest:pitest-maven:mutationCoverage`

#### JavaScript/TypeScript - Stryker
```json
// stryker.conf.json
{
    "mutator": "typescript",
    "packageManager": "npm",
    "reporters": ["html", "progress"],
    "testRunner": "jest",
    "coverageAnalysis": "perTest",
    "thresholds": { "high": 80, "low": 60, "break": 50 }
}
```

Run: `npx stryker run`

#### Python - mutmut
```bash
# Install
pip install mutmut

# Run mutation testing
mutmut run --paths-to-mutate=src/

# View results
mutmut results
mutmut html
```

#### Go - go-mutesting
```bash
go-mutesting ./...
```

### Handling Surviving Mutants

1. **Equivalent Mutants**: Semantically identical, ignore
2. **Missing Tests**: Write tests to kill the mutant
3. **Weak Assertions**: Strengthen existing assertions
4. **Dead Code**: Remove unreachable code

---

## Integration Testing

### Scope Definition

Integration tests verify component interactions:
- Database operations
- External service calls
- Message queue interactions
- File system operations
- Cache operations

### Test Containers

Disposable Docker containers for dependencies.

#### Java Example
```java
@Testcontainers
class UserRepositoryIntegrationTest {
    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("test")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository repository;

    @Test
    void shouldPersistAndRetrieveUser() {
        User user = new User("John", "john@example.com");

        User saved = repository.save(user);
        User found = repository.findById(saved.getId()).orElseThrow();

        assertThat(found.getName()).isEqualTo("John");
    }
}
```

#### Go Example
```go
func TestUserRepository_Integration(t *testing.T) {
    if testing.Short() {
        t.Skip("Skipping integration test")
    }

    ctx := context.Background()
    container, err := postgres.RunContainer(ctx,
        testcontainers.WithImage("postgres:15"),
        postgres.WithDatabase("test"),
    )
    require.NoError(t, err)
    defer container.Terminate(ctx)

    connStr, _ := container.ConnectionString(ctx)
    db, _ := sql.Open("postgres", connStr)
    repo := NewUserRepository(db)

    t.Run("persists and retrieves user", func(t *testing.T) {
        user := &User{Name: "John", Email: "john@example.com"}

        err := repo.Save(ctx, user)
        require.NoError(t, err)

        found, err := repo.FindByID(ctx, user.ID)
        require.NoError(t, err)
        assert.Equal(t, "John", found.Name)
    })
}
```

### API Integration Testing

#### Spring Boot
```java
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTest {
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void shouldCreateAndGetUser() {
        CreateUserRequest request = new CreateUserRequest("John");

        ResponseEntity<User> createResponse = restTemplate
            .postForEntity("/api/users", request, User.class);

        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        Long userId = createResponse.getBody().getId();
        ResponseEntity<User> getResponse = restTemplate
            .getForEntity("/api/users/" + userId, User.class);

        assertThat(getResponse.getBody().getName()).isEqualTo("John");
    }
}
```

#### Node.js (Supertest)
```typescript
import request from 'supertest';
import { app } from '../src/app';
import { prisma } from '../src/db';

describe('User API', () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });

    it('should create and retrieve user', async () => {
        const createRes = await request(app)
            .post('/api/users')
            .send({ name: 'John', email: 'john@test.com' })
            .expect(201);

        const userId = createRes.body.id;

        const getRes = await request(app)
            .get(`/api/users/${userId}`)
            .expect(200);

        expect(getRes.body.name).toBe('John');
    });
});
```

---

## Contract Testing

### Consumer-Driven Contracts

#### Pact Example (Consumer - JavaScript)
```javascript
const { Pact } = require('@pact-foundation/pact');

describe('User API Contract', () => {
    const provider = new Pact({
        consumer: 'OrderService',
        provider: 'UserService',
    });

    beforeAll(() => provider.setup());
    afterAll(() => provider.finalize());

    it('should return user by ID', async () => {
        await provider.addInteraction({
            state: 'user with ID 1 exists',
            uponReceiving: 'a request for user 1',
            withRequest: {
                method: 'GET',
                path: '/users/1',
            },
            willRespondWith: {
                status: 200,
                body: {
                    id: 1,
                    name: Matchers.string('John'),
                    email: Matchers.email(),
                },
            },
        });

        const user = await userClient.getUser(1);
        expect(user.name).toBeDefined();
    });
});
```

---

## Performance Testing

### Types

| Type | Purpose | Duration |
|------|---------|----------|
| Load | Normal expected load | Minutes |
| Stress | Beyond capacity | Minutes |
| Spike | Sudden traffic bursts | Seconds-Minutes |
| Soak | Extended duration | Hours |
| Scalability | Scaling behavior | Variable |

### k6 Example
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '2m', target: 100 },  // Ramp up
        { duration: '5m', target: 100 },  // Stay at peak
        { duration: '2m', target: 0 },    // Ramp down
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% under 500ms
        http_req_failed: ['rate<0.01'],   // <1% errors
    },
};

export default function () {
    const res = http.get('http://api.example.com/users');
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time OK': (r) => r.timings.duration < 500,
    });
    sleep(1);
}
```

---

## Test Organization

### Directory Structure
```
src/
├── main/
│   └── java/com/example/
│       └── user/
│           ├── UserService.java
│           └── UserRepository.java
└── test/
    └── java/com/example/
        └── user/
            ├── UserServiceTest.java          # Unit tests
            ├── UserRepositoryIT.java         # Integration tests
            └── UserApiE2ETest.java           # E2E tests
```

### Naming Conventions
- Unit tests: `*Test.java`, `*_test.go`, `*.test.ts`
- Integration tests: `*IT.java`, `*_integration_test.go`, `*.integration.test.ts`
- E2E tests: `*E2ETest.java`, `*.e2e.test.ts`

### Test Configuration

Separate test profiles for different environments:
```yaml
# application-test.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
  jpa:
    hibernate:
      ddl-auto: create-drop
```
