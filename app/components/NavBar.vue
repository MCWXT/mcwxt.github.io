<script setup>
	const auth = useAuthStore();
	const theme = useThemeStore();
	const isScrolled = ref(true);
	if (process.client) {
		window.addEventListener("scroll", () => {
			const navbar = document.getElementById("navbar");
			if (window.scrollY > 100) {
				isScrolled.value = true;
			} else {
				isScrolled.value = false;
			}
		});
	}
</script>

<template>
	<div
		class="navbar transition duration-500 border-b border-base-300 backdrop-blur-sm"
		:class="{
			'bg-[var(--color-base-100)]/[95%]': isScrolled,
			'bg-base-100': !isScrolled
		}"
	>
		<div class="flex-1">
			<label
				class="btn btn-square btn-ghost lg:invisible"
				for="my-drawer"
				aria-label="open sidebar"
			>
				<icon class="text-2xl" name="mingcute:menu-line"></icon>
			</label>
			<h1 class="btn btn-ghost text-xl">MCWXT的个人博客</h1>
		</div>
		<div class="flex-none gap-2">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img src="/img/logo.png" alt="菜单" />
					</div>
				</div>
				<ul
					tabindex="-1"
					class="menu menu-sm dropdown-content overflow-y-auto max-h-96 rounded-box z-1 mt-6 w-52 p-2 bg-base-200 border border-base-300"
				>
					<li><router-link to="/">主页</router-link></li>
					<li>
						<router-link to="/login"
							>登录<span class="badge badge-xs" v-if="auth.isLogin"
								>已登录</span
							></router-link
						>
					</li>
					<li @click="theme.toggleTheme()">
						<client-only>
							<span>{{ theme.isDark() ? "黑夜" : "白天" }}</span>
						</client-only>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
