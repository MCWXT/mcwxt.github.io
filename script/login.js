import { requestData, tao } from 'tao';
import { createApp, ref } from 'vue';
createApp({
  setup() {
    const isLogged = ref(false);
    parent.window.localStorage.getItem('access_token') && (isLogged.value = true);
    return {
      isLogged
    }
  }
}).mount('#app');