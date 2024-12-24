import { createApp, ref } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
import github from '/script/api/github.js';
import { cache } from '/script/script.js';
createApp({
  setup() {
    const discussions = ref(cache.get('repos/MCWXT/mcwxt.github.io/discussions') || github.get('repos/MCWXT/mcwxt.github.io/discussions').then((response) => {
      discussions.value = cache.set(response.config.url, response.data);
    }));
    return {
      discussions
    }
  }
}).mount('#app');