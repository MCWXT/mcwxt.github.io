<script setup>
	definePageMeta({
		keepalive: true
	});
	useHead({
		title: "视频"
	});
	const { data: discussions } = await useFetch("/api/github/discussions/general");
	const { data: videoRes, error } = await useAPI("/video/archive/related");
	const data = computed(() => {
		if (!videoRes.value?.data) return [];
		return videoRes.value.data;
	});
	if (error.value) {
		toast({
			type: "error",
			content: error.value
		});
	}
</script>
<template>
	<div>
		<div class="carousel rounded-md m-2 aspect-16/9">
			<router-link
				class="carousel-item w-full relative"
				v-for="item in [...discussions].reverse().slice(0, 3)"
				:to="{ path: '/discussions/' + item.number }"
			>
				<img
					class="object-cover w-full"
					:src="'https://www.dmoe.cc/random.php?' + item.number"
					:alt="item.title"
				/>
				<div
					class="m-2 p-1 absolute bottom-0 start-0 bg-black/40 text-white text-xs rounded-sm"
				>
					{{ item.title }}
				</div>
			</router-link>
		</div>
		<template v-if="data">
			<div
				class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-center px-2"
			>
				<router-link
					class="w-44 my-2 hover:bg-zinc-200 group cursor-pointer flex flex-col gap-2 transition active:scale-105"
					v-for="item in data"
					:to="'/video/' + item.bvid"
				>
					<div class="aspect-4/3 relative rounded-lg overflow-hidden">
						<img class="object-cover size-full" :src="item.pic" :alt="item.title" />
						<div
							class="m-2 p-1 absolute bottom-0 end-0 bg-black/50 text-white text-xs rounded-sm"
						>
							{{ formatTime(item.duration) }}
						</div>
					</div>
					<div class="p-2">
						<div class="">
							<h3 class="truncate-wrap text-md" style="--line: 2">
								{{ item.title }}
							</h3>
						</div>
						<div class="flex text-xs text-gray-600 my-1">
							<div class="flex-none mr-2 flex items-center">
								<icon name="mingcute:play-circle-fill"></icon>
								<div>
									{{ formatter.format(item.stat.view) }}
								</div>
							</div>
							<div class="flex-auto flex items-center">
								<icon name="mingcute:danmaku-fill"></icon>
								<div>
									{{ formatter.format(item.stat.danmaku) }}
								</div>
							</div>
							<div class="flex-1 text-nowrap">
								{{ day(item.pubdate * 1000, "zh-cn").displayText }}
							</div>
						</div>
						<div class="flex text-sm text-gray-600">
							<p class="flex-1">
								{{ item.owner.name }}
							</p>
							<icon class="flex-none m-1" name="mingcute:more-2-fill"></icon>
						</div>
					</div>
				</router-link>
			</div>
		</template>
	</div>
</template>
