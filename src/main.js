import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 字体图标样式
import './assets/style/iconfont/iconfont.css'
// 全局样式
import './assets/style/scss/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
