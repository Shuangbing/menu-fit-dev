<template>
  <div>{{orderDetail._id}}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class Accounting extends Vue {
  @Prop() orderDetail;
}
</script>

<style scoped>
</style>>
