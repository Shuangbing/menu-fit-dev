<template>
  <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="タイトル">
      <a-input
        v-decorator="[
          'title',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
      />
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="金額">
      <a-input-number
        style="width: 10rem;"
        :defaultValue="1000"
        :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\¥\s?|(,*)/g, '')"
        v-decorator="[
          'price',
          {rules: [{ required: true, message: '金額を入力してください' }]}
        ]"
      />
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="アレルギー源">
      <a-select
        v-decorator="[
          'select-multiple', {
            rules: [{ required: true, message: 'アレルギー源を選択してください', type: 'array' }],
          }]"
        mode="multiple"
        placeholder="アレルギー源を選択してください"
      >
        <a-select-option value="red">豚肉</a-select-option>
        <a-select-option value="green">鶏肉</a-select-option>
        <a-select-option value="blue">羊肉</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item v-bind="formItemLayout" label="オプション">
      <a-button type="dashed" style="width: 60%" @click="add">
        <a-icon type="plus" />オプションを追加する
      </a-button>
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      v-for="(k, index) in form.getFieldValue('keys')"
      :label="index+1"
      :key="k"
      :required="false"
    >
      <a-input
        style="width: 10rem; margin-right: 10px;"
        placeholder="タイトル"
        v-decorator="[
          'title',
          {rules: [{ required: true, message: 'タイトルを入力してください' }]}
        ]"
      />
      <a-input-number
        style="width: 10rem; margin-right: 10px;"
        :defaultValue="100"
        :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\¥\s?|(,*)/g, '')"
        @change="onChange"
        v-decorator="[
          'price',
          {rules: [{ required: true, message: '金額を入力してください' }]}
        ]"
      />
      <a-button
        type="danger"
        v-if="form.getFieldValue('keys').length > 1"
        :disabled="form.getFieldValue('keys').length === 1"
        @click="() => remove(k)"
      >削除</a-button>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" :loading="loading" html-type="submit">編集</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
let id = 0;
export default {
  mounted() {
    this.id = this.$route.params.id;
    this.fetch();
  },
  data: () => ({
    formItemLayout: {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
  }),
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("keys", { initialValue: [], preserve: true });
  },
  methods: {
    async fetch(params = {}) {
      if (this.id) {
        this.loading = true;
        await this.$http.get("/admin/menus/" + this.id).then(data => {
          //console.log(this.form);
          const pagination = { ...this.pagination };
          pagination.total = 200;
          this.loading = false;
          this.form.attrs = data.data;
          this.form.setFieldsValue(data.data);
          this.pagination = pagination;
        });
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (this.id) {
            await this.$http.put("/admin/menus/" + this.id, values);
          } else {
            await this.$http.post("/admin/menus/", values);
          }
          this.$router.push("/menu");
        }
      });
    },
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      });
    },
    add() {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(++id);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      });
    }
  }
};
</script>
<style>
#components-form-demo-validate-other .dropbox {
  height: 180px;
  line-height: 1.5;
}
</style>