if (!getHash() || getHash() == '' || getHash() == '/') {
  window.location.hash = '/home';
}
const getPath = () => {
  return getHash() || '/home';
}
const setAframeSrc = (path) => {
  doms.iframe.remove();
  doms.main.html('<iframe class="w-100" scrolling="no" frameborder="0"></iframe>');
  doms.iframe = $('main>iframe');
  doms.iframe[0].src = pathMap[path] ? pathMap[path].location : '/page/404.html';
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
onhashchange = (event) => {
  const newURL = new URL(event.newURL);
  const oldURL = new URL(event.oldURL);
  if (newURL.hash == '#/home' && oldURL.hash == '#/' || oldURL.hash == '') return;
  setPage(getPath());
}
if (navigator.userAgent.indexOf("MQQBrowser") > -1 || navigator.userAgent.indexOf("QQTheme") > -1) {
  alert('建议使用浏览如chrome打开本网站');
}