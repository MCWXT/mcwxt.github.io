dom.forum = $(".forum");
const bvid = requestData("forum.json").bvid;
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
var forum = "";
const checkLength = (str,length) => {
  if (str.length > length) {
    return str.slice(0,length) + "……";
  }
  return str;
}
for (var i = 0; i < bvid.length; i++) {
  var data = getData(bvid[i]);
  forum = forum + `
      <a class="posts" href="video.html?bvid=${bvid[i]}">
        <div class="cover">
          <img src="https://www.dmoe.cc/random.php" alt="">
        </div>
        <div class="body">
          <div class="postsTitle">
            <span>${checkLength(data.title,25)}</span>
          </div>
          <div class="content">
            <span>${checkLength(data.detail,45)}</span>
          </div>
          <div class="information">
            <span>${timestampToTime(data.time)}</span><span><i class="bi bi-play-btn-fill"></i>${data.view}</span><span><i class="bi bi-heart-fill"></i>${data.like}</span>
          </div>
        </div>
      </a>
  `;
};
dom.forum.html(forum)
