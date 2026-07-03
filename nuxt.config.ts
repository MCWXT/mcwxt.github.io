// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'MCWXT的个人博客',
      titleTemplate: 'MCWXT|%s',
      meta: [
        { name: 'description', content: 'MCWXT的个人博客。友链，资源，论坛，文章，视频各种功能一应俱全！' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'referrer', content: 'same-origin' },
      ]
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
    provider: 'iconify'
  },
  sitemap: {
    autoLastmod: true
  }
})
