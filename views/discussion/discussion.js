import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
import { useRoute } from 'vue-router';
import { marked } from '//unpkg.com/marked@15.0.3/lib/marked.esm.js';
import { octokit, config} from '/script/api/github.js';
export default {
  setup() {
    const route = useRoute();
    const number = route.params.number;
    const discussion = ref({});
    const comments = ref([]);
    octokit.request(`GET /repos/{owner}/{repo}/discussions/${number}`, config).then((response) => discussion.value = response.data);
    octokit.request(`GET /repos/{owner}/{repo}/discussions/${number}/comments`, config).then((response) => comments.value = response.data);
    return {
      discussion,
      comments,
      number,
      marked,
    }
  },
  template: await getTemplate('/templates/views/discussion.html')
}