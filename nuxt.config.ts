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
        { name: 'description', content: 'MCWXT的个人博客是一个专注于前端开发与网站建设的个人技术博客，分享 Nuxt、Vue、JavaScript、TypeScript 等 Web 开发技术，记录开发经验、实战教程、开源项目、网站优化、SEO、实用工具和优质资源。持续输出原创内容，帮助开发者提升开发效率，探索现代 Web 技术与最佳实践，打造更高质量的网站与应用。' },
        { name: 'keywords', content: 'MCWXT,个人,博客,视频,讨论,网站,我的世界，友链' },
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
