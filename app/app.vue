<script setup>
	const auth = useAuthStore();
	const theme = useThemeStore();
	const toasts = ref([]);
	if (process.client) {
    theme.init();
		document.documentElement.setAttribute("data-theme", theme.current);
		document.addEventListener("toast", e => {
			e.detail.data.icon = {
				info: "mingcute:information-line",
				success: "mingcute:check-circle-line",
				warning: "mingcute:warning-line",
				error: "mingcute:close-circle-line"
			}[e.detail.data.type];
			toasts.value.push(e.detail.data);
			setTimeout(() => {
				toasts.value = toasts.value.filter(item => item.content !== e.detail.data.content);
			}, 1500);
		});
	}
	const include = ["Home", "Discussions", "DownloadMinecraft"];

	const link = [
		{
			type: "BiliBili",
			icon: "mingcute:bilibili-fill",
			content: "MCWXT",
			location: "//space.bilibili.com/3493283118451294"
		},
		{
			type: "QQ",
			icon: "mingcute:qq-fill",
			content: "2775997367",
			location: "//qm.qq.com/q/gBKqTOtgDm"
		},
		{
			type: "VX",
			icon: "mingcute:wechat-fill",
			content: "MCWXT114514",
			location: "//u.wechat.com/EJKj9AIHxC0UTv-gIzoRCbI"
		},
		{
			type: "Email",
			icon: "mingcute:mail-send-fill",
			content: "mail@mcwxt.top",
			location: "mailto:mail@mcwxt.top"
		},
		{
			type: "Github",
			icon: "mingcute:github-fill",
			content: "MCWXT",
			location: "//github.com/MCWXT"
		},
		{
			type: "Telegram",
			icon: "mingcute:telegram-fill",
			content: "MCWXT",
			location: "//t.me/MCWXT"
		}
	];
</script>

<template>
	<div class="drawer md:drawer-open">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content">
			<header class="h-16">
				<NuxtLoadingIndicator :height="2.5" />
				<nav-bar class="fixed left-0 top-0 z-50"></nav-bar>
				<div class="toast toast-top toast-center z-40 mt-16">
					<div
						role="alert"
						class="alert"
						:class="`alert-${item.type}`"
						v-for="item in toasts"
					>
						<icon class="text-xl" :name="item.icon"></icon>
						<span>{{ item.content }}</span>
					</div>
				</div>
			</header>
			<main>
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</main>
			<div class="border-t border-base-300 mx-8 mt-8"></div>
			<footer class="footer bg-base-100 text-base-content p-10">
				<aside>
					<span class="text-2xl font-bold">MCWXT</span>
					<p>感谢访问我的博客！</p>
					<br />
					<p>
						Copyright © 2023-{{ new Date().getFullYear() }} MCWXT. All rights reserved.
						Built with Nuxt SSR.
					</p>
					<p>
						<nuxt-link
							href="https://icp.gov.moe/?keyword=20250684"
							target="_blank"
							external
							>萌ICP备20250684号</nuxt-link
						><span class="mx-2 text-base-content/80">|</span
						><nuxt-link
							style="text-decoration: none; color: #51c4d3"
							href="https://travel.moe/go.html"
							title="异次元之旅-跃迁-我们一起去萌站成员的星球旅行吧！"
							target="_blank"
							><img
								class="inline me-1"
								src="https://travel.moe/images/icon/icon64.png"
								style="width: 22px; height: 22px"
								alt="异次元之旅"
								external
							/>异次元之旅</nuxt-link
						>
					</p>
				</aside>
				<nav>
					<h6 class="footer-title">感谢</h6>
					<ul>
						<li><nuxt-link href="https://vite.dev" external>Vite</nuxt-link></li>
						<li><nuxt-link href="https://nuxt.com/" external>Nuxt</nuxt-link></li>
						<li><nuxt-link href="https://www.w3.org" external>W3C</nuxt-link></li>
						<li>
							<nuxt-link href="https://www.mozilla.org" external>Mozilla</nuxt-link>
						</li>
					</ul>
				</nav>
				<nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
					<a
						class="text-xl text-base-content/80"
						target="_blank"
						v-for="item in link"
						:title="item.content"
						:href="item.location"
					>
						<icon :name="item.icon"></icon>
					</a>
				</nav>
			</footer>
		</div>
		<drawer-side class="z-100"></drawer-side>
	</div>
</template>

<style>
	.page-enter-from {
		opacity: 0;
		transform: scale(0.99);
		filter: blur(6px);
	}

	.page-enter-active {
		transition:
			opacity 0.35s ease,
			transform 0.35s ease,
			filter 0.35s ease;
	}

	.page-enter-to {
		opacity: 1;
		transform: scale(1);
		filter: blur(0);
	}
</style>
