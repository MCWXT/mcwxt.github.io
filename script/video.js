const bvid = getQueryString('bvid');
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
const data = $.parseJSON($.ajax({
  url: "https://tenapi.cn/v2/bilivideo?url=https://www.bilibili.com/video/" + bvid,
  dataType: "json",
  async: false,
}).responseText).data;
if (!data) {
  toastr.error('三秒后返回上一页','视频加载错误');
  setTimeout(() => {
    window.history.go(-1);
  }, 2000);
  throw ('视频加载错误');
}
data.time = timestampToTime(data.time);
m({
  bvData: data,
});