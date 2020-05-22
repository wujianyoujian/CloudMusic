import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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
      {
        path: '/Find',
        component: () => import('../views/Find/Find.vue')
        // meta: { animation_form: 'slide-right' }
      },
      { path: '/Account', component: Account },
      {
        path: '/RecommendSong',
        component: () => import('../views/Find/RecommendSong.vue')
        // meta: { animation_form: 'slide-right' }
      },
      {
        path: '/Gedan',
        component: () => import('../views/Find/GedanList.vue')
        // meta: { animation_form: 'slide-right' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/music/:id',
  //   name: 'MusicPlay',
  //   component: () => import('../views/MusicPlay/MusicPlay.vue')
  // }

]

const router = new VueRouter({
  routes
})

export default router
