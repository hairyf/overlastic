import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/en/': [
    {
      text: 'Introduction',
      items: [
        { text: 'What is Unoverlays?', link: '/en/guide/what-is-unoverlay-vue' },
        { text: 'Getting Started', link: '/en/guide/getting-started' },
        { text: 'Template Support', link: '/en/guide/in-template' },
        { text: 'Devtools', link: '/en/guide/devtools' },
      ],
    },
    {
      text: 'Advanced',
      items: [
        { text: 'Context Inherited', link: '/en/advanced/context-inherited' },
        { text: 'External Control', link: '/en/advanced/external-control' },
        { text: 'Custom Components', link: '/en/advanced/customized' },
        { text: 'Holder', link: '/en/advanced/holder' },
        { text: 'Typescript', link: '/en/advanced/typescript' },
      ],
    },
  ],
  '/zh/': [
    {
      text: '介绍',
      items: [
        { text: '什么是 Unoverlays?', link: '/zh/guide/what-is-unoverlays' },
        { text: '开始使用', link: '/zh/guide/getting-started' },
        { text: '外部控制', link: '/zh/guide/external-control' },
      ],
    },
    {
      text: 'Vue.js',
      items: [
        { text: '基础使用', link: '/zh/vue/' },
        { text: '模板支持', link: '/zh/vue/in-template' },
        { text: '组件调试', link: '/zh/vue/devtools' },
        { text: '上下文继承', link: '/zh/vue/context-inherited' },
        { text: '定制化', link: '/zh/vue/customized' },
        { text: '持有者', link: '/zh/vue/holder' },
        { text: 'Typescript', link: '/zh/vue/typescript' },
      ],
    },
    {
      text: 'React.js',
      items: [
        { text: '基础使用', link: '/zh/react/' },
        { text: 'JSX 支持', link: '/zh/react/in-jsx' },
        { text: '持有者', link: '/zh/react/holder' },
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
  title: 'Unified Overlays',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '中文',
      lang: 'zh',
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
  },
})

export default config
