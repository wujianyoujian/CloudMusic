import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/css/swiper.css'
import http from './http'

// 字体图标样式
import './assets/style/iconfont/iconfont.css'
// 全局样式
import './assets/style/scss/global.scss'

Vue.use(VueAwesomeSwiper)

Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
