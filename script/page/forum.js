import { createApp, ref } from 'vue';
import { tao } from '/script/script.js';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
createApp({
  setup() {
    const messages = JSON.parse($.ajax({
      url: 'https://halo.mcwxt.top/apis/api.content.halo.run/v1alpha1/posts',
      dataType: 'json',
      async: false
    }).responseText).items;
    const timeFormat = (str) => {
      return str.slice(0, str.indexOf('T'));
    }
    return {
      tao,
      messages,
      timeFormat
    }
  }
}).mount('#app');