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
class Replace {
  constructor() {

  }
  get doms() {
    return $('[data-t-replace]');
  }
  get Dom() {
    return this.doms[0] || null;
  }
  get data() {
    return this.Dom.dataset.tReplace;
  }
  get from() {
    return this.data.split(' In ')[1];
  }
  get In() {
    return this.data.split(' In ')[0].split(' ');
  }
  isTure() {
    return this.Dom;
  }
  get replaceObject() {
    return $(`[data-t-replace="${this.data}"]`);
  }
  render(data) {
    if (!this.isTure()) return;
    let element = '';
    element = element + tao._templateReplace(data[this.from], this).replace(`data-t-replace="${this.data}"`, '');
    this.replaceObject.after(element);
    this.replaceObject.remove();
  }
}
class For {
  constructor() {

  }
  get doms() {
    return $('[data-t-for]');
  }
  get Dom() {
    return this.doms[0] || null;
  }
  get data() {
    return this.Dom.dataset.tFor;
  }
  get from() {
    return this.data.split(' In ')[1];
  }
  get In() {
    return this.data.split(' In ')[0].split(' ');
  }
  isTure() {
    return this.Dom;
  }
  get forObject() {
    return $(`[data-t-for="${this.data}"]`);
  }
  render(data) {
    if (!this.isTure()) return;
    let element = '';
    for (var i = 0; i < data[this.from].length; i++) {
      element = element + tao._templateReplace(data[this.from][i], this).replace(`data-t-for="${this.data}"`, '');
    };
    this.forObject.after(element);
    this.forObject.remove();
    this.render(data);
  }
}
class Tao {
  constructor() {
    this.For = new For();
    this.Replace = new Replace();
  }
  _templateReplace(data,these) {
    const { Dom, For, In } = these;
    let element = Dom.outerHTML;
    for (var i = 0; i < In.length; i++) {
      element = element.replace(`{{${In[i]}}}`, data[In[i]]);
    }
    return element;
  }
  replace(data) {
    this.Replace.render(data);
  }
  for(data) {
    this.For.render(data);
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