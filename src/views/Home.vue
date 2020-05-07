<template>
  <div class="home">
    <Menu></Menu>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from '../components/Menu'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    Menu
  }
}
</script>
<style lang='scss'>
</style>
