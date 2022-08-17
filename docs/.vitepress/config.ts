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
        { text: 'Context Inherited', link: '/en/advanced/context-inherited' },
        { text: 'External Control', link: '/en/advanced/external-control' },
        { text: 'Custom Components', link: '/en/advanced/customized' },
        { text: 'Typescript', link: '/en/advanced/typescript' },
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
        { text: '上下文继承', link: '/zh/advanced/context-inherited' },
        { text: '外部控制', link: '/zh/advanced/external-control' },
        { text: '组件定制化', link: '/zh/advanced/customized' },
        { text: 'Typescript', link: '/zh/advanced/typescript' },
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
