import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  docs: [
    {
      type: 'doc',
      id: 'index',
      label: '🏠  Welcome',
    },
    {
      type: 'category',
      label: '🚀  Getting Started',
      collapsed: false,
      items: [
        'getting-started/introduction',
        'getting-started/installation',
        'getting-started/configuration',
        'getting-started/directory-structure',
      ],
    },
    {
      type: 'category',
      label: '🏗️  Architecture',
      collapsed: true,
      items: [
        'architecture/overview',
        'architecture/frontend',
        'architecture/backend',
        // 'architecture/modular-system',
        // 'architecture/asset-pipeline',
        // 'architecture/testing',
      ],
    },
    {
      type: 'category',
      label: '✨  Features',
      collapsed: true,
      items: [
        'fundamentals/modules',
        'fundamentals/ssr',
        'fundamentals/routing',
        'fundamentals/navigation',
        'fundamentals/breadcrumbs',
        'fundamentals/theme-mode',
        'fundamentals/translations',
        // 'fundamentals/authentication',
      ],
    },
    {
      type: 'category',
      label: '💻  Development',
      collapsed: true,
      items: [
        'development/commands',
        'development/git-workflow',
        'development/coding-standards',
        // 'development/testing-guide',
        // 'development/debugging',
      ],
    },
    // {
    //   type: 'category',
    //   label: '🚀  Advanced',
    //   collapsed: true,
    //   items: [
    //     'advanced/creating-modules',
    //     'advanced/multi-tenancy',
    //     'advanced/performance',
    //     'advanced/security',
    //     'advanced/deployment',
    //   ],
    // },
    {
      type: 'category',
      label: '📚  Reference',
      collapsed: true,
      items: [
        'reference/troubleshooting',
        'reference/glossary',
        // 'reference/environment-variables',
        // 'reference/artisan-commands',
        // 'reference/npm-scripts',
        // 'reference/docker-services',
      ],
    },
  ],
};

export default sidebars;
