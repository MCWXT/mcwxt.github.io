import { requestData, tao, _wr } from '/script/script.js';
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
    history.pushState = _wr('pushState');
    const mainSrc = ref(router.location);
    const mainHeight = ref(0);
    const mainMinHeight = ref(window.innerHeight - unMainHeight);
    const isLoading = ref(true);
    window.addEventListener('pushState', () => router.path.value = location.pathname);
    window.onpopstate = () => router.path.value = location.pathname;
    onMounted(() => {
      
    });
    const mainOnload = (event) => {
      const win = event.target.contentWindow.document;
      mainHeight.value = win.documentElement.scrollHeight;
      win.onclick = onclick;
      isLoading.value = false;
    }
    onclick = (e) => {
      if (e.target.nodeName.toLocaleLowerCase() === 'a' && e.target.href.indexOf(location.origin) != -1) {
        e.preventDefault();
        const url = new URL(e.target.href);
        tao.page = url.pathname + url.search;
      }
    }
    return {
      nav,
      myLink,
      headerHeight,
      mainMinHeight,
      mainHeight,
      locationPathName: router.path.value,
      mainSrc,
      isLoading,
      mainOnload
    }
  }
}).mount('#app');