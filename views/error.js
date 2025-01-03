import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTemplate } from 'tao';
import httpErrors from '/data/httpErrors.js';
export default {
  setup() {
    const route = useRoute();
    const errorCode = httpErrors[route.params.errorType] ? route.params.errorType : '404';
    const errorMessage = httpErrors[errorCode];
    return {
      errorCode,
      errorMessage
    }
  },
  template: await getTemplate('/templates/views/error.html')
}