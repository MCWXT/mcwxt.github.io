import { createOctokit } from "#server/utils/octokit";

export default cachedEventHandler(
	async event => {
		const octokit = createOctokit(event);
		const response = await octokit.request("GET /repos/{owner}/{repo}/discussions", {
			owner: "MCWXT",
			repo: "Blog"
		});
		if (response.status !== 200) {
			throw createError({
				statusCode: response.status,
				statusMessage: "GitHub request failed"
			});
		}

		return response.data;
	},
	{
		name: "github-discussions-list-general",
		maxAge: 7200
	}
);
