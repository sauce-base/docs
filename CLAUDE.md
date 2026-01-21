# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Docusaurus 3.9.2-based documentation site for **Saucebase** - a modular Laravel SaaS starter kit built on the VILT stack (Vue 3, Inertia.js, Laravel 12, Tailwind CSS 4). The documentation is deployed to GitHub Pages at https://sauce-base.github.io/docs/.

## Commands

### Development
```bash
npm install              # Install dependencies
npm start                # Start dev server at http://localhost:3000/docs/
npm run build            # Build production static files to build/
npm run serve            # Serve production build locally
npm run clear            # Clear Docusaurus cache
```

### Content Management
```bash
npm run swizzle          # Customize Docusaurus components
npm run write-translations  # Generate translation files
npm run write-heading-ids   # Auto-generate heading IDs
```

## Architecture

### Site Structure

- **Base URL**: `/docs/` (GitHub Pages deployment at sauce-base.github.io/docs/)
- **Docs at Root**: Documentation is served at site root (`routeBasePath: '/'`)
- **No Blog**: Blog functionality is disabled

### Key Configuration

- **docusaurus.config.ts**: Main config including navigation, theme, plugins, and deployment settings
- **sidebars.ts**: Sidebar structure with categories for Getting Started, Architecture, Fundamentals, Development, and Reference
- **tsconfig.json**: Extends `@docusaurus/tsconfig` with `@site/*` alias for root imports

### Documentation Directory Structure

```
docs/
├── index.md                    # Landing page (slug: /)
├── getting-started/            # Installation, configuration, directory structure
├── architecture/               # Frontend, backend, system architecture
├── fundamentals/               # Modules, SSR, routing, translations
├── development/                # Commands, git workflow, coding standards
└── reference/                  # Troubleshooting
```

### Theme & Features

- **Mermaid Support**: Enabled for diagrams (`markdown.mermaid: true`)
- **Local Search**: Uses `@easyops-cn/docusaurus-search-local` plugin (no Algolia)
- **Dark Mode Default**: `defaultMode: 'dark'` with system preference respect
- **Syntax Highlighting**: Prism with PHP, Bash, TypeScript, JSON, YAML, Markdown, Diff support

### Edit Links

All documentation pages include "Edit this page" links pointing to:
`https://github.com/sauce-base/docs/tree/main/`

## Writing Documentation

### Tone & Voice

**Conversational & Friendly** (inspired by Laravel documentation):
- Use "we" and "you" to create rapport ("we provide", "you can use", "let's explore")
- Be encouraging and welcoming ("Great! Now you're ready to...", "This will help you...")
- Build confidence in readers ("Saucebase makes this easy", "You have complete control")
- Keep it human and warm, not robotic or overly formal

**What to avoid:**
- ❌ "One should configure the environment" → ✅ "You'll need to configure your environment"
- ❌ "The system processes requests" → ✅ "Saucebase processes your requests"
- ❌ Jargon without context → ✅ Clear explanations with examples

### Writing for International Audiences

**Use Simple, Clear English:**
- Prefer common words over complex synonyms
- Use active voice (easier to parse and translate)
- Keep sentences focused on one idea
- Structure paragraphs with clear topic sentences

**Good examples:**
```markdown
✅ "Modules install directly into your repository. This gives you complete control."

❌ "Through the utilization of direct repository integration, modules facilitate
    comprehensive codebase ownership by the developer."
```

**Avoid idioms or explain them:**
- ❌ "Hit the ground running" → ✅ "Start quickly"
- ❌ "Under the hood" → ✅ "Behind the scenes" or "How it works internally"
- If using metaphors, keep them universal (building, journey, tools)

### Content Structure

Every documentation page should follow this pattern:

#### 1. Overview (What)
Start with a clear, one-paragraph explanation of what the feature/concept is:

```markdown
## Server-Side Rendering (SSR)

SSR renders your Vue components on the server before sending HTML to the browser.
This improves initial page load performance and SEO.
```

#### 2. Benefits (Why)
Explain why this matters and when to use it:

```markdown
### Why Use SSR?

- **Better SEO**: Search engines see your full content immediately
- **Faster perceived load**: Users see content before JavaScript downloads
- **Improved performance**: Critical content renders server-side
```

#### 3. Implementation (How)
Show progressive examples from simple to complete:

```markdown
### Basic Usage

First, enable SSR for a page:

// resources/js/Pages/Dashboard.vue
export default {
  layout: 'AppLayout',
  ssr: true  // Enable SSR for this page
}

### Complete Example

Here's a full component with SSR:

// Full working example with all context...
```

#### 4. Next Steps
Guide readers forward:

```markdown
### What's Next?

- Learn about [SSR configuration](/fundamentals/ssr-configuration)
- Explore [performance optimization](/advanced/performance)
```

### Code Examples

**Progressive Examples** (simple → complete):

```markdown
<!-- Step 1: Minimal example -->
## Quick Start

php artisan module:enable Auth

<!-- Step 2: With context -->
## Installation

First, require the module:

composer require saucebase/auth

Then enable and migrate:

php artisan module:enable Auth
php artisan module:migrate Auth

<!-- Step 3: Complete example with configuration -->
## Complete Setup

1. Install the Auth module:

   composer require saucebase/auth

2. Configure your OAuth credentials in `.env`:

   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret

3. Enable and migrate:

   php artisan module:enable Auth
   php artisan module:migrate Auth --seed
```

**Code block formatting:**
- Always include file paths: ` ```php title="app/Models/User.php" `
- Add comments for clarity: `// Enable SSR for this page`
- Show terminal commands with `bash` syntax highlighting
- Include expected output when helpful

### Explanation Depth: What, How & Why

For every feature, answer:

**What**: Clear definition
```markdown
Modules are self-contained feature packages that install into your codebase.
```

**How**: Practical implementation
```markdown
Install with Composer, then enable with `php artisan module:enable ModuleName`.
```

**Why**: Context and benefits
```markdown
This gives you ownership of the code without vendor lock-in. Unlike packages,
you can modify modules freely without maintaining patches.
```

### Visual Aids

Use these formatting patterns liberally:

#### Callout Boxes
```markdown
:::tip Copy-and-Own Philosophy
Modules become part of your codebase when installed. Modify them freely!
:::

:::warning Database Changes
Always backup your database before running migrations in production.
:::

:::note Prerequisites
You need PHP 8.4+ and Composer 2.0+ installed.
:::

:::danger Security Risk
Never commit your `.env` file with real credentials to version control.
:::
```

#### Before/After Examples
```markdown
### Before (Without Saucebase)

// Manually configure everything
class AuthController {
  // 50 lines of boilerplate...
}

### After (With Saucebase)

// Already configured and ready
php artisan module:enable Auth
```

#### Step-by-Step Lists
```markdown
### Installation Steps

1. **Install dependencies**

   npm install

   This downloads all required packages.

2. **Configure environment**

   Copy `.env.example` to `.env`:

   cp .env.example .env

   Update your database credentials.

3. **Start development server**

   npm start

   Visit http://localhost:3000/docs/
```

### Markdown Features

This site supports enhanced Docusaurus markdown:

- **Admonitions**: `:::tip`, `:::note`, `:::warning`, `:::danger`
- **Code Blocks**: Use title attribute for file paths: ` ```php title="app/Providers/AppServiceProvider.php" `
- **Mermaid Diagrams**: ` ```mermaid ` for flowcharts and architectural diagrams
- **Tabs**: Use Docusaurus tabs component for grouping related content

### Frontmatter

Each document should include:
```yaml
---
sidebar_position: 1
title: Page Title
description: Clear, concise SEO description (50-160 characters)
---
```

### Writing Checklist

Before publishing any documentation page:

- [ ] **Clarity**: Can a non-native English speaker understand this?
- [ ] **Completeness**: Does it answer What, How, and Why?
- [ ] **Examples**: Are code examples progressive (simple → complete)?
- [ ] **Testing**: Have all code snippets been tested?
- [ ] **Formatting**: Are callouts, code blocks, and lists used effectively?
- [ ] **Navigation**: Are there links to related documentation?
- [ ] **Tone**: Is it conversational and encouraging?
- [ ] **Terminology**: Are technical terms used in the glossary?

### Target Audience

Assume readers have:
- ✅ Basic Laravel and Vue knowledge
- ✅ Familiarity with command-line tools
- ✅ Understanding of web development concepts

Don't assume:
- ❌ Deep knowledge of advanced patterns
- ❌ Experience with specific tools (Docker, SSR, etc.)
- ❌ Native English proficiency

### Priority: Clear AND Concise

Every sentence should earn its place:
- **Clear**: Unambiguous and easy to understand
- **Concise**: No unnecessary words, but not at the expense of clarity
- **Complete**: All essential information included

**Balance example:**
```markdown
❌ Too verbose:
"In order to get started with the installation process of Saucebase,
you will first need to ensure that you have the necessary prerequisites
installed on your system before proceeding further."

✅ Balanced:
"Before installing Saucebase, make sure you have PHP 8.4+ and Node.js 18+
installed on your system."

❌ Too terse:
"Install PHP/Node. Run install command."
```

### Cross-References

Link to related documentation naturally:

```markdown
✅ "Learn more about [module architecture](/architecture/modular-system)"
✅ "See the [troubleshooting guide](/reference/troubleshooting) if you encounter issues"

❌ "Click here" (not descriptive)
❌ "See documentation" (too vague)
```

### Terminology & Glossary

**Use technical terms freely** in documentation (SSR, HMR, VILT, etc.) but maintain a centralized glossary for reference.

**Glossary Location**: `/reference/glossary.md`

When introducing specialized Saucebase concepts for the first time in a document, link to the glossary:
```markdown
The [module system](/reference/glossary#module) allows you to...
```

**Common terms in glossary:**
- SSR (Server-Side Rendering)
- HMR (Hot Module Replacement)
- VILT (Vue, Inertia, Laravel, Tailwind)
- Copy-and-Own Philosophy
- shadcn-vue
- Ziggy (route helper)
- Inertia.js
- Module (Saucebase-specific definition)

### SEO Best Practices

Documentation should be optimized for search engines to help developers find Saucebase.

#### Page Titles & Descriptions

**Title format**: `[Topic] - Saucebase Documentation`
```yaml
---
title: Module System
description: Install and manage self-contained feature modules in your Laravel SaaS application
---
```

**Description guidelines:**
- 50-160 characters (optimal: 120-155)
- Include primary keyword naturally
- Make it compelling and actionable
- Don't stuff keywords

**Good examples:**
```yaml
✅ "Learn how to create and manage modules in Saucebase - self-contained Laravel features you own"
✅ "Install Saucebase on Laravel 12 with Docker, PHP 8.4+, Vue 3, and Inertia.js"

❌ "Modules" (too short, not descriptive)
❌ "Modules module module Laravel module create module install module" (keyword stuffing)
```

#### Headings & Structure

Use proper heading hierarchy for SEO and accessibility:

```markdown
# Page Title (H1 - only one per page)

## Main Section (H2)

### Subsection (H3)

#### Detail (H4)
```

**Heading best practices:**
- Include keywords naturally
- Make them descriptive and scannable
- Use question format when appropriate ("How do I install modules?")
- Front-load important words

#### Internal Linking

Link to related documentation pages to improve SEO and user experience:

```markdown
✅ "Learn more about [module architecture](/architecture/modular-system)"
✅ "See the [installation guide](/getting-started/installation) to get started"

❌ "Click here" (not descriptive)
❌ "Read more" (no context for search engines)
```

**Internal linking guidelines:**
- Use descriptive anchor text with keywords
- Link to relevant glossary terms: `[SSR](/reference/glossary#ssr-server-side-rendering)`
- Add 2-5 internal links per page
- Link to both parent and child topics

#### External Links & References

**Always include official documentation links in the glossary** (for SEO authority and user value):

```markdown
### Laravel
A PHP web application framework. Saucebase is built on Laravel 12 with PHP 8.4+.

**Official website**: [laravel.com](https://laravel.com/)
**Documentation**: [Laravel Documentation](https://laravel.com/docs)
**GitHub**: [laravel/laravel](https://github.com/laravel/laravel)
```

**Benefits:**
- Establishes topical authority
- Provides value to users
- Shows search engines we're a quality resource
- Builds relationships with referenced projects

#### Keywords & Content

**Target keyword strategy:**
- Primary keyword: In title, first paragraph, and H2 headings
- Secondary keywords: Naturally throughout content
- Long-tail keywords: In H3 headings and examples

**Example for a modules page:**
```markdown
# Module System (Primary: "module system")

Modules are self-contained features... (Primary keyword in first paragraph)

## Installing Modules (Secondary: "installing modules")
## Creating Custom Modules (Long-tail: "creating custom modules")
```

**Keyword usage:**
- Use naturally, never force it
- Include variations (module, modules, modular)
- Focus on user intent, not just keywords
- Write for humans first, search engines second

#### Code Examples for SEO

Code examples improve SEO by:
- Increasing time on page
- Providing practical value
- Targeting "how to" searches
- Including keywords naturally in comments

```markdown
## Installing a Module

Install the Auth module with Composer:

```bash
# Install authentication module for Laravel
composer require saucebase/auth
php artisan module:enable Auth
```
```

#### URL Structure

Docusaurus handles URLs automatically, but ensure:
- Page file names are descriptive: `module-system.md` not `mod.md`
- URLs are readable: `/fundamentals/modules` not `/f/m`
- Use hyphens, not underscores: `getting-started` not `getting_started`

#### Images & Media

When adding images (future):
```markdown
![Laravel module structure in Saucebase](./images/module-structure.png)
```

- Use descriptive alt text with keywords
- Keep file sizes optimized
- Use descriptive file names: `module-structure.png` not `img1.png`

#### Content Freshness

- Keep code examples up to date with latest Laravel/Vue versions
- Add "Last updated" dates for time-sensitive content
- Update when Saucebase features change
- Archive outdated content rather than deleting (redirects)

#### Technical SEO Checklist

Before publishing:

- [ ] Title is descriptive and includes primary keyword (50-60 chars)
- [ ] Description is compelling and optimized (120-155 chars)
- [ ] H1 heading exists and matches title concept
- [ ] Proper heading hierarchy (H2 → H3 → H4)
- [ ] 2-5 internal links with descriptive anchor text
- [ ] External links to official docs (where relevant)
- [ ] Code examples include keywords in comments
- [ ] Primary keyword appears in first paragraph
- [ ] Content answers user search intent clearly

### Syncing with Main Repository

When the main Saucebase repository changes affect documentation:
1. Create issue with `sync-needed` label
2. Link to relevant commit/PR from main repo
3. Update affected pages
4. Verify code examples still work

### Directory Structure Page Guidelines

The directory structure page (`getting-started/directory-structure.md`) should focus ONLY on:
- **File and folder layout** - Where things are located
- **Brief one-liner descriptions** - What each unique file does
- **Links to detailed guides** - Point to architecture/feature pages

**DO NOT include:**
- Detailed architectural explanations (belongs in `/architecture/`)
- Code examples (belongs in feature-specific pages)
- Implementation details (belongs in feature guides)
- Testing patterns (belongs in `/development/testing-guide`)
- SSR architecture (belongs in `/fundamentals/ssr`)

**Example format:**
```markdown
### Unique Files
- `module-loader.js` - Discovers enabled modules at build time [→ Details](/architecture/overview)
- `modules_statuses.json` - Tracks enabled/disabled modules
```

**Keep it scannable:**
- Target length: 100-150 lines
- Use visual trees for structure
- One paragraph max per concept
- Always link to detailed guides

**Separation of concerns:**
- Structure = Directory Structure page
- Architecture = Architecture pages
- Features = Feature-specific pages
- Testing = Testing Guide page

## Related Repositories

- **Main Repository**: [sauce-base/saucebase](https://github.com/sauce-base/saucebase) - The Laravel SaaS starter kit
- **Auth Module**: [sauce-base/auth](https://github.com/sauce-base/auth)
- **Settings Module**: [sauce-base/settings](https://github.com/sauce-base/settings)

## Deployment

Automatic deployment to GitHub Pages occurs via GitHub Actions when changes are pushed to the `main` branch.

### GitHub Actions Workflow

The deployment workflow is located at `.github/workflows/deploy.yml` and performs the following:

1. **Triggers**: Runs on every push to `main` branch (also supports manual workflow dispatch)
2. **Build**: Installs dependencies with `npm ci` and builds the site with `npm run build`
3. **Deploy**: Uploads the `build/` directory and deploys to GitHub Pages

**Workflow features:**
- Uses Node.js 20 (latest LTS)
- Implements concurrency control to prevent deployment conflicts
- Requires proper permissions (`contents: read`, `pages: write`, `id-token: write`)

### GitHub Pages Configuration

To enable automatic deployment:

1. Go to repository **Settings** > **Pages**
2. Under **Build and deployment** > **Source**, select **GitHub Actions**
3. The workflow will automatically deploy on the next push to `main`

**Deployment URL**: https://sauce-base.github.io/docs/

**Repository Settings:**
- Organization: `sauce-base`
- Project: `docs`
- Branch: `main`
