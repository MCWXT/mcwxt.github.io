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
        { name: 'description', content: '专注前端开发与网站优化，分享 Nuxt、Vue、JavaScript 技术教程、开发经验、实用工具及编程学习笔记。' },
        { name: 'keywords', content: 'MCWXT,个人,博客,视频,讨论,vite,nuxt,友链' },
        { name: 'referrer', content: 'same-origin' },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      ],
      htmlAttrs: {
        lang: 'zh-CN'
      }
    },
    pageTransition: {
      name: 'page',
      mode: 'default',
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
