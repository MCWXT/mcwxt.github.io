import { createApp, ref } from 'vue';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
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