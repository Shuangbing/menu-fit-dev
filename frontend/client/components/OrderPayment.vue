<template>
  <div class="order-payment">
    <md-tag
      v-if="this.payment == 'line-pay'"
      size="large"
      shape="circle"
      type="fill"
      fill-color="#33CC66"
      font-weight="weight"
      font-color="#fff"
    >LINE Pay</md-tag>
    <md-tag
      v-if="this.payment == 'cash'"
      size="large"
      shape="circle"
      type="fill"
      fill-color="#FF6633"
      font-weight="normal"
      font-color="#fff"
    >現金</md-tag>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({})
export default class OrderPayment extends Vue {
  @Prop() payment: string;
}
</script>

<style scoped>
.order-payment {
  display: inline;
}
</style>
