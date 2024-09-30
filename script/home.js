import { requestData, tao } from 'tao';
import { createApp, ref } from 'vue';
createApp({
  setup() {
    return {
      friendLink: requestData('friendLink'),
      myLink: requestData('myLink')
    }
  }
}).directive('tao', tao.directive).mount('#app');