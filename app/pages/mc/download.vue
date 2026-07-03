<script setup>
	definePageMeta({
		keepalive: true
	});
	useHead({
		title: "MC基岩版全版本下载"
	});
	const page = ref(1);
	const pageSize = 20;
	const { data } = useFetch("https://proxy.mcwxt.top/https://mcapks.net/api/vs-list.php", {
		server: false
	});
	const list = ref();
	const updateList = () => {
		if (!data.value) return;
		const all = JSON.parse(data.value).message || [];
		const start = (page.value - 1) * pageSize;
		list.value = all.slice(start, start + pageSize);
	};
	watch(data, updateList);
	watch(page, (value, oldValue) => {
		if (value < 1 || typeof +value !== "number") {
			page.value = oldValue || 1;
			return;
		}
		updateList(data.value);
		if (list.value[0] == undefined) {
			toast({
				type: "error",
				content: "已经到顶了啦!!"
			});
			page.value = oldValue || 1;
			return;
		}
		updateList(data.value);
	});

	const download = (version, info_key) => {
		fetch("https://proxy.mcwxt.top/https://mcapks.net/down.php", {
			params: {
				vs: version + "_64"
			}
		}).then(response => {
			response.text().then(data => {
				const match = data.match(
					new RegExp(`(?<=window.location.href=')https://www.123865.com/s/(.){5,}(?=';)`)
				);
				window.location.href =
					(match && match[0]) ||
					"https://mcapks.net/down.php?vs=" + version + "_64" ||
					"https://mcapks.net/info/" +
						encodeURIComponent(btoa(version)) +
						"/" +
						info_key +
						".html";
			});
		});
	};
</script>

<template>
	<div class="m-2">
		<h1 class="text-2xl text-center">MC基岩版全版本下载</h1>
		<div class="w-74 my-3 mx-auto">
			<img src="/img/remcbbsBT.png" alt="Minecraft" />
		</div>
		<div class="alert alert-vertical w-72 my-4 mx-auto">
			<span>
				<icon class="text-xl text-info" name="mingcute:information-fill"></icon>
				<br />
				<b>仅供体验，请支持正版</b><br />
				正版购买：<a
					href="https://www.minecraft.net/zh-hans/store/minecraft-android"
					class="link-success text-decoration-none"
					>官方页面<icon name="mingcute:link-fill"></icon
				></a>
			</span>
		</div>
	</div>
	<div>
		<div class="m-2">
			<table class="table table-xs">
				<thead>
					<tr>
						<th class="text-center">版本</th>
						<th class="text-center">类型</th>
						<th class="text-center">大小</th>
						<th class="text-center">下载</th>
					</tr>
				</thead>
				<template v-if="list">
					<tbody>
						<tr v-for="apk in list">
							<td class="text-center">{{ apk.version }}</td>
							<td class="text-center">
								<span class="text-error" v-if="apk.beta == 'True'">测试版</span>
								<span v-else class="text-success">正式版</span>
							</td>
							<td class="text-center">{{ apk.size }}</td>
							<td class="text-center">
								<a
									class="btn btn-primary"
									@click="download(apk.version, apk.info_key)"
									><icon name="mingcute:download-2-fill"></icon
								></a>
							</td>
						</tr>
					</tbody>
				</template>
			</table>
		</div>
	</div>
	<div class="join grid grid-cols-3 w-50 mx-auto">
		<button class="join-item btn btn-outline btn-sm" @click="page--">上一页</button>
		<button class="join-item btn btn-outline btn-sm">{{ page }}</button>
		<button class="join-item btn btn-outline btn-sm" @click="page++">下一页</button>
	</div>
</template>
