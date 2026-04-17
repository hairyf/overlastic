import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

function getPackageLinks(lang: string) {
  const prefix = lang === 'en' ? '' : `/${lang}`
  const packages = [
    { text: '@overlastic/vanilla', link: `${prefix}/element/` },
    { text: '@overlastic/react', link: `${prefix}/react/` },
    { text: '@overlastic/vue', link: `${prefix}/vue/` },
    { text: '@overlastic/svelte', link: `${prefix}/svelte/` },
  ]
  return packages
}

const sidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: 'Introduction',
      items: [
        { text: 'Getting Started', link: '/guide/getting-started' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: 'React', link: `/react/` },
        { text: 'Vue', link: `/vue/` },
        { text: 'Vue 2', link: `/vue/vue2` },
        { text: 'Vanilla', link: `/element/` },
        { text: 'Svelte', link: `/svelte/` },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'External Control', link: '/guide/external-control' },
        { text: 'Standalone', link: '/react/island' },
      ],
    },
    {
      text: 'Core Functions',
      items: [
        { text: 'Constructor', link: '/functions/constructor' },
        { text: 'Deferred', link: '/functions/deferred' },
        { text: 'Globals', link: '/functions/defines' },
      ],
    },
  ],

  '/zh/': [
    {
      text: 'Introduction',
      items: [
        { text: '介绍', link: '/zh/guide/getting-started' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: 'React', link: `/zh/react/` },
        { text: 'Vue', link: `/zh/vue/` },
        { text: 'Vue 2', link: `/zh/vue/vue2` },
        { text: 'Svelte', link: `/zh/svelte/` },
        { text: 'Vanilla', link: `/zh/element/` },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: '外部控制', link: '/guide/external-control' },
        { text: '孤岛模式', link: '/react/island' },
      ],
    },
    {
      text: 'Core Functions',
      items: [
        { text: '构造器', link: '/zh/functions/constructor' },
        { text: '承诺者', link: '/zh/functions/deferred' },
        { text: '定义', link: '/zh/functions/defines' },
      ],
    },
  ],

}

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    link: '/guide/getting-started',
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
  title: 'Overlastic',
  head: [['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }]],

  locales: {
    root: { label: 'English' },
    zh: { label: '简体中文', link: '/zh/' },
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
