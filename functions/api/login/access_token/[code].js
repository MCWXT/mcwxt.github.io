export async function onRequestPost(context) {
  const request = new Request('https://github.com/login/oauth/access_token', {
    method: 'POST',
    data: {
      code: context.params.code,
      client_id: 'Iv23lieAt4NOqGN5GqZI',
      client_secret: context.env.githubAppClientSecret
    }
  });
  const response = await fetch(request);
  return new Response(response.body);
}