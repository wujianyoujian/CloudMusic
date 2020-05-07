<template>
  <div class="menu_wrapper d-flex jc-between px-3 py-2">
    <div class="menu"
     v-for="(item, index) in menu_info" :key="index"
     :class="{active: index === menu_active}"
     @click="select_menu(index)">
      <div class="icon_wrapper mb-0">
        <span :class="item.class"></span>
      </div>
      <div class="text_wrapper">
        <span class="fs-xxs">{{item.text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menu_info: [
        {
          class: 'iconfont icon-tubiaozhizuomoban',
          text: '发现'
        },
        {
          class: 'iconfont icon-shipin',
          text: '视频'
        },
        {
          class: 'iconfont icon-yinyue',
          text: '我的'
        },
        {
          class: 'iconfont icon-wodehaoyou',
          text: '云村'
        },
        {
          class: 'iconfont icon-zhanghaodenglu',
          text: '账号'
        }
      ],
      menu_active: 0,
      pages: [
        'Find',
        'Video',
        'Mine',
        'Yuncun',
        'Account'
      ]
    }
  },
  methods: {
    select_menu (index) {
      if (index === this.menu_active && (index === 0 || index === 1 || index === 2)) {
        // 如果是发现页和视频页, 再次点击就刷新当前页的数据
        return null
      }
      console.log(index)
      this.menu_active = index
      this.$router.push(`/${this.pages[index]}`)
    }
  }
}
</script>
<style lang='scss'>
@import '@scss/mixin.scss';
.menu_wrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(238, 238, 238, 0.8);
  box-sizing: border-box;
  .menu {
    flex: 0 1 pxtorem(30);
    text-align: center;
    .icon_wrapper {
      height: pxtorem(30);
      span {
        line-height: pxtorem(30);
      }
    }
    &.active {
      .icon_wrapper {
        background: rgb(226, 65, 65);
        border-radius: 50%;
        span {
          color: #fff;
        }
      }
      .text_wrapper {
        span {
          color:rgb(226, 65, 65)
        }
      }
    }
  }
}
.menu_wrapper::after {
  filter: blur(20px);
}
</style>
