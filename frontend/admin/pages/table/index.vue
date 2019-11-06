<template>
	<div>
		<div style="text-align: right; margin-bottom: 10px;">
			<a-button type="primary" @click="$router.push('/table/add')">新規追加</a-button>
		</div>
		<a-table :columns="columns" :dataSource="data" :loading="$store.state.loading" rowKey="_id">
			<template slot="action" slot-scope="data">
				<a-button
					slot="action"
					style="margin-right: 10px;"
					type="primary"
					@click="$router.push('/table/'+data._id)"
				>編集</a-button>
				<a-popconfirm title="このテーブルを削除しますか" @confirm="confirm(data._id)" okText="はい" cancelText="いいえ">
					<a-button type="danger">削除</a-button>
				</a-popconfirm>
			</template>
		</a-table>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class TableIndex extends Vue {
	columns = [
		{
			title: "テーブル",
			dataIndex: "tableNo",
			width: "60%"
		},
		{
			title: "操作",
			dataIndex: "",
			key: "x",
			scopedSlots: { customRender: "action" }
		}
    ];
    
    async confirm(id) {
		await this.$axios.delete("/admin/tables/" + id);
		this.refresh();
    }
    
    async refresh() {
		this.data = await this.$axios.$get("/admin/tables");
	}

	async asyncData({ app }) {
        return {
            data: await app.$axios.$get("/admin/tables")
        }
    }
}
</script>
