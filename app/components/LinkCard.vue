<script setup>
	const props = defineProps(["href", "icon", "title", "content"]);
</script>

<template>
	<nuxt-link
		class="rounded-md flex w-96 h-16 transition active:scale-95"
		:to="{ path: '/link', query: { url: href } }"
	>
		<div class="m-2">
			<div class="rounded-full overflow-hidden size-12">
				<img class="object-contain size-full" loading="lazy" :alt="title" :src="icon" />
			</div>
		</div>
		<div class="my-auto w-64 truncate">
			<h3 class="">{{ title }}</h3>
			<span class="text-xs">{{ content }}</span>
		</div>
	</nuxt-link>
</template>

<style scoped></style>
