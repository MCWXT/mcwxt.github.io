export default [
  { path: '/', name: 'Home', component: () => import('/views/home.js') },
  { path: '/home', redirect: '/' },
  { path: '/404', name: 'NotFound', component: () => import('/views/404.js') },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
  { path: '/link', name: 'Link', component: () => import('/views/link.js') },
  { path: '/bilibili', name: 'BiliBili', component: () => import('/views/bilibili.js') },
  { path: '/discussions', name: 'Discussions', component: () => import('/views/discussion/discussions.js') },
  { path: '/discussions/:number', name: 'Discussion', component: () => import('/views/discussion/discussion.js') },
  { path: '/pan', name: 'Pan', component: () => { window.location.href = '//pan.mcwxt.top'; } },
  { path: '/mc/download', name: 'DownloadMinecraft', component: () => import('/views/mc/download.js') },
  { path: '/login', name: 'Login', component: () => import('/views/login/request.js') },
  { path: '/login/callback', name: 'Callback', component: () => import('/views/login/callback.js'), beforeEnter: (to) => to.query.state == 'MCWXT' || { path: '/'} },
]