const {bvid} = requestData('forum');
const getData = (bvid) => $.parseJSON($.ajax({
  url: "https://tenapi.cn/v2/bilivideo?url=https://www.bilibili.com/video/" + bvid,
  dataType: "json",
  async: false
}).responseText).data;
const timestampToTime = (timestamp) => {
  timestamp = timestamp ? timestamp : null;
  let date = new Date(timestamp * 1000);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}
const bv = (bvid) => {
  var _bv = [];
  if (parent.window.localStorage.getItem('bv')) {
    return JSON.parse(parent.window.localStorage.getItem('bv'));
  }
  for (var i = 0; i < bvid.length; i++) {
    var data = getData(bvid[i]);
    var bv = {};
    bv.bvid = bvid[i];
    bv.cover = data.cover;
    bv.title = data.title;
    bv.content = data.detail;
    bv.time = timestampToTime(data.time);
    bv.view = data.view;
    bv.like = data.like;
    _bv[i] = bv;
  }
  parent.window.localStorage.setItem('bv',JSON.stringify(_bv));
  return _bv;
}
vFor({
  bvid: bv(bvid),
  carouselImg: [{imgSrc: 'http://i0.hdslb.com/bfs/archive/b2e21d8ce1a8106bdd16f19e2eaac3fc3d9a27f2.jpg',},{imgSrc: 'http://i0.hdslb.com/bfs/archive/26e4fb5b6c57d75e945fbd06f334c5412c04aa17.png',},{imgSrc: 'http://i2.hdslb.com/bfs/archive/ffe2a3758e07429f89294316aa548bad79f06f80.png',}],
})