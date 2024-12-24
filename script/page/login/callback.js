import { createApp, ref } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
import { getQueryString, cache } from '/script/script.js';
import { Axios } from '/cdn_modules/axios@1.7.8/esm/axios.min.js';
createApp({
  setup() {
    if (getQueryString('state') != 'MCWXT') {
      throw '请勿恶意攻击';
    }
    const axios = new Axios({
      transformResponse: (data) => {
        if (typeof data != 'object') {
          return JSON.parse(data);
        }
        return data;
      }
    });
    axios.post('/api/login/access_token/github', {
      code: getQueryString('code')
    }).then((response) => {
      cache.set('github_access', response.data);
    });
    return {

    }
  }
}).mount('#app');