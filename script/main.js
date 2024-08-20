import { requestData, tao } from 'tao';
import { createApp, ref, onMounted } from 'vue';
const headerHeight = document.querySelector('nav').offsetHeight;
createApp({
  setup() {
    const { nav } = requestData('main');
    const { myLink } = requestData('home');
    const isBrowser = navigator.userAgent.indexOf('MQQBrowser') > -1 || navigator.userAgent.indexOf('QQTheme') > -1;
    const IsBrowserModal = ref(isBrowser);
    return {
      nav,
      myLink,
      headerHeight,
      isBrowser,
      IsBrowserModal
    }
  }
}).mount('#app');
let pathName = location.pathname;
if (!pathName || pathName == '' || pathName == '/') {
  history.pushState({}, '', '/home');
}
const _wr = (type) => {
  let orig = history[type];
  return function() {
    let rv = orig.apply(this, arguments);
    let e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  }
}
history.pushState = _wr('pushState');
history.replaceState = _wr('replaceState');
const doms = {
  body: $('body'),
  main: $('main'),
  iframe: $('main>iframe'),
  header: $('header'),
  nav: $('nav'),
  footer: $('footer'),
  loading: $('.loading'),
}
const getPath = () => {
  return location.pathname || '/home';
}
const setAframeSrc = (path) => {
  const location = pathMap[path];
  doms.iframe.remove();
  doms.main.html('<iframe class="w-100" scrolling="no" frameborder="0"></iframe>');
  doms.iframe = $('main>iframe');
  location && location.historyGo && (window.location.href = location.location);
  doms.iframe[0].src = location ? location.location : '/page/404.html';
}
const getMainHeight = () => {
  return window.innerHeight - doms.header[0].offsetHeight - doms.footer[0].offsetHeight + 'px';
}
const setIframeHeight = (height) => {
  doms.iframe[0].style.height = height;
}
const setPage = (page) => {
  doms.main[0].style.minHeight = getMainHeight();
  doms.loading.show();
  setIframeHeight(getMainHeight());
  setAframeSrc(page);
  doms.iframe[0].onload = () => {
    setIframeHeight(doms.iframe[0].contentWindow.document.documentElement.scrollHeight + 'px');
    doms.loading.hide();
    const Cwin = doms.iframe[0].contentWindow;
    Cwin.$('[data-page] *').css({ 'pointer-events': 'none' });
    Cwin.$('[data-page]').click((event) => {
      tao.page = event.target.dataset.page;
    });
    Cwin.$('[href]').click(() => {
      parent.toastr.warning('注意安全，已不在保护范围内', '跳转至外链')
    });
  }
}
const pathMap = requestData('path');
setPage(getPath());
window.addEventListener('pushState', () => setPage(getPath()));
window.onpopstate = () => setPage(getPath());
window.onload = () => {
  $('[data-page] *').css({ 'pointer-events': 'none' });
  $('[data-page]').click((event) => {
    tao.page = event.target.dataset.page;
  });
  $('[href]').click(() => {
    parent.toastr.warning('注意安全，已不在保护范围内', '跳转至外链')
  });
}