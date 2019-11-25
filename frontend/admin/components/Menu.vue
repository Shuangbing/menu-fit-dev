<template>
  <a-layout id="components-layout-demo-top-side-2" style="height: 100%;">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">ホーム</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
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
      <a-layout style="padding: 24px 24px 24px 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0 , minHeight: '90vh'}"
        >
          <nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class Menu extends Vue {
  menuClick(item: any) {
    this.$router.push(item.key);
  }

  mainMenu = [
    {
      icon: "user",
      title: "顧客管理",
      key: "user",
      subMenu: [
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
        {
          title: "キッチンモニター",
          path: "/kitchen"
        }
      ]
    },
    {
      icon: "table",
      title: "店舗管理",
      key: "table",
      subMenu: [
        {
          title: "テーブル",
          path: "/table"
        },
        {
          title: "アレルギー",
          path: "/allergy"
        }
      ]
    },
    {
      icon: "menu",
      title: "料理管理",
      key: "menu",
      subMenu: [
        {
          title: "カテゴリー",
          path: "/category"
        },
        {
          title: "メニュー",
          path: "/menu"
        }
      ]
    }
  ];
}
</script>

<style>
.logo {
  width: 150px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>