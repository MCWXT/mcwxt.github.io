import { requestData } from '/script/script.js';
import { createApp, ref, reactive, watch } from 'vue';
import { App } from '/script/app.js';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
createApp({
  setup() {
    const routerConfig = {
      routes: requestData('routes'),
      defaultPath: '/',
      404: '/page/404.html',
      update: () => {
        app.loading = true;
        app.height = 0;
      }
    }
    const app = reactive(new App(routerConfig));
    const nav = requestData('nav');
    const myLink = requestData('myLink');
    return {
      nav,
      myLink,
      onload: (e) => app.onload(e),
      app
    }
  }
}).mount('#app');