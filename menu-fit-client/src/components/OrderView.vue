<template>
  <div>
    <div style="padding: 0 1rem;">
    <md-button style="position: absolute; z-index: 999; width: 90%; bottom: 5%;" type="primary" v-on:click="isCartShow = true" round>合計金額 ¥{{totalPrice()}}</md-button>
    </div>
    <md-popup v-model="isCartShow" position="bottom">
      <md-popup-title-bar
        title="カート"
        describe="注文を確認してください"
        ok-text="次へ"
        cancel-text="閉じる"
        large-radius
      ></md-popup-title-bar>
      <div class="popup_cart">
        <div style="padding: 1rem 1rem">
          <md-field>
            <div v-for="item of data.menu" v-bind:key="item._id">
            <md-cell-item v-if="item.cart > 0" :title="item.title">
              <span>¥{{item.price}}</span>
              <span slot="right">x {{item.cart}}</span>
            </md-cell-item>
            </div>
          </md-field>
          <md-button type="primary" round>合計金額 ¥{{totalPrice()}}</md-button>
        </div>
      </div>
    </md-popup>
    <md-dialog title="タイトル" :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">内容</md-dialog>
    <div class="header">
      <div class="title">
        <p>{{this.data.restrant_name}}</p>
        <md-tag size="large" shape="circle" type="ghost" font-color="#FC7353">{{this.data.table_no}}</md-tag>
      </div>
      <img class="title" width="100" height="100" src="../../src/assets/logo.jpg" />
    </div>
    <md-tab-bar
      v-model="current"
      :items="data.categories"
      @change="category_filter"
      :maxLength="10"
    />
    <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-2">
      <md-scroll-view :scrolling-x="false" style="bottom: 90%; height: 100vh;" ref="scrollView">
        <md-field>
          <md-cell-item
            v-for="item in menu_categories"
            v-bind:key="item._id"
            :title="item.title"
            no-border
          >
            <img class="holder" slot="left" :src="item.picture" />
            <p style="font-size: 0.7rem; margin-top: 5px;">￥{{item.price}}</p>
            <a>
              <md-tag
                size="small"
                type="ghost"
                style="font-size: 0.7rem; margin-top: 5px;"
                font-color="#FC7353"
              >アレルギー</md-tag>
            </a>
            <md-stepper
              v-model="item.cart"
              slot="right"
              min="0"
              max="5"
              read-only
            />
          </md-cell-item>
        </md-field>
      </md-scroll-view>
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
    totalPrice() {
      var total = 0;
      this.data.menu.forEach(element => {
        if (element.cart > 0) {
          total = total + ( element.cart * element.price);
        }
      });
      return total;
    },
    async category_filter(item, index, prevIndex) {
      this.menu_categories = [];
      if (item.name == 0) {
        this.menu_categories = this.data.menu;
        return;
      }
      this.data.menu.forEach(element => {
        if (element.category == item.name) {
          this.menu_categories.push(element);
        }
      });
    },
    async fetch() {
      var defaultCategories = { name: "0", label: "すべて" };
      this.loading = true;
      await this.$http
        .get("/client/order/" + this.id)
        .then(res => {
          this.data = res.data;
          this.menu_categories = this.data.menu;
          this.data.categories.unshift(defaultCategories);
        })
        .catch(error => {
          if (error.response.data.message) {
            Dialog.alert({
              title: "エラー",
              content: error.response.data.message,
              confirmText: "はい"
            });
          }
        });
    }
  },
  data() {
    return {
      id: "",
      isCartShow: false,
      current: "0",
      open: false,
      data: [],
      menu_categories: [],
      cart: [],
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

.popup_cart {
  width: 100%;
  background-color: white;
}
</style>
