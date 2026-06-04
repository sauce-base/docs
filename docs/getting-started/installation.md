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
laravel new my-app --using=saucebase/saucebase
```

Open the URL shown in your terminal. The setup screen will guide you through choosing a frontend framework and installing your first modules.

## Building with AI

Using Claude Code, Cursor, or another coding agent? Paste this before you start:

```
I'm building a SaaS with Saucebase — a modular Laravel starter kit.

Read https://docs.saucebase.dev/for-agents.md for the project conventions, structure, and patterns. Treat it as the source of truth for how to add features, where files belong, and what commands to run.
```

[Read the full agent guide →](pathname:///for-agents.md)

<ModuleGrid
  title="Explore the Modules"
  subtitle="Browse the available modules and install the ones that fit your product — each one copies directly into your codebase, ready to customize."
/>
