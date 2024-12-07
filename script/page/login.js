import { createApp, ref } from 'vue';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
createApp({
  setup() {
    const isLogged = ref(false);
    parent.window.localStorage.getItem('access_token') && (isLogged.value = true);
    return {
      isLogged
    }
  }
}).mount('#app');