# Saucebase for Agents

This page is for AI coding agents helping a developer start or work on a Saucebase application.

## How to Proceed

- First, check whether `frontend.json` exists in the current directory — that is the reliable sign of a Saucebase application.
- If it does, read `frontend.json` for the active framework, then skip to the user's requested task.
- If it does not, run the prerequisite checks below before creating the application.

## Prerequisites

Run all checks even if one fails — use `;` not `&&`:

```shell
php -v; composer -V; laravel --version; node -v
```

Review the output and tell the user exactly what is missing or below the required version:

- PHP 8.4+
- Composer (any recent version)
- Laravel installer CLI
- Node 22+

Ask if they want to install the missing tools before continuing — do not install anything automatically.

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

Ask the user what they want to name their project. Use that name in the command below.

```shell
laravel new <name> --using=saucebase/saucebase --phpunit --boost
```

`--phpunit` is required — Saucebase uses PHPUnit and the test suite will break if Pest is chosen. `--boost` confirms the Boost installation already bundled in `composer.json` and skips the interactive prompt. If the installer asks which database to use, choose **SQLite** (the default).

Once the application is created, load the `CLAUDE.md` or `AGENTS.md` in the project root immediately to pick up project-specific conventions for the session. Do not ask the user to restart.

## After Creation

Once the application has been created, tell the user to open a **separate terminal** and run:

1. Enter the new project directory: `cd <name>`
2. Start the development server:

```shell
npm install && composer dev
```

This runs the HTTP server, queue worker, and Vite asset pipeline in parallel.

Do not run `composer dev` yourself — it is a long-running process and must stay in the user's own terminal.

3. The URL will be printed by `composer dev` — typically `http://localhost:8000`. Tell the user to use whatever URL appears in their terminal.
4. Ask the user to open that URL — a **setup screen** will appear.
5. Do not write any frontend code until the user has completed the setup screen.

## Setup Screen

The setup screen handles the remaining configuration steps — the agent should not attempt to replicate these manually:

- **Framework choice:** The user selects Vue 3 or React. This writes `frontend.json` to the project root.
- **Module installation:** The user installs the modules they want (Auth, Billing, Settings, etc.). Modules are copied into `modules/` via Composer.

Ask the user to tell you when the setup screen is complete before continuing.

Once the user confirms the setup screen is complete:

1. Read `frontend.json` to detect the active framework before writing any frontend code.
2. Run `php artisan modules:list` to see which modules are installed.
3. Check for pending module patches:

```shell
find modules -name "*.patch" -path "*/patches/*"
```

If any `.patch` files are found, show the user what each one changes by reading them (`cat <patch-file>`), then apply each one:

```shell
git apply --whitespace=fix <patch-file>
```

After applying patches, run:

```shell
php artisan migrate
```

4. If the Auth module was installed:
   - Tell the user to visit `http://localhost:8000/register` and create their account first.
   - Once they confirm they've registered, ask for the email they used, then run:

```shell
php artisan auth:make-admin <email>
```

   - The admin panel is at `/admin`. Ask the user to verify it loads.

## Guidance

- Ask only for decisions that materially affect the application — framework choice and which modules to install are the only required choices during setup.
- Prefer Saucebase defaults when the user has not expressed a preference.
- Keep setup moving unless blocked by a missing dependency or an explicit choice the user must make.
- Never write frontend code before `frontend.json` exists with a `"framework"` key — the setup screen has not completed yet.
- Check `modules/` before assuming a feature does not exist — it may already be in an installed module.

## Example Outcome

When everything is ready, the agent should leave the user with a Saucebase application running at the URL printed by `composer dev`, a dev server in their terminal, and a completed setup screen. Tell the user what framework and modules are active, then ask what they want to build.

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

