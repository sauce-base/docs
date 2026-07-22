---
sidebar_position: 1
title: Frontend Architecture
description: Framework choice, Inertia.js, and the frontend build system
---

# Frontend Architecture

Saucebase supports **Vue 3** and **React** as first-class frontend frameworks. You pick one during setup — everything else (Inertia.js, Tailwind CSS, SSR, i18n, Ziggy routes) works the same regardless of choice.

## Choosing a Framework

The `saucebase new`/`saucebase install` CLI prompts you to pick Vue or React during setup. To select it directly (or switch before the choice is finalized):

```bash
saucebase stack vue
# or
saucebase stack react
```

This is a one-time, irreversible operation — it flattens the framework files into `resources/js/` and removes the other framework's directory. Choose carefully.

## Where Your Code Lives

After setup, your frontend code lives under the active framework's directory:

```
resources/js/
├── vue/            # Vue implementation (if Vue was chosen)
│   ├── pages/
│   ├── components/
│   ├── layouts/
│   └── composables/
└── react/          # React implementation (if React was chosen)
    ├── pages/
    ├── components/
    └── hooks/
```

The same structure applies inside modules:

```
modules/auth/resources/js/
├── vue/
│   └── pages/
└── react/
    └── pages/
```

## Inertia.js

Inertia connects Laravel controllers to your frontend components without a REST API.

**Controller returns a component name and props:**

```php
return Inertia::render('Dashboard', ['stats' => $stats]);
```

**Component receives them as typed props** — no fetch calls, no API endpoints.

### Module Page Resolution

Module pages use namespace syntax to keep them isolated:

```php
return Inertia::render('Auth::Login');   // modules/auth/.../pages/Login.vue
return Inertia::render('Dashboard');      // resources/js/.../pages/Dashboard.vue
```

The `resolveModularPageComponent()` utility handles this automatically — you just use the namespace in your controllers.

## SSR (Opt-In)

SSR is disabled by default. Enable it per-route for pages that benefit from SEO:

```php
return Inertia::render('Products/Index')->withSSR();   // public/SEO pages
return Inertia::render('Dashboard')->withoutSSR();      // authenticated pages
```

**Learn more**: [SSR Guide](/fundamentals/ssr)

## Ziggy Routes

The `route()` helper from Laravel is available in all frontend components:

```typescript
route('dashboard')
route('user.show', { id: 1 })
route().current('settings.*')
```

## Translations (i18n)

Translations are loaded asynchronously from `lang/` (core) and `modules/*/lang/` (modules). Use the `trans()` helper or the `$t()` function in templates.

**Learn more**: [Translations Guide](/fundamentals/translations)

## TypeScript

TypeScript path aliases are configured in `tsconfig.json`:

| Alias | Resolves to |
|---|---|
| `@/` | `resources/js/` |
| `@modules/` | `modules/` |
| `@e2e/` | `tests/e2e/` |

Always use these — never use relative `../../..` imports across directory boundaries.

### Module Page Props

Modules can contribute to the shared Inertia `PageProps` type without touching any core file. Create `resources/js/types/page-props.d.ts` in your module:

```typescript
declare module '@inertiajs/core' {
  interface PageProps {
    my_module_prop?: MyType;
  }
}

export {};
```

Augmentations are picked up automatically when the module is installed.

## Build System

```bash
npm run dev      # dev server with HMR
npm run build    # production build (includes SSR)
```

`module-loader.js` automatically collects asset entry points from all installed modules — no manual Vite configuration needed when adding modules.

## Next Steps

- [Backend Architecture](/architecture/backend)
- [Module System](/architecture/module-system)
- [SSR Guide](/fundamentals/ssr)
- [Translations](/fundamentals/translations)
