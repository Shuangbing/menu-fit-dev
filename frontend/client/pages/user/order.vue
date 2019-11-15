<template>
  <div class="user-order-view">
    <md-scroll-view class="order-list" :scrolling-x="false">
      <md-cell-item
        v-for="(item, index) in data.orders"
        :key="index"
        :title="item.table.tableNo"
        :brief="item.createdAt"
        arrow
      >
        <span slot="default">
          <OrderStatus :status="item.status" />
        </span>
        <span slot="right">
          <OrderPayment :payment="item.payment" />
          <span>¥{{item.total}}</span>
        </span>
      </md-cell-item>
    </md-scroll-view>
    <div class="sub-button">
      <md-button type="primary" round @click="$router.go(-1)">戻る</md-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import OrderPayment from "../../components/OrderPayment.vue";
import OrderStatus from "../../components/OrderStatus.vue";

@Component({
  components: { OrderPayment, OrderStatus }
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
.user-order-view {
  margin: 0;
  padding: 0;
  height: 10vh;
}
.sub-button {
  padding: 1rem 2rem;
}
.order-list {
  height: 80vh;
  padding: 1rem 1rem;
}
.avatar {
  display: block;
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
  background-color: #e6e6e6;
}
</style>
