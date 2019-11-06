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
			<a-form-item :wrapper-col="{ span: 12, offset: 6 }">
				<a-button :loading="$store.state.loading" type="primary" html-type="submit">{{id ? '編集' : '追加'}}</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class CategoryEdit extends Vue {
    id = false;
	data = {};
	form: any;

	formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 }
	};

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
				data: await app.$axios.$get("/admin/categories/" + params.id)
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
					await this.$axios.put(
						"/admin/categories/" + this.id,
						values
					);
				} else {
					await this.$axios.post("/admin/categories/", values);
				}
				this.$router.push("/category");
			}
		});
	}
}
</script>
