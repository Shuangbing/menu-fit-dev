<template>
  <div class="payment-view">
    <div class="target">
      <img v-if="data.status != 1" src="~assets/svg/payment.svg" class="status-svg" />
      <img v-if="data.status == 1" src="~assets/svg/foods.svg" class="status-svg" />
    </div>

    <div v-if="loading">
      <md-activity-indicator type="carousel" :size="20"></md-activity-indicator>
      <p>支払い情報確認中です</p>
    </div>

    <div v-if="data.status == 0">
      <md-activity-indicator type="carousel" :size="20"></md-activity-indicator>
      <p>支払待ちです</p>
      <p>会計を済ませてください</p>
    </div>

    <div v-if="data.status == 1">
      <p>支払い完了しました</p>
      <p>しばらくお待ちください</p>
      <md-button type="primary" round @click="$router.push('/user/order')">注文履歴に戻る</md-button>
      <md-button type="default" round @click="$router.push('/order')">メニューに戻る</md-button>
    </div>
    <div v-if="data.status == -1">
      <p>支払いの確認できませんでした</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { Dialog } from "mand-mobile";

@Component({})
export default class Payment extends Vue {
  status: number = 0;
  tableId: string;
  orderId: string;
  loading: boolean = true;
  transactionId = null;
  data: any = {};
  reloadProcessId: NodeJS.Timer;

  @Watch("data.status", { immediate: true, deep: true })
  redirctQuestionnaire() {
    if (this.data.status == 1) {
      Dialog.alert({
        title: '注文完了',
        content: 'アンケートのご記入お願いいたします',
        confirmText: 'はい',
        onConfirm: () => window.location.href = 'https://docs.google.com/forms/u/2/d/e/1FAIpQLScxY06VxnggvRhTnBMzJ2G6oSzB1jEPsfa-BEx47v_VKC2twA/viewform?usp=sf_link',
      })
    }
  }

  async loadPaymentStatus() {
    this.tableId = localStorage.tableID;
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
      })
      .catch(error => {
        this.loading = false;
      });
  }

  async mounted() {
    await this.loadPaymentStatus();
    if (this.data.payment == "cash" && this.data.status == 0) {
      this.reloadProcessId = setInterval(() => {
        if (this.data.status != 0) {
          clearInterval(this.reloadProcessId);
        } else {
          this.loadPaymentStatus();
        }
      }, 1000);
    }
  }
}
</script>

<style scoped>
@keyframes bellshake {
  0% {
    transform: rotate(0);
  }
  15% {
    transform: rotate(5deg);
  }
  30% {
    transform: rotate(-5deg);
  }
  45% {
    transform: rotate(4deg);
  }
  60% {
    transform: rotate(-4deg);
  }
  75% {
    transform: rotate(2deg);
  }
  85% {
    transform: rotate(-2deg);
  }
  92% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(0);
  }
}

.payment-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.payment-view p {
  margin: 1rem auto;
}

.payment-view .md-activity-indicator {
  width: 5rem;
  margin: 1rem auto;
}

.status-svg {
  margin-top: 10rem;
  margin-bottom: 2rem;
  width: 90%;
  height: 90%;
  animation: bellshake 2s;
  animation-iteration-count: infinite;
  backface-visibility: hidden;
  transform-origin: left right;
}

.payment-view .md-button {
  width: 70vw;
  margin: 1rem 1rem;
}

.payment-view img {
  margin: 30vh 0 0 0;
  height: 10rem;
  width: 10rem;
}
</style>