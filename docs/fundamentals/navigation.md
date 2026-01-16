---
sidebar_position: 5
title: Navigation
description: Learn how to implement navigation menus and links in your Saucebase application using Inertia.js and Vue Router
---

# Navigation

Navigation in Saucebase is powered by Inertia.js, which provides seamless client-side transitions without full page reloads. You can build dynamic navigation menus with active states, nested routes, and programmatic navigation.

## Why Use Inertia Navigation?

- **Fast**: Client-side navigation without full page reloads
- **SEO-friendly**: Works with standard anchor tags and browser history
- **Simple**: No need to configure Vue Router - Inertia handles routing automatically
- **Type-safe**: Use Ziggy to generate type-safe route helpers from your Laravel routes

## Basic Navigation

### Using Inertia Link Component

The `Link` component from Inertia.js is the primary way to navigate between pages:

```vue title="resources/js/Components/Navigation/AppNav.vue"
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
  <nav>
    <Link href="/dashboard">
      Dashboard
    </Link>

    <Link href="/profile">
      Profile
    </Link>

    <Link href="/settings">
      Settings
    </Link>
  </nav>
</template>
```

### Using Ziggy for Type-Safe Routes

Ziggy generates JavaScript route helpers from your Laravel routes. Use the `route()` helper for type-safe navigation:

```vue title="resources/js/Components/Navigation/AppNav.vue"
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
</script>

<template>
  <nav>
    <Link :href="route('dashboard')">
      Dashboard
    </Link>

    <Link :href="route('profile.show')">
      Profile
    </Link>

    <Link :href="route('settings.index')">
      Settings
    </Link>
  </nav>
</template>
```

:::tip Type Safety
Ziggy provides full TypeScript support for your Laravel routes. Install the types with `npm install -D ziggy-js` and configure in your `tsconfig.json`.
:::

## Active Link States

You can highlight the current page by checking the active route:

```vue title="resources/js/Components/Navigation/NavLink.vue"
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

interface Props {
  href: string;
  active?: boolean;
}

const props = defineProps<Props>();

const page = usePage();

const isActive = computed(() => {
  return props.active ?? page.url.startsWith(props.href);
});
</script>

<template>
  <Link
    :href="href"
    :class="{
      'bg-purple-100 text-purple-700': isActive,
      'text-gray-600 hover:bg-gray-100': !isActive,
    }"
    class="px-4 py-2 rounded-lg transition"
  >
    <slot />
  </Link>
</template>
```

**Usage:**

```vue
<NavLink href="/dashboard">
  Dashboard
</NavLink>

<NavLink href="/profile" :active="route().current('profile.*')">
  Profile
</NavLink>
```

## Nested Navigation

Create hierarchical navigation with dropdown menus:

```vue title="resources/js/Components/Navigation/DropdownNav.vue"
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="px-4 py-2 rounded-lg hover:bg-gray-100"
    >
      Settings
      <svg class="w-4 h-4 inline ml-2" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border"
    >
      <Link
        :href="route('settings.profile')"
        class="block px-4 py-2 hover:bg-gray-100"
      >
        Profile Settings
      </Link>

      <Link
        :href="route('settings.security')"
        class="block px-4 py-2 hover:bg-gray-100"
      >
        Security
      </Link>

      <Link
        :href="route('settings.billing')"
        class="block px-4 py-2 hover:bg-gray-100"
      >
        Billing
      </Link>
    </div>
  </div>
</template>
```

## Programmatic Navigation

Navigate programmatically using the Inertia router:

```vue title="resources/js/Pages/Dashboard.vue"
<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

function goToProfile() {
  router.visit(route('profile.show'));
}

function goBack() {
  router.visit(window.history.back());
}

function redirectToSettings() {
  router.visit(route('settings.index'), {
    replace: true, // Replace current history entry
  });
}
</script>

<template>
  <div>
    <button @click="goToProfile">
      View Profile
    </button>

    <button @click="goBack">
      Go Back
    </button>
  </div>
</template>
```

## Navigation with Data

Pass data to the next page during navigation:

```vue
<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

function editUser(userId: number) {
  router.visit(route('users.edit', userId), {
    data: {
      from: 'dashboard'
    }
  });
}
</script>
```

## Preserving Scroll Position

Preserve scroll position when navigating:

```vue
<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
  <Link
    :href="route('posts.show', post.id)"
    preserve-scroll
  >
    Read More
  </Link>
</template>
```

## External Links

For external links, use regular anchor tags:

```vue
<template>
  <nav>
    <!-- Internal navigation with Inertia -->
    <Link :href="route('dashboard')">
      Dashboard
    </Link>

    <!-- External link -->
    <a
      href="https://laravel.com/docs"
      target="_blank"
      rel="noopener noreferrer"
    >
      Laravel Docs
    </a>
  </nav>
</template>
```

:::warning External Links
Always use regular `<a>` tags for external links. Inertia `Link` components are only for internal navigation within your application.
:::

## Complete Navigation Component

Here's a full example of a navigation component with all features:

```vue title="resources/js/Components/Navigation/AppNavigation.vue"
<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import { computed } from 'vue';

const page = usePage();

const navigation = [
  { name: 'Dashboard', href: route('dashboard'), pattern: 'dashboard' },
  { name: 'Projects', href: route('projects.index'), pattern: 'projects.*' },
  { name: 'Team', href: route('team.index'), pattern: 'team.*' },
  { name: 'Settings', href: route('settings.index'), pattern: 'settings.*' },
];

function isActive(pattern: string) {
  return route().current(pattern);
}
</script>

<template>
  <nav class="flex gap-4">
    <Link
      v-for="item in navigation"
      :key="item.name"
      :href="item.href"
      :class="{
        'bg-purple-100 text-purple-700 font-semibold': isActive(item.pattern),
        'text-gray-600 hover:bg-gray-100 hover:text-gray-900': !isActive(item.pattern),
      }"
      class="px-4 py-2 rounded-lg transition"
    >
      {{ item.name }}
    </Link>
  </nav>
</template>
```

## What's Next?

- Learn about [Breadcrumbs](/fundamentals/breadcrumbs) for hierarchical navigation
- Explore [Routing](/fundamentals/routing) to understand Laravel route configuration
- Read about [SSR](/fundamentals/ssr) for server-side rendered navigation
