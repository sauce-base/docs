---
sidebar_position: 1
slug: /
title: Welcome
description: Modular Laravel SaaS starter kit built on Vue, Inertia, Laravel, and Tailwind - you own the code
---

import ModuleGrid from '@site/src/components/ModuleGrid';

# Welcome to Saucebase Documentation

You've been here before: A Laravel starter kit promises to save you months of work. But when you need to customize authentication, add a custom field, or integrate with your systems, you're suddenly fighting against the very package that was supposed to help you.

**What if you just owned the code instead?**

Saucebase is a Laravel SaaS starter kit where modules install INTO your repository, not as vendor packages. The code is yours from day one.

Built on the [VILT stack](/reference/glossary#vilt-stack) (Vue 3, Inertia.js, Laravel 12, Tailwind CSS 4), Saucebase gives you a production-ready foundation while you keep complete control over every line of code.

## What Makes Saucebase Different?

### 🎯 You Own The Code

Like [shadcn/ui](https://ui.shadcn.com), modules install **directly into your repository**, not as external packages.

**What this means for you:**

- **No vendor controlling your roadmap**: The code is in YOUR repository. You decide what changes, when, and how.
- **Change anything without asking permission**: Need a custom field? Edit the file. Want different validation? Modify the rules. It's your code.
- **No 3am emergencies from upstream changes**: Package updates can't break your code because you control the code.
- **Complete freedom to refactor**: Rebuild features to match your exact architecture. You're not fighting against package assumptions.

> **Read it. Understand it. Modify it. It's yours.**

:::tip Copy-and-Own Philosophy
When you install a module, the code copies into your `Modules/` directory. It's now yours to modify. Need to change how authentication works? Go ahead and edit the files directly. No patches, no forks, no complicated upgrade paths.
:::

### ⚡ Built for Speed

We've optimized the development experience so you can build faster:

- **One-command setup**: Run `php artisan saucebase:install` and Saucebase starts [Docker](/reference/glossary#docker) containers, configures your database, and generates SSL certificates automatically
- **Instant hot reload**: See your changes immediately in the browser with [HMR](/reference/glossary#hmr-hot-module-replacement) (no page refresh needed)
- **Type-safe routes**: [Ziggy](/reference/glossary#ziggy) generates TypeScript helpers from your Laravel routes, so you get autocomplete and type checking
- **SSR when you need it**: Enable [server-side rendering](/reference/glossary#ssr-server-side-rendering) for specific pages to improve SEO and performance

### 🛠️ Modern Stack

Saucebase uses cutting-edge tools that make development enjoyable:

**Backend:**
- [Laravel](/reference/glossary#laravel) 12 with PHP 8.4+ - The foundation of your application
- [Filament](/reference/glossary#filament) 4 - Beautiful admin panel out of the box
- [Spatie](/reference/glossary#spatie) packages - Battle-tested tools for permissions and navigation
- [Horizon](/reference/glossary#horizon) - Monitor your background jobs with a beautiful dashboard

**Frontend:**
- [Vue](/reference/glossary#vue-3) 3 Composition API - Modern, reactive UI framework
- [TypeScript](/reference/glossary#typescript) 5.8 - Catch bugs before they reach production
- [Inertia.js](/reference/glossary#inertiajs) 2.0 - Connect Laravel and Vue without building an API
- [Tailwind CSS](/reference/glossary#tailwind-css) 4 - Style your app with utility classes
- [shadcn-vue](/reference/glossary#shadcn-vue) - Copy-paste beautiful components

**Development Tools:**
- [PHPStan](/reference/glossary#phpstan) level 9 - Find bugs in your PHP code automatically
- [Laravel Pint](/reference/glossary#laravel-pint) & ESLint - Keep your code formatted consistently
- [Playwright](/reference/glossary#playwright) - Test your app like a real user would
- Commitlint - Maintain clean git history with conventional commits

### 📦 Modular Architecture

[Modules](/reference/glossary#module) are self-contained features that install into your codebase. You can use the pre-built ones or create your own.

**Installing a module is simple:**

```bash
# Install the Auth module
composer require saucebase/auth
php artisan module:enable Auth
php artisan module:migrate Auth --seed
```

The code now lives in your `Modules/Auth` directory. You can open the files and modify them however you want.

**Available modules:**

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

:::tip Want to create your own?
Check out our [module creation guide](/fundamentals/modules) to learn how to build custom modules for your specific needs.
:::

## Quick Start

You can get Saucebase running in just a few minutes:

```bash
# Create a new project
composer create-project saucebase/saucebase my-app
cd my-app

# Install and configure everything
php artisan saucebase:install

# Start the development server
npm run dev
```

Open `https://localhost` in your browser and you're ready to build!

:::tip What does saucebase:install do?
This command starts Docker containers (MySQL, Redis, Mailpit), generates SSL certificates, runs migrations, and seeds your database. Everything you need to start developing.
:::

## Documentation Structure

This documentation is organized to help you find what you need quickly:

### [🚀 Getting Started](/getting-started/introduction)
New to Saucebase? Start here. You'll learn how to install Saucebase, configure your environment, and understand the project structure.

### [🏗️ Architecture](/architecture/overview)
Learn how Saucebase works internally. We cover the modular system, frontend and backend architecture, and how everything connects.

### [📦 Fundamentals](/fundamentals/modules)
Master the core features you'll use every day: modules, routing, SSR, and translations.

### [💻 Development](/development/commands)
Daily development guides including available commands, coding standards, and git workflow.

### [📚 Reference](/reference/glossary)
Quick reference materials including our glossary of technical terms and troubleshooting guides.

## Need Help?

We're here to help you succeed with Saucebase:

- 📚 **Documentation**: You're already here! Use the search bar above to find what you need
- 🐛 **Found a bug?**: [Report it on GitHub Issues](https://github.com/sauce-base/saucebase/issues)
- 💬 **Have questions?**: [Ask the community on GitHub Discussions](https://github.com/sauce-base/saucebase/discussions)
- 🔗 **Browse the code**: [Main Repository](https://github.com/sauce-base/saucebase)

:::tip Check the Troubleshooting Guide
Many common issues are already solved in our [troubleshooting guide](/reference/troubleshooting). Check there first!
:::

## Contributing

We welcome contributions! Whether you found a typo, want to improve the docs, or add a new feature:

- **Documentation improvements**: [sauce-base/docs](https://github.com/sauce-base/docs)
- **Code contributions**: [sauce-base/saucebase](https://github.com/sauce-base/saucebase)

Every contribution, no matter how small, makes Saucebase better for everyone.

## License

Saucebase is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT). You can use it freely in your projects, modify it, and even use it commercially.

---

**Ready to own your SaaS foundation?** Head to [Getting Started](/getting-started/introduction) →
