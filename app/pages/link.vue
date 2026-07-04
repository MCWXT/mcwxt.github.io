<script setup>
	useSeoMeta({
		title: "跳转链接"
	});
	const route = useRoute();
	if (process.client) {
		if (route.path.indexOf("linkto") != -1) {
			history.back();
			location.href = route.query.url;
		}
	}
</script>
<template>
	<div class="my-20">
		<div class="card card-border w-72 mx-auto">
			<div class="card-body">
				<div class="flex justify-between">
					<h2 class="text-xl font-bold">跳转至:</h2>
					<div class="badge badge-soft badge-warning">
						<icon name="mingcute:warning-fill"></icon>注意安全
					</div>
				</div>
				<div class="py-5">
					<p class="truncate text-base-content/90">
						{{ $route.query.url }}
					</p>
				</div>
				<div class="card-actions justify-end">
					<nuxt-link :href="$route.query.url" target="_blank" class="btn btn-primary" external>继续</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>
