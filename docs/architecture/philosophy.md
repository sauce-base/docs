---
sidebar_position: 1
title: Design Philosophy
description: Why Saucebase is built the way it is
---

# Design Philosophy

This guide explains the architectural decisions and design principles that shape Saucebase. Understanding the philosophy behind these choices helps you build features that align with the project's goals.

## Copy-and-Own Philosophy

Saucebase follows a **copy-and-own** approach rather than traditional package dependency management.

### What It Means

When you install a module, the code is copied directly into your repository instead of being referenced as an external package. This means:

- Module code lives in `modules/<ModuleName>/` in your project
- You have complete access to modify module code
- Modules become part of your codebase, not dependencies
- No vendor lock-in or external package constraints

### Why This Approach

**Full Control**: You own every line of code. Need to change how authentication works? Just edit the Auth module directly. No forking, no pull requests, no waiting for maintainers.

**No Versioning Hell**: Traditional packages require careful version management and can break during updates. With copy-and-own, the code is yours—it won't change unless you change it.

**Project-Specific Customization**: Every SaaS is different. Rather than working around package limitations, you start with working code and adapt it to your exact needs.

**Simplified Debugging**: When something breaks, the code is right there in your project. No diving into `vendor/` or external repositories to understand what's happening.

**Learning Opportunity**: Reading and modifying real, working code is one of the best ways to learn. Copy-and-own encourages you to understand how features work.

### Trade-offs

**No Automatic Updates**: When a module is updated upstream, you won't automatically get those changes. You'll need to manually review and apply updates if you want them.

**More Code in Your Repo**: Your repository will be larger since module code lives directly in it. This is intentional—you own and maintain this code.

**Responsibility**: With great power comes great responsibility. You're responsible for maintaining and testing the modules you install.

These trade-offs align with Saucebase's philosophy: **prefer control and simplicity over convenience and abstraction**.

## Design Principles

Saucebase follows industry-standard design principles that keep code clean, maintainable, and understandable.

### Minimum Viable Implementation (MVI)

**Start with the simplest solution that solves the problem.**

When building features, resist the urge to add "just in case" functionality. Implement what's needed today, not what might be needed tomorrow. This keeps code focused, testable, and easy to understand.

Every line of code is a liability—more code means more bugs, more complexity, more maintenance. The best code is often the code you didn't write.

**Key Question**: What's the minimum code needed to solve this problem right now?

### KISS (Keep It Simple)

**Prefer simple, obvious solutions over clever ones.**

Simple code is easy to understand at a glance. Clever abstractions might feel elegant but often create confusion six months later when someone (including you) needs to modify them.

Write code that a junior developer can read and understand. If you need comments to explain what your code does, consider whether the code itself could be clearer.

**Red Flag**: If you can't explain your solution in one sentence, it's probably too complex.

### YAGNI (You Aren't Gonna Need It)

**Don't build features for hypothetical future requirements.**

It's tempting to add configuration options, extensibility points, and "just in case" features. But most of those features never get used, and they add complexity that makes real work harder.

Implement what you need today. When (and if) requirements change, refactor then. You'll have better information about what's actually needed, and refactoring is easier than removing unused features.

**Example**: Don't build a complex notification system that supports email, SMS, push, and webhooks if you only send emails today. Build email notifications. Add other channels when you actually need them.

### DRY (Don't Repeat Yourself)

**Extract common logic into reusable functions, classes, or composables.**

When you find yourself writing the same logic in multiple places, that's a signal to abstract it. But wait until you have actual duplication (typically 3+ occurrences) before abstracting.

**Why 3+ times?** The first time, you're learning. The second time, you're confirming the pattern. The third time, you have enough information to create a good abstraction. Earlier abstraction often leads to premature, poorly-designed reusable code.

**Where to apply DRY**:
- Repeated Vue logic → Composables
- Repeated backend logic → Service classes
- Repeated test assertions → Test helpers
- Repeated validation rules → Custom validation rules

### When to Break the Rules

These principles are guidelines, not laws. Use judgment for your specific situation:

- **Need extensibility?** If you're building a platform where third parties will extend functionality, abstractions make sense.
- **Performance critical?** Sometimes "clever" optimizations are necessary for performance.
- **Team standards?** Follow your team's existing patterns for consistency.
- **Framework conventions?** Laravel and Vue have established patterns—don't fight them.

The goal is to write code that's easy to understand, maintain, and change. If following a principle makes code worse, don't follow it blindly.

## Architectural Decisions

These are the key technology choices that define Saucebase and why they were made.

### Why Inertia.js?

**Problem**: Traditional SPAs require building and maintaining a REST or GraphQL API layer. Every feature needs both backend endpoints and frontend API calls. This doubles the work and creates synchronization headaches.

**Solution**: Inertia.js eliminates the API layer entirely. Controllers return data directly to Vue components as props, just like traditional server-side frameworks. But you still get a modern SPA experience with client-side routing and partial page updates.

**Benefits**:
- No API versioning or documentation needed
- Type-safe data flow from controller to component
- Simpler architecture with fewer moving parts
- Faster development—build features, not infrastructure
- Use Laravel's built-in authentication and CSRF protection

**Trade-off**: Less suitable for public APIs or mobile apps. But for SaaS web applications, eliminating the API layer is a huge productivity win.

### Why Vue 3 Composition API?

**Problem**: Options API (Vue 2 style) spreads related logic across different sections (data, methods, computed). As components grow, it becomes harder to understand which pieces work together.

**Solution**: Composition API groups related logic together and makes it reusable through composables. It's more aligned with modern JavaScript patterns and works better with TypeScript.

**Benefits**:
- Related logic stays together
- Reusable composables for shared state and logic
- Better TypeScript support with automatic type inference
- Easier to understand component behavior at a glance
- More flexible for complex state management

### Why Opt-In SSR?

**Problem**: Always-on SSR adds overhead for authenticated pages where SEO doesn't matter. Always-off SSR misses SEO benefits for public pages.

**Solution**: SSR is disabled by default but can be enabled per-route with `->withSSR()`. This gives you the best of both worlds.

**Benefits**:
- Public marketing pages get SSR for SEO and fast first paint
- Authenticated dashboards skip SSR for better performance
- Simple, explicit control at the route level
- No hidden configuration or magic behavior

**When to use SSR**: Landing pages, blogs, documentation, product listings, any public content that benefits from SEO.

**When to skip SSR**: Dashboards, admin panels, user settings, any authenticated content that changes frequently.

### Why Module-Based Architecture?

**Problem**: Monolithic applications grow into unmaintainable spaghetti as features accumulate. Finding code becomes hard, testing becomes slow, and changes ripple unpredictably.

**Solution**: Modules are self-contained feature packages with their own routes, controllers, views, migrations, and tests. Each module can be developed, tested, and understood in isolation.

**Benefits**:
- Clear boundaries between features
- Easier to understand code organization
- Can enable/disable features without code changes
- Team members can work on different modules without conflicts
- Testing is faster when you can test one module at a time

**Combined with copy-and-own**: You get the organizational benefits of modular architecture with full control to customize modules to your needs.

### Why Docker-First?

**Problem**: "Works on my machine" syndrome. Different team members have different local setups, leading to configuration drift and debugging nightmares.

**Solution**: Docker provides consistent development environments for everyone. The same containers run locally, in CI/CD, and in production.

**Benefits**:
- Consistent environment across all machines
- New developers productive in minutes, not days
- Multi-tenancy ready (wildcard SSL certificates included)
- Easy to add new services (Redis, Mailpit, etc.)
- Matches production environment closely

**Trade-off**: Docker adds a small learning curve, but modern tooling makes it straightforward. The consistency benefits far outweigh the initial setup time.

## Developer Experience Principles

### Explicit Over Implicit

Code should make its behavior obvious. Prefer `->withSSR()` that clearly enables SSR over hidden configuration that might or might not be active. When someone reads your code, they should understand what it does without consulting documentation.

### Discoverable APIs

Functions and methods should be easy to find through IDE autocomplete. Chain-able methods (like `->withSSR()->with('data', $data)`) provide great developer experience because IDEs can suggest the next step.

### Fail Fast and Loud

When something goes wrong, error messages should be clear and actionable. Don't silently fail or log cryptic messages. If a module page isn't found, throw an exception with the exact path that was tried.

### Convention With Flexibility

Follow Laravel and Vue conventions by default, but provide escape hatches when needed. Most projects work fine with conventions, but when you need to diverge, you can.

## Simplicity Over Cleverness

Throughout Saucebase, you'll notice a bias toward straightforward solutions:

- SSR control is a simple macro, not a middleware + gateway + config system
- Module pages use a clear namespace syntax (`Auth::Login`), not complex resolution logic
- Service providers extend a base class rather than implementing multiple interfaces

**This is intentional.** Simple code is:
- Easier to understand
- Easier to debug
- Easier to modify
- Less likely to break
- More welcoming to contributors

When you build features on Saucebase, follow this principle. Your future self (and your team) will thank you.

## Next Steps

Understanding these principles helps you build features that feel natural in Saucebase:

- **[Module System](/architecture/module-system)** - How modules integrate architecturally
- **[Architecture Overview](/architecture/overview)** - High-level system design
- **[Frontend Architecture](/architecture/frontend)** - Vue + Inertia patterns
- **[Backend Architecture](/architecture/backend)** - Laravel patterns and practices

When in doubt, choose simplicity. Choose clarity. Choose code you'll understand six months from now.
