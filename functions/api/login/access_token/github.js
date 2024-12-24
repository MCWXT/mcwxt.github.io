import { Axios } from '/cdn_modules/axios@1.7.8/esm/axios.min.js';
export async const onRequestPost = (context) => {
  const request = context.request;
  const data = JSON.parse(request.body);
  const asset = axios.post('https://github.com/login/oauth/access_token', {
    code: data.code,
    client_id: 'Iv23lieAt4NOqGN5GqZI',
    client_secret: context.env.githubAppClientSecret
  });
  return new Response(asset.data);
}