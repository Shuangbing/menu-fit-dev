<template>
	<div class="main">
		<div class="md-child md-child-bill-1">
			<md-bill>
				<div class="header-slot" slot="header">
					<h1 class="title">注文内容</h1>
					<p class="desc">注文内容を確認し支払いをしてください</p>
				</div>
				<md-detail-item title="注文内容" />
				<md-detail-item
					v-for="(item, index) in data.order.detail"
					:key="index"
					:title="item.menu.title +  ' x ' + item.amount"
				>&yen;{{item.total}}</md-detail-item>
				<md-detail-item title="合計金額">&yen;{{this.data.order.total}}</md-detail-item>
				<div class="footer-slot" slot="footer">
					<md-field title="支払方法" class="radio-field">
						<md-radio-list v-model="payment" :options="payments" icon-size="lg" />
					</md-field>
					<md-button type="primary" style="margin: 10px 0;" @click="confirmPayment" round>支払う</md-button>
					<md-button type="warning" @click="cancelOrder" round>キャンセル</md-button>
				</div>
			</md-bill>
		</div>
	</div>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { Dialog } from "mand-mobile";

@Component({})
export default class OrderDetail extends Vue {
	data: any = {};
	orderID: string;
	payments = [
		{
			value: "line-pay",
			text: "LINE Pay",
			brief: "サクッと!ポイント2倍!"
		},
		{
			value: "cash",
			text: "現金",
			brief: "100円につき1ポイント"
		}
	];
	payment = "line-pay";

	async asyncData({ app, query }) {
		return {
			orderID: query.orderID,
			data: await app.$axios.$get("/client/order/detail/" + query.orderID)
		};
	}

	async confirmPayment() {
		await this.$axios
			.get("/client/payment/" + this.payment + "/" + this.orderID)
			.then(res => {
				window.location = res.data.paymentURL;
			});
	}

	async cancelOrder() {
		Dialog.confirm({
			title: "確認",
			content: "注文をキャンセルしますか",
			cancelText: "いいえ",
			confirmText: "はい",
			onConfirm: () => {
				this.$axios
					.delete("/client/order/" + this.orderID)
					.then(res =>
						this.$router.push("/order/" + this.$route.query.tableID)
					);
			}
		});
	}
}
</script>


<style scoped>
.main {
	padding: 1rem 1rem;
}

.md-child-bill-1 .md-bill {
	background-color: #fff;
	box-shadow: 0 6px 24px rgba(17, 26, 52, 0.05);
}

.md-child-bill-1 .md-bill.md-water-mark {
	overflow: visible;
}

.md-child-bill-1 .md-bill .md-bill-neck:before,
.md-child-bill-1 .md-bill .md-bill-neck:after {
	content: "";
	position: absolute;
	top: 0;
	width: 36px;
	height: 36px;
	border-radius: 18px;
	background-color: #f3f4f5;
}

.md-child-bill-1 .md-bill .md-bill-neck:before {
	left: -46px;
}

.md-child-bill-1 .md-bill .md-bill-neck:after {
	right: -46px;
}

.md-child-bill-1 .md-bill .header-slot {
	padding: 40px 0 20px 0;
}

.md-child-bill-1 .md-bill .header-slot .title {
	color: #111a34;
	font-size: 60px;
	line-height: 1;
}

.md-child-bill-1 .md-bill .header-slot .desc {
	margin-top: 16px;
	color: #858b9c;
	font-size: 26px;
}

.md-child-bill-1 .md-bill .footer-slot {
	padding: 32px 0;
	color: #858b9c;
	font-size: 22px;
	line-height: 1.5;
	border-top: solid 1px #e1e4eb;
}
</style>