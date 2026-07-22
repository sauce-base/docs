---
sidebar_position: 2
slug: /
title: Installation
description: Get Saucebase running in minutes.
---

import ModuleGrid from '@site/src/components/ModuleGrid';

# Installation

One command. No prerequisites required.

## Create Your App

```bash
curl -fsSL https://install.saucebase.dev | bash
```

This installs PHP and Composer if you don't have them yet, installs the `saucebase` CLI, and walks you through the rest — driver, frontend framework, and modules. For non-interactive use (CI, scripting), pass the app name directly: `curl -fsSL https://install.saucebase.dev | bash -s -- my-app`.

Already have PHP 8.4+ and Composer? Skip the bootstrap and use the CLI directly:

```bash
composer global require saucebase/installer
saucebase new my-app
```

Open the URL shown in your terminal once the install finishes.

:::note Prefer to scaffold manually?
`laravel new my-app --using=saucebase/saucebase --phpunit --boost` scaffolds the skeleton via the Laravel installer, but skips the install flow — no `.env`, no `APP_KEY`, no migrations, no frontend framework selected. Run `saucebase install` afterward (from inside the new app directory) to finish the setup.
:::

## Building with AI

Using Claude Code, Cursor, or another coding agent? Paste this before you start:

```
Before writing any code, fetch https://saucebase-dev.github.io/docs/for-agents.md — that's the agent guide for Saucebase, a modular Laravel SaaS starter kit. Follow it step by step.
```

[Read the full agent guide →](pathname:///for-agents.md)

:::warning SQLite limitations
The default installation uses SQLite, which is sufficient for basic development but does not support all features. Some Filament admin panel widgets and Billing module charts require MySQL-specific capabilities and may not display correctly with SQLite.

For full functionality, configure the app to use **MySQL** — run it locally, or use [Laravel Herd](https://herd.laravel.com), [Laravel Sail](https://laravel.com/docs/sail), or `saucebase install --driver=docker`.
:::

<ModuleGrid
  title="Explore the Modules"
  subtitle="Browse the available modules and install the ones that fit your product — each one copies directly into your codebase, ready to customize."
/>
