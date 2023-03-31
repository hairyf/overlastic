import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/en/': [
    {
      text: 'Introduction',
      items: [
        { text: 'What is Unoverlays?', link: '/en/guide/what-is-unoverlays' },
        { text: 'Getting Started', link: '/en/guide/getting-started' },
        { text: 'External Control', link: '/en/guide/external-control' },
        { text: 'Only Render', link: '/en/guide/support-only' },
        { text: 'Support Vue2', link: '/en/guide/support-vue2' },
      ],
    },
    {
      text: 'Vue.js',
      items: [
        { text: 'Basic Usage', link: '/en/vue/' },
        { text: 'Template Support', link: '/en/vue/in-template' },
        { text: 'Component Devtools', link: '/en/vue/devtools' },
        { text: 'Context Inherited', link: '/en/vue/context-inherited' },
        { text: 'Custom Components', link: '/en/vue/customized' },
        { text: 'Holder', link: '/en/vue/holder' },
        { text: 'Slot | VNode', link: '/en/vue/slots-vnode' },
        { text: 'Typescript', link: '/en/vue/typescript' },
      ],
    },
    {
      text: 'React.js',
      items: [
        { text: 'Basic Usage', link: '/en/react/' },
        { text: 'JSX Support', link: '/en/react/in-jsx' },
        { text: 'Context Inherited', link: '/en/react/context-inherited' },
        { text: 'Custom Components', link: '/en/react/customized' },
        { text: 'Holder', link: '/en/react/holder' },
        { text: 'Typescript', link: '/en/react/typescript' },
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
        { text: 'Only 渲染', link: '/zh/guide/support-only' },
        { text: '支持 Vue2', link: '/zh/guide/support-vue2' },
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
        { text: '插槽 | VNode', link: '/zh/vue/slots-vnode' },
        { text: 'Typescript', link: '/zh/vue/typescript' },
      ],
    },
    {
      text: 'React.js',
      items: [
        { text: '基础使用', link: '/zh/react/' },
        { text: 'JSX 支持', link: '/zh/react/in-jsx' },
        { text: '上下文继承', link: '/zh/react/context-inherited' },
        { text: '定制化', link: '/zh/react/customized' },
        { text: '持有者', link: '/zh/react/holder' },
        { text: 'Typescript', link: '/zh/react/typescript' },
      ],
    },
  ],
}

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    link: '/en/guide/what-is-unoverlays',
  },
  {
    text: 'Github',
    link: 'https://github.com/TuiMao233/unoverlays',
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
