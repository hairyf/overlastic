import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

function getPackageLinks(lang: string) {
  const packages = [
    { text: '@overlastic/vanilla', link: `/${lang}/core/element/` },
    { text: '@overlastic/react', link: `/${lang}/core/react/` },
    { text: '@overlastic/vue', link: `/${lang}/vue/` },
    { text: '@overlastic/svelte', link: `/${lang}/core/svelte/` },
  ]
  return packages
}

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
      items: getPackageLinks('en'),
    },
    {
      text: 'Core Functions',
      items: [
        { text: 'Constructor', link: '/en/core/functions/constructor' },
        { text: 'Deferred', link: '/en/core/functions/deferred' },
        { text: 'Globals', link: '/en/core/functions/defines' },
      ],
    },
  ],
  '/en/vue/': [
    {
      text: '@overlastic/vue',
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
      items: getPackageLinks('zh'),
    },
    {
      text: 'Core Functions',
      items: [
        { text: '构造器', link: '/zh/core/functions/constructor' },
        { text: '承诺者', link: '/zh/core/functions/deferred' },
        { text: '定义', link: '/zh/core/functions/defines' },
      ],
    },
  ],
  '/zh/vue/': [
    {
      text: '@overlastic/vue',
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
    items: getPackageLinks('en'),
  },
  {
    text: 'Github',
    link: 'https://github.com/hairyf/overlastic',
  },
]

const config = defineConfig({
  lang: 'zh',
  title: 'Unified Overlays',
  head: [['link', { rel: 'icon', href: '/circle.svg', type: 'image/svg+xml' }]],
  locales: {
    'root': {
      label: 'Unified Overlays',
      lang: 'en-US',
    },
    '/zh/': {
      label: 'Unified Overlays',
      lang: 'zh-CN',
      link: '/zh/',
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

  },
})

export default config
