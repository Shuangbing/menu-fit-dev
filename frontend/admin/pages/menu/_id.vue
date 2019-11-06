<template>
	<div>
		<a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
			<a-form-item v-bind="formItemLayout" label="タイトル">
				<a-input
					v-decorator="[
          'title',
          {rules: [{ required: true, message: 'タイトルを入力してください' }], initialValue: ''}
        ]"
				/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="料理写真">
				<a-upload
					name="file"
					listType="picture-card"
					class="avatar-uploader"
					:showUploadList="false"
					:action="this.$axios.defaults.baseURL + '/admin/upload'"
					@change="handleUpload"
				>
					<img width="250" height="250" v-if="this.data.picture" :src="this.data.picture" alt="avatar" />
					<div v-else>
						<a-icon :type="loading ? 'loading' : 'plus'" />
						<div class="ant-upload-text">アップロード</div>
					</div>
				</a-upload>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="金額">
				<a-input-number
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

			<a-form-item v-bind="formItemLayout" label="カテゴリー">
				<a-select
					v-decorator="[
          'category',
          {rules: [{ required: true, message: 'カテゴリーを選択してください' }]}
        ]"
					placeholder="カテゴリーを選択してください"
				>
					<a-select-option v-for="item in categories" v-bind:key="item" :value="item._id">{{item.title}}</a-select-option>
				</a-select>
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="詳細情報">
				<a-textarea
					placeholder="詳細情報を入力してください"
					:autosize="{ minRows: 2, maxRows: 10 }"
					v-decorator="[
          'summary',
          {rules: [{ required: true, message: '詳細情報を入力してください' }], initialValue: ''}
        ]"
				/>
			</a-form-item>

			<a-form-item v-bind="formItemLayout" label="アレルギー源">
				<a-select
					v-decorator="['allergies', {initialValue: []}]"
					mode="multiple"
					placeholder="アレルギー源を選択してください"
				>
					<a-select-option value="prok">豚肉</a-select-option>
					<a-select-option value="chicken">鶏肉</a-select-option>
					<a-select-option value="lamp">羊肉</a-select-option>
					<a-select-option value="dog">犬</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item :wrapper-col="{ span: 12, offset: 6 }">
				<a-button type="primary" html-type="submit">{{id ? '編集' : '追加'}}</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class MenuEdit extends Vue {
	id = false;
    data = {};
    categories = {};
	form: any;
	formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 }
	};

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener("load", () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	async beforeCreate() {
		this.form = this.$form.createForm(this);
	}

	async mounted() {
		this.form.setFieldsValue(this.data);
		this.form.getFieldDecorator("picture", {
			initialValue: "",
			preserve: true
		});
		this.form.getFieldDecorator("keys", {
			initialValue: Array.from(new Array(20).keys()),
			preserve: true
		});
	}

	async asyncData({ app, params }) {
		if (params.id != "add") {
			return {
				id: params.id,
				categories: app.$axios.$get("/admin/categories"),
				data: await app.$axios.$get("/admin/menus/" + params.id)
			};
		} else {
			return {
				id: false,
				categories: app.$axios.$get("/admin/categories")
			};
		}
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.form.validateFields(async (err, values) => {
			if (!err) {
				if (this.id) {
					await this.$axios.put("/admin/menus/" + this.id, values);
				} else {
					await this.$axios.post("/admin/menus/", values);
				}
				this.$router.push("/table");
			}
		});
	}
}
</script>
