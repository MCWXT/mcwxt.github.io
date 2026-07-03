<script setup>
	import Giscus from "@giscus/vue";
	import { marked } from "marked";
	const auth = useAuthStore();
	const octokit = useOctokit({
		auth: auth.token
	});
	const number = useRoute().params.number;
	const theme = useThemeStore();
	function getDiscussTip(item) {
		const { category } = item;
		const name = category.name;

		if (name === "Announcements") {
			return `${item.user.login} announced in ${name}`;
		}
		if (category.is_answerable) {
			return `${item.user.login} asked a question in ${name}`;
		}
		return `${item.user.login} started this conversation in ${name}`;
	}
	const copy = async text => {
		try {
			await navigator.clipboard.writeText(text);
			toast({
				type: "success",
				content: "复制成功"
			});
		} catch (err) {
			toast({
				type: "error",
				content: "复制失败"
			});
		}
	};
	const { data, error } = await useFetch("/api/github/discussions/" + number);
	useHead({
		title: "讨论：" + data.value.title
	});
	if (process.client) {
		octokit
			.request(`GET /repos/{owner}/{repo}/discussions/${number}`, octokitConfig)
			.then(response => {
				const contents = response.data;
				data.value = contents;
			})
			.catch(error => {
				toast({
					type: "error",
					content: error.message
				});
				router.replace("/discussions");
			});
	}
</script>
<template>
	<template v-if="data">
		<div class="p-3">
			<h1 class="mt-3 text-2xl">
				{{ data.title }} <span>#{{ number }}</span>
			</h1>
			<div class="mb-3">
				<div
					class="badge badge-sm badge-outline"
					:class="`border-[#${item.color}] text-[#${item.color}]`"
					v-for="item in data.labels"
				>
					{{ item.name }}
				</div>
			</div>
			<span>{{ getDiscussTip(data) }}</span>
		</div>
		<div class="p-2">
			<div class="border border-base-300 rounded">
				<div class="my-2 flex justify-between items-center px-2">
					<img
						class="rounded-lg me-2 h-10 inline flex-none"
						:src="data.user.avatar_url"
						:alt="data.user.login"
					/>
					<span class="none me-2">{{ data.user.login }}</span>
					<span class="flex-1">{{ day(data.created_at).displayText }}</span>
					<span class="flex-none">
						<div class="dropdown dropdown-bottom dropdown-end">
							<div tabindex="0" role="button" class="btn btn-ghost">
								<icon name="bi:three-dots-vertical"></icon>
							</div>
							<ul
								tabindex="-1"
								class="menu menu-sm dropdown-content overflow-y-auto max-h-96 rounded-box z-1 mt-2 w-32 p-1 bg-base-200 border border-base-300"
							>
								<li>
									<a @click="copy('https://mcwxt.top/discussions/' + data.number)"
										>复制链接</a
									>
								</li>
								<li><a @click="copy(data.body)">复制Markdown</a></li>
							</ul>
						</div>
					</span>
				</div>
				<div class="p-2">
					<article
						class="mx-2 prose lg:prose-xl break-words"
						v-html="
							marked.parse(
								data.body.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '')
							)
						"
					></article>
				</div>
			</div>
		</div>
	</template>
	<div v-else>
		<div class="p-3">
			<div class="skeleton mt-3 h-8 w-3/4"></div>
			<div class="skeleton my-2 h-5 w-1/2"></div>
		</div>
		<div class="p-2">
			<div class="border border-base-300 rounded">
				<div class="my-2 flex items-center">
					<div class="skeleton mx-2 h-10 w-10 rounded"></div>
					<div class="skeleton h-5 w-1/3"></div>
				</div>
				<div class="p-2">
					<div class="mx-2 space-y-2">
						<div class="skeleton h-4 w-full"></div>
						<div class="skeleton h-4 w-full"></div>
						<div class="skeleton h-4 w-3/4"></div>
						<div class="skeleton h-4 w-2/3"></div>
						<div class="skeleton h-4 w-4/5"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div>
		<div class="my-4 px-4">
			<client-only>
				<giscus
					repo="MCWXT/Blog"
					id="R_kgDOLz187g"
					mapping="number"
					:term="number"
					reactionsenabled="1"
					emitmetadata="0"
					inputposition="top"
					:theme="theme.current"
					lang="zh-CN"
					loading="lazy"
					crossorigin="anonymous"
				></giscus>
			</client-only>
		</div>
	</div>
</template>
<style scoped>
	@plugin '@tailwindcss/typography';
</style>
