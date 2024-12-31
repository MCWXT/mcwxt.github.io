import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
import { useRoute } from 'vue-router';
import { marked } from '//unpkg.com/marked@15.0.3/lib/marked.esm.js';
import github from '/script/api/github.js';
export default {
  setup() {
    const route = useRoute();
    const number = route.params.number;
    const discussion = ref(cache.getItem('repos/MCWXT/mcwxt.github.io/discussions/' + number) || github.get('repos/MCWXT/mcwxt.github.io/discussions/' + number).then((response) => {
      discussion.value = cache.setItem(response.config.url, response.data);
    }));
    const comments = ref(cache.getItem('repos/MCWXT/mcwxt.github.io/discussions/' + number + '/comments') || github.get('repos/MCWXT/mcwxt.github.io/discussions/' + number + '/comments').then((response) => {
      comments.value = cache.setItem(response.config.url, response.data);
    }));
    return {
      discussion,
      comments,
      number,
      marked,
    }
  },
  template: await getTemplate('/templates/views/discussion.html')
}