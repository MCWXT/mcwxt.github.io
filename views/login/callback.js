import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTemplate } from 'tao';
import { Axios } from '/cdn_modules/axios@1.7.8/esm/axios.min.js';
export default {
  setup() {
    const route = useRoute();
    const axios = new Axios({});
    axios.post('/api/login/access_token/' + route.query.code).then((response) => {
      cache.set('github_access', response.data);
    });
    return {
      
    }
  },
  template: await getTemplate('/templates/pages/login/callback.html')
}