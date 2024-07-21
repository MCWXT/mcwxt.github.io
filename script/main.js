const getPage = () => {
  return getHash()[0].split('#')[1] || '/home';
}
const setAframeSrc = (page) => {
  doms.iframe[0].src = `/page${page}.html`;
}
const getMainHeight = () => {
  return window.innerHeight - 9 - doms.header[0].offsetHeight - doms.footer[0].offsetHeight + 'px';
}
const setIframeHeight = (height) => {
  doms.iframe[0].style.height = height;
}
const { nav } = requestData('main');
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
doms.header[0].style.height = doms.nav[0].offsetHeight + 'px';
doms.iframe[0].style.minHeight = getMainHeight();
setIframeHeight(getMainHeight());
setAframeSrc(getPage());
addEventListener("hashchange", () => {
  location.reload();
});
const resizeIframe = () => {
  const iframeWindowHeight = doms.iframe[0].contentWindow.document.documentElement.scrollHeight;
  iframeWindowHeight > window.innerHeight ? setIframeHeight(iframeWindowHeight + 10 + "px") : '';
}
doms.iframe[0].onload = () => {
  resizeIframe();
  doms.loading.hide();
}