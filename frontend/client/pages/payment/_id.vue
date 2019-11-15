<template>
  <div class="payment-view">
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
      <md-button type="primary" round>注文履歴に戻る</md-button>
    </div>
    <div class="main" v-if="status == -1">
      <span>支払いの確認できませんでした</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Payment extends Vue {
  status = 0;
  orderId = null;
  transactionId = null;
  loading = true;
  data = {};
  async mounted() {
    this.orderId = this.$route.params.id;
    this.transactionId = this.$route.query.transactionId;
    await this.$axios
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
}
</script>

<style scoped>
.payment-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.payment-view .md-button {
  width: 70vw;
}

.payment-view img {
  margin: 30vh 0 0 0;
  height: 10rem;
  width: 10rem;
}

.payment-view span {
  margin: 1vh 0;
}
</style>