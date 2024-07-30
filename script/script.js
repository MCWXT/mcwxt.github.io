const requestData = (dataName) => {
  return $.parseJSON($.ajax({
    url: '/data/' + dataName + '.json',
    dataType: 'json',
    async: false
  }).responseText);
}
const getQueryString = (name) => {
  const search = '?' + parent.window.location.hash.split('?')[1];//模拟一个完整的search
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = search.substr(1).match(reg);
  return r ? unescape(r[2]) : null;
}
const getHash = () => {
  return parent.window.location.hash.split('?')[0].substring(1);
}
class For {
  constructor() {

  }
  get doms() {
    return $('[v-for]');
  }
  get Dom() {
    return this.doms[0] || undefined;
  }
  get For() {
    return this.Dom.getAttribute('v-for') || undefined;
  }
  get In() {
    return this.Dom.dataset.in.split(' ');
  }
  isTure() {
    return this.Dom;
  }
  get forNow() {
    return $(`[v-for="${this.For}"]`);
  }
  forIn(data, forElementSub) {
    const { Dom, For, In } = this;
    var inElement = Dom.outerHTML;
    for (var i = 0; i < In.length; i++) {
      inElement = inElement.replace(`{{${In[i]}}}`, data[forElementSub][In[i]]);
    }
    return inElement;
  }
  render(data) {
    if (!this.isTure()) return;
    var forElement = '';
    for (var i = 0; i < data[this.For].length; i++) {
      forElement = forElement + this.forIn(data[this.For], i).replace(`v-for="${this.For}"`, '');
    };
    this.forNow.after(forElement);
    this.forNow.remove();
    this.render(data);
  }
}
class V {
  constructor() {

  }
  get doms() {
    return $('[v]');
  }
  get Dom() {
    return this.doms[0] || undefined;
  }
  get v() {
    return this.Dom.getAttribute('v') || undefined;
  }
  get In() {
    return this.Dom.dataset.in.split(' ');
  }
  isTure() {
    return this.Dom;
  }
  get vNow() {
    return $(`[v="${this.v}"]`);
  }
  vIn(data) {
    const { Dom, For, In } = this;
    var inElement = Dom.outerHTML;
    for (var i = 0; i < In.length; i++) {
      inElement = inElement.replace(`{{${In[i]}}}`, data[In[i]]);
    }
    return inElement;
  }
  render(data) {
    if (!this.isTure()) return;
    var vElement = '';
    vElement = vElement + this.vIn(data[this.v]).replace(`v="${this.v}"`, '');
    this.vNow.after(vElement);
    this.vNow.remove();
  }
}
class Tao {
  constructor() {
    this.For = new For();
    this.V = new V();
  }
  for(data) {
    this.For.render(data);
  }
  v(data) {
    this.V.render(data);
  }
}
const tao = new Tao();

window.onload = () => {
  $('[data-page] *').css({ 'pointer-events': 'none' });
  $('[data-page]').click((event) => {
    const obj = event.target;
    parent.window.location.hash = obj.dataset.page;
  })
  $('[href]').click(() => {
    parent.toastr.warning('注意安全，已不在保护范围内', '跳转至外链')
  })
}