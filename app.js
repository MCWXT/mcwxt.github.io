import { ref } from 'vue';
import { getTemplate } from 'tao';
import Nav from '/components/nav.js';
export default {
  setup() {
    
    return {
      
    }
  },
  components: {
    MyNav: Nav
  },
  template: await getTemplate('/templates/app.html')
}