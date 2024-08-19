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
class Tao {
  proxyUrl = `https://proxy.${location.hostname}/`;
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
