import { createOctokit } from "#server/utils/octokit";

export default cachedEventHandler(
	async event => {
		const { page = 1 } = getQuery(event);
		const octokit = createOctokit(event);
		const response = await octokit.request("GET /repos/{owner}/{repo}/commits", {
			owner: "MCWXT",
			repo: "Blog",
			page
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
		name: "github-log-commits",
		maxAge: 1800
	}
);
