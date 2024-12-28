import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
export default {
  setup() {
    const isLogged = ref(false);
    cache.get('access_token') && (isLogged.value = true);
    return {
      isLogged
    }
  },
  template: await getTemplate('/templates/pages/login/request.html')
}