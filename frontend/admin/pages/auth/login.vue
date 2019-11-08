<template>
	<div class="main">
		<a-card title="ログイン" class="login-card" :bordered="false" hoverable>
			<a-form>
				<a-form-item label="アカウント">
					<a-input v-model="data.username" type="text" />
				</a-form-item>
				<a-form-item label="パスワード">
					<a-input v-model="data.password" type="password" />
				</a-form-item>
				<a-form-item>
					<a-button
						:loading="$store.state.loading"
						type="primary"
						html-type="submit"
						@click="handleLogin"
					>ログイン</a-button>
				</a-form-item>
			</a-form>
		</a-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
	layout: "auth"
})
export default class Login extends Vue {
	data = {};

	async handleLogin() {
		this.$axios.post("/admin/auth/login", this.data).then(res => {
			if (res.data.access_token && process.client) {
				localStorage.token = res.data.access_token;
				this.$router.push("/");
			}
		});
	}
}
</script>

<style scoped>
.main {
	background-color: #ececec;
	padding: 20px;
	height: 100vh;
}
.login-card {
	width: 30rem;
	margin: 10rem auto;
}
</style>