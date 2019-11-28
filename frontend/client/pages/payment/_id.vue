<template>
  <div class="payment-view">
    <div class="target">
      <svg
        t="1574939202238"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1147"
        width="200"
        height="200"
      >
        <path
          d="M277.457757 554.250025c0-53.972871-75.370905-111.614464-75.370905-156.492318 0-111.580337 172.156907-202.018597 384.516181-202.018597 83.680987 0 161.065422 14.077654 224.201566 37.932878 5.835827-10.989102 9.743443-21.6028 9.743443-31.670455 0-111.546209-172.156907-201.984469-384.516181-201.984469C223.672588 0.017064 51.515681 90.455324 51.515681 202.001533c0 44.911981 75.387969 102.553574 75.387968 156.526446L96.683619 739.887352c0 51.140277 39.519813 88.219963 93.680387 88.219963h65.388569l21.705182-273.85729z"
          fill="#D99A02"
          p-id="1148"
        />
        <path
          d="M586.603033 195.73911c83.680987 0 161.065422 14.077654 224.201566 37.932878 4.214764-7.951741 7.371571-15.681653 8.821997-23.172671-70.320013-40.526579-171.610865-65.951675-284.215031-65.951675-212.359273 0-384.516181 90.43826-384.516181 202.001533 0 44.894918 75.370905 102.536511 75.370905 156.509382L200.516981 828.107315H255.752575l21.705182-273.85729c0-53.972871-75.370905-111.614464-75.370905-156.492318 0-111.580337 172.156907-202.018597 384.516181-202.018597z"
          fill="#020403"
          opacity=".35"
          p-id="1149"
        />
        <path
          d="M835.154674 1023.846426c54.177637 0 92.673621-41.482153 92.673621-92.639494l-29.349775-378.885119c0-56.617764 72.623629-110.556507 72.62363-154.564106 0-111.580337-172.139843-202.018597-384.499117-202.018597-212.359273 0-384.516181 90.43826-384.516181 202.018597 0 44.877854 75.370905 102.519447 75.370905 156.492318L247.237727 935.609398c0 51.15734 39.536877 88.237027 93.69745 88.237028h494.219497z"
          fill="#FBB713"
          p-id="1150"
        />
        <path
          d="M971.10215 397.757707c0-111.580337-172.139843-202.018597-384.499117-202.018597a730.331611 730.331611 0 0 0-42.659557 1.279787c192.275154 11.142676 341.83956 96.734811 341.83956 200.73881 0 44.007599-72.623629 97.946342-72.623629 154.564106l29.349775 378.885119c0 51.140277-38.495984 92.639493-92.673621 92.639494h85.319113c54.177637 0 92.673621-41.499217 92.673621-92.639494l-29.349775-378.885119c0-56.617764 72.623629-110.556507 72.62363-154.564106z"
          fill="#020403"
          opacity=".25"
          p-id="1151"
        />
        <path
          d="M779.577804 544.284753a26.551308 26.551308 0 1 1-53.102617-0.034128 26.551308 26.551308 0 0 1 53.102617 0.034128zM608.939577 476.012398a26.551308 26.551308 0 1 1-53.11968 0 26.551308 26.551308 0 0 1 53.11968 0zM438.30135 544.284753a26.551308 26.551308 0 1 1-53.102616-0.034128 26.551308 26.551308 0 0 1 53.102616 0.034128zM438.30135 697.842093a26.551308 26.551308 0 1 1-53.085553-0.017064 26.551308 26.551308 0 0 1 53.085553 0.017064zM608.939577 749.033561a26.551308 26.551308 0 1 1-53.11968 0 26.551308 26.551308 0 0 1 53.11968 0zM608.939577 612.52298a26.551308 26.551308 0 1 1-53.11968 0 26.551308 26.551308 0 0 1 53.11968 0zM779.577804 680.795334a26.551308 26.551308 0 1 1-53.102617-0.034128 26.551308 26.551308 0 0 1 53.102617 0.034128zM438.30135 868.48032a26.551308 26.551308 0 1 1-53.102616 0 26.551308 26.551308 0 0 1 53.102616 0zM608.939577 919.688852a26.551308 26.551308 0 1 1-53.102616-0.034128 26.551308 26.551308 0 0 1 53.102616 0.034128zM779.577804 834.352675a26.551308 26.551308 0 1 1-53.085553-0.017064 26.551308 26.551308 0 0 1 53.085553 0.017064z"
          fill="#B17D0A"
          p-id="1152"
        />
      </svg>
    </div>

    <div v-if="loading">
      <md-activity-indicator type="carousel" :size="20"></md-activity-indicator>
      <span>支払い情報確認中です</span>
    </div>

    <div v-if="data.status == 0">
      <md-activity-indicator type="carousel" :size="20"></md-activity-indicator>
      <span>支払い待ち</span>
    </div>

    <div v-if="data.status == 1">
      <span>支払い完了です</span>
      <md-button type="primary" round @click="$router.push('/user/order')">注文履歴に戻る</md-button>
      <md-button type="default" round @click="$router.push('/order')">メニューに戻る</md-button>
    </div>
    <div v-if="status == -1">
      <span>支払いの確認できませんでした</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Payment extends Vue {
  status: number = 0;
  tableId: string;
  orderId: string;
  loading: boolean = true;
  transactionId = null;
  data: any = {};
  reloadProcessId: NodeJS.Timer;

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

.payment-view .md-activity-indicator {
  width: 5rem;
  margin: 1rem auto;
}

.payment-view svg {
  margin-top: 10rem;
  margin-bottom: 2rem;
  width: 8rem;
  height: 8rem;
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