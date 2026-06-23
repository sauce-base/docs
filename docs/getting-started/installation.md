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
Before writing any code, fetch https://saucebase-dev.github.io/docs/for-agents.md — that's the agent guide for Saucebase, a modular Laravel SaaS starter kit. Follow it step by step.
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
