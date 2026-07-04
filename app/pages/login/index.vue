<script setup>
  useSeoMeta({
		title: "登录"
	});
	const auth = useAuthStore();
</script>
<template>
	<div class="mx-3 my-16">
		<div>
			<icon class="text-8xl w-full text-center" name="mingcute:github-fill"></icon>
		</div>
		<div class="text-2xl my-4">
			<h2 class="text-center">使用github登录</h2>
			<h1 class="text-center">MCWXT的个人博客</h1>
		</div>
		<div class="pb-2">
			<div class="text-center">
				<a
					class="btn btn-wide btn-primary text-lg"
					:class="{ 'btn-disabled': auth.isLogin }"
					role="button"
					href="https://github.com/login/oauth/authorize?client_id=Iv23lieAt4NOqGN5GqZI&state=MCWXT"
				>
					<span v-if="auth.isLogin">您已登录</span>
					<span v-else>点击授权</span>
				</a>
			</div>
		</div>
	</div>
	<div class="mx-3 my-2">
		<div class="text-center">
			<span class="text-tertiary">本博客承诺不会使用您的个人信息</span>
		</div>
	</div>
</template>
