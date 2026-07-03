import { createOctokit } from "#server/utils/octokit";

export default cachedEventHandler(
	async event => {
		const number = getRouterParam(event, "number");
		const octokit = createOctokit(event);
		const response = await octokit.request("GET /repos/{owner}/{repo}/discussions/" + number, {
			owner: "MCWXT",
			repo: "Blog"
		});
		if (response.status !== 200) {
			throw createError({
				statusCode: response.status,
				statusMessage: "GitHub request failed"
			});
		}

		const data = response.data;
		return data;
	},
	{
		name: "github-discussions",
		maxAge: 1800
	}
);
