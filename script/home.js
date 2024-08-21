import { requestData, tao } from 'tao';
import { createApp, ref } from 'vue';
createApp({
  setup() {
    const { friendLink, myLink } = requestData('home');
    return {
      friendLink,
      myLink
    }
  }
}).directive('tao', tao.directive).mount('#app');