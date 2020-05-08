import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Find from '../views/Find/Find.vue'
import Account from '../views/Accound/Account.vue'
import Login from '../views/Accound/Login.vue'
import RecommendSong from '../views/Find/component/RecommendSong.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/Find',
    children: [
      { path: '/Find', component: Find, meta: { animation_form: 'slide-right' } },
      { path: '/Account', component: Account },
      { path: '/RecommendSong', component: RecommendSong, meta: { animation_form: 'slide-right' } }
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
