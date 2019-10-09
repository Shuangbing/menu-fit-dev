<template>
  <a-layout id="components-layout-demo-top-side-2" style="height: 100%;">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">ホーム</a-menu-item>
        <a-menu-item key="2">会計レジ</a-menu-item>
        <a-menu-item key="3">売上情報</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :selectedKeys="liveMenu"
          @click="menuClick"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu v-for="item in mainMenu" :key="item.key" :index="item.title">
            <span slot="title">
              <a-icon :type="item.icon" />
              {{item.title}}
            </span>
            <a-menu-item
              v-for="subItem in item.subMenu"
              :key="subItem.path"
              :index="subItem.title"
            >{{subItem.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>ホーム</a-breadcrumb-item>
          <a-breadcrumb-item>顧客管理</a-breadcrumb-item>
          <a-breadcrumb-item>来店中の顧客</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0 , minHeight: '90vh'}"
        >
          <router-view to="/menu"></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>

<script lang="ts">
//import Vue from 'vue'
import { Component, Vue } from "vue-property-decorator";

export default Vue.extend({
  data() {
    return {
      collapsed: false,
      liveMenu: [],
      mainMenu: [
        {
          icon: "user",
          title: "顧客管理",
          key: "user",
          subMenu: [
            {
              title: "来店中の顧客",
              path: "/user/inshop"
            },
            {
              title: "顧客一覧",
              path: "/user"
            }
          ]
        },
        {
          icon: "form",
          title: "注文管理",
          key: "order",
          subMenu: [
            {
              title: "注文一覧",
              path: "/order"
            },
          ]
        },
        {
          icon: "table",
          title: "テーブル管理",
          key: "table",
          subMenu: [
            {
              title: "テーブル一覧",
              path: "/table"
            },
            {
              title: "テーブル新規追加",
              path: "/table/add"
            }
          ]
        },
        {
          icon: "menu",
          title: "料理管理",
          key: "menu",
          subMenu: [
            {
              title: "料理一覧",
              path: "/menu"
            },
            {
              title: "料理新規追加",
              path: "/menu/add"
            }
          ]
        }
      ]
    };
  },
  methods: {
    menuClick: function(item: any) {
      this.$router.push(item.key);
      console.log(this.liveMenu)
    }
  }
});
</script>
