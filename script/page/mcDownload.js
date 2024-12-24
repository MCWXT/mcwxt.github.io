import { createApp, ref } from '/cdn_modules/vue@3.5.13/vue.esm-browser.prod.min.js';
import { httproxy, cache } from '/script/script.js';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
import { Axios } from '/cdn_modules/axios@1.7.8/esm/axios.min.js';
createApp({
  setup() {
    const axios = new Axios({});
    const data = ref(cache.get('mcapks') || axios.get(httproxy`https://mcapks.net/api/vs-list.php`).then((response) => {
      data.value = cache.set('mcapks', JSON.parse(response.data).message);
    }));
    const download = (version, info_key) => {
      axios.get(httproxy`https://mcapks.net/down.php`, {
        params: {
          vs: version + '_64'
        }
      }).then((response) => {
        const match = response.data.match(new RegExp(`(?<=window.location.href=')https://www.123865.com/s/(.){5,}(?=';)`));
        parent.location.href = match && match[0] || 'https://mcapks.net/down.php?vs=' + version + '_64' || 'https://mcapks.net/info/' + encodeURIComponent(btoa(version)) + '/' + info_key + '.html';
      });
    }
    const refresh = () => {
      parent.window.localStorage.removeItem('mcapks');
      parent.window.location.reload();
    }
    return {
      data,
      download,
      refresh
    }
  }
}).mount('#app');