export default {
  default: '/',
  location: '/page/',
  404: '404',
  title: 'MCWXT|{{*}}',
  routes: [
    { path: '/', name: '主页', component: 'home' },
    { path: '/home', name: '主页', component: 'home' },
    { path: '/link', name: '外部链接', component: 'link' },
    { path: '/bilibili', name: '哔哩哔哩', link: 'https://m.bilibili.com/space/3493283118451294' },
    { path: '/video', name: '视频', component: 'video' },
    { path: '/discussions', name: '讨论', component: 'discussions' },
    { path: '/discussion/:number', name: '讨论', component: 'discussion' },
    { path: '/pan', link: 'https://pan.mcwxt.top/' },
    { path: '/dino', name: '恐龙游戏', component: 'dinosaurGame' },
    { path: '/mc/download', name: '我的世界下载', component: 'mcDownload' },
    { path: '/login', name: '登录', component: 'login/request' },
    { path: '/login/callback', name: '授权成功', component: 'login/callback' }
  ]
}