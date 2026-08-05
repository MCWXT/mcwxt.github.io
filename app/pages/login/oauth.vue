<script setup>
  useSeoMeta({
		title: "登录中-新的世界等你来发掘"
	});
	definePageMeta({
		ssr: false
	});
	const auth = useAuthStore();
	const route = useRoute();
	const router = useRouter();

	if (route.query.state !== "MCWXT" || !route.query.code) {
		throw new Error('登录状态异常');
	}

	$fetch("https://api.mcwxt.top/login/github/oauth?code=" + route.query.code, {
		method: "POST"
	})
		.then(data => {
			if (!data) {
				throw new Error("请求错误");
			}
			if (data.error) {
				throw new Error(data.error || "GitHub 登录失败");
			}
			auth.login(data.access_token);
			toast({
				type: "success",
				content: "登录成功"
			});
			router.replace("/");
		})
		.catch(error => {
			toast({
				type: "error",
				content: error?.message || "请求失败"
			});
			router.replace("/login");
		});
</script>
<template>
	<div class="text-center my-5">
		<span class="loading loading-dots loading-md"></span>
	</div>
</template>
