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
const getPath = () => {
  return location.pathname || '/home';
}
const setAframeSrc = (path) => {
  const location = pathMap[path] ;
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
  }
}
const { nav } = requestData('main');
const { myLink } = requestData('home');
const pathMap = requestData('path');
const doms = {
  body: $('body'),
  main: $('main'),
  iframe: $('main>iframe'),
  header: $('header'),
  nav: $('nav'),
  footer: $('footer'),
  loading: $('.loading'),
}
doms.header[0].style.height = doms.nav[0].offsetHeight + 'px';
tao.for({
  nav: nav,
  myLink: myLink,
});
setPage(getPath());
window.addEventListener('pushState',  () => setPage(getPath()));
window.onpopstate = () => setPage(getPath());
if (navigator.userAgent.indexOf("MQQBrowser") > -1 || navigator.userAgent.indexOf("QQTheme") > -1) {
  alert('建议使用浏览如chrome打开本网站');
}