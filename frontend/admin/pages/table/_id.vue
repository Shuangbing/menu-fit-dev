<template>
	<div>
		<a-form :form="form" @submit="handleSubmit">
			<a-form-item label="テーブル番号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-input
					v-decorator="[
          'tableNo',
          {rules: [{ required: true, message: 'テーブル番号を入力してください' }]}
        ]"
				/>
			</a-form-item>
			<a-form-item v-if="this.id" label="注文QRコード" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
				<a-card hoverable style="width: 250px; font-size: 12px">
					<qrcode-vue :value="getQRCodeURL(this.id)" :size="200" level="L"></qrcode-vue>
					<a-card-meta :title="form.getFieldValue('tableNo')">
						<template slot="description" class="font-size: 5px">LINEでスキャンして注文しましょう</template>
					</a-card-meta>
				</a-card>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 12, offset: 5 }">
				<a-button v-if="this.id" style="margin-right: 10px;" icon="qrcode">注文QRコード印刷</a-button>
				<a-button type="primary" html-type="submit">{{id ? '編集' : '追加'}}</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import QrcodeVue from "qrcode.vue";

@Component({
	components: { QrcodeVue }
})
export default class TableEdit extends Vue {
	id = false;
	data = {};
	form: any;

	formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 }
	};

	getQRCodeURL(tableID) {
		return (
			
			"/go/" +
			tableID
		);
	}

	async beforeCreate() {
		this.form = this.$form.createForm(this);
	}

	async mounted() {
		this.form.setFieldsValue(this.data);
	}

	async asyncData({ app, params }) {
		if (params.id != "add") {
			return {
				id: params.id,
				data: await app.$axios.$get("/admin/tables/" + params.id)
			};
		} else {
			return { id: false };
		}
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.form.validateFields(async (err, values) => {
			if (!err) {
				if (this.id) {
					await this.$axios.put("/admin/tables/" + this.id, values);
				} else {
					await this.$axios.post("/admin/tables/", values);
				}
				this.$router.push("/table");
			}
		});
	}
}
</script>
