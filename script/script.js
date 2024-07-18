const requestData = (dataName) => {
  return $.parseJSON($.ajax({
    url: '/data/' + dataName + '.json',
    dataType: 'json',
    async: false
  }).responseText);
}
const getQueryString = (name) => {
  const search = '?' + parent.window.location.hash.split('?')[1];
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = search.substr(1).match(reg);
  return r ? unescape(r[2]) : null;
}

function stringIze(obj) {
  var o = document.createElement("div");
  o.appendChild(obj);
  return o.innerHTML;
}
const VFor = (f, e, v, a) => {
  var html = '';
  for (var n = 0; n < v.length; n++) {
    var _html = e.outerHTML;
    for (var i = 0; i < a.length; i++) {
      _html = _html.replace(`{{${a[i]}}}`, v[n][a[i]]);
    }
    html = html + _html.replace(`v-for="${f}"`, '');
  }
  $(`[v-for="${f}"]`).after(html);
  $(`[v-for="${f}"]`).remove();
}
const vFor = (data) => {
  const e = $('[v-for]');
  if (!e[0]) { return };
  const For = e[0].getAttribute('v-for');
  const forData = data[For];
  const In = e[0].dataset.in.split(' ');
  if (For && e[0] && data && In) {
    VFor(For, e[0], forData, In);
  }
  vFor(data);
}
const M = (f, e, v, a) => {
  var html = e.outerHTML;
  for (var i = 0; i < a.length; i++) {
    html = html.replace(`{{${a[i]}}}`, v[a[i]]);
  }
  html = html.replace(`m="${f}"`, '');
  $(`[m="${f}"]`).after(html);
  $(`[m="${f}"]`).remove();
}
const m = (data) => {
  const e = $('[m]');
  if (!e[0]) { return };
  const For = e[0].getAttribute('m');
  const forData = data[For];
  const In = e[0].dataset.in.split(' ');
  if (For && e[0] && data && In) {
    M(For, e[0], forData, In);
  }
}
window.onload = () => {
  $('[data-page] *').css({ 'pointer-events': 'none' });
  $('[data-page]').click((event) => {
    const obj = event.target;
    parent.window.location.hash = obj.dataset.page;
  })
  $('[href]').click(() => {
    toastr.warning('注意安全，已不在保护范围内','跳转至外链')
  })
}