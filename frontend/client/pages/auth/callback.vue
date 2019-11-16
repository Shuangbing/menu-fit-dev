<template>
	<div class="main">
		<span>ログイン完了</span>
		<span>注文画面に移動します</span>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class CallBack extends Vue {
	async mounted() {
		await this.$axios
			.get("/client/auth/callback", {
				params: {
					code: this.$route.query.code,
					table: this.$route.query.table,
					state: this.$route.query.state
				}
			})
			.then(res => {
				if (res.data.access_token) {
                    localStorage.token = res.data.access_token;
                    this.$store.commit("setAuth", true);
					if (this.$route.query.table) {
						this.$router.push("/order");
					}
				}
			});
	}
}
</script>

