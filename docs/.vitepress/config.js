import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue3-fetch',
  description: 'A Vue 3 component and composable for the native fetch API',
  base: '/vue3-fetch/',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'Reference', link: '/reference/props' },
      { text: 'npm', link: 'https://www.npmjs.com/package/vue3-fetch' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Component Usage', link: '/guide/component' },
          { text: 'Composable Usage', link: '/guide/composable' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Props', link: '/reference/props' },
          { text: 'Events', link: '/reference/events' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vivy27/vue3-fetch' },
    ],

    search: {
      provider: 'local',
    },
  },
})
