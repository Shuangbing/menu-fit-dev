<template>
	<div class="main">
		<md-field>
			<md-cell-item
				v-for="(item, index) in data.orders"
				:key="index"
				:title="item.table.tableNo"
				:brief="item.createdAt"
                arrow
			>
				<span slot="right">
					<OrderPayment :payment="item.payment" />
					<span>¥{{item.total}}</span>
				</span>
			</md-cell-item>
		</md-field>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import OrderPayment from "../../components/OrderPayment.vue";

@Component({
	layout: "user",
	components: { OrderPayment }
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
