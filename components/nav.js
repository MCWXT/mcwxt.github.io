import { ref } from 'vue';
import { getTemplate } from 'tao';
import nav from '/data/nav.js';
export default {
  setup() {
    
    return {
      nav
    }
  },
  template: await getTemplate('/templates/components/nav.html')
}