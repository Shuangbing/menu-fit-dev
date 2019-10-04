<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100vh;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>従業員
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>売上情報
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>会計レジ
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px 0', minHeight: '80vh', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu :theme="theme3" active-name="1" width="auto">
                <MenuGroup title="メニュー">
                  <MenuItem name="1">
                    <Icon type="md-document" />販売中
                  </MenuItem>
                  <MenuItem name="2">
                    <Icon type="md-chatbubbles" />新規追加
                  </MenuItem>
                </MenuGroup>
                <MenuGroup title="注文管理">
                  <MenuItem name="3">
                    <Icon type="md-heart" />注文一覧
                  </MenuItem>
                  <MenuItem name="4">
                    <Icon type="md-leaf" />モニタリング
                  </MenuItem>
                </MenuGroup>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <HelloWorld/>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2019 &copy; Menu.Fit</Footer>
    </Layout>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

