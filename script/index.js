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
  set: (key, content) => {
    localStorage.setItem(key, typeof content == 'string' ? content : JSON.stringify(content));
    return content;
  },
  get: (key) => {
    const content = localStorage.getItem(key);
    return content && content.indexOf('{') != -1 ? JSON.parse(content) : content;
  }
}