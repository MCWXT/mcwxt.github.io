if (!getHash().split('#')[1] || getHash().split('#')[1] == '/') {
  window.location.hash = '/home';
}
const getPage = () => {
  return getHash().split('#')[1] || '/home';
}
const setAframeSrc = (page) => {
  doms.iframe[0].src = pathMap[page] ? pathMap[page].path : '/page/404.html';
}
const getMainHeight = () => {
  return window.innerHeight - doms.header[0].offsetHeight - doms.footer[0].offsetHeight + 'px';
}
const setIframeHeight = (height) => {
  doms.iframe[0].style.height = height;
}
const setPage = (page) => {
  doms.loading.show();
  doms.header[0].style.height = doms.nav[0].offsetHeight + 'px';
  doms.iframe[0].style.minHeight = getMainHeight();
  setIframeHeight(getMainHeight());
  setAframeSrc(page);
}
const { nav } = requestData('main');
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
tao.for({
  nav: nav,
});
setPage(getPage());
onhashchange = (event) => {
  const newURL = new URL(event.newURL);
  const oldURL = new URL(event.oldURL);
  if (newURL.hash == '#/home' && oldURL.hash == '#/' || oldURL.hash == '') return;
  setPage(getPage());
}
doms.iframe[0].onload = () => {
  setIframeHeight(doms.iframe[0].contentWindow.document.documentElement.scrollHeight + 'px');
  doms.loading.hide();
}
if (navigator.userAgent.indexOf("MQQBrowser") > -1 || navigator.userAgent.indexOf("QQTheme") > -1) {
  alert('建议使用浏览如chrome打开本网站');
}