import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { name: 'detail', path: '/order/detail', component: () => import('./components/OrderDetailView.vue') },
        { path: '/order/:id', component: () => import('./components/OrderView.vue') },
        { path: '/payment', component: () => import('./components/PaymentView.vue') },
      ]
    },

    {
      path: '/auth',
      name: 'auth',
      component: Home,
      children: [
        { path: '/auth/login', component: () => import('./components/Auth/Login.vue') },
        { path: '/auth/callback', component: () => import('./components/Auth/CallBack.vue') },
      ]
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
