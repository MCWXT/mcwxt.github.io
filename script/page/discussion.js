import { createApp, ref } from 'vue';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
import { cache } from '/script/script.js';
createApp({
  setup() {
    const discussion = cache.get('discussion-' + parent.route.params.number) || cache.set('discussion-' + parent.route.params.number, $.parseJSON($.ajax({
      url: '//api.github.com/repos/MCWXT/mcwxt.github.io/discussions/' + parent.route.params.number,
      dataType: 'json',
      async: false
    }).responseText));
    const comments = cache.get('comments-' + parent.route.params.number) || cache.set('comments-' + parent.route.params.number, $.parseJSON($.ajax({
      url: '//api.github.com/repos/MCWXT/mcwxt.github.io/discussions/' + parent.route.params.number + '/comments',
      dataType: 'json',
      async: false
    }).responseText));
    return {
      discussion,
      comments,
      number: parent.route.params.number,
    }
  }
}).mount('#app');