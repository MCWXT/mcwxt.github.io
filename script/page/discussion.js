import { createApp, ref } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
import { cache } from '/script/script.js';
import github from '/script/api/github.js';
import { marked } from '//unpkg.com/marked@15.0.3/lib/marked.esm.js';
createApp({
  setup() {
    const discussion = ref(cache.get('repos/MCWXT/mcwxt.github.io/discussions/' + parent.route.params.number) || github.get('repos/MCWXT/mcwxt.github.io/discussions/' + parent.route.params.number).then((response) => {
      discussion.value = cache.set(response.config.url, response.data);
    }));
    const comments = ref(cache.get('repos/MCWXT/mcwxt.github.io/discussions/' + parent.route.params.number + '/comments') || github.get('repos/MCWXT/mcwxt.github.io/discussions/' + parent.route.params.number + '/comments').then((response) => {
      comments.value = cache.set(response.config.url, response.data);
    }));
    return {
      discussion,
      comments,
      number: parent.route.params.number,
      marked,
    }
  }
}).mount('#app');