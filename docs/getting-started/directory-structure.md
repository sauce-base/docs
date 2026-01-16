---
sidebar_position: 4
title: Directory Structure
description: Understand the Saucebase codebase organization and file structure
---

# Directory Structure

Saucebase follows Laravel's conventions while adding a modular architecture. Understanding the directory structure helps you navigate the codebase and know where to add your code.

## Root Directory

```
saucebase/
├── app/                    # Core application code
├── bootstrap/              # Application bootstrapping
├── config/                 # Configuration files
├── database/               # Migrations, factories, seeders
├── docker/                 # Docker configuration
├── lang/                   # Core translations (en, pt_BR)
├── modules/                # Feature modules
├── public/                 # Public assets (images, compiled assets)
├── resources/              # Frontend code (Vue, CSS, views)
├── routes/                 # Core application routes
├── storage/                # Logs, cache, uploaded files
├── tests/                  # PHPUnit and Playwright tests
├── vendor/                 # Composer dependencies
├── .env                    # Environment configuration
├── artisan                 # Artisan CLI
├── composer.json           # PHP dependencies
├── package.json            # JavaScript dependencies
├── phpunit.xml             # PHPUnit configuration
├── playwright.config.ts    # Playwright E2E configuration
└── vite.config.js          # Vite build configuration
```

## Core Application (`app/`)

```
app/
├── Console/
│   ├── Commands/           # Custom Artisan commands
│   │   └── SaucebaseInstallCommand.php
│   └── Kernel.php          # Console kernel
├── Exceptions/
│   └── Handler.php         # Global exception handler
├── Helpers/
│   └── helpers.php         # Global helper functions (auto-loaded)
├── Http/
│   ├── Controllers/        # HTTP controllers
│   ├── Middleware/         # Global middleware
│   └── Kernel.php          # HTTP kernel
├── Listeners/              # Event listeners
├── Models/                 # Eloquent models
│   └── User.php            # Base User model
└── Providers/              # Service providers
    ├── AppServiceProvider.php
    ├── BreadcrumbServiceProvider.php
    ├── FilamentServiceProvider.php
    ├── MacroServiceProvider.php
    ├── ModuleServiceProvider.php  # Base class for module providers
    └── NavigationServiceProvider.php
```

### Key Files

#### `app/Providers/AppServiceProvider.php`
Core application configuration, HTTPS enforcement, module event discovery fixes.

#### `app/Providers/MacroServiceProvider.php`
Centralized location for all application macros (e.g., `->withSSR()`).

#### `app/Providers/ModuleServiceProvider.php`
Abstract base class that all module service providers must extend.

#### `app/Helpers/helpers.php`
Global helper functions auto-loaded via Composer. Add project-wide utilities here.

## Modules (`modules/`)

Each module is a self-contained feature package.

```
modules/
└── <ModuleName>/
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   ├── Middleware/
    │   │   └── Requests/
    │   ├── Models/
    │   ├── Providers/
    │   │   └── <ModuleName>ServiceProvider.php
    │   └── Services/
    ├── config/
    │   └── config.php
    ├── database/
    │   ├── factories/
    │   ├── migrations/
    │   └── seeders/
    ├── lang/
    │   ├── en/
    │   └── pt_BR/
    ├── resources/
    │   ├── css/
    │   │   └── app.css
    │   └── js/
    │       ├── app.ts        # Module setup hooks
    │       ├── components/   # Vue components
    │       └── pages/        # Inertia pages
    ├── routes/
    │   ├── api.php
    │   └── web.php
    ├── tests/
    │   ├── Feature/
    │   ├── Unit/
    │   └── e2e/             # Playwright tests
    ├── vite.config.js       # Module asset paths
    ├── playwright.config.ts # Module E2E config (optional)
    └── module.json          # Module metadata
```

### Module Discovery

Modules are tracked in `modules_statuses.json`:

```json title="modules_statuses.json"
{
  "Auth": true,
  "Settings": true
}
```

Only enabled modules (`true`) are loaded and built.

## Frontend (`resources/`)

```
resources/
├── css/
│   ├── app.css              # Main styles (imports Tailwind)
│   └── theme.css            # Saucebase theme variables (OKLCH)
├── js/
│   ├── app.ts               # Main entry point (CSR)
│   ├── ssr.ts               # SSR entry point
│   ├── components/
│   │   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   │   ├── ui/              # shadcn-vue components
│   │   └── shared/          # Shared components
│   ├── composables/         # Vue composables
│   │   ├── useLocalization.ts
│   │   ├── useSidebar.ts
│   │   └── useTheme.ts
│   ├── layouts/             # Inertia layouts
│   │   ├── AppLayout.vue
│   │   └── GuestLayout.vue
│   ├── lib/                 # Utility libraries
│   │   ├── moduleSetup.ts   # Module lifecycle management
│   │   └── utils.ts         # Utilities (resolveModularPageComponent, cn)
│   ├── middleware/          # Inertia middleware
│   │   └── auth.ts
│   ├── pages/               # Core Inertia pages
│   │   ├── Index.vue
│   │   └── About.vue
│   └── types/               # TypeScript types
│       ├── global.d.ts      # Global type definitions
│       └── inertia.d.ts     # Inertia type augmentations
└── views/
    └── app.blade.php        # Main HTML template
```

### Key Frontend Files

#### `resources/js/app.ts`
Main entry point for client-side rendering. Sets up:
- Vue app instance
- Inertia.js
- Ziggy routes
- Module lifecycle hooks
- i18n

#### `resources/js/ssr.ts`
SSR entry point. Similar to `app.ts` but for server-side rendering.

#### `resources/js/lib/utils.ts`
Contains `resolveModularPageComponent()` for module page resolution:
- `Auth::Login` → `modules/Auth/resources/js/pages/Login.vue`
- `Dashboard` → `resources/js/pages/Dashboard.vue`

#### `resources/js/lib/moduleSetup.ts`
Module lifecycle management (`setup()`, `afterMount()` hooks).

## Configuration (`config/`)

```
config/
├── app.php                  # Application config
├── auth.php                 # Authentication config
├── database.php             # Database connections
├── inertia.php              # Inertia.js configuration
├── ziggy.php                # Ziggy route filtering
├── modules.php              # Module system config
└── ...                      # Standard Laravel configs
```

### Important Configurations

#### `config/inertia.php`
```php
'ssr' => [
    'enabled' => (bool) env('INERTIA_SSR_ENABLED', true),
    'url' => env('INERTIA_SSR_URL', 'http://127.0.0.1:13714'),
],
```

#### `config/ziggy.php`
```php
return [
    'except' => ['admin.*', 'sanctum.*'], // Hide routes from frontend
];
```

## Docker (`docker/`)

```
docker/
├── nginx/
│   └── default.conf         # Nginx configuration
├── php/
│   └── php.ini              # PHP configuration
└── ssl/                     # SSL certificates (generated by installer)
    ├── app.pem              # Certificate
    └── app.key.pem          # Private key
```

## Database (`database/`)

```
database/
├── factories/
│   └── UserFactory.php
├── migrations/              # Core migrations
│   └── ...
└── seeders/
    ├── DatabaseSeeder.php
    └── RolesDatabaseSeeder.php
```

Module migrations are in `modules/<Name>/database/migrations/`.

## Tests (`tests/`)

```
tests/
├── e2e/                     # Playwright E2E tests
│   ├── helpers/
│   │   └── ssr.ts           # SSR test helpers
│   └── index.spec.ts
├── Feature/                 # Laravel feature tests
└── Unit/                    # Laravel unit tests
```

Module tests are in `modules/<Name>/tests/`.

## Public Assets (`public/`)

```
public/
├── build/                   # Compiled frontend assets (Vite output)
│   ├── assets/
│   └── manifest.json
├── images/
│   ├── logo.svg
│   └── screenshots/
├── favicon.ico
└── robots.txt
```

:::warning Don't Edit
Never manually edit files in `public/build/`. These are generated by `npm run build`.
:::

## Build Configuration

### `vite.config.js`

```javascript
export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.ts',
        'resources/js/ssr.ts',
        ...collectModuleAssetsPaths(), // Automatically includes module assets
      ],
      ssr: 'resources/js/ssr.ts',
    }),
    vue(),
    // ...
  ],
});
```

Key features:
- Auto-loads SSL certificates if present
- Collects module assets via `module-loader.js`
- Provides path aliases (`@`, `@modules`, `ziggy-js`)

### `module-loader.js`

Utility that discovers enabled modules and collects:
- Asset paths from module `vite.config.js`
- Language directories
- Playwright test configurations

## Storage (`storage/`)

```
storage/
├── app/
│   └── public/              # User-uploaded files (symlinked to public/storage)
├── framework/
│   ├── cache/
│   ├── sessions/
│   └── views/               # Compiled Blade templates
└── logs/
    └── laravel.log
```

## Adding Your Code

### Backend Code

- **Controllers**: `app/Http/Controllers/` (core) or `modules/<Name>/app/Http/Controllers/`
- **Models**: `app/Models/` (core) or `modules/<Name>/app/Models/`
- **Services**: Create `app/Services/` or `modules/<Name>/app/Services/`
- **Helpers**: `app/Helpers/helpers.php`

### Frontend Code

- **Pages**: `resources/js/pages/` (core) or `modules/<Name>/resources/js/pages/`
- **Components**: `resources/js/components/` (shared) or `modules/<Name>/resources/js/components/`
- **Composables**: `resources/js/composables/` (shared) or module-specific
- **Styles**: `resources/css/` or `modules/<Name>/resources/css/`

### Best Practices

1. **Use modules for features** - Keep `app/` lean, put features in modules
2. **Follow Laravel conventions** - Controllers in `Controllers/`, models in `Models/`, etc.
3. **Keep modules self-contained** - Each module should be independently enable/disable-able
4. **Use composables for shared logic** - Extract common Vue logic into composables
5. **Follow naming conventions** - PascalCase for classes, camelCase for methods

## Next Steps

- **[Learn About Modules](/fundamentals/modules)** - Install and manage feature modules
- **[Explore Architecture](/architecture/overview)** - Deep dive into how it all works
- **[Development Commands](/development/commands)** - Common development tasks

---

Questions? Check the [Architecture](/architecture/overview) section for deeper explanations.
