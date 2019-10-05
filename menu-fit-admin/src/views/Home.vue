<template>
  <a-layout id="components-layout-demo-top-side-2" style="height: 100vh;">
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
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="user" />顧客管理
            </span>
            <a-menu-item key="1">来店中の顧客</a-menu-item>
            <a-menu-item key="2">顧客一覧</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="laptop" />注文管理
            </span>
            <a-menu-item key="5">未処理の注文</a-menu-item>
            <a-menu-item key="6">注文一覧</a-menu-item>
            <a-menu-item key="7">完了の注文</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="menu" />料理管理
            </span>
            <a-menu-item key="9">販売中の料理</a-menu-item>
            <a-menu-item key="10">販売停止の料理</a-menu-item>
            <a-menu-item key="11">料理新規追加</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="notification" />営業管理
            </span>
            <a-menu-item key="9">クーポン</a-menu-item>
            <a-menu-item key="10">キャンペーン</a-menu-item>
            <a-menu-item key="11">店舗設定</a-menu-item>
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
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <HelloWorld />
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
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  data() {
    return {
      collapsed: false
    };
  }
}
</script>
