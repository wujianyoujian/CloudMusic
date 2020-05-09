<template>
  <div class="Find">
    <div class="top d-flex py-2 ai-center">
      <span class="fs-xs px-2">签到</span>
      <div class="input_wrapper flex-1">
        <input type="text" class="bg-white-1 w-100 py-0">
        <div class="icon-wrapper text-grey">
          <span class="iconfont icon-sousuo"></span>
          <span class="fs-xs">陈粒</span>
        </div>
      </div>
      <span class="iconfont icon-tubiaozhizuomoban px-2 text-black fs-xxxl"></span>
    </div>
    <div class="content_wrapper" ref="content_wrapper">
      <div class="content">
        <Banner></Banner>
        <div class="tab_wrapper d-flex m-2 jc-between">
          <div class="tab d-flex d-column" v-for="(item, index) in tab_info" :key="index">
            <div class="icon-wrapper mb-1" @click=showPage(index)>
              <span class="fs-xxl text-white" :class="item.class"></span>
            </div>
            <span class="fs-xxs text-grey-1">{{item.text}}</span>
          </div>
        </div>
        <div>
          <div>
            <span>为你精挑细选</span>
            <span>查看更多</span>
          </div>
        </div>
        <div class="test"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Banner from '../../common/Banner'
export default {
  name: 'Find',
  data () {
    return {
      tab_info: [
        {
          class: 'iconfont icon-rili',
          text: '每日推荐'
        },
        {
          class: 'iconfont icon-gedan',
          text: '歌单'
        },
        {
          class: 'iconfont icon-paixingbang',
          text: '排行榜'
        },
        {
          class: 'iconfont icon-tubiaozhizuomoban',
          text: '电台'
        },
        {
          class: 'iconfont icon-diantai1',
          text: '私人FM'
        }
      ]
    }
  },
  components: {
    Banner
  },
  mounted () {
    this._initScroll()
    this.FetchRecommendGedan()
  },
  methods: {
    _initScroll () {
      this.contentScroll = new Bscroll(this.$refs.content_wrapper, {
        click: true
      })
    },
    showPage (index) {
      if (index === 0) {
        this.showRecommendPage()
      } else if (index === 1) {
        this.showGedanPage()
      }
    },
    showRecommendPage () {
      this.$router.push('/RecommendSong')
    },
    showGedanPage () {
      this.$router.push('/Gedan')
    },
    async FetchRecommendGedan () {
      await this.$http.get('/personalized').then(res => {
        if (res.status === 200) {
          console.log(res.data)
        }
      })
    }
  }
}
</script>
<style lang='scss'>
@import '@scss/_variable.scss';
@import '@scss/mixin.scss';
.Find {
  overflow-y: auto;
  height: 100%;
  .top {
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
  .content_wrapper {
    position: absolute;
    width: 100%;
    top: pxtorem(60);
    bottom: 0;
    z-index: 1;
    overflow: hidden;
    .tab_wrapper {
      .tab {
        flex: 0 1 pxtorem(48);
        text-align: center;
        .icon-wrapper {
          background: map-get($colors, 'red-3');
          border-radius: 50%;
          height: pxtorem(48);
          text-align: center;
          span {
            line-height: pxtorem(48);
          }
        }
      }
    }
    .test {
      height: 1000px;
    }
  }
}
</style>
