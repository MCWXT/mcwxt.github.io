import { ref } from 'vue';
import { getTemplate } from 'tao';
export default {
  setup() {
    const isLogged = ref(false);
    parent.window.localStorage.getItem('access_token') && (isLogged.value = true);
    return {
      isLogged
    }
  },
  template: await getTemplate('/templates/pages/login/request.html')
}