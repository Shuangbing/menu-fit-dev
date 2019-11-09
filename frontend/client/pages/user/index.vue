<template>
	<md-field>
		<md-cell-item :title="data.name" brief="アカウント">
			<img class="avatar" slot="left" :src="data.avatar" />
		</md-cell-item>
		<md-cell-item title="注文履歴" @click="$router.push('/user/order')" arrow />
		<md-cell-item title="アレルギー情報登録" arrow />
	</md-field>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
	layout: "user"
})
export default class User extends Vue {
	data = {};

	async asyncData({ app }) {
		return {
			data: await app.$axios.$get("/client/user")
		};
	}
}
</script>

<style>
.avatar {
	display: block;
	width: 5rem;
	height: 5rem;
	border-radius: 5rem;
	background-color: #e6e6e6;
}

</style>
