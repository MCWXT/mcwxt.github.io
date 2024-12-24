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
export const httproxy = (url) => {
  const proxyServer = 'https://proxy.mcwxt.top/';
  return proxyServer + url;
};
export const cache = {
  set: (key, content) => {
    parent.window.localStorage.setItem(key, typeof content == 'string' ? content : JSON.stringify(content));
    return content;
  },
  get: (key) => {
    const content = parent.window.localStorage.getItem(key);
    return content.indexOf('{') != -1 ? JSON.parse(content) : content;
  }
}