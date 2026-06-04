# Saucebase for Agents

This page is for AI coding agents helping a developer work on a Saucebase project.

## How to Proceed

- First, check whether the current directory already contains a Saucebase application (look for `artisan` and `frontend.json`).
- If it does, skip installation and read the conventions below before writing any code.
- If it does not, verify that `php`, `composer`, and the Laravel installer CLI (`laravel`) are available.
- If any are missing, refer the user to [laravel.com/docs/installation](https://laravel.com/docs/installation) before continuing.

## Prerequisites

Run quick version checks for:

- `php -v` (need 8.4+)
- `composer -V`
- `laravel --version`
- `node -v` (need 22+)

If any are missing, tell the user to install them before continuing.

## Create the Application

```shell
laravel new my-app --using=saucebase/saucebase
```

Open the URL shown in the terminal. The setup screen guides the user through choosing a frontend framework and installing modules. Do not run any further commands — the setup screen handles the remaining steps.

## Detecting the Active Framework

Always check `frontend.json` at the project root before writing any frontend code:

```json
{ "framework": "vue" }
```

- `"framework": "vue"` — write Vue 3 Composition API (`.vue` files, `<script setup>`, composables)
- `"framework": "react"` — write React with hooks (`.tsx` files, `hooks/`)
- `"framework": null` — setup not yet complete; tell the user to visit the app and complete the setup screen first

## Where Files Live

After setup, frontend code is flat under `resources/js/`:

```
resources/js/
├── pages/          ← route pages
├── components/     ← shared components
├── layouts/        ← page layouts
├── composables/    ← Vue composables (if Vue)
├── hooks/          ← React hooks (if React)
└── types/          ← TypeScript type definitions
```

Module frontend code is flat under `modules/<name>/resources/js/`:

```
modules/auth/resources/js/
├── pages/
├── components/
└── layouts/
```

Do not create `vue/` or `react/` subdirectories — those exist only in the Saucebase source repository for contributors, not in installed projects.

## Where to Put Files

| What you're adding | Where it goes |
|---|---|
| New page | `resources/js/pages/` |
| New shared component | `resources/js/components/` |
| Laravel controller | `app/Http/Controllers/` |
| Module page | `modules/<name>/resources/js/pages/` |
| Module PHP controller | `modules/<name>/src/Http/Controllers/` |
| Module migration | `modules/<name>/database/migrations/` |
| Module Filament resource | `modules/<name>/src/Filament/Resources/` |
| Global macros | `app/Providers/MacroServiceProvider.php` |

## Working with Modules

Modules are Composer packages installed directly into the repository. There is no enable/disable toggle — active when installed, gone when removed.

To install an existing module:

```shell
composer require saucebase/auth
php artisan migrate
npm run build
```

To scaffold a new custom module:

```shell
php artisan saucebase:recipe ModuleName
composer require saucebase/modulename
```

Module folder names are always lowercase (`modules/auth/`). PHP namespaces are TitleCase (`Modules\Auth\...`).

## Inertia Page Resolution

Controllers return component names, not view files:

```php
return Inertia::render('Dashboard');         // resources/js/pages/Dashboard
return Inertia::render('Auth::Login');       // modules/auth/resources/js/pages/Login
```

Use `ModuleName::PageName` for module pages.

## SSR

SSR is disabled by default. Opt in per route for public or SEO-sensitive pages:

```php
return Inertia::render('Home')->withSSR();         // enable SSR
return Inertia::render('Dashboard')->withoutSSR(); // disable SSR
```

## TypeScript Path Aliases

Always use these — never relative `../../..` imports across directory boundaries:

| Alias | Resolves to |
|---|---|
| `@/` | `resources/js/` |
| `@modules/` | `modules/` |
| `@e2e/` | `tests/e2e/` |

## Ziggy Routes

The `route()` helper is available in all frontend components:

```typescript
route('dashboard')
route('user.show', { id: 1 })
route().current('settings.*')
```

## Commands Reference

```shell
composer dev                              # start dev server (server + queue + Vite in parallel)
php artisan saucebase:recipe ModuleName   # scaffold a new module
php artisan modules:list                  # list installed modules
php artisan modules:sync                  # sync PHPUnit suite after adding/removing modules
php artisan migrate                       # run all pending migrations
php artisan modules:seed --module=auth    # seed a module's initial data
npm run build                             # production build
composer analyse                          # PHPStan level 5
composer lint                             # Laravel Pint (PHP formatting)
npm run lint                              # ESLint with auto-fix
php artisan test                          # run all PHPUnit tests
```

Run PHPUnit with a higher memory limit to avoid OOM on the Modules suite:

```shell
php -d memory_limit=2048M artisan test
```

## Testing Conventions

- Use `data-testid` attributes for Playwright selectors — never select by text, labels, or role names
- Item-specific test IDs follow the pattern `{action}-${item.id}` (e.g. `edit-btn-${item.id}`)
- Save Playwright screenshots to `.playwright-mcp/` (gitignored)
- PHPUnit uses SQLite in-memory — no Docker required for backend tests

## Guidance

- Check `frontend.json` before writing any frontend code.
- Check `modules/` before assuming a feature doesn't exist — it may be in an installed module.
- Do not create `vue/` or `react/` subdirectories inside `resources/js/` or inside modules.
- Follow the existing file and naming patterns in the directory you're working in.
- When adding a migration, run `php artisan migrate` after creating it.
- Commit messages follow the format `type(scope): subject` — all lowercase, max 150 chars.
