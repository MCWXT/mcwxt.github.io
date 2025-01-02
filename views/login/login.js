import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
export default {
  setup() {
    
    return {
      logged: Boolean(cache.getItem('access_token'))
    }
  },
  template: await getTemplate('/templates/views/login.html')
}