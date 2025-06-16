import { processTooltipSyntax }  from './content-plugins/tooltip'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  imports: {
    dirs: ['utils', 'types']
  },
  
  nitro: {
    imports: {
      dirs: ['utils', 'types']
    },
    prerender: {
      routes: ['/blog']
    },
    experimental: {
      websocket: true
    }
  },

  hooks: {
    'content:file:beforeParse'(ctx) {
      if (typeof ctx.file.body === 'string') {
        ctx.file.body = processTooltipSyntax(ctx.file.body.toString())
      }
    }
  },

  app: {
    head: {
      script: [
        { // have to repeat the getInitialTheme and applyTheme logic here, i don't think i can use those functions within the innerHTML
          innerHTML: `
            (function() {
              const savedTheme = localStorage.getItem('theme')
              const themeList = [
                {
                  name: 'dark',
                  primary: '121212',
                  secondary: 'ffffff',
                  accent: '0090ff',
                  dark: true
                },
                {
                  name: 'light',
                  primary: 'ffffff',
                  secondary: '000000',
                  accent: '0090ff',
                  dark: false
                }
              ]
              const initialTheme = savedTheme ? JSON.parse(savedTheme) : window.matchMedia('(prefers-color-scheme: dark)').matches ? themeList[0] : themeList[1]

              document.documentElement.style.setProperty('--color-primary', '#' + initialTheme.primary)
              document.documentElement.style.setProperty('--color-secondary', '#' + initialTheme.secondary)
              document.documentElement.style.setProperty('--color-accent', '#' + initialTheme.accent)
              document.documentElement.setAttribute('is-special-theme', (initialTheme.name !== 'dark' && initialTheme.name !== 'light').toString())

              document.documentElement.classList.toggle('dark', initialTheme.dark)
              document.documentElement.classList.toggle('light', !initialTheme.dark)

            })();
          `,
          type: 'text/javascript',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/MasonCircle.svg' }
      ]
    },
  },


  mdc: {
    headings: {
      anchorLinks: false 
    }
  },

  content: {
    renderer: {
      anchorLinks: false
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'light-plus',
            dark: 'dark-plus'
          }
        }
      },
    },
  },

  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxtjs/mdc', '@vueuse/nuxt'],

  css: [
    '~/assets/css/base.css'
  ]
})