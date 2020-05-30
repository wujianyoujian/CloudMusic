<template>
  <div class="ProgressBg">
    <div class="scrollbar" :style="{width:scrollbarWidth + '%'}">
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBg',
  props: {
    currentTime: {
      type: String
    },
    totalTime: {
      type: String
    }
  },
  data () {
    return {}
  },
  computed: {
    currentTimeLength () {
      let minute = this.currentTime.split(':')[0]
      let second = this.currentTime.split(':')[1]
      minute = parseInt(minute)
      second = parseInt(second)
      return minute * 60 + second
    },
    totalTimeLength () {
      let minute = this.totalTime.split(':')[0]
      let second = this.totalTime.split(':')[1]
      minute = parseInt(minute)
      second = parseInt(second)
      return minute * 60 + second
    },
    scrollbarWidth () {
      // const totalwidth = document.querySelector('.ProgressBg').style.width
      return (this.currentTimeLength / this.totalTimeLength) * 100
    }
  }
}
</script>

<style lang='scss'>
@import '@scss/mixin.scss';
.ProgressBg {
  height: pxtorem(2);
  background: #ccc;
  position: relative;
  .scrollbar {
    height: pxtorem(2);
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 5%;
    .dot {
      width: pxtorem(6);
      height: pxtorem(6);
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: pxtorem(-2);
      right: 0;
   }
  }
}

</style>
