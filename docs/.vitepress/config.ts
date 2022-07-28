import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/en/': [
    {
      text: 'Introduction',
      items: [
        { text: 'What is Unoverlay Vue?', link: '/en/guide/what-is-unoverlay-vue' },
        { text: 'Getting Started', link: '/en/guide/getting-started' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Customized Component', link: '/en/advanced/customized' },
      ],
    },
  ],
  '/zh/': [
    {
      text: '介绍',
      items: [
        { text: '什么是 Unoverlay Vue?', link: '/zh/guide/what-is-unoverlay-vue' },
        { text: '开始使用', link: '/zh/guide/getting-started' },
      ],
    },
    {
      text: '高级',
      items: [
        { text: '定制化', link: '/zh/advanced/customized' },
      ],
    },
  ],
}

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    link: '/en/guide/what-is-unoverlay-vue',
  },
  {
    text: 'Github',
    link: 'https://github.com/TuiMao233/unoverlay-vue',
  },
]

const config = defineConfig({
  base: '/unoverlay-vue/',
  lang: 'zh',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Unoverlay Vue',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Unoverlay Vue',
    },
  },
  lastUpdated: true,
  themeConfig: {
    sidebar,
    nav,
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2019-present Evan You',
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
