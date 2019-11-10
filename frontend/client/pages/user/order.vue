<template>
	<md-scroll-view style="height: 80vh; padding: 1rem 1rem" ref="scrollView" @scroll="$_onScroll">
		<md-cell-item
			v-for="(item, index) in data.orders"
			:key="index"
			:title="item.table.tableNo"
			:brief="item.createdAt"
			arrow
		>
			<span slot="default">
				<OrderStatus :status="item.status" />
			</span>
			<span slot="right">
				<OrderPayment :payment="item.payment" />
				<span>¥{{item.total}}</span>
			</span>
		</md-cell-item>
	</md-scroll-view>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import OrderPayment from "../../components/OrderPayment.vue";
import OrderStatus from "../../components/OrderStatus.vue";

@Component({
	layout: "user",
	components: { OrderPayment, OrderStatus }
})
export default class UserOrder extends Vue {
	data: any = {};

	async asyncData({ app }) {
		return {
			data: await app.$axios.$get("/client/user/order")
		};
	}
}
</script>

<style>
.avatar {
	display: block;
	width: 5rem;
	height: 5rem;
	border-radius: 5rem;
	background-color: #e6e6e6;
}
</style>
