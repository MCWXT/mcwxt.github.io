import { requestData, tao, _wr } from 'tao';
import { createApp, ref, onMounted, watch } from 'vue';
const headerHeight = $('nav')[0].offsetHeight;
const unMainHeight = headerHeight + $('footer')[0].offsetHeight;
createApp({
  setup() {
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    const routes = requestData('routes');
    const locationPathName = ref(window.location.pathname);
    (!locationPathName.value || locationPathName.value == '' || locationPathName.value == '/') && (tao.page = '/home');
    routes[locationPathName.value].historyGo && (window.location.href = routes[locationPathName].location);
    const mainSrc = ref(routes[locationPathName.value] ? routes[locationPathName.value].location : '/page/404.html');
    const { nav } = requestData('main');
    const { myLink } = requestData('home');
    const isBrowser = navigator.userAgent.indexOf('MQQBrowser') > -1 || navigator.userAgent.indexOf('QQTheme') > -1;
    const IsBrowserModal = ref(isBrowser);
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
      $('[href]').click(() => {
        toastr.warning('注意安全，已不在保护范围内', '跳转至外链');
      });
    });
    const mainOnload = (event) => {
      const win = event.target.contentWindow;
      mainHeight.value = win.document.documentElement.scrollHeight;
      isLoading.value = false;
      win.$('[href]').click(() => {
        parent.toastr.warning('注意安全，已不在保护范围内', '跳转至外链');
      });
    }
    return {
      nav,
      myLink,
      headerHeight,
      isBrowser,
      IsBrowserModal,
      mainMinHeight,
      mainHeight,
      mainSrc,
      isLoading,
      mainOnload
    }
  }
}).directive('tao', tao.directive).mount('#app');