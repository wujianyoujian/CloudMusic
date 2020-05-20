<template>
  <transition name='slide-right'>
    <div class="RecommendSong">
      <div class="header" :style="{backgroundImage: headerImg}">
        <div class="top px-2 py-3 d-flex ai-center jc-between">
          <span class="iconfont icon-arrow-lift text-white fs-xxxl" @click="hide"></span>
          <span class="iconfont icon-tubiaozhizuomoban text-white fs-xxl"></span>
        </div>
        <div class="SongDate text-white mb-2 px-3">
          <span class="fs-xxxl font-w">{{date}}</span>
          <span class="px-0">/</span>
          <span>{{month}}</span>
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
                  <div class="song_name text-h">
                    {{song.album.name}}
                  </div>
                  <div class="text-grey-1 mt-1 text-h song_detail fs-xxs">
                    {{song.album.artists[0].name}}
                    -
                    {{song.album.name}}
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
const time = new Date()
export default {
  name: 'RecommendSong',
  data () {
    return {
      RecommendSongs: [],
      headerImg: ''
    }
  },
  computed: {
    date () {
      return time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
    },
    month () {
      const time = new Date()
      return (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1)
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
          const imgIndex = Math.floor(Math.random() * 30)
          this.headerImg = `url(${data[imgIndex].album.blurPicUrl.replace('?param=40y40', '')})`
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
    background-position: top center;
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
            .song_info {
              .song_name {
                width: pxtorem(252);
              }
              .song_detail {
                width: pxtorem(252);
              }
            }
          }
        }
      }
    }
  }
}
</style>
