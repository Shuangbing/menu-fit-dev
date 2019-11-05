import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/category', component: () => import('./components/CategoryView.vue') },
        { path: '/category/add', component: () => import('./components/CategoryEditView.vue') },
        { path: '/category/:id', component: () => import('./components/CategoryEditView.vue') },
        { path: '/menu', component: () => import('./components/MenuView.vue') },
        { path: '/menu/add', component: () => import('./components/MenuEditView.vue') },
        { path: '/menu/:id', component: () => import('./components/MenuEditView.vue') },
        { path: '/user', component: () => import('./components/UserView.vue') },
        { path: '/table', component: () => import('./components/TableView.vue') },
        { path: '/table/add', component: () => import('./components/TableEditView.vue') },
        { path: '/table/:id', component: () => import('./components/TableEditView.vue') },
        { path: '/order', component: () => import('./components/OrderView.vue') },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
