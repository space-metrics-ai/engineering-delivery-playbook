# Contributing

Thanks for your interest in improving the Engineering Delivery Playbook.

---

## How to Add a New Profile

1. Create `profiles/<name>.md` following the structure of existing profiles
2. Add an entry to the `AGENTS` object in `bin/cli.js` with `name` and `file`
3. Add aliases to the `ALIASES` object if appropriate
4. Update `profiles/README.md` with the new profile
5. Update `README.md` profiles table
6. If the profile needs a knowledge base, create `profiles/knowledge/<name>.md` and update `profiles/knowledge/index.md`

### Profile File Structure

Every profile `.md` follows this structure:

```markdown
# <Name> Profile

You are a **Senior <Role>**. <One-line description>.

---

## Identity
- **Stack**: ...
- **Mindset**: ...
- **Reference**: profiles/knowledge/ for patterns and principles

---

## <Technology> Rules
(Stack-specific conventions and patterns)

---

## Testing
(Testing approach for this stack)

---

## OpenSpec Auto-Flow
(Standard auto-flow section — copy from an existing profile)
```

---

## Code Style

- CLI is plain Node.js — no build step, no TypeScript, no external dependencies
- Support Node >= 14
- Profile files are Markdown — keep them under 150 lines
- Knowledge base files can be longer but should be well-structured with clear headers

---

## Testing Changes

```bash
node bin/cli.js help               # Verify CLI works
node bin/cli.js list               # Verify profile listing
node bin/cli.js switch <profile>   # Test in a temporary directory
```

After running `switch`, verify:
- `CLAUDE.md` was generated with correct `profiles/` paths
- `.cursorrules` contains the full profile content

---

## PR Guidelines

- Keep PRs under 400 lines
- One profile per PR when adding new profiles
- Update all cross-references (README, index.md, cli.js)
- Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`

---

## Reporting Issues

Open an issue at [GitHub Issues](https://github.com/space-metrics-ai/engineering-delivery-playbook/issues) with:
- What you expected
- What happened
- Steps to reproduce

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
