import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getTemplate } from 'tao';
import Nav from '/components/nav.js';
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    return {
      
    }
  },
  components: {
    MyNav: Nav
  },
  template: await getTemplate('/templates/app.html')
}