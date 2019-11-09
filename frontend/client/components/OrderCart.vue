<template>
	<div>
		<md-popup v-model="$store.state.cartVisible" :mask-closable="false" position="bottom">
			<md-popup-title-bar
				title="カート"
				describe="注文を確認してください"
				ok-text="次へ"
				cancel-text="閉じる"
				@confirm="confirmOrder"
				@cancel="closeCart"
				large-radius
			></md-popup-title-bar>
			<div class="popup_cart">
				<div style="padding: 1rem 1rem">
					<md-field>
						<div v-for="(item, index) of menu" :key="index">
							<md-cell-item v-if="item.cart > 0" :title="item.title">
								<span>¥{{item.price}}</span>
								<span slot="right">x {{item.cart}}</span>
							</md-cell-item>
						</div>
					</md-field>
					<md-button type="primary" @click="confirmOrder" round>
						合計金額
						<p style="margin: 0 3px; font-size: 1.5rem;">¥</p>
						<md-amount :value="total" :precision="0" has-separator></md-amount>
					</md-button>
				</div>
			</div>
		</md-popup>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class OrderCart extends Vue {
	@Prop() menu;
	@Prop() total: number;
	@Prop() tableID: string;

	closeCart() {
		this.$store.commit("setCartVisible", false);
	}

	async confirmOrder() {
		var order = [];
		this.menu.forEach(element => {
			if (element.cart > 0) {
				order.push({
					menu: element._id,
					amount: element.cart
				});
			}
		});
		await this.$axios
			.post("/client/order/" + this.tableID, { detail: order })
			.then(res => {
				this.$router.push({
					path: "detail",
					query: { orderID: res.data.orderID, tableID: this.tableID }
				});
			});
	}
}
</script>

<style scoped>
.popup_cart {
	width: 100%;
	background-color: white;
}
</style>
