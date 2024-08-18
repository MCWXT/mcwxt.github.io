import { github } from 'githubApi';
import { createApp, ref } from 'vue';
import { tao } from 'tao';
createApp({
  setup() {
    const messages = JSON.parse($.ajax({
      url: github.issuesApi,
      dataType: 'json',
      async: false
    }).responseText);
    messages.map(message => {
      message.author = message.user.login;
      message.authorURI = message.user.html_url;
      message.authorAvatar = tao.HTTPproxy(message.user.avatar_url);
      message.cover = tao.HTTPproxy(message.body.match(/(https?:\/\/)?(([0-9a-z.]+\.[a-z]+)|(([0-9]{1,3}\.){3}[0-9]{1,3}))(:[0-9]+)?(\/[0-9a-z%/.\-_]*)?(\?[0-9a-z=&%_\-]*)?(\#[0-9a-z=&%_\-]*)?/ig)[0]);
    });
    return {
      carouselImg: [{ imgSrc: '//i2.hdslb.com/bfs/archive/c96b635dcadbb30d5aa73a9efc532e3bb9d40d6e.jpg' },
      { imgSrc: '//i0.hdslb.com/bfs/archive/26e4fb5b6c57d75e945fbd06f334c5412c04aa17.png' },
      { imgSrc: '//i2.hdslb.com/bfs/archive/ffe2a3758e07429f89294316aa548bad79f06f80.png' }],
      messages
    }
  }
}).mount('#app');