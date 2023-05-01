import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/en/core/': [
    {
      text: 'Introduction',
      items: [
        { text: 'Getting Started', link: '/en/core/guide/getting-started' },
        { text: 'Externally', link: '/en/core/guide/external-control' },
        { text: 'Singleton', link: '/en/core/guide/support-only' },
      ],
    },
    {
      text: 'Core Functions',
      items: [
        { text: 'Globals', link: '/en/core/functions/globals' },
        { text: 'Constructor', link: '/en/core/functions/constructor' },
        { text: 'Promiser', link: '/en/core/functions/promiser' },
        { text: 'Utils', link: '/en/core/functions/utils' },
        { text: 'Examples', link: '/en/core/functions/examples' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: '@overlays/vue', link: '/en/vue/' },
        { text: '@overlays/react', link: '/en/react/' },
      ],
    },
  ],
  '/en/vue/': [
    {
      text: 'Guide',
      items: [
        { text: 'Get Started', link: '/en/vue/' },
        { text: 'Devtools', link: '/en/vue/devtools' },
        { text: 'Vue2 Support', link: '/en/vue/vue2' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Inherited context', link: '/en/vue/advanced/inherited-context' },
        { text: 'Slot | VNode', link: '/en/vue/advanced/slots-vnode' },
        { text: 'Holder', link: '/en/vue/advanced/holder' },
        { text: 'Customized', link: '/en/vue/advanced/customized' },
      ],
    },
    {
      text: 'Other',
      items: [
        { text: 'Typescript', link: '/en/vue/other/typescript' },
        { text: 'Template', link: '/en/vue/other/template' },
      ],
    },
  ],
  '/en/react/': [
    {
      text: 'Guide',
      items: [
        { text: 'Get Started', link: '/en/react/' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Inherited Context', link: '/en/react/advanced/inherited-context' },
        { text: 'Holder', link: '/en/react/advanced/holder' },
        { text: 'Customized', link: '/en/react/advanced/customized' },
      ],
    },
    {
      text: 'Other',
      items: [
        { text: 'Typescript', link: '/en/react/other/typescript' },
        { text: 'JSX', link: '/en/react/other/jsx' },
      ],
    },
  ],
  '/zh/core': [
    {
      text: 'Introduction',
      items: [
        { text: 'Getting Started', link: '/zh/core/guide/getting-started' },
        { text: 'Externally', link: '/zh/core/guide/external-control' },
        { text: 'Singleton', link: '/zh/core/guide/support-only' },
      ],
    },
    {
      text: 'Core Functions',
      items: [
        { text: 'Globals', link: '/zh/core/functions/globals' },
        { text: 'Constructor', link: '/zh/core/functions/constructor' },
        { text: 'Promiser', link: '/zh/core/functions/promiser' },
        { text: 'Utils', link: '/zh/core/functions/utils' },
        { text: 'Examples', link: '/zh/core/functions/examples' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: '@overlays/vue', link: '/zh/vue/' },
        { text: '@overlays/react', link: '/zh/react/' },
      ],
    },
  ],
  '/zh/vue/': [
    {
      text: 'Guide',
      items: [
        { text: 'Get Started', link: '/zh/vue/' },
        { text: 'Devtools', link: '/zh/vue/devtools' },
        { text: 'Vue2 Support', link: '/zh/vue/vue2' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Inherited context', link: '/zh/vue/advanced/inherited-context' },
        { text: 'Slot | VNode', link: '/zh/vue/advanced/slots-vnode' },
        { text: 'Holder', link: '/zh/vue/advanced/holder' },
        { text: 'Customized', link: '/zh/vue/advanced/customized' },
      ],
    },
    {
      text: 'Other',
      items: [
        { text: 'Typescript', link: '/zh/vue/other/typescript' },
        { text: 'Template', link: '/zh/vue/other/template' },
      ],
    },
  ],
  '/zh/react/': [
    {
      text: 'Guide',
      items: [
        { text: 'Get Started', link: '/zh/react/' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Inherited Context', link: '/zh/react/advanced/inherited-context' },
        { text: 'Holder', link: '/zh/react/advanced/holder' },
        { text: 'Customized', link: '/zh/react/advanced/customized' },
      ],
    },
    {
      text: 'Other',
      items: [
        { text: 'Typescript', link: '/zh/react/other/typescript' },
        { text: 'JSX', link: '/zh/react/other/jsx' },
      ],
    },
  ],
}

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    link: '/en/core/guide/getting-started',
  },
  {
    text: 'Packages',
    items: [
      { text: '@overlays/vue', link: '/en/vue/' },
      { text: '@overlays/react', link: '/en/react/' },
    ],
  },
  {
    text: 'Github',
    link: 'https://github.com/hairyf/unoverlays',
  },
]

const config = defineConfig({
  lang: 'zh',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Unified Overlays',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Unified Overlays',
    },
  },
  lastUpdated: true,
  themeConfig: {
    sidebar,
    nav,
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2019-present TuiMao233',
    },
    localeLinks: {
      text: '',
      items: [
        { text: 'English', link: '/' },
        { text: '简体中文', link: '/zh/' },
      ],
    },
  },
})

export default config
