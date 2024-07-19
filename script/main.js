const hash = window.location.hash.split('?');
const page = hash[0].split('#')[1] || '/home';
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
doms.iframe[0].src = `/page${page}.html`;
doms.header.css({ 'height': doms.nav[0].offsetHeight + 'px' });
doms.iframe.css({ 'min-height': window.innerHeight - 7 - doms.header[0].offsetHeight - doms.footer[0].offsetHeight + 'px' });
addEventListener("hashchange", () => {
  location.reload();
});
const resizeIframe = () => {
  const height = doms.iframe[0].contentWindow.document.documentElement.scrollHeight;
  if (height > document.documentElement.scrollHeight) {
    doms.iframe[0].style.height = height + 10 + "px";
  } else {
    doms.iframe[0].style.height = height + "px";
  }
  doms.loading.hide();
}