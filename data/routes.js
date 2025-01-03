import { componentImport } from 'tao';
export default [
  {
    path: '/',
    name: 'Home',
    component: () => componentImport('/views/home.js'),
    meta: {
      title: '首页'
    }
  }, {
    path: '/home',
    redirect: '/'
  }, {
    path: '/error/:errorType',
    name: 'Error',
    component: () => componentImport('/views/error.js'),
    meta: {
      title: '错误'
    }
  }, {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404'
  }, {
    path: '/link',
    name: 'Link',
    component: () => componentImport('/views/link.js'),
    meta: {
      title: '跳转链接'
    }
  }, {
    path: '/bilibili',
    name: 'BiliBili',
    component: () => componentImport('/views/bilibili.js'),
    meta: {
      title: '我的B站'
    }
  }, {
    path: '/discussions',
    name: 'Discussions',
    component: () => componentImport('/views/discussion/discussions.js'),
    meta: {
      title: '讨论'
    }
  }, {
    path: '/discussions/:number',
    name: 'Discussion',
    component: () => componentImport('/views/discussion/discussion.js'),
    meta: {
      title: '讨论'
    }
  }, {
    path: '/pan',
    name: 'Pan',
    component: () => { window.location.href = '//pan.mcwxt.top'; },
    meta: {
      title: '网盘'
    }
  }, {
    path: '/mc/download',
    name: 'DownloadMinecraft',
    component: () => componentImport('/views/mc/download.js'),
    meta: {
      title: '我的世界基岩版下载'
    }
  }, {
    path: '/login',
    name: 'Login',
    component: () => componentImport('/views/login/login.js'),
    meta: {
      title: '登录'
    }
  }, {
    path: '/login/oauth',
    name: 'Oauth',
    component: () => componentImport('/views/login/oauth.js'),
    beforeEnter: (to) => to.query.state == 'MCWXT' && to.query.code || { path: '/error/400' },
    meta: {
      title: '授权'
    }
  },
]