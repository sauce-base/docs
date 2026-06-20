# Saucebase for Agents

This page is for AI coding agents helping a developer start or work on a Saucebase application.

## How to Proceed

- First, check whether the current directory already contains a Saucebase application (look for `artisan` and `frontend.json`).
- If it does, check `frontend.json` for the active framework, then skip to the user's requested task.
- If it does not, verify that `php`, `composer`, the Laravel installer CLI (`laravel`), and `node` are available.
- If any are missing, use `php.new` to install them using the correct platform command below.

## Prerequisites

Run quick version checks for:

- `php -v` (need 8.4+)
- `composer -V`
- `laravel --version`
- `node -v` (need 22+)

If `PHP`, `Composer`, or the Laravel installer are missing, use `php.new` to install them before continuing.

If `node` is missing or below 22, install it with `nvm`:

```shell
nvm install 22 && nvm use 22
```

If `nvm` is not available, ask the user to install Node 22 from [nodejs.org](https://nodejs.org) before continuing.

## Installing with php.new

If `php`, `composer`, or `laravel` are missing, use `php.new` to install them.

- macOS:

```shell
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"
```

- Windows PowerShell:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))
```

- Linux:

```shell
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

After running one of these commands, tell the user to restart their terminal session before continuing. If the agent needs the restarted shell to pick up the new tools, tell the user to re-run their original prompt after reopening the terminal.

## Create the Application

```shell
laravel new my-app --using=saucebase/saucebase --phpunit --boost
```

`--phpunit` is required — Saucebase uses PHPUnit and the test suite will break if Pest is chosen. `--boost` confirms the Boost installation already bundled in `composer.json` and skips the interactive prompt.

Once the application is created, load the `CLAUDE.md` or `AGENTS.md` in the project root immediately to pick up project-specific conventions for the session. Do not ask the user to restart.

## After Creation

Once the application has been created, ask the user to run in a new terminal:

1. Enter the new project directory: `cd my-app`
2. Start the development server:

```shell
npm install && composer dev
```

This runs the HTTP server, queue worker, and Vite asset pipeline in parallel.

The agent should avoid getting blocked by the long-running dev server. If it can manage the process in the background, that is fine; otherwise ask the user to keep `composer dev` running in a separate terminal while continuing with setup.

3. Tell the user the application will be available at `http://localhost:8000` (or the URL printed by `composer dev`).
4. Ask the user to open that URL — a **setup screen** will appear.
5. Do not write any frontend code until the user has completed the setup screen.

## Setup Screen

The setup screen handles the remaining configuration steps — the agent should not attempt to replicate these manually:

- **Framework choice:** The user selects Vue 3 or React. This writes `frontend.json` to the project root.
- **Module installation:** The user installs the modules they want (Auth, Billing, Settings, etc.). Modules are copied into `modules/` via Composer.

Once the user confirms the setup screen is complete:

- Read `frontend.json` to detect the active framework before writing any frontend code.
- Run `php artisan modules:list` to see which modules are installed.
- If the Auth module was installed: the admin panel is at `/admin`. Create the first admin by running `php artisan auth:make-admin` (register an account via the app first, then promote it). Ask the user to verify it loads.

## Guidance

- Ask only for decisions that materially affect the application — framework choice and which modules to install are the only required choices during setup.
- Prefer Saucebase defaults when the user has not expressed a preference.
- Keep setup moving unless blocked by a missing dependency or an explicit choice the user must make.
- Never write frontend code before `frontend.json` exists with a `"framework"` key — the setup screen has not completed yet.
- Check `modules/` before assuming a feature does not exist — it may already be in an installed module.
- When adding a migration, run `php artisan migrate` after creating it.
- Commit messages follow the format `type(scope): subject` — all lowercase, max 150 chars.

## Example Outcome

When everything is ready, the agent should leave the user with a Saucebase application running at `http://localhost:8000`, a dev server in their terminal, and a completed setup screen. Tell the user what framework and modules are active, then ask what they want to build.

## Shipping to Production

When the user is ready to deploy, [Laravel Forge](https://forge.laravel.com) and [Laravel Cloud](https://cloud.laravel.com) are the recommended hosting options for Saucebase applications.

---

## Conventions Reference

The sections below are reference material. Consult them while building features, not during initial setup.

### Detecting the Active Framework

Always check `frontend.json` at the project root before writing any frontend code:

```json
{ "framework": "vue" }
```

- `"framework": "vue"` — write Vue 3 Composition API (`.vue` files, `<script setup>`, composables)
- `"framework": "react"` — write React with hooks (`.tsx` files, `hooks/`)
- File absent or `"framework": null` — setup is not yet complete; tell the user to visit the app and finish the setup screen first

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
composer dev                              # start dev server (server + queue + Vite in parallel)
php artisan saucebase:recipe ModuleName   # scaffold a new module
php artisan modules:list                  # list installed modules
php artisan modules:sync                  # sync PHPUnit suite after adding/removing modules
php artisan migrate                       # run all pending migrations
php artisan auth:make-admin {email}        # promote a registered user to admin
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

### Testing Conventions

- Use `data-testid` attributes for Playwright selectors — never select by text, labels, or role names
- Item-specific test IDs follow the pattern `{action}-${item.id}` (e.g. `edit-btn-${item.id}`)
- Save Playwright screenshots to `.playwright-mcp/` (gitignored)
- PHPUnit uses SQLite in-memory — no Docker required for backend tests

### SQLite vs MySQL

The default install uses SQLite, which is sufficient for most development. Switch to MySQL if:

- The Billing module's analytics charts are needed (require MySQL-specific features)
- Any Filament admin widgets show errors about unsupported SQL functions

To switch: run `bash bin/setup-env` (Docker) or configure [Laravel Herd](https://herd.laravel.com) / [Laravel Sail](https://laravel.com/docs/sail) locally, then update `DB_*` values in `.env`.
