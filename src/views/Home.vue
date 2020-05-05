<template>
  <div class="home">
    <div class="top d-flex py-2 ai-center">
      <span class="fs-xs px-2">签到</span>
      <div class="input_wrapper flex-1 fs-0">
        <input type="text" class="bg-white-1 w-100 py-0">
        <div class="icon-wrapper text-grey">
          <span class="iconfont icon-sousuo"></span>
          <span class="fs-xs">陈粒</span>
        </div>
      </div>
      <span class="iconfont icon-tubiaozhizuomoban px-2 text-black fs-xxxl"></span>
    </div>
    <Banner></Banner>
  </div>
</template>

<script>
import Banner from '../components/Banner'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    Banner
  }
}
</script>
<style lang='scss'>
.home {
  .input_wrapper {
    position: relative;
    .icon-wrapper {
      position: absolute;
      top: 6px;
      left: 0;
      right: 0;
      text-align: center;
    }
    input.bg-white-1 {
      border: none;
      border-radius: 15px;
    }
  }
}
</style>
