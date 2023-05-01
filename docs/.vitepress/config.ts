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
        { text: 'Globals', link: '/' },
        { text: 'Constructor', link: '/' },
        { text: 'Promiser', link: '/' },
        { text: 'Utils', link: '/' },
        { text: 'Examples', link: '/' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: '@overlays/vue', link: '/en/vue/' },
        { text: '@overlays/react', link: '/' },
      ],
    },
    // {
    //   text: 'Vue.js',
    //   items: [
    //     { text: 'Basic Usage', link: '/en/vue/' },
    //     { text: 'Template Support', link: '/en/vue/in-template' },
    //     { text: 'Component Devtools', link: '/en/vue/devtools' },
    //     { text: 'Context Inherited', link: '/en/vue/context-inherited' },
    //     { text: 'Custom Components', link: '/en/vue/customized' },
    //     { text: 'Holder', link: '/en/vue/holder' },
    //     { text: 'Slot | VNode', link: '/en/vue/slots-vnode' },
    //     { text: 'Typescript', link: '/en/vue/typescript' },
    //   ],
    // },
    // {
    //   text: 'React.js',
    //   items: [
    //     { text: 'Basic Usage', link: '/en/react/' },
    //     { text: 'JSX Support', link: '/en/react/in-jsx' },
    //     { text: 'Context Inherited', link: '/en/react/context-inherited' },
    //     { text: 'Custom Components', link: '/en/react/customized' },
    //     { text: 'Holder', link: '/en/react/holder' },
    //     { text: 'Typescript', link: '/en/react/typescript' },
    //   ],
    // },
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
        { text: 'Template', link: '/en/vue/other/template' },
        { text: 'Typescript', link: '/en/vue/other/typescript' },
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
        { text: 'Globals', link: '/' },
        { text: 'Constructor', link: '/' },
        { text: 'Promiser', link: '/' },
        { text: 'Utils', link: '/' },
        { text: 'Examples', link: '/' },
      ],
    },
    {
      text: 'Packages',
      items: [
        { text: '@overlays/vue', link: '/zh/vue/' },
        { text: '@overlays/react', link: '/' },
      ],
    },
    // {
    //   text: 'Vue.js',
    //   items: [
    //     { text: '基础使用', link: '/zh/vue/' },
    //     { text: '模板支持', link: '/zh/vue/in-template' },
    //     { text: '组件调试', link: '/zh/vue/devtools' },
    //     { text: '上下文继承', link: '/zh/vue/context-inherited' },
    //     { text: '定制化', link: '/zh/vue/customized' },
    //     { text: '持有者', link: '/zh/vue/holder' },
    //     { text: '插槽 | VNode', link: '/zh/vue/slots-vnode' },
    //     { text: 'Typescript', link: '/zh/vue/typescript' },
    //   ],
    // },
    // {
    //   text: 'React.js',
    //   items: [
    //     { text: '基础使用', link: '/zh/react/' },
    //     { text: 'JSX 支持', link: '/zh/react/in-jsx' },
    //     { text: '上下文继承', link: '/zh/react/context-inherited' },
    //     { text: '定制化', link: '/zh/react/customized' },
    //     { text: '持有者', link: '/zh/react/holder' },
    //     { text: 'Typescript', link: '/zh/react/typescript' },
    //   ],
    // },
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
        { text: 'Template', link: '/zh/vue/other/template' },
        { text: 'Typescript', link: '/zh/vue/other/typescript' },
      ],
    },
  ],
}

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    link: '/en/guide/what-is-overlays',
  },
  {
    text: 'Packages',
    items: [
      { text: '@overlays/vue', link: '/' },
      { text: '@overlays/react', link: '/' },
    ],
  },
  {
    text: 'Github',
    link: 'https://github.com/TuiMao233/overlays',
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
