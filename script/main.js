import { createApp, ref, reactive } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
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