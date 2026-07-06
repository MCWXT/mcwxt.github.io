<script setup>
	const props = defineProps(["discussion"]);
	const root = useTemplateRef("root");
	const getDomain = () => {
    return window.location.hostname;
  }
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
			<div class="w-60">
				<h1 class="text-xl truncate w-50">{{ discussion.title }}</h1>
				<span class="text-xs text-base-content/80">
					{{ getDiscussTip(discussion) }}
				</span>
				<div class="text-sm flex items-center text-base-content/80">
					<client-only>
						<span class="flex-none">来自 {{ getDomain() }}</span>
					</client-only>
					<div class="flex-1 text-end">
						<span class="badge badge-soft badge-accent text-xs">讨论</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
