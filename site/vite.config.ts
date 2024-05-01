import { defineConfig } from 'vite'
import { sveltepress } from '@sveltepress/vite'
import { defaultTheme } from '@sveltepress/theme-default'

const config = defineConfig({
  plugins: [
    sveltepress({
      theme: defaultTheme({
        navbar : [
          {
            title : 'Foo page',
            to : '/foo/'
          },
          {
            title : 'With dropdown',
            items : [
              {
                title : 'Bar page',
                to : '/bar/'
              },
              {
                title : 'External Github page',
                to : 'https://github.com/',
                external : true
              }
            ]
          }
        ],
        sidebar : {
          '/foo/': [
            {
              title : 'Bar',
              to : '/foo/bar/',
            },
            {
              title : 'Zoo',
              collapsible : true,
              items : [
                {
                  title : 'Sub item',
                  to : '/sub/item/link'
                }
              ]
            },
            {
              title : 'External github page',
              to : 'https://github.com'
            }
          ]
        },
        github: 'https://github.com/oekazuma/svelte-meta-tags',
        logo: '/logo.svg',
      }),
      siteConfig: {
        title: 'Svelte Meta Tags',
        description: 'Svelte Meta Tags provides components designed to help you manage SEO for Svelte projects.',
      },
    }),
  ],
})

export default config
