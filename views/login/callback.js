import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getTemplate } from 'tao';
import '/cdn_modules/qs@6.13.1/qs.min.js';
import { Axios } from '/cdn_modules/axios@1.7.8/esm/axios.min.js';
export default {
  setup() {
    const route = useRoute();
    const axios = new Axios({});
    axios.post('/api/login/access_token/' + route.query.code).then((response) => {
      cache.set('github_access', Qs.parse(response.data));
    });
    return {
      
    }
  },
  template: await getTemplate('/templates/pages/login/callback.html')
}