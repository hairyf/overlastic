import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const packages = [
  { text: '@overlays/element', link: '/en/core/element/' },
  { text: '@overlays/react', link: '/zh/core/react/' },
  { text: '@overlays/vue', link: '/zh/vue/' },
  { text: '@overlays/svelte', link: '/en/core/svelte/' },
]

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
      text: 'Packages',
      items: [
        { text: '@overlays/element', link: '/en/core/element/' },
        { text: '@overlays/react', link: '/en/core/react/' },
        { text: '@overlays/vue', link: '/en/vue/' },
        { text: '@overlays/svelte', link: '/en/core/svelte/' },
      ],
    },
    {
      text: 'Core Functions',
      items: [
        { text: 'Constructor', link: '/en/core/functions/constructor' },
        { text: 'Promiser', link: '/en/core/functions/promiser' },
        { text: 'Globals', link: '/en/core/functions/defines' },
      ],
    },
  ],
  '/en/vue/': [
    {
      text: '@overlays/vue',
      items: [
        { text: 'Started', link: '/en/vue/' },
        { text: 'Devtools', link: '/en/vue/devtools' },
        { text: 'Vue 2', link: '/en/vue/vue2' },
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
  ],
  '/zh/core': [
    {
      text: 'Introduction',
      items: [
        { text: '开始使用', link: '/zh/core/guide/getting-started' },
        { text: '外部控制', link: '/zh/core/guide/external-control' },
        { text: '单例模式', link: '/zh/core/guide/support-only' },
      ],
    },
    {
      text: 'Packages',
      items: packages,
    },
    {
      text: 'Core Functions',
      items: [
        { text: '构造器', link: '/zh/core/functions/constructor' },
        { text: '承诺者', link: '/zh/core/functions/promiser' },
        { text: '定义', link: '/zh/core/functions/defines' },
      ],
    },
  ],
  '/zh/vue/': [
    {
      text: '@overlays/vue',
      items: [
        { text: '快速开始', link: '/zh/vue/' },
        { text: '开发调试', link: '/zh/vue/devtools' },
        { text: 'Vue 2', link: '/zh/vue/vue2' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: '上下文继承', link: '/zh/vue/advanced/inherited-context' },
        { text: 'Slot 与 VNode', link: '/zh/vue/advanced/slots-vnode' },
        { text: '持有者', link: '/zh/vue/advanced/holder' },
        { text: '定制化', link: '/zh/vue/advanced/customized' },
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
    items: packages,
  },
  {
    text: 'Github',
    link: 'https://github.com/hairyf/unoverlays',
  },
]

const config = defineConfig({
  lang: 'zh',
  head: [['link', { rel: 'icon', href: '/circle.svg', type: 'image/svg+xml' }]],
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
      copyright: 'Copyright © 2019-present hairyf',
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
