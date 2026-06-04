---
sidebar_position: 4
title: Directory Structure
description: Understand Saucebase's unique modular architecture and file organization
---

# Directory Structure

Saucebase follows Laravel conventions but adds a powerful modular architecture. This guide focuses on **what's unique to Saucebase** vs standard Laravel.

:::tip Standard Laravel Patterns
Saucebase uses standard Laravel directory structure (`app/`, `config/`, `routes/`, `storage/`, etc.). See the [Laravel Documentation](https://laravel.com/docs/12.x/structure) for general Laravel patterns. This guide covers only Saucebase-specific architecture.
:::

## Root Directory Overview

```
saucebase/
├── app/                    # Core application (standard Laravel)
├── modules/                # ⭐ Feature modules (unique to Saucebase)
├── resources/              # Frontend code with module support
├── frontend.json           # ⭐ Active framework (vue or react)
├── module-loader.js        # ⭐ Module asset discovery system
├── vite.config.js          # ⭐ Module-aware Vite configuration
├── playwright.config.ts    # ⭐ Module-aware E2E testing
└── ...                     # Standard Laravel files
```

## Module Directory Structure

Each module is a self-contained feature package with its own routes, migrations, tests, and frontend assets.

```
modules/
└── <ModuleName>/
    ├── app/
    │   ├── Http/Controllers/
    │   ├── Models/
    │   ├── Providers/
    │   │   └── <ModuleName>ServiceProvider.php  # Extends ModuleServiceProvider
    │   └── Services/
    ├── config/
    │   └── config.php           # Module configuration
    ├── database/
    │   ├── migrations/          # Module-specific migrations
    │   ├── seeders/
    │   └── factories/
    ├── lang/
    │   └── en/                  # Module translations
    ├── resources/
    │   ├── css/
    │   │   └── app.css          # Module styles
    │   └── js/
    │       ├── app.ts           # ⭐ Entry point (proxies to active framework)
    │       ├── types/           # Framework-agnostic TypeScript types
    │       ├── vue/             # Vue implementation
    │       │   ├── app.ts       # Module lifecycle hooks (setup, afterMount)
    │       │   ├── pages/       # Module Inertia pages
    │       │   ├── components/
    │       │   └── layouts/
    │       └── react/           # React implementation
    │           ├── app.tsx
    │           ├── pages/
    │           └── components/
    ├── routes/
    │   ├── web.php              # Auto-loaded when module is installed
    │   ├── api.php
    │   └── navigation.php       # Module navigation items
    ├── tests/
    │   ├── Feature/
    │   ├── Unit/
    │   └── e2e/                 # Module E2E tests (auto-discovered)
    ├── vite.config.js           # ⭐ Exports asset paths for collection
    └── composer.json            # Module manifest (PSR-4 autoload + Laravel providers)
```

## Module Discovery

Modules are loaded based on their presence as Composer packages in `modules/`. There is no separate status file — Composer is the source of truth.

- **Install**: `composer require saucebase/auth` — module is immediately active
- **Remove**: `composer remove saucebase/auth` — module is deactivated
- **List**: `php artisan modules:list` — shows all discovered modules

Saucebase's module system is built on [InterNACHI/modular](https://github.com/InterNACHI/modular) — see that package for the full module API.

## Want to go deeper?

- **[Module Management](/fundamentals/modules)** — Installing, removing, and creating modules
- **[Module System](/architecture/module-system)** — How the module system works under the hood
- **[Frontend Architecture](/architecture/frontend)** — Framework choice, Inertia, and the build pipeline
- **[SSR](/fundamentals/ssr)** — Server-side rendering and the `withSSR()` macro
