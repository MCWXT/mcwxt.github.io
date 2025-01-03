import { createApp, ref, reactive, watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { octokit, config } from '/script/api/github.js';
import { cache } from 'tao';
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
if (!cache.getItem('sha')) {
  octokit.request('GET /repos/{owner}/{repo}/commits', config).then((response) => cache.setItem('sha', response.data[0].sha));
}
createApp(App).use(router).mount('#app');