<template>
	<div>
		<md-selector
			v-model="$store.state.allergyVisible"
			:data="allergiesArray"
			:defaultValue="allergiesData"
			title="アレルギー"
			min-height="320px"
			okText="登録"
			cancelText="閉じる"
			@cancel="closeAllergy"
			@confirm="confirmAllergy"
			large-radius
			multi
		></md-selector>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";

@Component({})
export default class AllergySelector extends Vue {
	@Prop() allergiesData: [];
    @Prop() allergiesArray: [];

	data = {};

	closeAllergy() {
		this.$store.commit("setAllergyVisible", false);
	}

	async confirmAllergy(allergiesValue: any) {
		this.closeAllergy();
		await this.$axios.put("/client/user/allergy", {
			allergies: allergiesValue
		});
	}

	selectorShow = false;
}
</script>
