<template>
  <div class="ProgressBg" @click="Positioning($event)" ref="progress">
    <div class="scrollbar"
     :style="{width:scrollbarWidth + '%'}"
    >
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
    scrollbarWidth: {
      get () {
        return (this.currentTimeLength / this.totalTimeLength) * 100
      }
    }
  },
  methods: {
    Positioning ($event) {
      // 为父组件定义事件, 来触发点击
      const width = this.$refs.progress.offsetWidth
      this.$emit('clickprogress', $event.offsetX, width)
    }
  }
}
</script>

<style lang='scss'>
@import '@scss/mixin.scss';
.ProgressBg {
  flex: 1;
  height: pxtorem(2);
  background: #ccc;
  position: relative;
  .scrollbar {
    height: pxtorem(2);
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
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
