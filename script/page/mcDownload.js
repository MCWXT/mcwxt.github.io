import { createApp, ref } from 'vue';
import { httproxy } from '/script/script.js';
import '//unpkg.com/jquery@3.7.1/dist/jquery.min.js'
createApp({
  setup() {
    const requestMcapks = () => {
      if (parent.window.localStorage.getItem('mcapks')) {
        return JSON.parse(parent.window.localStorage.getItem('mcapks'));
      }
      const mcapksData = $.parseJSON($.ajax({
        url: httproxy`https://mcapks.net/api/vs-list.php`,
        dataType: 'json',
        async: false,
      }).responseText);
      parent.window.localStorage.setItem('mcapks', JSON.stringify(mcapksData));
      return mcapksData;
    }
    const mcapksData = requestMcapks();
    const download = (version,info_key) => {
      const JumpPan = $.ajax({
        url: httproxy`https://mcapks.net/down.php`,
        data: {
          vs: version
        },
        dataType: 'json',
        async: false,
      }).responseText;
      var Location = JumpPan.substr(JumpPan.indexOf("window.location.href='") + 22);
      var Location = Location.substr('', Location.indexOf("'"));
      parent.window.location.href = Location || 'https://mcapks.net/info/' + encodeURIComponent(btoa(version)) + '/' + info_key + '.html';
    }
    const refreshCache = () => {
      parent.window.localStorage.removeItem('mcapks');
      parent.window.location.reload();
    }
    return {
      mcapksData: mcapksData.message,
      download,
      refreshCache
    }
  }
}).mount('#app');
