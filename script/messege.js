const message = JSON.parse($.ajax({
  url: 'https://api.github.com/repos/MCWXT/mcwxt.github.io/issues/' + (getQueryString('number') || 3),
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
message.authorAvatar = message.user.avatar_url;
message.MDHTML = markdown.toHTML(message.body);
tao.replace({
  message: message
});
$('#md img').prop('src',(index,currentvalue) => {
  return 'https://proxy.mcwxt.top/' + currentvalue;
});
comments.map(comment => {
  comment.author = comment.user.login;
  comment.authorURI = comment.user.html_url;
  comment.authorAvatar = comment.user.avatar_url;
});
tao.for({
  comments: comments
});
tao.replace({
  messageUrl: {
    messageUrl: message.html_url
  }
})