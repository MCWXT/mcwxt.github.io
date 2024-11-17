import { requestData } from '/script/script.js';
import { createApp, ref, onMounted, watch } from 'vue';
import { Router } from '/script/router.js';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js';
const headerHeight = $('nav')[0].offsetHeight;
const unMainHeight = headerHeight + $('footer')[0].offsetHeight;
createApp({
  setup() {
    const router = new Router({
      routes: requestData('routes'),
      defaultPath: '/',
      404: '/page/404.html',
      update: () => {
        isLoading.value = true;
        mainHeight.value = 0;
        mainMinHeight.value = window.innerHeight - unMainHeight;
      }
    });
    const nav = requestData('nav');
    const myLink = requestData('myLink');
    const mainSrc = ref(router.location);
    const mainHeight = ref(0);
    const mainMinHeight = ref(window.innerHeight - unMainHeight);
    const isLoading = ref(true);
    onMounted(() => {
      
    });
    const mainOnload = (event) => {
      const win = event.target.contentWindow.document;
      mainHeight.value = win.documentElement.scrollHeight;
      win.onclick = onclick;
      isLoading.value = false;
    }
    return {
      nav,
      myLink,
      headerHeight,
      mainMinHeight,
      mainHeight,
      locationPathName: router.path,
      mainSrc,
      isLoading,
      mainOnload
    }
  }
}).mount('#app');