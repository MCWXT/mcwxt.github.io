import { ref } from 'vue';
import { getTemplate } from 'tao';
export default {
  props: ['href', 'type', 'icon', 'title', 'content'],
  setup() {
    
    return {
      
    }
  },
  template: await getTemplate('/templates/components/linkCard.html')
}