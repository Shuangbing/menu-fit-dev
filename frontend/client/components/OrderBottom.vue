<template>
	<div>
		<md-action-bar class="order-bottom" :actions="data" @click="openCart">
			<md-icon name="setting" size="lg" @click="openSetting"></md-icon>
			<span class="price">
				<small>合計</small>
				&yen;{{totalPrice}}
			</span>
		</md-action-bar>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Toast } from "mand-mobile";

@Component({})
export default class OrderButton extends Vue {
	@Prop() totalPrice: number;

	data = [
		{
			type: "default",
			icon: "edit",
			text: "注文",
			round: true
		}
	];

	openSetting() {
		this.$router.push("/user");
	}

	openCart() {
		if (this.totalPrice > 0) {
			this.$store.commit("setCartVisible", true);
		} else {
			Toast.info("料理を選んでから注文してください");
		}
	}
}
</script>

<style>
.order-bottom {
	padding-bottom: max(40px, constant(safe-area-inset-bottom));
	padding-bottom: max(40px, env(safe-area-inset-bottom));
}
.price {
	font-weight: 500;
	font-size: 1.1rem;
	color: #ff823a;
}
.price small {
	margin-left: 10px;
	font-size: 1rem;
	color: #858b9c;
}
</style>