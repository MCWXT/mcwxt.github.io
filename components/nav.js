import { ref } from 'vue';
import { getTemplate, cache } from 'tao';
import nav from '/data/nav.js';
export default {
  setup() {
    
    return {
      nav,
      cache
    }
  },
  template: await getTemplate('/templates/components/nav.html')
}