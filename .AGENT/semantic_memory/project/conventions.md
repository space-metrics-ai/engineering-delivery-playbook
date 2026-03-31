# Conventions - Coding Standards

## Overview

Document your project's coding conventions here. This ensures the AI agent generates code that matches your team's style.

## Template

### Naming Conventions

| Element | Style | Example |
|---------|-------|---------|
| Variables | camelCase | `userName` |
| Functions | camelCase | `getUserById()` |
| Classes | PascalCase | `UserService` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |
| Files | kebab-case | `user-service.ts` |
| Database tables | snake_case | `user_sessions` |

### Git Conventions

- **Branch naming**: `feat/`, `fix/`, `chore/`, `refactor/`
- **Commit format**: `type(scope): description`
- **PR size**: < 400 lines
- **Squash on merge**: yes/no

### Code Organization

```
src/
├── controllers/    # Route handlers
├── services/       # Business logic
├── models/         # Data models
├── middleware/      # Express/Koa middleware
├── utils/          # Shared utilities
└── tests/          # Test files mirror src/
```

### Error Handling

- Use custom error classes
- Always log errors with context
- Return appropriate HTTP status codes
- Never expose internal errors to clients

### Testing

- Unit tests: `*.test.ts` or `*.spec.ts`
- Integration tests: `*.integration.test.ts`
- Minimum coverage: 80% for new code
- Test naming: `should [expected behavior] when [condition]`

---

_Update this file to match your project's conventions._
