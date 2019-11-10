<template>
	<div class="main">
        <md-tag v-if="status == -1" size="small" shape="square" type="ghost" font-color="#FC7353">キャンセル</md-tag>
		<md-tag v-if="status == 0" size="small" shape="square" type="ghost" font-color="#3399FF">支払待ち</md-tag>
        <md-tag v-if="status == 1" size="small" shape="square" type="ghost" font-color="#00CC66">支払済み</md-tag>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class OrderStatus extends Vue {
	@Prop() status: number;
}
</script>

<style scoped>
.main {
	display: inline;
}
</style>
