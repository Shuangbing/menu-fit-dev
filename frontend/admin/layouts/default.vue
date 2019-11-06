<template>
	<div>
		<Menu />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Menu from "../components/Menu.vue";

@Component({
	components: {
		Menu
	}
})
export default class Main extends Vue {}
</script>
