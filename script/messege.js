import { github } from 'githubApi';
import { createApp, ref } from 'vue';
import { tao, getQueryString } from 'tao';
createApp({
  setup() {
    const message = JSON.parse($.ajax({
      url: github.issueApi(getQueryString('number') || (tao.page = '/404')),
      dataType: 'json',
      async: false
    }).responseText);
    const comments = JSON.parse($.ajax({
      url: message.comments_url,
      dataType: 'json',
      async: false
    }).responseText);
    message.author = message.user.login;
    message.authorURI = message.user.html_url;
    message.authorAvatar = tao.HTTPproxy(message.user.avatar_url);
    message.MDHTML = marked.parse(message.body);
    comments.map(comment => {
      comment.author = comment.user.login;
      comment.authorURI = comment.user.html_url;
      comment.authorAvatar = tao.HTTPproxy(comment.user.avatar_url);
    });
    return {
      message,
      comments
    }
  }
}).mount('#app');
$('#md img').prop('src', (index, currentvalue) => {
  return tao.HTTPproxy(currentvalue);
});