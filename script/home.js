import { requestData } from 'tao';
import { createApp, ref } from 'vue';
createApp({
  setup() {
    const { friendLink, myLink } = requestData('home');
    return {
      friendLink,
      myLink
    }
  }
}).mount('#app');