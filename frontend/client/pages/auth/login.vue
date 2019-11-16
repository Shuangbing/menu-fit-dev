<template>
	<div class="main">
		<md-steps style="padding: 100px 50px;" :steps="steps"></md-steps>
		<div class="button">
			<md-button class="md-button-line" @click="LoginLine" type="default">LINEでログイン</md-button>
			<md-button class="md-button-alipay" type="default">Alipayでログイン</md-button>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Login extends Vue {
	steps = [
		{
			name: "ログイン"
		},
		{
			name: "注文"
		},
		{
			name: "支払い"
		}
	];

	async mounted() {
		//Auto Login by LINE
		if (navigator.userAgent.includes("Line/")) {
			this.LoginLine();
		}
	}

	async LoginLine() {
		await this.$axios
			.get(
				"/client/auth/login?tableID=" + this.$route.query.tableID ||
					localStorage.tableID
			)
			.then(res => {
				window.location = res.data;
			});
	}
}
</script>

<style scoped>
.main {
	background-color: #f9fafb;
	height: 100vh;
}

.button {
	margin: 30px 30px 30px 30px;
	height: auto;
	padding: 50px 0;
}

.md-button-line {
	background-color: #58bf38;
	color: white;
	margin-bottom: 20px;
}

.md-button-alipay {
	background-color: #44a9e8;
	color: white;
}
</style>
