<template>
  <div class="monitor">
    <a-button v-show="!notify" style="margin: 1rem 1rem;" @click="notify=true">Notify Sound ON</a-button>
    <audio id="audioplayer" preload="auto">
      <source src="~assets/sounds/notify.mp3" type="audio/mp3" />
    </audio>
    <div class="kitchen">
      <a-row type="flex">
        <a-col v-for="(item, index) in data" :key="index">
          <a-card
            :title="item.table.tableNo"
            :bordered="false"
            style="width: 300px; margin: 1rem 0.5rem; min-height: 250px;"
          >
            <a-button slot="extra" @click="doneOrder(item._id)" type="primary">完了</a-button>
            <p v-for="(detail, index) in item.detail" :key="index">
              {{detail.menu.title}}
              <a-tag color="#333" style="margin: 0 0.5rem;">{{detail.amount}}</a-tag>
            </p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  layout: "monitor"
})
export default class KitchenMonitor extends Vue {
  data: any = {};
  intervalId: NodeJS.Timer | null;
  newData: any = {};
  orderIds = [];
  notify:boolean = false;

  async mounted() {
    this.data.forEach(element => {
      this.orderIds.push(element._id);
    });
    this.intervalId = setInterval(this.refresh, 3000);
  }

  playSound() {
    var el = <HTMLAudioElement>document.getElementById("audioplayer");
    el.play();
  }

  async refresh() {
    this.data = await this.$axios.$get(
      "/admin/kitchen/monitor?key=" + this.$route.query.key
    );
    this.data.forEach(element => {
      if (!this.orderIds.includes(element._id)) {
        this.orderIds.push(element._id);
        this.playSound();
      }
    });
  }

  async doneOrder(orderId: string) {
    this.data = await this.$axios.$post(
      "/admin/kitchen/monitor?key=" + this.$route.query.key,
      { orderId: orderId }
    );
  }

  destroyed() {
    clearInterval(this.intervalId);
  }

  async asyncData({ app, query }) {
    return {
      data: await app.$axios.$get("/admin/kitchen/monitor?key=" + query.key)
    };
  }
}
</script>

<style scoped>
.monitor {
  min-height: 100vh;
  width: 100vw;
  background-color: #333;
  color: white;
}
.kitchen {
  padding: 1rem 1rem;
}
</style>>
