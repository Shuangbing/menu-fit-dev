<template>
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
        :action="this.$http.defaults.baseURL + '/admin/upload'"
        
        @change="handleUpload"
      >
        <img
          width="250"
          height="250"
          v-if="this.data.picture"
          :src="this.data.picture"
          alt="avatar"
        />
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
        <a-select-option v-for="item in categories" v-bind:key="item" :value="item._id">
          {{item.title}}
        </a-select-option>
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

    <a-form-item v-bind="formItemLayout" label="オプション">
      <a-button type="dashed" style="width: 60%" @click="add">
        <a-icon type="plus" />オプションを追加する
      </a-button>
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      v-for="(k, index) in form.getFieldValue('keys')"
      :key="k"
      :label="index+1"
      :required="false"
    >
      <a-input
        style="width: 10rem; margin-right: 10px;"
        placeholder="タイトル"
        v-decorator="[
          `options[${k}].title`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [{
              required: true,
              whitespace: true,
              message: '情報を入力してください',
            }],
            initialValue: ''
          }
        ]"
      />
      <a-input-number
        :defaultValue="1000"
        style="width: 10rem; margin-right: 10px;"
        :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\¥\s?|(,*)/g, '')"
        v-decorator="[
          `options[${k}].price`,
          {
            initialValue: ''
          }
        ]"
      />
      <a-icon
        v-if="form.getFieldValue('keys').length >= 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="form.getFieldValue('keys').length === 1"
        @click="() => remove(k)"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">{{id ? '編集' : '追加'}}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
let option_id = 0;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  mounted() {
    this.id = this.$route.params.id;
    this.fetch();
    this.getCategories();
  },
  data() {
    return {
      data: [],
      categories: [],
      loading: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    };
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("picture", {initialValue: '', preserve: true})
    this.form.getFieldDecorator("keys", {
      initialValue: Array.from(new Array(20).keys()),
      preserve: true
    });
  },
  methods: {
    async getCategories() {
      await this.$http.get("/admin/categories").then(res => {
        this.categories = res.data
      })
    },
    async fetch(params = {}) {
      if (this.id) {
        this.loading = true;
        await this.$http.get("/admin/menus/" + this.id).then(data => {
          const pagination = { ...this.pagination };
          pagination.total = 200;
          this.loading = false;
          this.data = data.data;
          data.data.keys = Array.from(
            new Array(data.data.options.length).keys()
          );
          option_id = data.data.options.length - 1;
          this.form.setFieldsValue(data.data);
          this.pagination = pagination;
        });
      } else {
        this.form.setFieldsValue({ keys: [] });
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (values.options)
            values.options = values.options.filter(item => item !== null);
          if (this.id) {
            await this.$http.put("/admin/menus/" + this.id, values);
          } else {
            await this.$http.post("/admin/menus/", values);
          }
          this.$router.push("/menu");
        }
      });
    },
    handleUpload(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.data.picture = info.file.response.location;
        this.form.setFieldsValue({picture: this.data.picture});
        this.loading = false;
      }
    },
    beforeUpload(file) {
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
    },
    remove(k) {
      const { form } = this;
      // can use data-binding to get
      const keys = form.getFieldValue("keys");
      // We need at least one passenger
      if (keys.length === 1) {
        form.setFieldsValue({
          keys: []
        });
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      });
    },

    add() {
      const { form } = this;
      const keys = form.getFieldValue("keys");
      const nextKeys = keys.concat(++option_id);
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
.avatar-uploader > .ant-upload {
    width: 250px;
    height: 250px;
  }
</style>