const requestMcapks = () => {
  if (parent.window.localStorage.getItem('mcapks')) {
    return JSON.parse(parent.window.localStorage.getItem('mcapks'));
  }
  const mcapksData = $.parseJSON($.ajax({
    url: 'https://proxy.mcwxt.top/https://mcapks.net/api/vs-list.php',
    dataType: 'json',
    async: false,
  }).responseText);
  parent.window.localStorage.setItem('mcapks', JSON.stringify(mcapksData));
  return mcapksData;
}
$('#refreshCache').click(() => {
  parent.window.localStorage.removeItem('mcapks');
  parent.window.location.reload();
})
const mcapksData = requestMcapks();
tao.for({
  mcapksData: mcapksData.message
});
$('.download *').css({ 'pointer-events': 'none' });
$('.download').click((e) => {
  parent.toastr.success('即将跳转到下载页面','请求中……');
  const JumpPan = $.ajax({
    url: 'https://proxy.mcwxt.top/https://mcapks.net/down.php?vs=' + e.target.dataset.version,
    dataType: 'json',
    async: false,
  }).responseText;
  var Location = JumpPan.substr(JumpPan.indexOf("window.location.href='") + 22);
  var Location = Location.substr('',Location.indexOf("'"));
  parent.window.location.href = Location || 'https://mcapks.net/info/' + encodeURIComponent(btoa(e.target.dataset.version)) + '/' + e.target.dataset.info_key + '.html';
})
