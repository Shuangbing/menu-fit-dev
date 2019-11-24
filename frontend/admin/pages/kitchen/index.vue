<template>
  <div class="monitor">
    <div class="kitchen">
      <a-row type="flex">
        <a-col v-for="(item, index) in data" :key="index">
          <a-card
            :title="item.table.tableNo"
            :bordered="false"
            style="width: 300px; margin: 1rem 0.5rem; min-height: 250px;"
          >
            <a-button slot="extra" type="primary">完了</a-button>
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
export default class Kitchen extends Vue {
  data: any = {};
  intervalId: NodeJS.Timer | null;

  async mounted() {
    this.intervalId = setInterval(this.refresh, 3000);
  }

  async refresh() {
    this.data = await this.$axios.$get(
      "/admin/kitchen/monitor?key=" + this.$route.query.key
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
