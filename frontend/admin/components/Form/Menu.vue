<template>
	<div>
		<a-drawer
			width="500"
			title="メニュー"
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
						v-decorator="[
          'data.title',
          {rules: [{ required: true, message: 'タイトルを入力してください' }], initialValue: ''}
        ]"
					/>
				</a-form-item>
				<a-form-item label="料理写真">
					<a-upload
						name="file"
						listType="picture-card"
						class="avatar-uploader"
						:showUploadList="false"
						:action="this.$axios.defaults.baseURL + '/admin/upload'"
						@change="handleUpload"
					>
						<img
							width="250"
							height="250"
							v-if="this.data.picture"
							v-bind:src="this.data.picture"
							alt="avatar"
						/>
						<div v-else>
							<a-icon :type="$store.state.loading ? 'loading' : 'plus'" />
							<div class="ant-upload-text">アップロード</div>
						</div>
					</a-upload>
				</a-form-item>
				<a-form-item label="金額">
					<a-input-number
						v-model="data.price"
						style="width: 10rem;"
						:defaultValue="1000"
						:formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
						:parser="value => value.replace(/\¥\s?|(,*)/g, '')"
						v-decorator="[
          'price',
          {rules: [{ required: true, message: '金額を入力してください' }], initialValue: '0'}
        ]"
					/>
				</a-form-item>

				<a-form-item label="最大数">
					<a-input-number :min="1" v-model="data.max" />
				</a-form-item>

				<a-form-item label="カテゴリー">
					<a-select
						v-model="data.category"
						v-decorator="[
          'category',
          {rules: [{ required: true, message: 'カテゴリーを選択してください' }]}
        ]"
						placeholder="カテゴリーを選択してください"
					>
						<a-select-option
							v-for="(item, index) in categories"
							:key="index"
							:value="item._id"
						>{{item.title}}</a-select-option>
					</a-select>
				</a-form-item>

				<a-form-item label="詳細情報">
					<a-textarea
						v-model="data.summary"
						placeholder="詳細情報を入力してください"
						:autosize="{ minRows: 2, maxRows: 10 }"
						v-decorator="[
          'summary',
          {rules: [{ required: true, message: '詳細情報を入力してください' }], initialValue: ''}
        ]"
					/>
				</a-form-item>

				<a-form-item label="アレルギー源">
					<a-select v-model="data.allergies" mode="multiple" placeholder="アレルギー源を選択してください">
						<a-select-option
							v-for="(item, index) in allergies"
							:key="index"
							:value="item._id"
						>{{item.title}}</a-select-option>
					</a-select>
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
export default class MenuForm extends Vue {
	@Prop() editData!: any;
	@Prop() categories: any;
	@Prop() allergies: any;

	data: any = {};

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
			await this.$axios.put(
				"/admin/menus/" + this.editData._id,
				this.data
			);
		} else {
			await this.$axios.post("/admin/menus/", this.data);
		}
		this.onClose();
	}

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	async handleUpload(info) {
		if (info.file.status === "uploading") {
			return;
		}
		if (info.file.status === "done") {
			this.data.picture = info.file.response.location;
		}
	}

	async beforeUpload(file) {
		const isJPG = file.type === "image/jpeg";
		const isPNG = file.type === "image/png";
		if (!isJPG && !isPNG) {
			this.$message.error(
				"アップロード可能なファイル拡張子はJPG/PNGになります"
			);
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			this.$message.error(
				"アップロード可能なファイルサイズは２MBのみになります"
			);
		}
		return isJPG && isPNG && isLt2M;
	}
}
</script>
