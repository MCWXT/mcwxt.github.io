import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
export default {
  setup() {
    
    return {
      logged: Boolean(cache.getItem('github_access'))
    }
  },
  template: await getTemplate('/templates/views/login.html')
}