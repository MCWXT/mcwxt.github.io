import { getQueryString, requestData, tao } from 'tao';
import { createApp, ref } from 'vue';
createApp({
  setup() {
    const isSuccessful = ref(false);
    if (getQueryString('code'), getQueryString('state') == 'MCWXT') {
      const access_token = $.parseJSON($.ajax({
      url: 'https://github.com/login/oauth/access_token?client_id=Iv23lieAt4NOqGN5GqZI&client_secret=0ca4b19709671aee0011545baf857283cee944a4&code=' + getQueryString('code'),
      dataType: "json",
      async: false
    }).responseText).access_token;
      window.localStorage.setItem('access_token', access_token);
      isSuccessful.value = true;
      setTimeout(() => {
        tao.page = '/home';
      }, 2000);
    }
    return {
      isSuccessful
    }
  }
}).mount('#app');