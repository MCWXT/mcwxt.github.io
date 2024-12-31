import { Axios } from 'axios';
const axios = new Axios({});
export const getTemplate = async (src) => {
  return await axios.get(src).then((response) => response.data);;
}
export const httproxy = (url) => {
  const proxyServer = 'https://proxy.mcwxt.top/';
  return proxyServer + url;
};
export const cache = {
  setItem(key, content) {
    localStorage.setItem(key, typeof content == 'string' ? content : JSON.stringify(content));
    return content;
  },
  getItem(key) {
    const content = localStorage.getItem(key);
    return content && content.indexOf('{') != -1 ? JSON.parse(content) : content;
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  clear() {
    const github_access = cache.getItem('github_access');
    localStorage.clear();
    cache.setItem('github_access', github_access);
  }
}