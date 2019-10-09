<template>
  <div>
    <div class="header">
      <div class="title">
        <p>Demoレストラン</p>
        <md-tag size="large" shape="circle" type="ghost" font-color="#FC7353">A-1</md-tag>
      </div>
      <img
        class="title"
        width="100"
        height="100"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxiYsRILC5q59QRcTvXn9tAEDi3VCuXFtc1TLOQh5p-10gBm0J"
      />
    </div>
    <md-tab-bar v-model="current" :items="items" :maxLength="5" />
    <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-2">
      <md-scroll-view :scrolling-x="false" style="bottom: 90%;" :bouncing="false">
        <md-field>
          <md-cell-item v-for="item in 10" v-bind:key="item" title="ラーメン" no-border>
            <img
              class="holder"
              slot="left"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxiYsRILC5q59QRcTvXn9tAEDi3VCuXFtc1TLOQh5p-10gBm0J"
            />
            <p style="font-size: 0.7rem; margin-top: 5px;">￥100</p>
            <md-stepper slot="right" v-model="value" min="0" max="5" />
          </md-cell-item>
        </md-field>
      </md-scroll-view>
      <!-- <div class="footer">
        <md-button type="primary" round>Primary & Round</md-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Field, CellItem, Switch } from "mand-mobile";

export default {
  name: "cell-item-demo",
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch
  },
  data() {
    return {
      open: false,
      current: 1,
      items: [
        { name: 1, label: "すべて" },
        { name: 2, label: "主食" },
        { name: 3, label: "ドリンク" },
        { name: 4, label: "デザート" },
        { name: 5, label: "新品" }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.body {
  height: 100%;
  background-color: #f9fafb;
}

.scroll {
  box-sizing: border-box;
  min-height: 100%;
  height: 60vh;
  padding-bottom: 100px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35vh;
}

.holder {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background-color: #E6E6E6;
}

.header {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
}

.title {
  margin: 1rem 1rem 1rem 1rem;
  font-size: 1.5rem;
  border-radius: 1rem;
}
</style>
