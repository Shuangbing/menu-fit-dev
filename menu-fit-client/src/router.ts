import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/order/:id', component: () => import('./components/OrderView.vue') },
      ]
    },

    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (navigator.userAgent.indexOf('Line') == -1) {
//     return next('order')
//   }
//   next()
// })

export default router;
