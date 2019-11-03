<template>
  <div class="main">
    <span>ログイン完了</span>
    <span>注文画面に移動します</span>
  </div>
</template>

<script>
import { Dialog } from "mand-mobile";

export default {
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      console.log(this.$route.query);
      await this.$http
        .get("/client/auth/callback", {
          params: {
            code: this.$route.query.code,
            table: this.$route.query.table,
            state: this.$route.query.state
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.access_token) {
            localStorage.token = res.data.access_token;
            if (this.$route.query.table) {
              this.$router.push("/order/" + this.$route.query.table);
            }
          }
        });
    }
  }
};
</script>