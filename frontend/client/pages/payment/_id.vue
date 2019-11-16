<template>
	<div class="payment-view">
		<div class="target">
			<img src="https://popcorn-images-aws.s3.ap-northeast-1.amazonaws.com/popcorn_white.png" />
		</div>
		<md-activity-indicator style="margin: 10px 0;" v-if="loading" type="carousel" :size="20"></md-activity-indicator>
		<div v-if="status == 0">
			<span>支払い情報確認中です</span>
		</div>
		<div v-if="status == 1">
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
  status:number = 0;
  tableId:string;
  orderId:string;
  loading:boolean = true;
	transactionId = null;
	data = {};
	async mounted() {
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
	text-align: center;
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