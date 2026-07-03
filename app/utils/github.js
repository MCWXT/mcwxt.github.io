import { Octokit } from "octokit";

export const useOctokit = octokitConfig => {
	const octokit = new Octokit(octokitConfig);
  return octokit;
};

export const octokitConfig = {
	owner: "MCWXT",
	repo: "Blog"
};
