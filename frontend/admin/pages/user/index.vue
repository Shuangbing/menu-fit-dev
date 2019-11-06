<template>
	<div>
		<a-table :columns="columns" :dataSource="data" :pagination="pagination" :loading="$store.state.loading" rowKey="_id">
			<template slot="avatar" slot-scope="avatar">
				<a-avatar shape="square" size="large" icon="user" :src="avatar" />
			</template>
		</a-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class UserIndex extends Vue {
	loading = true;
	pagination = {};
	columns = [
		{
			title: "プロフィール写真",
			dataIndex: "profile.picture",
			width: "10rem",
			scopedSlots: { customRender: "avatar" }
		},
		{
			title: "名前",
			dataIndex: "profile.name",
			width: "20%"
		},
		{
			title: "openID",
			dataIndex: "openID"
		}
	];

	async asyncData({ app }) {
		return {
			data: await app.$axios.$get("/admin/users")
		};
	}

	created() {
		this.loading = false;
	}
}
</script>
