import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: 'Introduction',
      items: [
        { text: 'What is Unoverlay Vue?', link: '/guide/what-is-unoverlay-vue' },
        { text: 'Getting Started', link: '/guide/getting-started' },
      ],
    },
  ],
}

const config = defineConfig({
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Unoverlay Vue',
    },
    // '/zh/': {
    //   lang: 'zh-CN',
    //   title: 'Unoverlay Vue',
    // },
  },
  themeConfig: {
    sidebar,
  },
})

export default config
