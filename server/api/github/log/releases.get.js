import { createOctokit } from "#server/utils/octokit";

export default cachedEventHandler(
	async event => {
		const octokit = createOctokit(event);
		const response = await octokit.request("GET /repos/{owner}/{repo}/releases", {
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
		name: "github-log-releases",
		maxAge: 900
	}
);
