import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
export default {
  setup() {
    const isLogged = ref(false);
    cache.get('github_access') && (isLogged.value = true);
    return {
      isLogged
    }
  },
  template: await getTemplate('/templates/views/login/request.html')
}