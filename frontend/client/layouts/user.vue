<template>
	<div class="main">
		<nuxt />
		<div class="subButton">
			<md-button type="primary" round @click="$router.go(-1)">戻る</md-button>
		</div>
	</div>
</template>

<style scoped>
.subButton {
	padding: 1rem 2rem;
}
</style>