<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="テーブル番号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input
        v-decorator="[
          'tableNo',
          {rules: [{ required: true, message: 'テーブル番号を入力してください' }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      v-if="this.id"
      label="注文QRコード"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-card hoverable style="width: 250px; font-size: 12px">
        <qrcode-vue
          :value="handleQrURL(this.id)"
          :size="200"
          level="L"
        ></qrcode-vue>
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
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      id: this.$route.params.id,
      formLayout: "horizontal",
      form: this.$form.createForm(this)
    };
  },
  components: {
    QrcodeVue
  },
  methods: {
    handleQrURL(tableID) {
      return window.location.protocol + '//' + window.location.host + '/go/' + tableID;
    },
    async fetch(params = {}) {
      if (this.id) {
        this.loading = true;
        await this.$http.get("/admin/tables/" + this.id).then(res => {
          const pagination = { ...this.pagination };
          pagination.total = 200;
          this.loading = false;
          this.data = res.data;
          this.form.setFieldsValue(res.data);
          this.pagination = pagination;
        });
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (this.id) {
            await this.$http.put("/admin/tables/" + this.id, values);
          } else {
            await this.$http.post("/admin/tables/", values);
          }
          this.$router.push("/table");
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === "male" ? "man" : "lady"}!`
      });
    }
  }
};
</script>