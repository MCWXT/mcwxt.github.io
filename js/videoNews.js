dom.video = $("main");
const videoRawData = totalData.video;
var videoData = "";
const video = () => {
  for (var i = 0; i < videoRawData.length; i++) {
    videoData = videoData + `
    <div class="video">
      <iframe src="//player.bilibili.com/player.html?bvid=${videoRawData[i].bvid}" frameborder="0"></iframe>
      <div class="nameAbout">
        <h3 class="name">${videoRawData[i].name}</h3>
        <span class="about">${videoRawData[i].about}</span>
      </div>
    </div>
    `;
  }
  return videoData;
}
dom.video.html(video())
