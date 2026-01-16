---
sidebar_position: 1
title: Introduction
description: Learn about Saucebase philosophy, key features, and what makes it different from other Laravel starter kits
---

import ModuleGrid from '@site/src/components/ModuleGrid';

# Introduction

Most Laravel starter kits trap you in a vendor package. You fight their architecture, maintain patches, and pray updates don't break your customizations.

**Saucebase gives you the code. You own it completely.**

Built on the VILT stack (Vue 3, Inertia.js, Laravel 12, Tailwind CSS 4), Saucebase provides a solid foundation for building SaaS applications while giving you complete control over every line of code.

## The Problem with Traditional Starter Kits

### Black Box Syndrome
You can't see how things work internally. When something breaks, you're debugging code you can't read or modify. Learning is limited because you're just using an API.

### Customization Hell
Every change fights against package assumptions. You override classes, extend interfaces, and maintain patches. Your code becomes a fragile layer on top of theirs.

### Update Anxiety
Every update might break your customizations. You're stuck between security patches and stability. Eventually you freeze versions and lose support.

### The Fork Trap
Fork the package to gain control? Now you maintain a divergent codebase. Merging upstream changes becomes impossible.

**This is the reality for most Laravel starter kits.**

Saucebase takes a different approach, inspired by shadcn/ui's revolutionary "copy-paste" philosophy.

## Philosophy: Copy and Own

Most Laravel starter kits work as external packages—you install them via Composer and hope upstream updates don't break your customizations. Saucebase takes a different approach, inspired by [shadcn/ui](https://ui.shadcn.com).

### How It Works

When you install a Saucebase module:

1. **Code is copied** into your repository (not installed as a vendor package)
2. **You own it** completely—modify, refactor, or delete as needed
3. **No vendor lock-in**—there's no upstream package to maintain compatibility with
4. **Customize freely**—change anything without forking or maintaining patches

```bash
# Traditional approach (vendor package)
composer require vendor/auth-package
# → Code stays in vendor/, you can't modify it

# Saucebase approach (copy-and-own)
composer require saucebase/auth
# → Code is copied to modules/Auth/, you own it
```

:::tip You Are The Vendor
When you install a Saucebase module, you're not adding a dependency. You're acquiring source code. From day one, you control the roadmap, the updates, and the architecture. You are the vendor.
:::

### Why This Matters for Learning

Traditional packages are black boxes. You use them, but you don't learn from them.

Saucebase modules are educational:
- **Read the code** - Well-commented, PSR-12 compliant, PHPStan level 9
- **Understand patterns** - See how authentication really works
- **Learn best practices** - Repository pattern, service layer, type safety
- **Build expertise** - Become the expert on YOUR codebase

When you debug, you're reading YOUR code, not decompiled vendor code. When you add features, you're following patterns YOU control.

### The AI-Era Advantage

In 2026, AI coding assistants are part of every developer's workflow. But they struggle with black-box packages:

- ❌ Can't see inside vendor packages to understand patterns
- ❌ Can't modify vendor code safely
- ❌ Generate code that fights against package assumptions

With Saucebase:
- ✅ AI can read your modules and understand your architecture
- ✅ AI suggestions align with your actual codebase
- ✅ You can accept AI changes because you own the code

Transparency isn't just about control—it's about making your entire development workflow smarter.

## Key Features

### 🏗️ Modular Architecture

Features are organized into self-contained modules with their own:
- Controllers, models, and services
- Vue components and pages
- Routes and migrations
- Tests and documentation

Enable or disable modules independently:

```bash
php artisan module:enable Auth
php artisan module:disable Settings
```

### 🎨 Modern Frontend Stack

**Vue 3 + TypeScript**
- Composition API with `<script setup>`
- Full TypeScript support with type checking
- Auto-imported composables

**Inertia.js 2.0**
- SPA experience without building an API
- Server-driven routing
- Code splitting and lazy loading

**Tailwind CSS 4**
- Latest CSS features
- shadcn-vue component library
- Dark mode built-in

### ⚙️ Powerful Backend

**Laravel 12**
- PHP 8.4+ with modern syntax
- Spatie packages for permissions, navigation
- Laravel Horizon for queue management

**Filament 4 Admin Panel**
- Ready-to-use admin interface
- Customizable resources
- Built-in dark mode

### 🐳 Docker-First Development

One command sets up everything:

```bash
php artisan saucebase:install
```

This launches:
- MySQL 8 database
- Redis for caching/sessions/queues
- Nginx web server
- Mailpit for email testing
- SSL certificates with wildcard support (multi-tenancy ready)

### 🔒 Production-Ready Defaults

- **Security**: HTTPS enforcement, CSRF protection, sanitized inputs
- **Performance**: Redis caching, queue workers, optimized assets
- **Quality**: PHPStan level 9, Pint formatter, ESLint
- **Testing**: PHPUnit + Playwright E2E tests
- **i18n**: Portuguese & English translations included

## What You Get

### Included Out of the Box

- ✅ Docker development environment
- ✅ Vue 3 + TypeScript + Inertia.js SPA
- ✅ Tailwind CSS 4 with shadcn-vue components
- ✅ Dark/light mode with persistence
- ✅ i18n support (English + Portuguese)
- ✅ Type-safe routing (Ziggy)
- ✅ Server-side rendering (SSR) support
- ✅ Code quality tools (PHPStan, Pint, ESLint)
- ✅ Testing setup (PHPUnit + Playwright)

### Optional Modules

Install only what you need:

<ModuleGrid modules={[
  {
    title: 'Auth',
    description: 'Complete authentication system with login, registration, password reset, email verification, and OAuth integration (Google, GitHub). Production-ready security with rate limiting and CSRF protection.',
    href: 'https://github.com/sauce-base/auth',
    icon: '🔐',
    status: 'available'
  },
  {
    title: 'Settings',
    description: 'Flexible settings management for both user preferences and system-wide configuration. Supports multiple data types, validation, and caching for optimal performance.',
    href: 'https://github.com/sauce-base/settings',
    icon: '⚙️',
    status: 'available'
  },
  {
    title: 'Subscriptions',
    description: 'Stripe-powered subscription management with multiple plans, metered billing, usage tracking, and webhooks. Handle trials, upgrades, and cancellations with ease.',
    href: '#',
    icon: '💳',
    status: 'coming-soon'
  },
  {
    title: 'Teams',
    description: 'Multi-user team collaboration with role-based permissions, invitations, and team switching. Perfect for B2B SaaS applications with organizational structures.',
    href: '#',
    icon: '👥',
    status: 'coming-soon'
  }
]} />

## Real-World Scenarios

### When Copy-and-Own Shines

**Scenario 1: Custom Registration Flow**

Your SaaS needs phone verification, company data, and custom onboarding.

- **Traditional package**: Override controller, extend classes, maintain patches
- **Saucebase**: Open `modules/Auth/Controllers/RegisterController.php`, edit it directly

**Scenario 2: Integration with Legacy Systems**

You need to sync with your existing CRM during authentication.

- **Traditional package**: Hook into events, reverse-engineer package internals
- **Saucebase**: Add the sync logic directly in your auth controller

**Scenario 3: Unique Business Logic**

Your SaaS has industry-specific requirements no package supports.

- **Traditional package**: Build everything around the package's rigid assumptions
- **Saucebase**: Modify the modules to fit your exact business model

**The pattern is clear: customization is editing, not extending.**

## Who Is This For?

Saucebase is ideal for:

- **Developers building SaaS applications** who want a head start without vendor lock-in
- **Teams who value code ownership** and don't want to fight upstream package updates
- **Projects with unique requirements** that need heavy customization
- **Agencies** building multiple SaaS products with different needs

## Who Is This NOT For?

Saucebase might not be the best choice if:

- You want a fully-featured SaaS platform out of the box (consider [Spark](https://spark.laravel.com/) or [Jetstream](https://jetstream.laravel.com/))
- You prefer minimal setups (consider [Laravel Breeze](https://laravel.com/docs/starter-kits#breeze))
- You don't want to maintain the code yourself (vendor packages might be better)

## Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Laravel | 12.x | Web framework |
| PHP | 8.4+ | Language |
| MySQL | 8.0 | Database |
| Redis | 7.x | Cache/Queue/Sessions |
| Filament | 4.x | Admin panel |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue | 3.4+ | UI framework |
| TypeScript | 5.8 | Type safety |
| Inertia.js | 2.0 | SPA adapter |
| Tailwind CSS | 4.x | Styling |
| Vite | 6.x | Build tool |

### Development

| Tool | Purpose |
|------|---------|
| Docker | Containerization |
| PHPStan | Static analysis (level 9) |
| Laravel Pint | PHP formatting |
| ESLint | JavaScript linting |
| Playwright | E2E testing |
| Commitlint | Conventional commits |

## Trade-offs and Limitations

### Honest Assessment

**What You Gain:**
- Complete control and ownership
- Freedom to modify anything
- No dependency on external packages
- Learning and understanding

**What You Trade:**
- You maintain the code yourself (no upstream bug fixes)
- You handle your own updates
- Larger initial codebase in your repository
- More responsibility for your code

**Why We Think It's Worth It:**

Most SaaS projects customize their starter code heavily anyway. With traditional packages, you fight against them. With Saucebase, you just edit the code directly.

The maintenance burden exists either way. But with Saucebase, you get the flexibility to make it truly yours.

## Next Steps

Now that you understand the philosophy and features:

1. **[Install Saucebase](/getting-started/installation)** - Get up and running in minutes
2. **[Configure Your Environment](/getting-started/configuration)** - Set up environment variables
3. **[Explore the Architecture](/architecture/overview)** - Understand how it all works
4. **[Install Modules](/fundamentals/modules)** - Add authentication, settings, and more

---

**Ready to own your code?** → [Installation Guide](/getting-started/installation)

Or continue reading: [Architecture Overview](/architecture/overview) to understand how everything works.
