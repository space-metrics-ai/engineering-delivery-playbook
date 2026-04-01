# Frontend Development Knowledge Base

## Component Patterns

### React Patterns

#### Container/Presentational Pattern
```tsx
// Presentational (dumb) component
interface UserCardProps {
  user: User;
  onEdit: () => void;
}

function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
}

// Container (smart) component
function UserCardContainer({ userId }: { userId: string }) {
  const { user, isLoading } = useUser(userId);
  const navigate = useNavigate();

  if (isLoading) return <Skeleton />;
  if (!user) return <NotFound />;

  return <UserCard user={user} onEdit={() => navigate(`/users/${userId}/edit`)} />;
}
```

#### Compound Components
```tsx
// API
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>

// Implementation
const TabsContext = createContext<TabsContextValue | null>(null);

function Tabs({ children, defaultValue }: TabsProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div role="tablist">{children}</div>
    </TabsContext.Provider>
  );
}

function TabsTrigger({ value, children }: TabsTriggerProps) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      role="tab"
      aria-selected={ctx.value === value}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  );
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
```

#### Render Props
```tsx
interface MouseTrackerProps {
  children: (position: { x: number; y: number }) => ReactNode;
}

function MouseTracker({ children }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <>{children(position)}</>;
}

// Usage
<MouseTracker>
  {({ x, y }) => <div>Mouse at: {x}, {y}</div>}
</MouseTracker>
```

### Vue Patterns

#### Composables
```typescript
// composables/useFetch.ts
export function useFetch<T>(url: MaybeRef<string>) {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  async function execute() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(unref(url));
      data.value = await response.json();
    } catch (e) {
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  }

  // Auto-fetch when URL changes
  watchEffect(() => {
    execute();
  });

  return { data, error, isLoading, refetch: execute };
}

// Usage
const { data: user, isLoading } = useFetch<User>(`/api/users/${userId}`);
```

#### Provide/Inject for Dependency Injection
```typescript
// Provide in parent
const userService = new UserService();
provide('userService', userService);

// Inject in any descendant
const userService = inject<UserService>('userService')!;

// Type-safe injection key
const UserServiceKey: InjectionKey<UserService> = Symbol('UserService');
provide(UserServiceKey, userService);
const userService = inject(UserServiceKey)!;
```

#### Slots with Scoped Data
```vue
<!-- Parent -->
<UserList :users="users">
  <template #item="{ user, index }">
    <UserCard :user="user" :rank="index + 1" />
  </template>
  <template #empty>
    <EmptyState message="No users found" />
  </template>
</UserList>

<!-- UserList.vue -->
<template>
  <div v-if="users.length === 0">
    <slot name="empty" />
  </div>
  <ul v-else>
    <li v-for="(user, index) in users" :key="user.id">
      <slot name="item" :user="user" :index="index" />
    </li>
  </ul>
</template>
```

---

## State Management

### React State Patterns

#### Local State with useReducer
```tsx
type State = {
  count: number;
  step: number;
};

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_STEP'; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </>
  );
}
```

#### Server State with TanStack Query
```tsx
// queries.ts
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    },
  });
}

// Component
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);
  const updateUser = useUpdateUser();

  if (isLoading) return <Skeleton />;
  if (error) return <Error error={error} />;

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      updateUser.mutate({ id: userId, ...formData });
    }}>
      {/* form fields */}
    </form>
  );
}
```

#### Global State with Zustand
```typescript
// store.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const user = await authService.login(credentials);
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));

// Usage
function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) return <LoginButton />;
  return <UserMenu user={user} onLogout={logout} />;
}
```

### Vue State Patterns

#### Pinia Store
```typescript
// stores/auth.ts
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => user.value !== null);

  async function login(credentials: Credentials) {
    user.value = await authService.login(credentials);
  }

  function logout() {
    authService.logout();
    user.value = null;
  }

  return { user, isAuthenticated, login, logout };
});

// Usage
const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);
```

---

## Performance Patterns

### React Performance

#### Preventing Unnecessary Re-renders
```tsx
// 1. Memoize components
const ExpensiveList = memo(function ExpensiveList({ items }: Props) {
  return items.map((item) => <ExpensiveItem key={item.id} item={item} />);
});

// 2. Memoize callbacks
function Parent() {
  const handleClick = useCallback((id: string) => {
    console.log('Clicked', id);
  }, []);

  return <Child onClick={handleClick} />;
}

// 3. Memoize computed values
function FilteredList({ items, filter }: Props) {
  const filteredItems = useMemo(
    () => items.filter((item) => item.category === filter),
    [items, filter]
  );

  return <List items={filteredItems} />;
}

// 4. Split context to prevent cascading re-renders
const UserContext = createContext<User | null>(null);
const UserActionsContext = createContext<UserActions | null>(null);
```

#### Code Splitting
```tsx
// Route-based splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}

// Component-based splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Report({ showChart }: Props) {
  return (
    <>
      <ReportSummary />
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </>
  );
}
```

### Vue Performance

#### Computed vs Methods
```vue
<script setup lang="ts">
// GOOD - Cached, only re-computes when deps change
const filteredItems = computed(() =>
  items.value.filter((item) => item.active)
);

// BAD for expensive operations - Runs on every render
function getFilteredItems() {
  return items.value.filter((item) => item.active);
}
</script>

<template>
  <!-- GOOD -->
  <div v-for="item in filteredItems" :key="item.id">
    {{ item.name }}
  </div>

  <!-- BAD - calls function on every render -->
  <div v-for="item in getFilteredItems()" :key="item.id">
    {{ item.name }}
  </div>
</template>
```

#### Efficient List Rendering
```vue
<template>
  <!-- Use v-memo for expensive items -->
  <div
    v-for="item in items"
    :key="item.id"
    v-memo="[item.id, item.selected]"
  >
    <ExpensiveComponent :item="item" />
  </div>

  <!-- Use virtual scrolling for long lists -->
  <RecycleScroller
    :items="items"
    :item-size="50"
    key-field="id"
    v-slot="{ item }"
  >
    <ListItem :item="item" />
  </RecycleScroller>
</template>
```

---

## Accessibility Patterns

### Focus Management
```tsx
// Focus trap for modals
function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const previousFocus = document.activeElement as HTMLElement;
      modalRef.current?.focus();

      return () => {
        previousFocus?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      {children}
    </div>
  );
}
```

### Accessible Forms
```tsx
function Form() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form aria-describedby="form-errors">
      {Object.keys(errors).length > 0 && (
        <div id="form-errors" role="alert" aria-live="polite">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.values(errors).map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="email">
          Email address
          <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>
    </form>
  );
}
```

### Skip Links
```tsx
function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
```

---

## Testing Patterns

### React Testing Library
```tsx
// Testing user interactions
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('submits credentials and redirects on success', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    render(<LoginForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('displays validation errors', async () => {
    const user = userEvent.setup();

    render(<LoginForm onSuccess={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });
});
```

### Vue Test Utils
```typescript
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';

describe('LoginForm', () => {
  it('submits credentials on form submit', async () => {
    const onSubmit = vi.fn();
    const wrapper = mount(LoginForm, {
      props: { onSubmit },
    });

    await wrapper.find('[data-testid="email"]').setValue('test@example.com');
    await wrapper.find('[data-testid="password"]').setValue('password123');
    await wrapper.find('form').trigger('submit');

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### E2E with Playwright
```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can log in', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByRole('alert')).toContainText('Invalid credentials');
  });
});
```

---

## Security Patterns

### XSS Prevention
```tsx
// Safe - React escapes by default
<div>{userInput}</div>

// Dangerous - only use with sanitization
import DOMPurify from 'dompurify';

<div
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(htmlContent, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href'],
    }),
  }}
/>

// URL validation
function SafeLink({ href, children }: { href: string; children: ReactNode }) {
  const isSafe = useMemo(() => {
    try {
      const url = new URL(href, window.location.origin);
      return ['http:', 'https:', 'mailto:'].includes(url.protocol);
    } catch {
      return false;
    }
  }, [href]);

  if (!isSafe) return <span>{children}</span>;
  return <a href={href}>{children}</a>;
}
```

### CSRF Protection
```tsx
// Include CSRF token in forms
function Form() {
  const csrfToken = useCsrfToken();

  return (
    <form method="POST" action="/api/submit">
      <input type="hidden" name="csrf_token" value={csrfToken} />
      {/* form fields */}
    </form>
  );
}

// Include in API requests
const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-CSRF-Token': getCsrfToken(),
  },
});
```

---

*This knowledge base provides reference materials for frontend development with React and Vue.js.*
