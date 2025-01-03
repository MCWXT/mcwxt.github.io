import { createApp, ref, reactive, watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '/app.js';
import routes from '/data/routes.js';
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? 'MCWXT|' + to.meta.title : 'MCWXT的个人博客';
  next()
});
createApp(App).use(router).mount('#app');