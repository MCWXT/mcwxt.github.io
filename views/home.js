import { ref } from 'vue';
import { getTemplate } from 'tao';
import myLink from '/data/myLink.js';
import friendLink from '/data/friendLink.js';
import LinkCard from '/components/linkCard.js';
export default {
  setup() {
    
    return {
      myLink,
      friendLink
    }
  },
  components: {
    LinkCard
  },
  template: await getTemplate('/templates/pages/home.html')
}