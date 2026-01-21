---
sidebar_position: 3
title: Configuration
description: Configure environment variables and settings for your Saucebase application
---

# Configuration

After installing Saucebase, configure your application through environment variables in the `.env` file (created automatically from `.env.example`).

## Essential Environment Variables

### Core Application Settings

#### APP_HOST & APP_URL

**These must match** for the application to work correctly.

```env title=".env"
APP_HOST=localhost
APP_URL=https://localhost
```

For custom domains:

```env
APP_HOST=myapp.local
APP_URL=https://myapp.local
```

:::warning Important
`APP_URL` must include the protocol (http/https) and match `APP_HOST`. Mismatched values will cause routing issues.
:::

#### APP_SLUG

Project slug used for database naming and storage keys.

```env
APP_SLUG=saucebase
```

**Best practices:**
- Use lowercase letters and hyphens only
- Keep it short and memorable
- Don't change after deployment (affects storage paths and database names)

#### Localization

```env
APP_LOCALE=en
APP_FALLBACK_LOCALE=en
```

Supported locales: `en` (English), `pt_BR` (Brazilian Portuguese)

#### VITE_LOCAL_STORAGE_KEY

Frontend local storage prefix (defaults to `${APP_SLUG}`).

```env
VITE_LOCAL_STORAGE_KEY=saucebase
```

This prevents localStorage conflicts when running multiple applications on localhost.

### Database Configuration

MySQL 8.0 is configured by default via Docker.

```env title=".env"
DB_CONNECTION=mysql
DB_HOST=mysql                    # Docker service name
DB_PORT=3306
DB_DATABASE=saucebase
DB_USERNAME=saucebase
DB_PASSWORD=secret
```

**For external database:**

```env
DB_HOST=your-database-host.com
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_secure_password
```

### Cache, Sessions & Queues

**Important: Docker vs Local Environment Defaults**

| Component | Docker (recommended) | Local (non-Docker) | Config Variable |
|-----------|---------------------|-------------------|-----------------|
| Cache | `redis` | `database` | `CACHE_STORE` |
| Sessions | `redis` | `database` | `SESSION_DRIVER` |
| Queues | `redis` | `database` | `QUEUE_CONNECTION` |

**Why the difference?**

- **Docker environment**: `docker-compose.yml` provides fallback values that default to `redis` for better performance
- **Local environment**: `.env.example` uses `database` driver to avoid requiring Redis installation

**When using Docker** (recommended setup), Redis is automatically used unless you explicitly set these variables in `.env`:

```env
# Docker automatically uses Redis - no configuration needed
# Redis connection is pre-configured:
REDIS_HOST=redis
REDIS_PORT=6379
```

**If running locally without Docker**, you can keep the database drivers or install Redis and set:

```env
CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

**To use database drivers in Docker**, explicitly set in `.env`:

```env
CACHE_STORE=database
SESSION_DRIVER=database
QUEUE_CONNECTION=database
```

### Mail Configuration

Mailpit is configured for development. Emails are caught and viewable at http://localhost:8025.

```env title=".env"
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_FROM_ADDRESS=hello@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

**For production (example with Mailgun):**

```env
MAIL_MAILER=mailgun
MAILGUN_DOMAIN=mg.yourdomain.com
MAILGUN_SECRET=your-mailgun-api-key
MAILGUN_ENDPOINT=api.mailgun.net
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"
```

## Module-Specific Configuration

### OAuth (Auth Module)

If you've installed the Auth module, configure social login providers.

:::info Configuration Location
OAuth credentials are configured in `modules/Auth/config/services.php`, not `config/services.php`.
:::

#### Google OAuth

1. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/)
2. Set authorized redirect URI: `https://localhost/auth/google/callback`

```env title=".env"
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**For production:**

```env
# Update callback URL to your production domain
# Redirect URI: https://yourdomain.com/auth/google/callback
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
```

#### GitHub OAuth

1. Create OAuth app at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set authorization callback URL: `https://localhost/auth/github/callback`

```env title=".env"
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

**For production:**

```env
# Update callback URL to your production domain
# Callback URL: https://yourdomain.com/auth/github/callback
GITHUB_CLIENT_ID=your-production-client-id
GITHUB_CLIENT_SECRET=your-production-client-secret
```

:::tip Testing OAuth Locally
OAuth providers typically allow `localhost` for development. Use `https://localhost` as your redirect URL.
:::

## Advanced Configuration

### Inertia SSR

Server-side rendering is enabled in `config/inertia.php`, but **disabled by default per-request** via middleware.

```php title="config/inertia.php"
'ssr' => [
    'enabled' => (bool) env('INERTIA_SSR_ENABLED', true), // SSR server runs
    'url' => env('INERTIA_SSR_URL', 'http://127.0.0.1:13714'),
],
```

**How it works:**

1. **Boot level** (config): SSR server runs when enabled
2. **Request level** (middleware): Disables SSR by default for each request
3. **Response level** (controller): Opt-in with `->withSSR()` or opt-out with `->withoutSSR()`

```php
// Enable SSR for SEO-critical pages
return Inertia::render('Index')->withSSR();

// Explicitly disable SSR (though middleware already does this)
return Inertia::render('Dashboard')->withoutSSR();

// Default - SSR disabled by middleware
return Inertia::render('About');
```

Learn more in the [SSR Guide](/fundamentals/ssr).

### Vite Environment Variables

Frontend environment variables accessible via `import.meta.env`:

```env title=".env"
VITE_APP_NAME="${APP_NAME}"
VITE_LOCAL_STORAGE_KEY="${APP_SLUG}"
```

Add custom variables with the `VITE_` prefix:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_ENABLE_ANALYTICS=true
```

### Multi-Tenancy

SSL certificates include wildcard support (`*.localhost`) for multi-tenant applications. Install packages like [Spatie Laravel Multitenancy](https://spatie.be/docs/laravel-multitenancy) or [Tenancy for Laravel](https://tenancyforlaravel.com/) to enable multi-tenancy features.

## Verifying Configuration

### Check Environment Variables

```bash
php artisan config:show app
php artisan config:show database
```

### Test Database Connection

```bash
php artisan migrate:status
```

### Test Mail Setup

```bash
php artisan tinker
# Then run:
Mail::raw('Test email', fn($msg) => $msg->to('test@example.com')->subject('Test'));
# Check http://localhost:8025 for the email
```

### Test Cache Connection

```bash
php artisan cache:clear
php artisan tinker
# Then run:
Cache::put('test', 'value', 60);
Cache::get('test'); // Should return 'value'
```

## Troubleshooting

### Configuration Cached

If changes aren't taking effect:

```bash
php artisan config:clear
php artisan cache:clear
php artisan optimize:clear
```

**In Docker:**

```bash
docker compose exec app php artisan optimize:clear
docker compose restart app
```

### Environment Variables Not Loading

1. Check `.env` file exists in project root
2. Ensure no trailing spaces in `.env` values
3. Quote values with spaces: `APP_NAME="My App"`
4. Restart Docker containers: `docker compose restart app`

### Port Conflicts

If default ports are in use, change in `.env`:

```env
APP_PORT=8080
APP_HTTPS_PORT=8443
FORWARD_DB_PORT=33060
FORWARD_REDIS_PORT=63790
FORWARD_MAILPIT_PORT=8026
```

Then restart:

```bash
docker compose down
docker compose up -d
```

Access your app at `https://localhost:8443` (using your custom HTTPS port).

## Next Steps

- **[Explore Directory Structure](/getting-started/directory-structure)** - Understand the codebase layout
- **[Install Modules](/fundamentals/modules)** - Add authentication, settings, and more
- **[Development Commands](/development/commands)** - Learn common development tasks

---

Need help? Check the [Troubleshooting](/reference/troubleshooting) guide for common configuration issues.
