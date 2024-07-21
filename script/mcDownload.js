const requestMcapks = () => {
  if (parent.window.localStorage.getItem('mcapks')) {
    return JSON.parse(parent.window.localStorage.getItem('mcapks'));
  }
  const mcapksData = $.parseJSON($.ajax({
    url: 'http://serzmqmtk3y03.sxq1.xyz/agentApi.php',
    dataType: 'json',
    data: {
      api: 'https://mcapks.net/api/vs-list.php',
    },
    async: false,
  }).responseText);
  parent.window.localStorage.setItem('mcapks', JSON.stringify(mcapksData));
  return mcapksData;
}
$('#refreshCache').click(() => {
  parent.window.localStorage.removeItem('mcapks');
  parent.window.location.reload();
})
tao.for({
  mcapksData: requestMcapks().message
})
$('.download *').css({ 'pointer-events': 'none' });
$('.download').click((e) => {
  parent.window.location.href = 'https://mcapks.net/info/' + encodeURIComponent(btoa(e.target.dataset.version)) + '/' + e.target.dataset.info_key + '.html';
})