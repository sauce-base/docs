---
sidebar_position: 1
title: Commands
description: Complete reference of development commands for Saucebase
---

# Development Commands

This page lists all commonly used commands for developing with Saucebase, organized by category.

## Development Workflow

### Starting Development Environment

The quickest way to start development:

```bash
composer dev
```

This runs all development services in parallel:
- Laravel dev server (`php artisan serve`)
- Queue worker (`php artisan queue:listen`)
- Pail logs (`php artisan pail`)
- Vite dev server (`npm run dev`)

:::tip Recommended
Use `composer dev` for the best development experience with automatic log monitoring and hot reload.
:::

### Alternative: Individual Services

If you prefer to run services separately:

```bash
# Terminal 1: Laravel dev server
php artisan serve

# Terminal 2: Vite dev server (hot reload)
npm run dev

# Terminal 3: Queue worker
php artisan queue:listen --tries=1

# Terminal 4: Monitor logs
php artisan pail --timeout=0
```

## Docker Operations

### Starting Services

```bash
# Start all services
docker compose up -d

# Start and wait for health checks
docker compose up -d --wait

# View logs while starting
docker compose up
```

### Executing Commands

```bash
# General syntax
docker compose exec app <command>

# Examples
docker compose exec app php artisan migrate
docker compose exec app composer install
docker compose exec app php artisan tinker
```

### Service Management

```bash
# Restart specific service
docker compose restart app

# Restart all services
docker compose restart

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v
```

### Viewing Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f app
docker compose logs -f nginx
docker compose logs -f mysql

# Last 100 lines
docker compose logs --tail=100 app
```

### Service Status

```bash
# Check running services
docker compose ps

# Check specific service health
docker compose ps mysql
```

## Installation & Setup

### Automated Installation

```bash
# Standard installation
php artisan saucebase:install

# Skip Docker setup
php artisan saucebase:install --no-docker

# Skip SSL certificate generation
php artisan saucebase:install --no-ssl

# Force reinstallation
php artisan saucebase:install --force

# CI/CD mode (non-interactive)
php artisan saucebase:install --no-interaction
```

### Manual Installation Steps

```bash
# 1. Environment setup
cp .env.example .env

# 2. Generate application key
php artisan key:generate

# 3. Install dependencies
composer install
npm install

# 4. Database setup
php artisan migrate
php artisan db:seed

# 5. Create storage link
php artisan storage:link

# 6. Build assets
npm run build
```

## Module Management

### Installing Modules

```bash
# Install module package
composer require saucebase/auth

# Regenerate autoloader
composer dump-autoload

# Enable module
php artisan module:enable Auth

# Run migrations and seeds
php artisan module:migrate Auth --seed

# Build frontend assets
npm run build
```

### Managing Modules

```bash
# List all modules
php artisan module:list

# Enable module
php artisan module:enable Auth

# Disable module
php artisan module:disable Auth

# Module status
php artisan module:list
```

### Module Database Operations

```bash
# Run migrations
php artisan module:migrate Auth

# Rollback migrations
php artisan module:migrate-rollback Auth

# Refresh migrations (drop + re-run)
php artisan module:migrate-refresh Auth

# Seed data
php artisan module:seed Auth

# Run specific seeder
php artisan module:seed Auth --class=AuthDatabaseSeeder

# Migrate and seed together
php artisan module:migrate Auth --seed

# Check migration status
php artisan module:migrate-status Auth
```

## Database

### Migrations

```bash
# Run pending migrations
php artisan migrate

# Run with seeding
php artisan migrate --seed

# Rollback last batch
php artisan migrate:rollback

# Rollback all migrations
php artisan migrate:reset

# Drop all tables and re-run migrations
php artisan migrate:fresh

# Fresh migration with seeding
php artisan migrate:fresh --seed

# Check migration status
php artisan migrate:status
```

### Seeders

```bash
# Run all seeders
php artisan db:seed

# Run specific seeder
php artisan db:seed --class=RolesDatabaseSeeder

# Force seeding in production
php artisan db:seed --force
```

### Database Inspection

```bash
# Interactive database shell
php artisan tinker

# Show database info
php artisan db:show

# Show table structure
php artisan db:table users

# Monitor database queries
php artisan db:monitor
```

## Frontend Assets

### Development

```bash
# Start Vite dev server with HMR
npm run dev

# Start and expose to network
npm run host
```

### Production Builds

```bash
# Build for production
npm run build

# Build with SSR
npm run build:ssr

# Preview production build
npm run preview
```

### Screenshots & Videos

```bash
# Capture screenshots
npm run screenshots

# Capture videos
npm run videos
```

## Testing

### Backend Tests (PHPUnit)

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/AuthTest.php

# Run specific test method
php artisan test --filter test_user_can_login

# Run specific test suite
php artisan test --testsuite=Feature
php artisan test --testsuite=Unit
php artisan test --testsuite=Modules

# Run with coverage
php artisan test --coverage

# Parallel testing
php artisan test --parallel
```

### Frontend Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Open Playwright UI
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

## Code Quality

### PHP

```bash
# Run PHPStan static analysis
composer analyse

# Alternative
vendor/bin/phpstan analyse --memory-limit=2G

# Format code with Laravel Pint
composer lint

# Alternative
vendor/bin/pint

# Check specific directory
vendor/bin/pint app/
```

### JavaScript/TypeScript

```bash
# Lint and auto-fix
npm run lint

# Format with Prettier
npm run format

# Check formatting only
npm run format:check
```

### Pre-commit Hooks

```bash
# Test commit message format
echo "feat: test commit" | npx commitlint

# Run pre-commit hooks manually
npx husky run pre-commit
```

## Cache Management

### Clearing Caches

```bash
# Clear all caches
php artisan optimize:clear

# Clear specific caches
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
php artisan event:clear

# Clear compiled classes
php artisan clear-compiled
```

### Optimizing for Production

```bash
# Cache everything
php artisan optimize

# Cache specific items
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### Cache Inspection

```bash
# Show cached config
php artisan config:show

# Show specific config
php artisan config:show app
php artisan config:show database
```

## Queue System

### Running Workers

```bash
# Run queue worker
php artisan queue:work

# Run with specific connection
php artisan queue:work redis

# Process one job and exit
php artisan queue:work --once

# Limit attempts
php artisan queue:work --tries=3

# Set timeout
php artisan queue:work --timeout=60

# Run specific queue
php artisan queue:work --queue=high,default
```

### Queue Management

```bash
# List failed jobs
php artisan queue:failed

# Retry failed job
php artisan queue:retry <job-id>

# Retry all failed jobs
php artisan queue:retry all

# Delete failed job
php artisan queue:forget <job-id>

# Flush all failed jobs
php artisan queue:flush
```

### Laravel Horizon

```bash
# Start Horizon
php artisan horizon

# Pause Horizon
php artisan horizon:pause

# Continue Horizon
php artisan horizon:continue

# Terminate Horizon
php artisan horizon:terminate
```

## Logging

### Monitor Logs

```bash
# Real-time log monitoring
php artisan pail

# With no timeout
php artisan pail --timeout=0

# Filter by level
php artisan pail --level=error

# Filter by message
php artisan pail --message="User created"
```

### Manage Logs

```bash
# Clear logs
echo "" > storage/logs/laravel.log

# View last 50 lines
tail -n 50 storage/logs/laravel.log

# Follow logs
tail -f storage/logs/laravel.log
```

## Server-Side Rendering (SSR)

### Managing SSR Server

```bash
# Start SSR server
php artisan inertia:start-ssr

# Start in background
php artisan inertia:start-ssr &

# Stop SSR server
php artisan inertia:stop-ssr

# Check SSR server status
curl http://127.0.0.1:13714
```

## Maintenance

### Application

```bash
# Put application in maintenance mode
php artisan down

# With custom message
php artisan down --message="Upgrading database" --retry=60

# Allow specific IPs
php artisan down --allow=127.0.0.1

# Bring application back online
php artisan up
```

### Schedule

```bash
# Run scheduled tasks (add to cron)
php artisan schedule:run

# List scheduled tasks
php artisan schedule:list

# Test schedule
php artisan schedule:test
```

## Artisan Console

### General Commands

```bash
# List all Artisan commands
php artisan list

# Get help for a command
php artisan help migrate

# Run interactive tinker shell
php artisan tinker

# Generate IDE helper files
php artisan ide-helper:generate
```

### Creating Files

```bash
# Generate controller
php artisan make:controller UserController

# Generate model
php artisan make:model Product

# Generate model with migration
php artisan make:model Product -m

# Generate model with everything
php artisan make:model Product -mcr

# Generate migration
php artisan make:migration create_products_table

# Generate seeder
php artisan make:seeder ProductSeeder

# Generate request
php artisan make:request StoreUserRequest

# Generate command
php artisan make:command ProcessOrders
```

## Git Operations

### Creating Commits

```bash
# Check status
git status

# Stage all changes
git add .

# Create commit (follows conventional commits)
git commit -m "feat: add user authentication"

# Commit types: feat, fix, docs, style, refactor, perf, test, chore
```

### Creating Pull Requests

```bash
# Check branch status
git status
git diff main...HEAD

# Push to remote
git push -u origin feature-branch

# Create PR using GitHub CLI
gh pr create --title "Add authentication" --body "Description"
```

## Useful Aliases

Add these to your `~/.bashrc` or `~/.zshrc`:

```bash
# Docker shortcuts
alias dcu="docker compose up -d --wait"
alias dcd="docker compose down"
alias dcr="docker compose restart app"
alias dce="docker compose exec app"

# Artisan shortcuts
alias art="php artisan"
alias migrate="php artisan migrate"
alias fresh="php artisan migrate:fresh --seed"
alias tinker="php artisan tinker"

# Testing
alias test="php artisan test"
alias testf="php artisan test --filter"

# Asset building
alias dev="npm run dev"
alias build="npm run build"
```

## Next Steps

- **[Coding Standards](/development/coding-standards)** - Code quality guidelines
- **[Git Workflow](/development/git-workflow)** - Commit conventions and hooks
- **[Testing Guide](/development/testing-guide)** - Writing and running tests
- **[Debugging](/development/debugging)** - Debugging tips and tools

---

Bookmark this page for quick reference during development!
