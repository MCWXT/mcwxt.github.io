import { requestData, tao, _wr } from 'tao';
import { createApp, ref, onMounted, watch } from 'vue';
const headerHeight = $('nav')[0].offsetHeight;
const unMainHeight = headerHeight + $('footer')[0].offsetHeight;
createApp({
  setup() {
    const locationPathName = ref(window.location.pathname);
    if (!locationPathName.value || locationPathName.value == '' || locationPathName.value == '/') {
      tao.page = '/home';
      locationPathName.value = window.location.pathname;
    };
    const routes = requestData('routes');
    const nav = requestData('nav');
    const myLink = requestData('myLink');
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    const mainSrc = ref(routes[locationPathName.value] ? routes[locationPathName.value].historyGo && (window.location.href = routes[locationPathName].location) || routes[locationPathName.value].location : '/page/404.html');
    const mainHeight = ref(0);
    const mainMinHeight = ref(window.innerHeight - unMainHeight);
    const isLoading = ref(true);
    window.addEventListener('pushState', () => locationPathName.value = location.pathname);
    window.onpopstate = () => locationPathName.value = location.pathname;
    watch(locationPathName, (locationPathName) => {
      isLoading.value = true;
      mainHeight.value = 0;
      routes[locationPathName].historyGo && (window.location.href = routes[locationPathName].location);
      mainSrc.value = routes[locationPathName] ? routes[locationPathName].location : '/page/404.html';
      mainMinHeight.value = window.innerHeight - unMainHeight;
    });
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
      locationPathName,
      mainSrc,
      isLoading,
      mainOnload
    }
  }
}).mount('#app');