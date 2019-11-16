<template>
	<div>
		<a-drawer
			width="500"
			title="テーブル"
			placement="right"
			:closable="false"
			@close="onClose"
			:destroyOnClose="true"
			:visible="$store.state.editVisible"
		>
			<a-form layout="vertical">
				<a-form-item label="テーブル番号">
					<a-input
						v-model="data.tableNo"
						v-decorator="[
          'data.tableNo',
          {rules: [{ required: true, message: 'テーブル番号を入力してください' }]}
        ]"
					/>
				</a-form-item>
				<a-form-item v-if="this.editData" label="認識ID">
					<span>{{this.data._id}}</span>
				</a-form-item>
				<a-form-item v-if="this.editData" label="注文QRコード">
					<a-card hoverable style="width: 250px; font-size: 12px">
						<qrcode-vue :value="getQRCodeURL(this.data._id)" :size="200" level="L"></qrcode-vue>
						<a-card-meta>
							<template slot="description" class="font-size: 5px">LINEでスキャンして注文しましょう</template>
						</a-card-meta>
					</a-card>
				</a-form-item>
				<a-form-item>
					<a-button v-if="this.editData" style="margin-right: 10px;" icon="qrcode">注文QRコード印刷</a-button>
					<a-button type="primary" html-type="submit" @click="submitForm">{{this.editData ? '編集' : '追加'}}</a-button>
				</a-form-item>
			</a-form>
		</a-drawer>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import QrcodeVue from "qrcode.vue";

@Component({
	components: { QrcodeVue },
	watchQuery: ["editData"]
})
export default class TableForm extends Vue {
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

	getQRCodeURL(tableId) {
		if (process.browser) {
			return (
				window.location.protocol +
				"//" +
				window.location.host +
				"/order?tableId=" +
				tableId
			);
		}
	}
	onClose() {
		this.data = {};
		this.$store.commit("showEditor", false);
	}

	async submitForm() {
		if (this.editData) {
			await this.$axios.put(
				"/admin/tables/" + this.editData._id,
				this.data
			);
		} else {
			await this.$axios.post("/admin/tables/", this.data);
		}
		this.onClose();
	}
}
</script>
