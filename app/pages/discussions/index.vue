<script setup>
	useSeoMeta({
		title: "讨论"
	});
	const auth = useAuthStore();
	const octokit = useOctokit({
		auth: auth.token
	});
	function getDiscussTip(item) {
		const { category } = item;
		const name = category.name;

		if (name === "Announcements") {
			return `${item.user.login} ${day(item.created_at).displayText} announced in ${name}`;
		}
		if (category.is_answerable) {
			return `${item.user.login} ${day(item.created_at).displayText} asked in ${name}`;
		}
		return `${item.user.login} ${day(item.created_at).displayText} started in ${name}`;
	}
	const { data: carousel } = await useAPI("/video/news", {
		transform: res => res?.data?.archives || []
	});

	const { data, error } = await useFetch("/api/github/discussions");

	if (process.client) {
		octokit.request(`GET /repos/{owner}/{repo}/discussions`, octokitConfig).then(response => {
			if (response.status !== 200) {
				toast({
					type: "error",
					content: response.status
				});
			}
			const data = response.data.reverse();
			const match = data.filter(i => i.category.slug == "pin");
			const rest = data.filter(i => i.category.slug !== "pin");
			data.value = [...match, ...rest];
		});
	}
</script>
<template>
	<div>
		<div class="carousel rounded-md m-2 aspect-16/9">
			<nuxt-link
				class="carousel-item w-full relative"
				v-for="item in carousel"
				:to="{ path: '/video/' + item.bvid }"
			>
				<img class="object-cover w-full" :src="item.pic" :alt="item.title" />
				<div
					class="m-2 p-1 absolute bottom-0 start-0 bg-black/40 text-white text-xs rounded-sm"
				>
					{{ item.title }}
				</div>
			</nuxt-link>
		</div>
		<div>
			<div>
				<div class="m-2 mx-4 flex">
					<div class="text-xl flex-1">
						<span v-if="data">{{ data.length }}</span>
						<span v-else>0</span>
					</div>
					<a
						class="btn btn-primary btn-sm flex-none end-0"
						role="button"
						href="//github.com/MCWXT/mcwxt.github.io/discussions/new/choose"
						>新讨论</a
					>
				</div>
			</div>
			<template v-if="data">
				<div class="m-3 divide-y md:mx-32">
					<nuxt-link
						class="block transition border-base-300 active:backdrop-brightness-90"
						v-for="discussion in data"
						:to="'/discussions/' + discussion.number"
					>
						<div class="p-2">
							<div class="">
								<h2 class="text-2xl">{{ discussion.title }}</h2>
							</div>
							<div class="mb-2">
								<span class="text-sm text-base-content/80">{{
									getDiscussTip(discussion)
								}}</span>
							</div>
							<div class="flex items-center">
								<div class="me-18">
									<img
										class="rounded-full inline me-1 w-10 aspect-square"
										:src="discussion.user.avatar_url"
										:alt="discussion.user.login"
									/>
								</div>
								<icon
									class="me-1 text-base-content/80 inline"
									name="mingcute:comment-fill"
								></icon>
								<span class="flex-1">{{ discussion.comments }}</span>
								<span
									v-if="discussion.labels[0]"
									class="badge badge-sm badge-soft badge-primary"
								>
									{{ discussion.labels[0].name }}</span
								>
							</div>
						</div>
					</nuxt-link>
				</div>
			</template>
		</div>
	</div>
</template>
