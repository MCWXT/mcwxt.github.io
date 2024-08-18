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
  proxyUrl = 'https://proxy.mcwxt.top/';
  constructor() {
    
  }
  _templateReplace(data,these) {
    const { Dom, For, In } = these;
    let element = Dom.outerHTML;
    for (var i = 0; i < In.length; i++) {
      element = element.replace(`{{${In[i]}}}`, data[In[i]]);
    }
    return element;
  }
  HTTPproxy(url) {
    return this.proxyUrl + url;
  }
  set page(path) {
    parent.history.pushState({}, '', path);
  }
}
export const tao = new Tao();
