import { createApp, ref } from 'vue';
import { requestData, tao } from 'tao';
createApp({
  setup() {
    const tranNumber = (num, point = 0) => {
      let numStr = num.toString().split('.')[0];
      if (numStr.length < 5) {
        return numStr;
      } else if (numStr.length >= 5 && numStr.length <= 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万'
      } else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿'
      }
    }
    const { bvid } = requestData('video');
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
      if (parent.window.localStorage.getItem('bvData')) {
        return JSON.parse(parent.window.localStorage.getItem('bvData'));
      }
      const bvData = [];
      for (let i = 0; i < bvid.length; i++) {
        let data = getData(bvid[i]);
        bvData[i] = data;
      }
      bvData.map(data => {
        data.time = timestampToTime(data.time).split(' ')[0];
        data.view = tranNumber(data.view);
        data.like = tranNumber(data.like);
      });
      parent.window.localStorage.setItem('bvData', JSON.stringify(bvData));
      return bvData;
    }
    const bvCardWidth = (/mobile/i.test(navigator.userAgent) ? '50%' : '12rem');
    return {
      bv: bv(bvid),
      carouselImg: [{ imgSrc: '//i2.hdslb.com/bfs/archive/c96b635dcadbb30d5aa73a9efc532e3bb9d40d6e.jpg' },
        { imgSrc: '//i0.hdslb.com/bfs/archive/26e4fb5b6c57d75e945fbd06f334c5412c04aa17.png' },
        { imgSrc: '//i2.hdslb.com/bfs/archive/ffe2a3758e07429f89294316aa548bad79f06f80.png' }],
        bvCardWidth
    }
  }
}).directive('tao', tao.directive).mount('#app');
