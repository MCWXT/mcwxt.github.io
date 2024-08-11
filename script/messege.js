const message = JSON.parse($.ajax({
  url: 'https://api.github.com/repos/MCWXT/mcwxt.github.io/issues/' + getQueryString('number'),
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
$('img').prop('src',(index,currentvalue) => {
  return 'https://proxy.mcwxt.top/' + currentvalue;
});
