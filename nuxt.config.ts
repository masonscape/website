import processTooltipSyntax from './content-plugins/tooltip'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  devServer: {
    host: '0.0.0.0',
    port: 3000
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
        {
          innerHTML: `
            (function() {
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (prefersDark) {
                document.documentElement.classList.add('dark');
              }
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

  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxtjs/mdc'],

  css: [
    '~/assets/css/base.css'
  ]
})