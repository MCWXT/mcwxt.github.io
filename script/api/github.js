import { Axios } from '/cdn_modules/axios@1.7.8/esm/axios.min.js';
import { cache } from '/script/script.js';
const github_access = cache.get('github_access');
const getHeaders = () => {
  const headers = {};
  if (github_access && github_access.access_token) {
    headers.Authorization = github_access.token_type + github_access.scope + github_access.access_token;
  }
  return headers;
}
const github = new Axios({
  baseURL: 'https://api.github.com/',
  headers: getHeaders,
  transformResponse: (data) => {
    if (typeof data != 'object') {
      return JSON.parse(data);
    }
    return data;
  }
});
export default github;