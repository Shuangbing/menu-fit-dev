<template>
  <div>
    <md-dialog title="タイトル" :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">内容</md-dialog>
    <div class="header">
      <div class="title">
        <p>{{this.data.restrant_name}}</p>
        <md-tag size="large" shape="circle" type="ghost" font-color="#FC7353">{{this.data.table_no}}</md-tag>
      </div>
      <img
        class="title"
        width="100"
        height="100"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxiYsRILC5q59QRcTvXn9tAEDi3VCuXFtc1TLOQh5p-10gBm0J"
      />
    </div>
    <md-tab-bar v-model="current" :items="data.categories" :maxLength="10" />
    <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-2">
      <md-scroll-view :scrolling-x="false" style="bottom: 90%;" :bouncing="false">
        <md-field>
          <md-cell-item
            v-for="item in data.menu"
            v-bind:key="item._id"
            :title="item.title"
            no-border
          >
            <img class="holder" slot="left" :src="item.picture" />
            <p style="font-size: 0.7rem; margin-top: 5px;">￥{{item.price}}</p>
            <a v-on:click="basicDialog.open = true">
              <md-tag
                size="small"
                type="ghost"
                style="font-size: 0.7rem; margin-top: 5px;"
                font-color="#FC7353"
              >アレルギー</md-tag>
            </a>
            <md-stepper slot="right" min="0" max="5" />
          </md-cell-item>
        </md-field>
      </md-scroll-view>
      <!-- <div class="footer">
        <md-button type="primary" round>Primary & Round</md-button>
      </div>-->
    </div>
  </div>
</template>

<script>
import { Field, CellItem, Switch, Tag, Dialog } from "mand-mobile";

export default {
  name: "cell-item-demo",
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetch();
  },
  methods: {
    async fetch() {
      var defaultCategories = { name: "0", label: "すべて" };
      this.loading = true;
      await this.$http
        .get("/client/order/" + this.id)
        .then(res => {
          this.data = res.data;
          this.data.categories.unshift(defaultCategories);
        })
        .catch(error => {
          if (error.response.data.message) {
            Dialog.alert({
              title: "エラー",
              content: error.response.data.message,
              confirmText: 'はい',
            });
          }
        });
    }
  },
  data() {
    return {
      id: "",
      current: "0",
      open: false,
      data: [],
      basicDialog: {
        open: false,
        btns: [
          {
            text: "いいえ",
            handler: this.onBasicCancel
          },
          {
            text: "はい",
            handler: this.onBasicConfirm
          }
        ]
      }
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
  border-radius: 10px;
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
