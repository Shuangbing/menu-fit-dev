import Vue from 'vue'
import App from './App.vue'
import "mand-mobile/components/_style/global.styl"
import "normalize.css"
import { Icon } from 'mand-mobile'

Vue.config.productionTip = false

import './style.scss'

Vue.component(Icon.name, Icon)

new Vue({
  render: h => h(App),
}).$mount('#app')
