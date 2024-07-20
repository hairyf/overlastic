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
        { text: 'Externally', link: '/guide/external-control' },
        { text: 'Singleton', link: '/guide/support-only' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: '@overlastic/vanilla', link: `/element/` },
        {
          text: '@overlastic/react',
          link: `/react/`,
          items: [
            { text: 'Usage', link: '/react/' },
            { text: 'Inject mode✨', link: '/react/provider' },
            { text: 'Hold mode', link: '/react/holder' },
            { text: 'Customized', link: '/react/customized' },
          ],
          collapsed: true,
        },
        {
          text: '@overlastic/vue',
          link: `/vue/`,
          items: [
            { text: 'Usage', link: '/vue/' },
            { text: 'Inject mode✨', link: '/vue/provider' },
            { text: 'Customized', link: '/vue/customized' },
            { text: 'Vue 2', link: '/vue/vue2' },
          ],
          collapsed: true,
        },
        { text: '@overlastic/svelte', link: `/svelte/` },
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
        { text: '外部控制', link: '/zh/guide/external-control' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: '@overlastic/vanilla', link: `/zh/element/` },
        {
          text: '@overlastic/react',
          link: `/zh/react/`,
          items: [
            { text: '快速开始', link: '/zh/react/' },
            { text: '注入模式✨', link: '/zh/react/provider' },
            { text: '持有模式', link: '/zh/react/holder' },
            { text: '定制化', link: '/zh/react/customized' },
          ],
          collapsed: true,
        },
        {
          text: '@overlastic/vue',
          link: `/zh/vue/`,
          items: [
            { text: '快速开始', link: '/zh/vue/' },
            { text: '注入模式✨', link: '/zh/vue/provider' },
            { text: '定制化', link: '/zh/vue/customized' },
            { text: 'Vue 2', link: '/zh/vue/vue2' },
          ],
          collapsed: true,
        },
        { text: '@overlastic/svelte', link: `/zh/svelte/` },
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
  title: 'Unified Overlays',
  head: [['link', { rel: 'icon', href: '/circle.svg', type: 'image/svg+xml' }]],

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
