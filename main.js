import { createApp, ref, reactive, watch } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '/app.js';
import routes from '/data/routes.js';
const router = createRouter({
  history: createWebHistory(),
  routes,
});
createApp(App).use(router).mount('#app');