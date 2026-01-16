---
sidebar_position: 2
title: Installation
description: Complete installation guide for Saucebase - quick start and manual installation options
---

# Installation

Get Saucebase up and running in minutes with the automated installer, or follow the manual installation steps for more control.

## Prerequisites

Before installing Saucebase, ensure you have:

### Required

- **Docker Desktop** (20.0.0+)
  - [Download for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - [Download for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Download for Linux](https://docs.docker.com/desktop/install/linux-install/)

- **Node.js** (22.0.0+) and **npm** (10.5.1+)
  - [Download from nodejs.org](https://nodejs.org/)
  - Or use [nvm](https://github.com/nvm-sh/nvm): `nvm install 22`

### Optional

- **mkcert** - For local HTTPS support (recommended)
  - macOS: `brew install mkcert`
  - Windows: `choco install mkcert`
  - Linux: See [mkcert installation guide](https://github.com/FiloSottile/mkcert#installation)

## Quick Start

The fastest way to get started:

```bash
# Create new project
composer create-project saucebase/saucebase my-app
cd my-app

# Run automated installer
php artisan saucebase:install

# Start development server
npm run dev
```

That's it! Visit **https://localhost** to see your application.

:::tip Automated Installer
The `saucebase:install` command handles everything: Docker setup, SSL certificates, migrations, module installation, and asset building. Perfect for getting started quickly.
:::

## Installer Options

The installer supports several options for different scenarios:

### Basic Usage

```bash
# Standard installation (recommended)
php artisan saucebase:install

# Skip Docker setup (use manual database/Redis)
php artisan saucebase:install --no-docker

# Skip SSL certificate generation
php artisan saucebase:install --no-ssl

# Force reinstallation (overwrites existing data)
php artisan saucebase:install --force
```

### CI/CD Mode

For automated deployments:

```bash
php artisan saucebase:install --no-interaction
```

This automatically detects CI environments and runs minimal setup without prompts.

## Manual Installation

For step-by-step control, follow these detailed instructions.

### Step 1: Clone the Repository

```bash
git clone https://github.com/sauce-base/saucebase.git my-app
cd my-app
```

Or use Composer:

```bash
composer create-project saucebase/saucebase my-app
cd my-app
```

### Step 2: Configure Environment

```bash
cp .env.example .env
```

Review and update these Saucebase-specific variables in `.env`:

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_HOST` | `localhost` | Application hostname |
| `APP_URL` | `https://localhost` | Full URL (must match APP_HOST) |
| `APP_SLUG` | `saucebase` | Project slug for storage keys |

Standard Laravel variables (DB_\*, APP_KEY, etc.) have sensible defaults.

### Step 3: Generate SSL Certificates (Optional)

For HTTPS support with wildcard domains (multi-tenancy ready):

```bash
# Install mkcert if not already installed
mkcert -install

# Generate certificates
mkdir -p docker/ssl
cd docker/ssl
mkcert -key-file app.key.pem -cert-file app.pem "*.localhost" localhost 127.0.0.1 ::1
cd ../..
```

:::info Wildcard Support
Certificates include `*.localhost` for multi-tenant applications. You can access your app at `https://localhost`, `https://tenant1.localhost`, etc.
:::

### Step 4: Start Docker Services

```bash
docker compose up -d --wait
```

This launches:

| Service | Purpose | Ports |
|---------|---------|-------|
| **nginx** | Web server | 80, 443 |
| **app** | PHP-FPM + CLI | - |
| **mysql** | Database | 3306 |
| **redis** | Cache/Queue/Session | 6379 |
| **mailpit** | Email testing | 1025 (SMTP), 8025 (Web UI) |

:::tip Service Health
The `--wait` flag ensures all services are healthy before returning. MySQL typically takes 10-30 seconds to initialize on first run.
:::

### Step 5: Install Backend Dependencies

```bash
docker compose exec app composer install
```

This installs Laravel and all PHP dependencies inside the Docker container.

### Step 6: Generate Application Key

```bash
docker compose exec app php artisan key:generate
```

Then restart the container to load the new key:

```bash
docker compose restart app
```

### Step 7: Setup Database

```bash
# Ensure services are ready
docker compose up -d --wait

# Run migrations and seed data
docker compose exec app php artisan migrate:fresh --seed

# Create storage link
docker compose exec app php artisan storage:link
```

This creates database tables and seeds default data including admin user.

### Step 8: Install Modules

Install the Auth and Settings modules:

```bash
# Auth Module
composer require saucebase/auth
composer dump-autoload
docker compose exec app php artisan module:enable Auth
docker compose exec app php artisan module:migrate Auth --seed

# Settings Module
composer require saucebase/settings
composer dump-autoload
docker compose exec app php artisan module:enable Settings
docker compose exec app php artisan module:migrate Settings --seed
```

Learn more in the [Modules Guide](/fundamentals/modules).

### Step 9: Install Frontend Dependencies

```bash
# Install packages
npm install

# Build assets (production)
npm run build

# OR start dev server with HMR (recommended)
npm run dev
```

:::tip Development Mode
Use `npm run dev` for hot module replacement during development. The Vite dev server will automatically reload when you change Vue/TypeScript/CSS files.
:::

### Step 10: Verify Installation

**Access the application:**
- Main site: https://localhost
- Admin panel: https://localhost/admin (requires Auth module)
- Email testing: http://localhost:8025 (Mailpit)

**Health checks:**

```bash
# Check database connection
docker compose exec app php artisan migrate:status

# Check web server
curl -sk https://localhost/health
```

## Default Credentials

After installing the Auth module, you can access the admin panel:

- **Email**: `chef@saucebase.dev`
- **Password**: `secretsauce`

:::warning Change Credentials
Make sure to change these credentials in production environments!
:::

## Troubleshooting

### Port Conflicts

If ports 80, 443, 3306, or 6379 are already in use:

```env title=".env"
APP_PORT=8080                    # Change from 80
APP_HTTPS_PORT=8443              # Change from 443
FORWARD_DB_PORT=33060            # Change from 3306
FORWARD_REDIS_PORT=63790         # Change from 6379
```

Restart Docker: `docker compose down && docker compose up -d`

### Docker Daemon Not Running

Ensure Docker Desktop is running:

```bash
docker info
```

If this fails, start Docker Desktop and try again.

### Permission Errors (Linux)

Add your user to the docker group:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

### SSL Certificate Warnings

Self-signed certificates will show browser warnings. Click "Advanced" → "Proceed to localhost".

For better support, ensure mkcert CA is installed:

```bash
mkcert -install
```

### Module Not Found Errors

1. Check `modules_statuses.json` - ensure module is enabled (`true`)
2. Run `composer dump-autoload`
3. Clear caches: `docker compose exec app php artisan optimize:clear`
4. Rebuild frontend: `npm run build`

### Database Connection Refused

Wait for MySQL to be ready (10-30 seconds on first start):

```bash
docker compose up -d --wait
docker compose ps mysql
docker compose logs mysql
```

### Frontend Build Failures

```bash
# Clear Laravel caches
docker compose exec app php artisan optimize:clear

# Reinstall Node modules
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Next Steps

Now that Saucebase is installed:

1. **[Configure Environment](/getting-started/configuration)** - Set up environment variables
2. **[Understand Directory Structure](/getting-started/directory-structure)** - Learn the codebase organization
3. **[Explore Modules](/fundamentals/modules)** - Install and manage modules
4. **[Development Commands](/development/commands)** - Learn common development tasks

---

Need help? Check the [Troubleshooting Reference](/reference/troubleshooting) or [open an issue](https://github.com/sauce-base/saucebase/issues).
