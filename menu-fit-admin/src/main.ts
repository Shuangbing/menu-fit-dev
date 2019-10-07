import Vue from 'vue'
import App from './App.vue'
import router from './router'
import antDesign from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import http from './http';

Vue.use(antDesign);
Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
