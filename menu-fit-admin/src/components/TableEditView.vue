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
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">{{id ? '編集' : '追加'}}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
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
  methods: {
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
      this.form.validateFields(async(err, values) => {
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