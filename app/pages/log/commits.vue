<script setup>
  useHead({
		title: "更新日志"
	});
	const route = useRoute();
	const router = useRouter();
	if (route.query.page < 1 || Number.isNaN(route.query.page)) {
		router.push({
			query: { page: String(1) }
		});
	}
	const page = ref(Number(route.query.page || 1));
	const { data, error } = await useFetch(() => "/api/github/log/commits", {
		query: computed(() => ({
			page: page.value
		}))
	});
	watch(page, (value, oldValue) => {
		if (value < 1 || Number.isNaN(value)) {
			page.value = 1;
			return;
		}
		if (oldValue < 1) {
			return;
		}
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		router.push({
			query: { page: String(value) }
		});
	});
	watchEffect(() => {
		if (!data.value) return;
		if (data.value[0] == undefined) {
			toast({
				type: "error",
				content: "已经到顶了啦!!"
			});
			router.back();
		}
	});
	watch(
		() => route.query.page,
		val => {
			const num = Number(val || 1);
			if (num !== page.value) {
				page.value = num;
			}
		}
	);
</script>
<template>
	<div class="m-4">
		<h2 class="text-2xl">更新日志 Commits</h2>
	</div>
	<div v-if="data">
		<ul class="timeline timeline-compact timeline-vertical mx-4 my-5">
			<li v-for="item in data">
				<hr />
				<div class="timeline-middle text-3xl text-base-content/90">
					<icon name="majesticons:git-commit-line"></icon>
				</div>
				<div class="timeline-end mb-10">
					<time class="font-mono italic text-sm">{{ item.commit.committer.date }}</time>
					<div class="text-lg font-black my-1">{{ item.commit.message }}</div>
					<div class="avatar">
						<div class="w-5 rounded-full">
							<img :src="item.committer.avatar_url" :alt="item.commit.committer.name" />
						</div>
					</div>
					<span class="text-sm"
						>{{ item.commit.committer.name }}
						向仓库提交了文件，如有bug，请联系邮箱:
						{{ item.commit.committer.email }}</span
					>
				</div>
				<hr />
			</li>
		</ul>
	</div>
	<div>
		<div class="join grid grid-cols-3 w-50 mx-auto">
			<button class="join-item btn btn-outline btn-sm" @click="page--">上一页</button>
			<button class="join-item btn btn-outline btn-sm">{{ page }}</button>
			<button class="join-item btn btn-outline btn-sm" @click="page++">下一页</button>
		</div>
	</div>
</template>
