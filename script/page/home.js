import { createApp, ref } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
import myLink from '/data/myLink.js';
import friendLink from '/data/friendLink.js';
createApp({
  setup() {
    return {
      friendLink,
      myLink,
    }
  }
}).mount('#app');