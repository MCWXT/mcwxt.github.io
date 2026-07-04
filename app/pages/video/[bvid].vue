<script setup>
	const bvid = useRoute().params.bvid;
	const data = ref();
	const { data: _data, error } = await useAPI("/video/view?bvid=" + bvid);
	data.value = _data.value.data;
	if (error.value)
		toast({
			type: "error",
			content: error.value
		});
	useSeoMeta({
		title: () => `视频：${data.value.title}`
	});
</script>
<template>
	<div>
		<div>
			<iframe
				class="aspect-16/9 w-full"
				:src="'https://player.bilibili.com/player.html?bvid=' + bvid"
				scrolling="no"
				border="0"
				allowfullscreen="true"
				referrerpolicy="no-referrer"
			></iframe>
		</div>
		<template v-if="data">
			<div class="p-2">
				<h2 class="text-lg">{{ data.title }}</h2>
				<div class="flex text-sm text-gray-600 m-2">
					<span class="mr-4"
						><icon name="mingcute:play-circle-fill"></icon>
						{{ formatter.format(data.stat.view) }}</span
					>
					<span class="mr-4"
						><icon name="mingcute:danmaku-fill"></icon>
						{{ formatter.format(data.stat.danmaku) }}</span
					>
					<span class="mr-4">{{ formatTimestamp(data.pubdate) }}</span>
				</div>
				<div class="text-xs text-base-content/80 m-2">
					<span>{{ data.bvid }}</span
					><br />
					<p class="mt-2">{{ data.desc }}</p>
				</div>
			</div>
		</template>
	</div>
</template>
