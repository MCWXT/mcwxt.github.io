// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'MCWXT的个人博客',
      titleTemplate: 'MCWXT的个人博客|%s',
      meta: [
        { name: 'description', content: 'MCWXT的个人博客。友链，资源，论坛，文章，视频各种功能一应俱全！' },
        { name: 'keywords', content: 'MCWXT的个人博客,MCWXT,Web,Blog,Personal blog' },
        { name: 'referrer', content: 'same-origin' },
      ],
      htmlAttrs: {
        lang: 'zh-CN'
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://api.mcwxt.top'
    }
  },
  nitro: {
    preset: 'cloudflare-pages'
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  css: ['~/assets/css/main.css'],
  modules: ['@pinia/nuxt', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/sitemap'],
  icon: {
    provider: 'iconify',
    serverBundle: false
  },
  sitemap: {
    autoLastmod: true
  }
})
