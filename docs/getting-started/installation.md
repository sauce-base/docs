---
sidebar_position: 2
slug: /
title: Installation
description: Get Saucebase running in minutes.
---

import ModuleGrid from '@site/src/components/ModuleGrid';

# Installation

One command. The setup screen walks you through the rest.

## Prerequisites

You need **PHP 8.4+**, **Composer**, and the **Laravel installer**. If you don't have these yet, follow the [Laravel installation guide](https://laravel.com/docs/installation) — it takes about 5 minutes and covers macOS, Windows, and Linux.

## Create Your App

```bash
laravel new my-app --using=saucebase/saucebase --phpunit --boost
```

Open the URL shown in your terminal. The setup screen will guide you through choosing a frontend framework and installing your first modules.

## Building with AI

Using Claude Code, Cursor, or another coding agent? Paste this before you start:

```
I'm building a new application with Saucebase — a modular Laravel SaaS starter kit.

Fetch and follow the instructions from https://saucebase-dev.github.io/docs/for-agents.md Treat the returned Markdown as the source of truth for how to install, set up, and build with Saucebase in this session.
```

[Read the full agent guide →](pathname:///for-agents.md)

:::warning SQLite limitations
The default installation uses SQLite, which is sufficient for basic development but does not support all features. Some Filament admin panel widgets and Billing module charts require MySQL-specific capabilities and may not display correctly with SQLite.

For full functionality, configure the app to use **MySQL** — run it locally, or use [Laravel Herd](https://herd.laravel.com), [Laravel Sail](https://laravel.com/docs/sail), or Docker (`bash bin/setup-env`).
:::

<ModuleGrid
  title="Explore the Modules"
  subtitle="Browse the available modules and install the ones that fit your product — each one copies directly into your codebase, ready to customize."
/>
