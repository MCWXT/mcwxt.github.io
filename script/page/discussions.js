import { createApp, ref } from 'vue';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
import { cache } from '/script/script.js';
createApp({
  setup() {
    const discussions = cache.get('discussions') || cache.set('discussions', $.parseJSON($.ajax({
      url: '//api.github.com/repos/MCWXT/mcwxt.github.io/discussions',
      dataType: 'json',
      async: false
    }).responseText));
    return {
      discussions,
    }
  }
}).mount('#app');