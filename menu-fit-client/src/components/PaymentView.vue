<template>
  <div class="main">
    <div class="target">
      <img src="https://popcorn-images-aws.s3.ap-northeast-1.amazonaws.com/popcorn_white.png" />
    </div>
    <md-activity-indicator style="margin: 10px 0;" v-if="loading" type="carousel" :size="20"></md-activity-indicator>
    <div class="main" v-if="status == 0">
      <span>支払い情報確認中です</span>
    </div>
    <div class="main" v-if="status == 1">
      <span>支払い完了です</span>
      <span>{{this.data.transactionId}}</span>
    </div>
    <div class="main" v-if="status == -1">
      <span>支払いの確認できませんでした</span>
    </div>
  </div>
</template>

<style lang="stylus">
.main {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin: 30vh 0 0 0;
    height: 10rem;
    width: 10rem;
  }

  span {
    margin: 1vh 0;
  }
}
</style>
<script>
import { ResultPage } from "mand-mobile";

export default {
  name: "result-page-demo",
  components: {
    [ResultPage.name]: ResultPage
  },
  mounted() {
    this.orderId = this.$route.params.id;
    this.transactionId = this.$route.query.transactionId;
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.$http
        .post("/client/payment/line-pay/confirm", {
          transactionId: this.transactionId,
          orderId: this.orderId
        })
        .then(res => {
          this.data = res.data;
          this.loading = false;
          this.status = 1;
        })
        .catch(error => {
          this.loading = false;
          this.status = -1;
        });
    }
  },
  data() {
    return {
      status: 0,
      orderId: null,
      transactionId: null,
      loading: true,
      data: []
    };
  }
};
</script>
