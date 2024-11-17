import { createApp, ref } from 'vue';
import { requestData } from '/script/script.js';
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