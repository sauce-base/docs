---
sidebar_position: 2
slug: /
title: Installation
description: Get Saucebase running locally in minutes.
---

import ModuleGrid from '@site/src/components/ModuleGrid';

# Installation

Get Saucebase running locally in minutes.

## Prerequisites

- **Docker Desktop 20+** — runs all services (PHP, MySQL, Redis, Nginx)
- **Node.js 22+** — for building frontend assets on the host

## Quick Start

```bash
git clone https://github.com/saucebase-dev/saucebase.git my-app
cd my-app
bash bin/setup-env
```

`bin/setup-env` starts the Docker containers, installs dependencies, and runs the Saucebase installer. Visit **https://localhost** when it completes — the app will guide you through the remaining steps.

## Alternatives

### [Laravel Herd](https://herd.laravel.com)

```bash
git clone https://github.com/saucebase-dev/saucebase.git my-app
cd my-app
composer install
cp .env.example .env
# Set APP_URL to your Herd site URL (e.g. http://my-app.test) in .env
# Configure DB_* credentials in .env
php artisan saucebase:install
```

Then visit your app — the setup screen will guide you through the remaining steps.

### [Laravel Sail](https://laravel.com/docs/sail)

```bash
git clone https://github.com/saucebase-dev/saucebase.git my-app
cd my-app
cp .env.example .env
# Configure .env for Sail (DB_HOST=mysql, REDIS_HOST=redis, etc.)
sail up -d
sail composer install
sail artisan saucebase:install
```

Then visit your app — the setup screen will guide you through the remaining steps.

### Native PHP

```bash
git clone https://github.com/saucebase-dev/saucebase.git my-app
cd my-app
composer install
cp .env.example .env
# Configure APP_URL, DB_*, REDIS_* in .env
php artisan saucebase:install
```

Then visit your app — the setup screen will guide you through the remaining steps.

<ModuleGrid
  title="Explore the Modules"
  subtitle="Your foundation is ready. Browse the available modules and install the ones that fit your product — each one copies directly into your codebase, ready to customize."
/>
