import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Find from '../views/Find/Find.vue'
import Account from '../views/Accound/Account.vue'
import Login from '../views/Accound/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/Find',
    children: [
      { path: '/Find', component: Find },
      { path: '/Account', component: Account }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
