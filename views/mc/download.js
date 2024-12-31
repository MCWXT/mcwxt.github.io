import { ref } from 'vue';
import { getTemplate, httproxy, cache } from 'tao';
import { Axios } from 'axios';
export default {
  setup() {
    const axios = new Axios({});
    const data = ref(cache.getItem('mcapks') || axios.get(httproxy`https://mcapks.net/api/vs-list.php`).then((response) => {
      data.value = cache.setItem('mcapks', JSON.parse(response.data).message);
    }));
    const download = (version, info_key) => {
      axios.get(httproxy`https://mcapks.net/down.php`, {
        params: {
          vs: version + '_64'
        }
      }).then((response) => {
        const match = response.data.match(new RegExp(`(?<=window.location.href=')https://www.123865.com/s/(.){5,}(?=';)`));
        window.location.href = match && match[0] || 'https://mcapks.net/down.php?vs=' + version + '_64' || 'https://mcapks.net/info/' + encodeURIComponent(btoa(version)) + '/' + info_key + '.html';
      });
    }
    const refresh = () => {
      window.localStorage.removeItem('mcapks');
      window.location.reload();
    }
    return {
      data,
      download,
      refresh
    }
  },
  template: await getTemplate('/templates/views/mcDownload.html')
}