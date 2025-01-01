import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
import { octokit, config } from '/script/api/github.js';
export default {
  setup() {
    const discussions = ref([]);
    octokit.request(`GET /repos/{owner}/{repo}/discussions`, config).then((response) => discussions.value = response.data).catch((error) => alert(error));
    return {
      discussions
    }
  },
  template: await getTemplate('/templates/views/discussions.html')
}