import { createApp, ref } from 'vue';
import { requestData } from '/script/script.js';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
createApp({
  setup() {
    return {
      friendLink: requestData('friendLink'),
      myLink: requestData('myLink')
    }
  }
}).mount('#app');