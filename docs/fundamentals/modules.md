---
sidebar_position: 1
title: Module Management
description: Learn how to install, create, and remove Saucebase modules
---

# Module Management

Modules are self-contained feature packages installed directly into your repository. The code becomes part of your codebase — you own it and can modify it freely. For the architectural details, see [Module System Architecture](/architecture/module-system).

## Installing Modules

```bash
composer require saucebase/auth
php artisan migrate
npm run build
```

`composer require` places the module in `modules/auth/`, registers its service provider, and activates it immediately. There is no separate enable step.

### Seeding Module Data

Some modules include seeders for initial data (roles, demo records, etc.):

```bash
php artisan modules:seed --module=auth
```

### Applying Patches

Some modules include patch files that modify core files — the most common example is adding a trait to your `User` model.

```bash
# Preview what a patch will change
git apply --check modules/auth/patches/user.patch

# Apply it
git apply modules/auth/patches/user.patch
```

### Docker Environment

```bash
# On host
composer require saucebase/auth

# Inside container
docker compose exec app php artisan migrate
docker compose exec app php artisan modules:seed --module=auth

# On host
npm run build
```

## Creating Modules

Use `saucebase:recipe` to scaffold a new module. It generates the full structure, renames files, replaces placeholders, and registers the module in your Taskfile.

```bash
# Interactive — prompts for name and recipe
php artisan saucebase:recipe

# Non-interactive
php artisan saucebase:recipe BlogPost "Basic Recipe"
```

:::note
Module names must be StudlyCase with no spaces or hyphens (e.g. `BlogPost`, `UserReports`).
:::

The generated structure under `modules/blogpost/`:

```
modules/blogpost/
├── src/
│   ├── Filament/           # Admin panel plugin
│   ├── Http/Controllers/
│   └── Providers/          # Service + Route providers
├── config/config.php
├── resources/js/
│   ├── app.ts              # Entry point (proxies to active framework)
│   └── vue/
│       ├── app.ts          # Module lifecycle hooks
│       └── pages/
│           └── Index.vue   # First Inertia page
├── routes/
│   ├── web.php
│   ├── api.php
│   └── navigation.php      # Sidebar nav entries
├── tests/e2e/
├── vite.config.js
└── composer.json
```

After generation, activate the module:

```bash
composer update saucebase/blogpost
```

## Adding Global Components

If your module needs to render a component on every page — a notification banner, floating widget, or overlay — register it from your module's `setup()` hook instead of editing the app layout.

In `modules/yourmodule/resources/js/vue/app.ts`:

```typescript
import { registerGlobalComponent } from '@/lib/globalComponents';
import MyBanner from './components/MyBanner.vue';

export function setup() {
    registerGlobalComponent('top', MyBanner);
}
```

Use `'top'` to render before the page content, or `'bottom'` to render after. The component will appear on every page — no changes to core files needed. The component is responsible for deciding when to render itself (e.g. by checking an Inertia shared prop).

## Managing Modules

### List installed modules

```bash
php artisan modules:list
```

After adding or removing modules, sync the PHPUnit test suite config:

```bash
php artisan modules:sync
```

### Database operations

```bash
php artisan migrate              # runs all pending migrations including modules
php artisan migrate:rollback     # rolls back last batch
php artisan migrate:fresh --seed # CAUTION: destroys all data
php artisan migrate:status       # check migration state
```

## Removing Modules

```bash
# Rollback migrations first (optional)
php artisan migrate:rollback

# Remove via Composer — deactivates and deletes the module directory
composer remove saucebase/auth

npm run build
```

## Troubleshooting

### Module classes not found

```bash
composer dump-autoload
php artisan optimize:clear
```

### Module routes not working

```bash
# Check module is installed
php artisan modules:list

# Check routes are registered
php artisan route:list --name=auth

php artisan optimize:clear
```

### Frontend assets not loading

Rebuild after installing or removing any module:

```bash
npm run build
```

### Migrations not running

```bash
php artisan migrate
php artisan migrate:status
```

## Next Steps

- **[Auth Module](../modules/auth)** — Authentication, OAuth, and user impersonation
- **[Billing Module](../modules/billing)** — Subscriptions and payment processing
