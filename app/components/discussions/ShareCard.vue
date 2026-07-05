<script setup>
	const props = defineProps(["discussion"]);
	const root = useTemplateRef("root");
	defineExpose({
		root
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
</script>
<template>
	<div ref="root" class="hero bg-base-200 w-90 rounded-xl border border-base-300">
		<div class="hero-content my-2 flex">
			<div class="flex-none">
				<img
					class="rounded-lg h-16"
					:src="discussion.user.avatar_url"
					:alt="discussion.title"
				/>
			</div>
			<div class="">
				<h1 class="text-xl truncate">{{ discussion.title }}</h1>
				<span class="text-sm text-base-content/80">
					{{ getDiscussTip(discussion) }}
				</span>
				<div class="text-sm flex items-center text-base-content/80">
					<span class="flex-none">来自MCWXT的个人博客</span>
					<div class="flex-1 text-end">
						<span class="badge badge-soft badge-accent text-xs">讨论</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
