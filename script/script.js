export const requestData = (dataName) => {
  return $.parseJSON($.ajax({
    url: '/data/' + dataName + '.json',
    dataType: 'json',
    async: false
  }).responseText);
}
export const getQueryString = (name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = parent.window.location.search.substr(1).match(reg);
  return r ? unescape(r[2]) : null;
}
export const _wr = (type) => {
  let orig = history[type];
  return function() {
    let rv = orig.apply(this, arguments);
    let e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  }
}
class Tao {
  proxyUrl = `https://proxy.${location.hostname}/`;
  directive = {
    mounted(el, binding, vnode) {
      el.onclick = () => {
        tao[binding.arg] = binding.value;
      }
    }
  }
  constructor() {

  }
  HTTPproxy(url) {
    return this.proxyUrl + url;
  }
  set page(path) {
    parent.history.pushState({}, '', path);
  }
}
export const tao = new Tao();