const page = getQueryString('page') || 'home';
const doms = {
  body: $('body'),
  main: $('main'),
  iframe: $('main>iframe'),
  header: $('header'),
  nav: $('nav'),
  footer: $('footer'),
  loading: $('.loading'),
}
doms.iframe[0].src = `/page/${page}.html`;
doms.header.css({ 'height': doms.nav[0].offsetHeight + 'px' });
doms.iframe.css({ 'min-height': window.innerHeight - 7 - doms.header[0].offsetHeight - doms.footer[0].offsetHeight + 'px' });

const resizeIframe = () => {
  doms.iframe[0].style.height = doms.main[0].scrollHeight + "px";
  doms.loading.hide();
}
const {nav} = requestData('main');
vFor({
  nav: nav,
});