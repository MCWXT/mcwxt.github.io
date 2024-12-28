import { Axios } from '/cdn_modules/axios@1.7.8/esm/axios.min.js';
const axios = new Axios({});
export const getTemplate = async (src) => {
  return await axios.get(src).then((response) => response.data);;
}
export const httproxy = (url) => {
  const proxyServer = 'https://proxy.mcwxt.top/';
  return proxyServer + url;
};
export const cache = {
  set: (key, content) => {
    parent.window.localStorage.setItem(key, typeof content == 'string' ? content : JSON.stringify(content));
    return content;
  },
  get: (key) => {
    const content = parent.window.localStorage.getItem(key);
    return content && content.indexOf('{') != -1 ? JSON.parse(content) : content;
  }
}