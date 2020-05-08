<template>
  <div class="home w-100 h-100">
    <Menu></Menu>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Menu from '../common/Menu'
export default {
  name: 'Home',
  data () {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.meta.animation_form === 'slide-right') {
        this.transitionName = 'slide-right'
      }
    }
  },
  components: {
    Menu
  }
}
</script>
<style lang='scss'>
</style>
