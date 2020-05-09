<template>
  <transition name='slide-right'>
    <div class="RecommendSong">
      <div class="header">
        <div class="top px-2 py-3 d-flex ai-center jc-between">
          <span class="iconfont icon-arrow-lift text-white fs-xxxl" @click="hide"></span>
          <span class="iconfont icon-tubiaozhizuomoban text-white fs-xxl"></span>
        </div>
        <div class="SongDate text-white mb-2 px-3">
          <span class="fs-xxxl font-w">08</span>
          <span class="px-0">/</span>
          <span>05</span>
        </div>
      </div>
      <div class="SongList_wrapper">
        <div class="SongList">
          <div class="Option_button p-2 d-flex ai-center jc-between">
            <div class="play_all d-flex ai-center">
              <span class="iconfont icon-bofang1 fs-sm mr-1"></span>
              <span class="fs-xs">播放全部</span>
            </div>
            <div class="multiple_choice d-flex ai-center">
              <span class="iconfont icon-xuanxiangcharu fs-xs mr-1"></span>
              <span class="fs-xs">多选</span>
            </div>
          </div>
          <div class="ul_wrapper" ref="SongList">
            <ul class="px-3">
              <div class="d-flex jc-center" v-show="RecommendSongs == 0">
                <img src="../../assets/Loading.gif" alt="">
              </div>
              <li class="song d-flex ai-center" v-for="(song, index) in RecommendSongs" :key="index">
                <img :src="song.album.blurPicUrl.replace()"  alt="" class="mr-2">
                <div class="song_info flex-1">
                  <div>
                    <span>{{song.album.name}}</span>
                    <span></span>
                  </div>
                  <div class="text-grey-1 mt-1">
                    <span class="fs-xxs">{{song.album.artists[0].name}}</span>
                    <span class="fs-xxs px-0">-</span>
                    <span class="fs-xxs">{{song.album.name}}</span>
                  </div>
                </div>
                <span class="song_option iconfont icon-xuanxiang fs-xl"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'RecommendSong',
  data () {
    return {
      RecommendSongs: []
    }
  },
  mounted () {
    this.FetchRecommendSong()
    this._initScroll()
  },
  methods: {
    FetchRecommendSong () {
      this.$http.get('/recommend/songs').then((res) => {
        if (res.status === 200) {
          const data = res.data.recommend
          // 修改请求图片的大小
          data.forEach((song) => {
            song.album.blurPicUrl = song.album.blurPicUrl + '?param=40y40'
          })
          setTimeout(() => {
            this.RecommendSongs = data
          }, 200)
        }
      })
    },
    _initScroll () {
      this.RecommendSongListScroll = new Bscroll(this.$refs.SongList, {
        click: true
      })
      this.RecommendSongListScroll.on('scroll', (pos) => {
        console.log(pos)
      })
    },
    hide () {
      this.$router.push('/Find')
    }
  }
}
</script>
<style lang='scss'>
@import '@scss/mixin.scss';
.RecommendSong {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  background: #fff;
  .header {
    width: 100%;
    height: 30%;
    background: url(http://p1.music.126.net/TOwuh0SqyudWAq9IMtPTXw==/109951164971499409.jpg);
    background-position: center right;
    background-size: cover;
    position: fixed;
    z-index: 22;
  }
  .SongList_wrapper {
    height: 100%;
    .SongList {
      height: 100%;
      background: #fff;
      .Option_button {
        position: fixed;
        left: 0;
        right: 0;
        z-index: 23;
        top: pxtorem(160);
        background: #fff;
        border-radius: pxtorem(20) pxtorem(20) 0 0;
      }
      .ul_wrapper {
        position: fixed;
        top: pxtorem(210);
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 20;
        ul {
          padding-bottom: pxtorem(78);
          .song {
            margin-bottom: pxtorem(20);
            img {
              width: pxtorem(40);
              height: pxtorem(40);
              border-radius: pxtorem(4);
            }
          }
        }
      }
    }
  }
}
</style>
