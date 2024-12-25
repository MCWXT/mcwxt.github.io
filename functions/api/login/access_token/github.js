export async function onRequestPost(context) {
  const request = context.request;
  // const data = JSON.parse(request.body);
  // const githubRequest = new Request('https://github.com/login/oauth/access_token', {
  //   method: 'POST',
  //   body: {
  //     code: data.code,
  //     client_id: 'Iv23lieAt4NOqGN5GqZI',
  //     client_secret: context.env.githubAppClientSecret
  //   }
  // });
  // const githubResponse = await fetch(githubRequest);
  return new Response('6');
}