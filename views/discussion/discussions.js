import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
import github from '/script/api/github.js';
export default {
  setup() {
    const discussions = ref(cache.get('repos/MCWXT/mcwxt.github.io/discussions') || github.get('repos/MCWXT/mcwxt.github.io/discussions').then((response) => {
      discussions.value = cache.set(response.config.url, response.data);
    }));
    return {
      discussions
    }
  },
  template: await getTemplate('/templates/views/discussions.html')
}