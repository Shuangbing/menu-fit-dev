<template>
	<div>
		<a-collapse v-model="activeKey">
			<a-collapse-panel header="キッチンモニター" key="1">
				<p>{{getMonitorUrl('[キッチン認証キー]')}}</p>
			</a-collapse-panel>
			<a-collapse-panel header="キッチン認証キー" key="2">
				<p>キッチン認証キー: {{ data.authCode }}</p>
			</a-collapse-panel>
		</a-collapse>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Kitchen extends Vue {
	activeKey = ["1"];

	async asyncData({ app }) {
		return {
			data: await app.$axios.$get("/admin/kitchen/authCode")
		};
	}

	getMonitorUrl(key: string) {
		if (process.browser) {
			return (
				window.location.protocol +
				"//" +
				window.location.host +
				"/admin/kitchen/monitor?key=" +
				key
			);
		}
	}
}
</script>

