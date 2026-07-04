<script setup>
	useSeoMeta({
		title: "版本日志"
	});
	import { marked } from "marked";

	const auth = useAuthStore();
	const octokit = useOctokit({
		auth: auth.token
	});

	const { data, error } = await useFetch(() => "/api/github/log/releases");
	octokit.request(`GET /repos/{owner}/{repo}/releases`, octokitConfig).then(response => {
		if (response.status !== 200) {
			toast({
				type: "error",
				content: response.status
			});
		}
		data.value = response.data;
	});
</script>
<template>
	<div>
		<div class="m-4">
			<h2 class="text-2xl">版本日志 Release</h2>
		</div>
		<div v-if="data">
			<div v-for="item in data" class="mx-4 my-8">
				<div class="text-base-content/85 text-sm m-1 flex items-center">
					<div class="me-2">
						<span>{{ item.updated_at }}</span>
					</div>
					<div>
						<div class="avatar">
							<div class="w-7 rounded-full">
								<img :src="item.author.avatar_url" alt="item.author.login" />
							</div>
						</div>
					</div>
					<div class="me-2">
						<span>{{ item.author.login }}</span>
					</div>
					<div>
						<icon name="mdi:tag-outline"></icon>
						<span>{{ item.tag_name }}</span>
					</div>
				</div>
				<details
					class="collapse collapse-plus bg-base-100 border border-base-300"
					name="my-accordion-det-1"
				>
					<summary class="collapse-title font-semibold">
						<h3>{{ item.name }}</h3>
						<div class="w-full h-fit">
							<div class="prose break-words" v-html="marked.parse(item.body)"></div>
						</div>
					</summary>
					<div class="collapse-content text-sm">
						<ul class="list rounded-box border border-base-300">
							<li class="list-row">
								<icon name="tabler:file-zip"></icon>
								<nuxt-link :href="item.zipball_url" external
									>Source code (zip)</nuxt-link
								>
							</li>
							<li class="list-row">
								<icon name="tabler:file-zip"></icon>
								<nuxt-link :href="item.tarball_url" external
									>Source code (tar.gz)</nuxt-link
								>
							</li>
						</ul>
					</div>
				</details>
			</div>
		</div>
	</div>
</template>
<style scoped>
	@plugin '@tailwindcss/typography';
</style>
