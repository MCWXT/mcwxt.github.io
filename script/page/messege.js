import { github } from 'githubApi';
import { createApp, ref, onMounted } from 'vue';
import { tao, getQueryString } from '/script/script.js';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
createApp({
  setup() {
    const message = JSON.parse($.ajax({
      url: github.issueApi(getQueryString('number') || (tao.page = '/404')),
      dataType: 'json',
      async: false
    }).responseText);
    const comments = JSON.parse($.ajax({
      url: message.comments_url,
      dataType: 'json',
      async: false
    }).responseText);
    onMounted(() => {
      $('#md img').prop('src', (index, currentvalue) => {
        return tao.HTTPproxy(currentvalue);
      });
    });
    return {
      tao,
      marked,
      message,
      comments
    }
  }
}).mount('#app');