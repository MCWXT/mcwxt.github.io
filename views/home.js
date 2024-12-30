import { ref } from 'vue';
import { getTemplate } from 'tao';
import { Axios } from 'axios';
import myselfLink from '/data/myselfLink.js';
import friendLink from '/data/friendLink.js';
import LinkCard from '/components/linkCard.js';
export default {
  setup() {
    const axios = new Axios({});
    const issuesFriendLink = ref();
    axios.get('https://storage.mcwxt.top/data/json/issues.json').then((response) => issuesFriendLink.value = JSON.parse(response.data));
    return {
      myselfLink,
      friendLink,
      issuesFriendLink
    }
  },
  components: {
    LinkCard
  },
  template: await getTemplate('/templates/pages/home.html')
}