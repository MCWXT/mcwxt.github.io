import { createApp, ref, reactive } from 'vue';
import { App } from '/script/app.js';
import routerConfig from '/data/router.js';
import nav from '/data/nav.js';
import myLink from '/data/myLink.js';
createApp({
  setup() {
    const app = reactive(new App(routerConfig));
    return {
      nav,
      myLink,
      onload: (e) => app.onload(e),
      app
    }
  }
}).mount('#app');