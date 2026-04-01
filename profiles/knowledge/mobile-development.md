# Mobile Development Knowledge Base

## Architecture Patterns

### MVVM (Model-View-ViewModel)

**When to use**: Standard choice for most mobile apps.

```
┌─────────────────────────────────────────────────────────────┐
│                          View                                │
│  (Widgets/Composables/SwiftUI Views)                        │
│  - Renders UI                                                │
│  - Captures user input                                       │
│  - Observes ViewModel state                                  │
└─────────────────────────┬───────────────────────────────────┘
                          │ observes
┌─────────────────────────▼───────────────────────────────────┐
│                      ViewModel                               │
│  - Holds UI state                                            │
│  - Handles UI logic                                          │
│  - Calls Use Cases/Repository                                │
└─────────────────────────┬───────────────────────────────────┘
                          │ calls
┌─────────────────────────▼───────────────────────────────────┐
│                    Model/Domain                              │
│  - Business logic                                            │
│  - Data transformation                                       │
└─────────────────────────────────────────────────────────────┘
```

#### Flutter Implementation
```dart
// ViewModel with Riverpod
@riverpod
class UserViewModel extends _$UserViewModel {
  @override
  AsyncValue<User> build() => const AsyncValue.loading();

  Future<void> loadUser(int id) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() => ref.read(userRepositoryProvider).getUser(id));
  }
}

// View
class UserScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userState = ref.watch(userViewModelProvider);

    return userState.when(
      loading: () => const CircularProgressIndicator(),
      error: (e, _) => ErrorWidget(e.toString()),
      data: (user) => UserContent(user: user),
    );
  }
}
```

#### Android Implementation
```kotlin
// ViewModel
@HiltViewModel
class UserViewModel @Inject constructor(
    private val getUserUseCase: GetUserUseCase
) : ViewModel() {

    private val _state = MutableStateFlow<UiState<User>>(UiState.Loading)
    val state: StateFlow<UiState<User>> = _state.asStateFlow()

    fun loadUser(id: Int) {
        viewModelScope.launch {
            _state.value = UiState.Loading
            getUserUseCase(id)
                .onSuccess { _state.value = UiState.Success(it) }
                .onFailure { _state.value = UiState.Error(it) }
        }
    }
}

// Composable
@Composable
fun UserScreen(viewModel: UserViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    when (val current = state) {
        is UiState.Loading -> LoadingIndicator()
        is UiState.Error -> ErrorView(current.error)
        is UiState.Success -> UserContent(current.data)
    }
}
```

#### iOS Implementation
```swift
// ViewModel
@MainActor
class UserViewModel: ObservableObject {
    @Published private(set) var state: ViewState<User> = .loading

    private let getUserUseCase: GetUserUseCase

    init(getUserUseCase: GetUserUseCase) {
        self.getUserUseCase = getUserUseCase
    }

    func loadUser(id: Int) async {
        state = .loading
        do {
            let user = try await getUserUseCase.execute(id: id)
            state = .success(user)
        } catch {
            state = .error(error)
        }
    }
}

// View
struct UserScreen: View {
    @StateObject private var viewModel: UserViewModel

    var body: some View {
        switch viewModel.state {
        case .loading:
            ProgressView()
        case .error(let error):
            ErrorView(error: error)
        case .success(let user):
            UserContent(user: user)
        }
    }
}
```

---

### MVI (Model-View-Intent)

**When to use**: Complex state, need for unidirectional data flow.

```
┌─────────┐     Intent     ┌─────────────┐     State     ┌─────────┐
│  View   │ ─────────────► │   Model/    │ ─────────────►│  View   │
│         │                │  ViewModel  │               │         │
└─────────┘                └─────────────┘               └─────────┘
     │                           │
     │         Side Effects      │
     │◄──────────────────────────┘
```

#### Flutter (Bloc)
```dart
// Events (Intents)
sealed class UserEvent {}
class LoadUser extends UserEvent {
  final int id;
  LoadUser(this.id);
}

// State
sealed class UserState {}
class UserLoading extends UserState {}
class UserLoaded extends UserState {
  final User user;
  UserLoaded(this.user);
}
class UserError extends UserState {
  final String message;
  UserError(this.message);
}

// Bloc
class UserBloc extends Bloc<UserEvent, UserState> {
  final UserRepository repository;

  UserBloc(this.repository) : super(UserLoading()) {
    on<LoadUser>(_onLoadUser);
  }

  Future<void> _onLoadUser(LoadUser event, Emitter<UserState> emit) async {
    emit(UserLoading());
    try {
      final user = await repository.getUser(event.id);
      emit(UserLoaded(user));
    } catch (e) {
      emit(UserError(e.toString()));
    }
  }
}
```

---

### Clean Architecture

**When to use**: Large apps, multiple data sources, need for testability.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │     Widgets     │  │   ViewModels    │  │     States      │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                          Domain Layer                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │    Entities     │  │    Use Cases    │  │ Repository I/F  │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                           Data Layer                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │  Repositories   │  │  Data Sources   │  │     Models      │     │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## State Management Comparison

### Flutter

| Solution | Complexity | Learning Curve | Best For |
|----------|------------|----------------|----------|
| setState | Low | Easy | Simple widgets |
| Provider | Low-Medium | Easy | Medium apps |
| Riverpod | Medium | Medium | Most apps |
| Bloc | Medium-High | Medium | Complex state, teams |
| GetX | Low | Easy | Rapid prototyping |
| MobX | Medium | Medium | Reactive apps |

### Android

| Solution | Complexity | Best For |
|----------|------------|----------|
| ViewModel + StateFlow | Medium | Standard choice |
| ViewModel + LiveData | Low | Legacy/Java |
| MVI (custom) | High | Complex flows |
| Orbit MVI | Medium | MVI simplified |

### iOS

| Solution | Complexity | Best For |
|----------|------------|----------|
| @State/@StateObject | Low | Simple views |
| ObservableObject | Medium | Standard choice |
| Combine | High | Reactive flows |
| TCA | High | Unidirectional, testable |

---

## Performance Optimization

### Image Optimization

| Platform | Library | Best Practices |
|----------|---------|----------------|
| Flutter | cached_network_image | Use `cacheWidth`/`cacheHeight`, placeholder |
| Android | Coil/Glide | Use `size()`, disk cache, crossfade |
| iOS | Kingfisher/SDWebImage | Downsample, cache, placeholder |

```dart
// Flutter - Optimized image loading
CachedNetworkImage(
  imageUrl: url,
  memCacheWidth: 200,  // Resize in memory
  placeholder: (_, __) => Shimmer(),
  errorWidget: (_, __, ___) => Icon(Icons.error),
)
```

### List Performance

```dart
// Flutter - DO use builder
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) => ItemWidget(
    key: ValueKey(items[index].id),  // Always use keys
    item: items[index],
  ),
)

// Flutter - DON'T
ListView(
  children: items.map((item) => ItemWidget(item: item)).toList(),
)
```

```kotlin
// Android Compose - DO use LazyColumn
LazyColumn {
    items(
        items = items,
        key = { it.id }  // Stable keys
    ) { item ->
        ItemRow(item = item)
    }
}

// Use remember for expensive calculations
val sortedItems = remember(items) {
    items.sortedBy { it.name }
}
```

```swift
// iOS SwiftUI - DO use LazyVStack
LazyVStack {
    ForEach(items, id: \.id) { item in
        ItemRow(item: item)
    }
}
```

### Memory Management

| Issue | Flutter | Android | iOS |
|-------|---------|---------|-----|
| Subscription leaks | Cancel in `dispose()` | Use `viewModelScope` | Store in `Set<AnyCancellable>` |
| Image cache | Clear with `imageCache.clear()` | Use LRU cache | Use `SDImageCache.shared.clearMemory()` |
| Large objects | Use `compute()` isolate | Use `withContext(IO)` | Use background queue |

---

## Testing Strategies

### Unit Testing

```dart
// Flutter - Testing a Use Case
void main() {
  late MockUserRepository mockRepository;
  late GetUserUseCase useCase;

  setUp(() {
    mockRepository = MockUserRepository();
    useCase = GetUserUseCase(mockRepository);
  });

  test('returns user when repository succeeds', () async {
    when(() => mockRepository.getUser(1))
        .thenAnswer((_) async => testUser);

    final result = await useCase(1);

    expect(result, testUser);
    verify(() => mockRepository.getUser(1)).called(1);
  });
}
```

### Widget/UI Testing

```dart
// Flutter Widget Test
testWidgets('shows loading then content', (tester) async {
  final bloc = MockUserBloc();
  whenListen(
    bloc,
    Stream.fromIterable([UserLoading(), UserLoaded(testUser)]),
    initialState: UserLoading(),
  );

  await tester.pumpWidget(
    BlocProvider.value(
      value: bloc,
      child: MaterialApp(home: UserScreen()),
    ),
  );

  expect(find.byType(CircularProgressIndicator), findsOneWidget);

  await tester.pump();

  expect(find.text(testUser.name), findsOneWidget);
});
```

### Integration Testing

```dart
// Flutter Integration Test
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('complete user flow', (tester) async {
    app.main();
    await tester.pumpAndSettle();

    // Login
    await tester.enterText(find.byKey(Key('email')), 'test@test.com');
    await tester.enterText(find.byKey(Key('password')), 'password');
    await tester.tap(find.byKey(Key('login_button')));
    await tester.pumpAndSettle();

    // Verify navigation
    expect(find.byType(HomeScreen), findsOneWidget);
  });
}
```

---

## Platform-Specific Patterns

### Deep Linking

```dart
// Flutter - GoRouter
final router = GoRouter(
  routes: [
    GoRoute(
      path: '/user/:id',
      builder: (context, state) {
        final id = state.pathParameters['id']!;
        return UserScreen(userId: int.parse(id));
      },
    ),
  ],
);
```

```kotlin
// Android - Navigation Component
// AndroidManifest.xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="myapp" android:host="user" />
</intent-filter>

// nav_graph.xml
<deepLink app:uri="myapp://user/{id}" />
```

```swift
// iOS - Universal Links
func application(_ application: UIApplication,
                 continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    guard let url = userActivity.webpageURL else { return false }
    return handleDeepLink(url)
}
```

### Background Processing

| Platform | Solution | Use Case |
|----------|----------|----------|
| Flutter | workmanager, background_fetch | Periodic tasks |
| Android | WorkManager | Deferrable tasks |
| iOS | BGTaskScheduler | Background refresh |

---

## Security Checklist

### Secure Storage

```dart
// Flutter
final storage = FlutterSecureStorage();
await storage.write(key: 'token', value: token);
```

```kotlin
// Android
val encryptedPrefs = EncryptedSharedPreferences.create(
    context,
    "secret_prefs",
    masterKey,
    EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
    EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)
```

```swift
// iOS
let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrAccount as String: "token",
    kSecValueData as String: token.data(using: .utf8)!
]
SecItemAdd(query as CFDictionary, nil)
```

### Certificate Pinning

```dart
// Flutter with Dio
dio.httpClientAdapter = IOHttpClientAdapter(
  createHttpClient: () {
    final client = HttpClient();
    client.badCertificateCallback = (cert, host, port) {
      return cert.sha256.toString() == expectedHash;
    };
    return client;
  },
);
```

---

## Accessibility Guidelines

### Minimum Requirements

| Platform | Touch Target | Font Scaling | Screen Reader |
|----------|--------------|--------------|---------------|
| Flutter | 48x48 dp | MediaQuery.textScaleFactor | Semantics widget |
| Android | 48x48 dp | sp units | contentDescription |
| iOS | 44x44 pt | Dynamic Type | accessibilityLabel |

```dart
// Flutter - Semantic label
Semantics(
  label: 'Profile picture of $userName',
  child: CircleAvatar(backgroundImage: NetworkImage(imageUrl)),
)
```

```kotlin
// Android Compose - Content description
Image(
    painter = painterResource(R.drawable.profile),
    contentDescription = "Profile picture of $userName",
    modifier = Modifier.semantics {
        role = Role.Image
    }
)
```

```swift
// iOS SwiftUI - Accessibility label
Image(user.profileImage)
    .accessibilityLabel("Profile picture of \(user.name)")
```

---

*This knowledge base provides reference materials for mobile development across Flutter, Android, and iOS.*
