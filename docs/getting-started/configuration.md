---
sidebar_position: 3
title: Configuration
description: Configure environment variables and settings for your Saucebase application
---

# Configuration

After installing Saucebase, you'll need to configure your application through environment variables and configuration files.

## Environment Variables

Saucebase uses Laravel's `.env` file for configuration. The installer creates this file automatically from `.env.example`.

### Core Application Settings

#### APP_HOST & APP_URL

These must match for the application to work correctly.

```env title=".env"
APP_HOST=localhost
APP_URL=https://localhost
```

**For custom domains:**

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
- Don't change after deployment (affects storage paths)

#### VITE_LOCAL_STORAGE_KEY

Frontend local storage prefix (defaults to `${APP_SLUG}`).

```env
VITE_LOCAL_STORAGE_KEY=myapp
```

This prevents localStorage conflicts when running multiple applications on localhost.

### Database Configuration

MySQL 8.0 is configured by default via Docker.

```env title=".env"
DB_CONNECTION=mysql
DB_HOST=mysql                    # Docker service name
DB_PORT=3306
DB_DATABASE=saucebase
DB_USERNAME=root
DB_PASSWORD=root
```

**For external database:**

```env
DB_HOST=your-database-host.com
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_secure_password
```

### Redis Configuration

Used for caching, sessions, and queues.

```env title=".env"
REDIS_HOST=redis                 # Docker service name
REDIS_PASSWORD=null
REDIS_PORT=6379

CACHE_STORE=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### Mail Configuration

Mailpit is configured for development. Emails are caught and viewable at http://localhost:8025.

```env title=".env"
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
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

### OAuth Configuration (Auth Module)

If you've installed the Auth module, configure social login providers:

#### Google OAuth

1. Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com/)
2. Set authorized redirect URI: `https://localhost/auth/google/callback`

```env title=".env"
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### GitHub OAuth

1. Create OAuth app at [GitHub Developer Settings](https://github.com/settings/developers)
2. Set authorization callback URL: `https://localhost/auth/github/callback`

```env title=".env"
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

:::tip Testing OAuth Locally
For local development with HTTPS, use `https://localhost` as your redirect URL. OAuth providers typically allow localhost for development.
:::

### Development Tools

#### Xdebug

Enabled by default for debugging.

```env title=".env"
XDEBUG_MODE=debug                # Options: off, debug, coverage, profile
```

Set to `off` to improve performance when not debugging.

#### Vite

Frontend build tool configuration.

```env title=".env"
VITE_APP_NAME="${APP_NAME}"
VITE_LOCAL_STORAGE_KEY="${APP_SLUG}"
```

These are accessible in Vue components via `import.meta.env`.

### Docker Port Configuration

Change these if default ports are already in use:

```env title=".env"
APP_PORT=80                      # HTTP port
APP_HTTPS_PORT=443               # HTTPS port
FORWARD_DB_PORT=3306            # MySQL port
FORWARD_REDIS_PORT=6379          # Redis port
FORWARD_MAILPIT_PORT=8025        # Mailpit web UI
FORWARD_MAILPIT_SMTP_PORT=1025  # Mailpit SMTP
```

**Example for avoiding conflicts:**

```env
APP_PORT=8080
APP_HTTPS_PORT=8443
FORWARD_DB_PORT=33060
FORWARD_REDIS_PORT=63790
```

Then access your app at `https://localhost:8443`.

## Configuration Files

### Inertia SSR

Server-side rendering is configured in `config/inertia.php`:

```php title="config/inertia.php"
'ssr' => [
    'enabled' => (bool) env('INERTIA_SSR_ENABLED', true),
    'url' => env('INERTIA_SSR_URL', 'http://127.0.0.1:13714'),
],
```

- `INERTIA_SSR_ENABLED=true` - SSR server runs (disabled per-request by middleware)
- Controllers use `->withSSR()` to enable SSR for specific pages

Learn more in the [SSR Guide](/fundamentals/ssr).

### Ziggy Routes

Configure which routes are exposed to JavaScript:

```php title="config/ziggy.php"
return [
    'except' => [
        'admin.*',           // Hide admin routes
        'sanctum.*',         // Hide sanctum routes
        '_debugbar.*',       // Hide debug routes
    ],
];
```

:::warning Security Note
Route filtering is for reducing bundle size, not security. Always implement proper authentication and authorization.
:::

### CORS (Cross-Origin Resource Sharing)

If building a separate frontend:

```php title="config/cors.php"
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => [
    env('FRONTEND_URL', 'http://localhost:3000'),
],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

Add `FRONTEND_URL` to `.env`:

```env
FRONTEND_URL=http://localhost:3000
```

## Multi-Tenancy Setup

SSL certificates include wildcard support (`*.localhost`). To enable multi-tenancy:

### 1. Install a Multi-Tenancy Package

**Option A: Spatie Laravel Multitenancy**

```bash
composer require spatie/laravel-multitenancy
php artisan vendor:publish --tag=multitenancy-config
```

**Option B: Tenancy for Laravel**

```bash
composer require stancl/tenancy
php artisan tenancy:install
```

### 2. Configure Domain Pattern

```env title=".env"
# Central domain
APP_URL=https://localhost

# Tenant domain pattern
TENANT_DOMAIN_PATTERN={tenant}.localhost
```

### 3. Update Nginx Configuration

Ensure wildcard domains are handled:

```nginx title="docker/nginx/default.conf"
server {
    listen 443 ssl http2;
    server_name localhost *.localhost;
    # ... rest of config
}
```

Multi-tenancy setup documentation is coming soon.

## Environment-Specific Configuration

### Local Development

```env
APP_ENV=local
APP_DEBUG=true
XDEBUG_MODE=debug
```

### Staging

```env
APP_ENV=staging
APP_DEBUG=true                   # Can enable for testing
XDEBUG_MODE=off
```

### Production

```env
APP_ENV=production
APP_DEBUG=false
XDEBUG_MODE=off
```

:::danger Production Security
- Set `APP_DEBUG=false` in production
- Use strong `APP_KEY` (generated automatically)
- Use HTTPS only (`APP_URL=https://...`)
- Restrict database access
- Use environment-specific `.env` files, never commit them
:::

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

### Test Cache Connection

```bash
php artisan cache:clear
```

### Test Queue Connection

```bash
php artisan queue:work --once
```

## Troubleshooting

### Configuration Cached

If changes aren't taking effect:

```bash
php artisan config:clear
php artisan cache:clear
php artisan optimize:clear
```

### Environment Variables Not Loading

1. Check `.env` file exists in project root
2. Ensure no trailing spaces in `.env` values
3. Restart Docker containers: `docker compose restart app`

### Port Already in Use

Change ports in `.env`:

```env
APP_PORT=8080
APP_HTTPS_PORT=8443
```

Then restart: `docker compose down && docker compose up -d`

## Next Steps

- **[Explore Directory Structure](/getting-started/directory-structure)** - Understand the codebase layout
- **[Install Modules](/fundamentals/modules)** - Add authentication, settings, and more
- **[Development Commands](/development/commands)** - Learn common development tasks

---

Need help? Check the [Troubleshooting](/reference/troubleshooting) guide for common configuration issues.
