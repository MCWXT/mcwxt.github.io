import { createApp, ref } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
createApp({
  setup() {
    const isLogged = ref(false);
    parent.window.localStorage.getItem('access_token') && (isLogged.value = true);
    return {
      isLogged
    }
  }
}).mount('#app');