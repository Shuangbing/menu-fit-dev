<template>
	<div>
		<md-button
			style="position: absolute; z-index: 1000;  height: 3rem; bottom: 1rem; right: 1rem; width: 15rem; font-size: 1rem;"
			type="primary"
			@click="openCart"
			round
		>
			合計金額
			<p style="margin: 0 3px; font-size: 1.5rem;">¥</p>
			<md-amount :value="totalPrice" :precision="0" has-separator></md-amount>
		</md-button>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class OrderButton extends Vue {
	@Prop() totalPrice: number;

	openCart() {
		this.$store.commit("setCartVisible", true);
	}
}
</script>
