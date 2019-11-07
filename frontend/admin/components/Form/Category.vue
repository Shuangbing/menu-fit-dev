<template>
	<div>
		<a-drawer
			width="500"
			title="カテゴリ"
			placement="right"
			:closable="false"
			@close="onClose"
			:destroyOnClose="true"
			:visible="$store.state.editVisible"
		>
			<a-form layout="vertical">
				<a-form-item label="タイトル">
					<a-input
						v-model="data.title"
						v-decorator="['data.title',{rules: [{ required: true, message: 'タイトルを入力してください' }]}]"
					/>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" html-type="submit" @click="submitForm">{{this.editData ? '編集' : '追加'}}</a-button>
				</a-form-item>
			</a-form>
		</a-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";

@Component({
	watchQuery: ["editData"]
})
export default class CategoryForm extends Vue {
	@Prop() editData!: any;

	data = {};

	@Watch("editData")
	private dataChange(val: any, oldVal: any) {
		if (val) {
			this.data = this.editData;
		} else {
			this.data = {};
		}
	}

	onClose() {
		this.data = {};
		this.$store.commit("showEditor", false);
	}

	async submitForm() {
		if (this.editData) {
			await this.$axios.put("/admin/categories/" + this.editData._id, this.data);
		} else {
			await this.$axios.post("/admin/categories/", this.data);
		}
		this.onClose();
	}
}
</script>
