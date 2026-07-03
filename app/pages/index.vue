<script setup>
	definePageMeta({
		keepalive: true
	});
	useHead({
		title: "首页"
	});
	const theme = useThemeStore();
	const issuesFriendLink = ref();
	const { data, error } = await useAPI("/issues/friendlink");
	const _issuesFriendLink = [];
	data.value.map((value, key) => {
		if (value.issue_state === "closed") {
			return;
		}
		_issuesFriendLink[key] = {};
		_issuesFriendLink[key].title = value.site_title;
		_issuesFriendLink[key].brief = value.site_brief;
		_issuesFriendLink[key].url = value.site_url;
		_issuesFriendLink[key].icon = value.site_icon;
	});
	issuesFriendLink.value = _issuesFriendLink;

	if (error.value)
		issuesFriendLink.value = [
			{
				title: "出问题啦",
				url: "https://github.com/MCWXT/Blog/issues",
				icon: "https://img.icons8.com/?size=100&id=k0I9K7HGGgQY&format=png&color=000000",
				brief: "提交错误"
			}
		];
</script>

<template>
	<div>
		<div>
			<div
				class="bg-[url(/img/background.jpg)] bg-cover bg-no-repeat bg-center aspect-20/7"
			></div>
			<div class="flex">
				<div>
					<div class="avatar ms-2 relative" style="height: 8rem; top: -0.5rem">
						<img
							class="rounded-full"
							@click="easterEgg.click(() => theme.toggleTheme())"
							src="/img/logo.png"
							alt="MCWXT"
						/>
					</div>
					<div class="text-center ms-2" style="width: 8rem">
						<h2 class="text-4xl">MCWXT</h2>
					</div>
				</div>
				<div class="p-2">
					<div class="my-4">
						<div class="stats mb-2">
							<div class="stat px-3 py-2">
								<span class="stat-value text-xl">4527</span>
								<span class="stat-title text-xs mx-auto">粉丝</span>
							</div>
							<div class="stat px-3 py-2">
								<span class="stat-value text-xl">88</span>
								<span class="stat-title text-xs mx-auto">关注</span>
							</div>
							<div class="stat px-3 py-2">
								<span class="stat-value text-xl">3.6万</span>
								<span class="stat-title text-xs mx-auto">获赞</span>
							</div>
						</div>
						<div class="text-center">
							<a
								class="btn btn-neutral btn-sm w-48"
								href="https://m.bilibili.com/space/3493283118451294"
								><span class="text-light">关注</span></a
							>
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="p-2 text-sm">
					<span
						>努力成为一个大UP主ing。感谢您来我的博客站，本人也参与开发：DMX梦幻服，<a
							href="//remcbbs.top/"
							>REmcbbs论坛</a
						>……也欢迎大家来我其他开发的站点</span
					>
				</div>
			</div>
		</div>
		<div>
			<ul class="border-y border-base-300 py-1">
				<li class="inline mx-3">
					<nuxt-link class="link" to="/video">视频</nuxt-link>
				</li>
				<li class="inline mx-3">
					<nuxt-link class="link" to="/discussions">讨论</nuxt-link>
				</li>
			</ul>
		</div>
		<div>
			<div>
				<div class="m-2">
					<h2 class="inline">友链</h2>
				</div>
				<div class="flex justify-md-start justify-center flex-wrap">
					<link-card
						class="mx-2 my-1 border border-base-200"
						v-for="item in issuesFriendLink"
						:href="item.url"
						:title="item.title"
						:icon="item.icon"
						:content="item.brief"
					></link-card>
				</div>
			</div>
		</div>
	</div>
</template>
