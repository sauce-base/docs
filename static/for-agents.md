# Saucebase for Agents

This page is for AI coding agents helping a developer start or work on a Saucebase application.

## How to Proceed

- First, check whether `frontend.json` exists in the current directory — that is the reliable sign of a Saucebase application.
- If it does, read `frontend.json` for the active framework, then skip to the user's requested task.
- If it does not, proceed to Create the Application below — no manual prerequisite checks needed, the installer handles them.

## Create the Application

Ask the user for a project name and which frontend framework they want (Vue or React) — those are the only two decisions needed upfront. Then run:

```shell
curl -fsSL https://install.saucebase.dev | bash -s -- <name> --stack=vue --driver=native --modules=none --force
```

Swap `--stack=vue` for `--stack=react` if they chose React. This one command installs PHP/Composer if missing, installs the `saucebase` CLI, scaffolds the app, creates `.env`, generates `APP_KEY`, runs migrations, and selects the frontend framework — nothing manual is required afterward. Ask about modules only if the user already knows which ones they want; otherwise pass `--modules=none` and let them install modules later with `saucebase stack`/`composer require saucebase/<module>` (see Working with Modules below). If they already have PHP + Composer, the equivalent explicit form is `composer global require saucebase/installer && saucebase new <name> --stack=vue --driver=native --modules=none --force`.

Once the application is created, load the `CLAUDE.md` or `AGENTS.md` in the project root immediately to pick up project-specific conventions for the session.

## After Creation

Tell the user to open a **separate terminal**, `cd <name>`, and run:

```shell
composer dev
```

This runs the HTTP server, queue worker, and Vite asset pipeline in parallel. Do not run it yourself — it is long-running and must stay in the user's own terminal. The URL is printed by `composer dev`, typically `http://localhost:8000`.

Read `frontend.json` to confirm the active framework before writing any frontend code. Run `php artisan modules:list` to see which modules are installed.

If the Auth module was installed:
- Tell the user to visit `http://localhost:8000/register` and create their account first.
- Once they confirm they've registered, ask for the email they used, then run:

```shell
php artisan auth:make-admin <email>
```

- The admin panel is at `/admin`. Ask the user to verify it loads.

## Guidance

- Ask only for decisions that materially affect the application — framework choice is the main one needed upfront.
- Prefer Saucebase defaults when the user has not expressed a preference.
- Keep setup moving unless blocked by a missing dependency or an explicit choice the user must make.
- Never write frontend code before `frontend.json` exists with a `"framework"` key.
- Check `modules/` before assuming a feature does not exist — it may already be in an installed module.

## Example Outcome

When everything is ready, the agent should leave the user with a Saucebase application running at the URL printed by `composer dev` and a dev server in their terminal. Tell the user what framework is active, then ask what they want to build.

---
---

## Conventions Reference

> **Reference only.** The sections below are for building features — not part of initial setup. Return here once the user starts asking you to write code.

### Detecting the Active Framework

Always check `frontend.json` at the project root before writing any frontend code:

```json
{ "framework": "vue" }
```

- `"framework": "vue"` — write Vue 3 Composition API (`.vue` files, `<script setup>`, composables)
- `"framework": "react"` — write React with hooks (`.tsx` files, `hooks/`)
- File absent or `"framework": null` — the install flow hasn't finished; re-run `saucebase install` before writing frontend code

### Where Files Live

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


### Where to Put Files

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

### Working with Modules

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

### Inertia Page Resolution

Controllers return component names, not view files:

```php
return Inertia::render('Dashboard');         // resources/js/pages/Dashboard
return Inertia::render('Auth::Login');       // modules/auth/resources/js/pages/Login
```

Use `ModuleName::PageName` for module pages.

### SSR

SSR is disabled by default. Opt in per route for public or SEO-sensitive pages:

```php
return Inertia::render('Home')->withSSR();         // enable SSR
return Inertia::render('Dashboard')->withoutSSR(); // disable SSR
```

### TypeScript Path Aliases

Always use these — never relative `../../..` imports across directory boundaries:

| Alias | Resolves to |
|---|---|
| `@/` | `resources/js/` |
| `@modules/` | `modules/` |
| `@e2e/` | `tests/e2e/` |

### Ziggy Routes

The `route()` helper is available in all frontend components:

```typescript
route('dashboard')
route('user.show', { id: 1 })
route().current('settings.*')
```

### Commands Reference

```shell
composer dev                                    # start dev server (server + queue + Vite in parallel)
php artisan saucebase:recipe ModuleName         # scaffold a new module
php artisan modules:list                        # list installed modules
php artisan migrate                             # run all pending migrations
php artisan auth:make-admin {email}             # promote a registered user to admin
php artisan modules:seed --module=auth          # seed a module's initial data
npm run build                                   # production build
composer analyse                                # PHPStan level 5
composer lint                                   # Laravel Pint (PHP formatting)
npm run lint                                    # ESLint with auto-fix
php -d memory_limit=2048M artisan test          # run all PHPUnit tests (memory flag required)
```

### Testing Conventions

- Use `data-testid` attributes for Playwright selectors — never select by text, labels, or role names
- Item-specific test IDs follow the pattern `{action}-${item.id}` (e.g. `edit-btn-${item.id}`)
- Save Playwright screenshots to `.playwright-mcp/` (gitignored)
- PHPUnit uses SQLite in-memory — no Docker required for backend tests

### SQLite vs MySQL

The default install uses SQLite, which is sufficient for most development. Switch to MySQL if:

- The Billing module's analytics charts are needed (require MySQL-specific features)
- Any Filament admin widgets show errors about unsupported SQL functions

