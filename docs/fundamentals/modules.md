---
sidebar_position: 1
title: Modules
description: Learn how to install, manage, and create Saucebase modules using the copy-and-own philosophy
---

# Modules

Modules are self-contained feature packages that you install directly into your repository. Unlike traditional Composer packages, module code becomes part of your codebase, giving you complete ownership and customization freedom.

## What Are Modules?

Think of modules like **building blocks** you copy into your project rather than linking to external packages.

### Traditional Approach (Vendor Packages)

```bash
composer require vendor/auth-package
# → Code stays in vendor/
# → You can't modify it
# → Updates can break your customizations
```

### Saucebase Approach (Copy-and-Own)

```bash
composer require saucebase/auth
# → Code is copied to modules/Auth/
# → You own it completely
# → Modify freely without maintenance burden
```

:::tip Philosophy
When you install a module, you're not depending on it—you're **acquiring** it. The code is yours from day one.
:::

## Available Modules

| Module | Description | Repository |
|--------|-------------|------------|
| **Auth** | Authentication with social login support (Google, GitHub) | [sauce-base/auth](https://github.com/sauce-base/auth) |
| **Settings** | User and system settings management | [sauce-base/settings](https://github.com/sauce-base/settings) |

More modules coming soon!

## Installing Modules

### Installation Steps

Follow these steps in order to install any module:

```bash
# 1. Install the module via Composer
composer require saucebase/auth

# 2. Regenerate autoload files
composer dump-autoload

# 3. Enable the module
php artisan module:enable Auth

# 4. Run migrations and seeders
php artisan module:migrate Auth --seed

# 5. Build frontend assets
npm run build
```

**What each command does:**

1. `composer require` - Downloads the module and adds it to `composer.json`
2. `composer dump-autoload` - Regenerates autoloader to include new module classes
3. `module:enable` - Marks the module as enabled in `modules_statuses.json`
4. `module:migrate --seed` - Runs database migrations and seeds sample data
5. `npm run build` - Rebuilds frontend assets to include module JavaScript/CSS

### Docker Environment

If using Docker:

```bash
# Install via Composer (on host machine)
composer require saucebase/auth
composer dump-autoload

# Enable and migrate (inside Docker container)
docker compose exec app php artisan module:enable Auth
docker compose exec app php artisan module:migrate Auth --seed

# Build assets (on host machine)
npm run build
```

### Development Environment

If not using Docker:

```bash
composer require saucebase/auth
composer dump-autoload
php artisan module:enable Auth
php artisan module:migrate Auth --seed
npm run build
```

## Managing Modules

### Enable/Disable Modules

```bash
# Enable a module
php artisan module:enable Auth

# Disable a module
php artisan module:disable Auth

# List all modules
php artisan module:list
```

When you enable/disable modules, **always rebuild frontend assets**:

```bash
npm run build
# OR restart dev server
npm run dev
```

### Module Status

Check which modules are enabled:

```bash
php artisan module:list
```

Or view `modules_statuses.json`:

```json title="modules_statuses.json"
{
  "Auth": true,
  "Settings": true
}
```

Only modules with `true` are loaded.

### Database Operations

```bash
# Run migrations
php artisan module:migrate Auth

# Rollback migrations
php artisan module:migrate-rollback Auth

# Refresh migrations (drop + re-run)
php artisan module:migrate-refresh Auth

# Seed data
php artisan module:seed Auth

# Migrate and seed together
php artisan module:migrate Auth --seed
```

## Example: Installing Auth Module

The Auth module provides complete authentication with social login support.

### Step 1: Install

```bash
composer require saucebase/auth
composer dump-autoload
```

### Step 2: Enable and Migrate

```bash
php artisan module:enable Auth
php artisan module:migrate Auth --seed
```

### Step 3: Build Assets

```bash
npm run build
# OR for development
npm run dev
```

### Step 4: Configure OAuth (Optional)

Add to `.env`:

```env title=".env"
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**Setup OAuth Apps:**

- **Google**: [Google Cloud Console](https://console.cloud.google.com/)
- **GitHub**: [GitHub Developer Settings](https://github.com/settings/developers)

### What You Get

After installation, the Auth module provides:

- ✅ Login, registration, password reset flows
- ✅ OAuth integration (Google, GitHub via Laravel Socialite)
- ✅ Multiple provider connections per user
- ✅ Routes: `/auth/login`, `/auth/register`, `/auth/forgot-password`
- ✅ Admin panel access at `/admin`

**Default Admin Credentials:**
- Email: `chef@saucebase.dev`
- Password: `secretsauce`

:::warning
Change these credentials in production!
:::

## Module Structure

Each module is organized like a mini-application:

```
modules/Auth/
├── app/                          # Backend code
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── LoginController.php
│   │   │   ├── RegisterController.php
│   │   │   └── SocialAuthController.php
│   │   ├── Middleware/
│   │   └── Requests/
│   ├── Models/
│   │   ├── User.php
│   │   └── SocialAccount.php
│   ├── Providers/
│   │   └── AuthServiceProvider.php
│   └── Services/
│       └── AuthService.php
├── config/
│   └── config.php                # Module configuration
├── database/
│   ├── factories/
│   ├── migrations/
│   │   └── 2024_01_01_000000_create_social_accounts_table.php
│   └── seeders/
│       └── AuthDatabaseSeeder.php
├── lang/
│   ├── en/
│   │   └── auth.php
│   └── pt_BR/
│       └── auth.php
├── resources/
│   ├── css/
│   │   └── app.css
│   └── js/
│       ├── app.ts                # Module setup hooks
│       ├── pages/
│       │   ├── Login.vue
│       │   ├── Register.vue
│       │   └── ForgotPassword.vue
│       └── components/
│           └── SocialLoginButton.vue
├── routes/
│   ├── web.php                   # Module routes
│   └── api.php
├── tests/
│   ├── Feature/
│   │   └── AuthTest.php
│   ├── Unit/
│   └── e2e/
│       └── login.spec.ts
├── vite.config.js                # Module assets for Vite
├── playwright.config.ts          # E2E test config
└── module.json                   # Module metadata
```

## How Modules Work

### 1. Service Provider Registration

Module service providers are auto-loaded when enabled.

```php title="modules/Auth/app/Providers/AuthServiceProvider.php"
class AuthServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'Auth';
    protected string $nameLower = 'auth';

    public function register(): void
    {
        parent::register();
        // Register services, bindings
    }

    public function boot(): void
    {
        parent::boot();
        // Boot logic, event listeners
    }
}
```

The base `ModuleServiceProvider` handles:
- Loading module translations
- Loading module configuration
- Registering module routes
- Sharing Inertia data

### 2. Route Registration

Module routes are automatically loaded:

```php title="modules/Auth/routes/web.php"
use Modules\Auth\app\Http\Controllers\LoginController;

Route::prefix('auth')->name('auth.')->group(function () {
    Route::get('login', [LoginController::class, 'show'])->name('login');
    Route::post('login', [LoginController::class, 'store']);
    Route::post('logout', [LoginController::class, 'destroy'])->name('logout');
});
```

Access routes at: `https://localhost/auth/login`

### 3. Frontend Integration

Module pages use namespace syntax in Inertia:

```php title="modules/Auth/app/Http/Controllers/LoginController.php"
public function show()
{
    return inertia('Auth::Login'); // Namespace syntax!
}
```

This resolves to: `modules/Auth/resources/js/pages/Login.vue`

### 4. Module Lifecycle Hooks

Modules can export setup hooks:

```typescript title="modules/Auth/resources/js/app.ts"
export default {
    setup(app) {
        // Called before Vue app mounts
        // Register components, plugins, etc.
        console.log('Auth module setup');
    },

    afterMount(app) {
        // Called after Vue app mounts
        // Initialize services that need DOM
        console.log('Auth module mounted');
    },
};
```

## Customizing Modules

Since modules are part of your codebase, customize freely:

### Example: Customize Login Page

```vue title="modules/Auth/resources/js/pages/Login.vue"
<script setup lang="ts">
// Add your custom logic
import { useCustomAuth } from '@/composables/useCustomAuth';

const { login } = useCustomAuth();
</script>

<template>
  <div>
    <!-- Customize the UI completely -->
    <h1>My Custom Login Page</h1>
    <!-- ... -->
  </div>
</template>
```

### Example: Add Custom Field to Registration

1. **Add migration:**

```bash
php artisan make:migration add_phone_to_users --path=modules/Auth/database/migrations
```

```php
Schema::table('users', function (Blueprint $table) {
    $table->string('phone')->nullable();
});
```

2. **Update form request:**

```php title="modules/Auth/app/Http/Requests/RegisterRequest.php"
public function rules(): array
{
    return [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'unique:users'],
        'phone' => ['nullable', 'string', 'max:20'], // Added
        'password' => ['required', 'confirmed', 'min:8'],
    ];
}
```

3. **Update Vue component:**

```vue title="modules/Auth/resources/js/pages/Register.vue"
<template>
  <form @submit.prevent="submit">
    <!-- ... existing fields ... -->

    <!-- Add phone field -->
    <Input
      v-model="form.phone"
      type="tel"
      label="Phone"
    />

    <!-- ... -->
  </form>
</template>
```

**That's it!** No forking, no maintaining patches. The code is yours.

## Removing Modules

To completely remove a module:

```bash
# 1. Disable the module
php artisan module:disable Auth

# 2. Rollback migrations (if desired)
php artisan module:migrate-rollback Auth

# 3. Remove from Composer
composer remove saucebase/auth

# 4. Delete the directory
rm -rf modules/Auth

# 5. Rebuild assets
npm run build
```

## Troubleshooting

### Module Not Found

**Symptoms:** `Class 'Modules\Auth\...' not found`

**Solution:**

```bash
composer dump-autoload
php artisan optimize:clear
```

### Module Routes Not Working

**Check:**
1. Module is enabled: `php artisan module:list`
2. Routes are registered: `php artisan route:list --name=auth`
3. Service provider is loaded

**Fix:**

```bash
php artisan module:enable Auth
php artisan optimize:clear
```

### Frontend Assets Not Loading

**Symptoms:** Module pages show blank or 404

**Solution:**

```bash
npm run build
# OR restart dev server
npm run dev
```

### Migrations Not Running

**Symptoms:** Tables don't exist

**Solution:**

```bash
php artisan module:migrate Auth
# Check status
php artisan module:migrate-status Auth
```

## Creating Custom Modules

Want to create your own module? See the [Creating Modules Guide](/advanced/creating-modules) for a step-by-step tutorial on building custom modules.

## Next Steps

- **[Routing](/fundamentals/routing)** - Learn about routing in Saucebase
- **[SSR](/fundamentals/ssr)** - Server-side rendering per page
- **[Creating Modules](/advanced/creating-modules)** - Build your own modules

---

Modules are the heart of Saucebase. Install what you need, customize freely, and own your code.
