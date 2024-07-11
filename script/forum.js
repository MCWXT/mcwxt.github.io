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
const checkLength = (str, length) => {
  if (str == "") {
    return "…………"
  }
  if (str.length > length) {
    return str.slice(0, length) + "……";
  }
  return str;
}
const bv = (bvid) => {
  var _bv = [];
  if ($.cookie('_bv')) {
    return JSON.parse($.cookie('_bv'));
  }
  for (var i = 0; i < bvid.length; i++) {
    var data = getData(bvid[i]);
    var bv = {};
    bv.bvid = bvid[i];
    bv.cover = data.cover;
    bv.title = checkLength(data.title,25);
    bv.content = checkLength(data.detail,45);
    bv.time = timestampToTime(data.time);
    bv.view = data.view;
    bv.like = data.like;
    _bv[i] = bv;
  }
  $.cookie('_bv', JSON.stringify(_bv));
  return _bv;
}
vFor({
  bvid: bv(bvid),
})