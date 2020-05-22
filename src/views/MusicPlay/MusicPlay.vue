<template>
  <transition name="slide-right">
    <div class="MusicPlay" v-show="ifshowMusicPlay">
      <div class="Page py-2 px-1">
        <div class="top d-flex text-white ai-center">
          <span class="iconfont icon-arrow-lift fs-xxxl" @click="hide"></span>
          <div class="song_info flex-1 ml-2 text-center" v-if="PlaySongList.length > 0">
            <p class="song_name">{{PlaySongList[index].name}}</p>
            <p class="song_author fs-xxxs mt-0">{{PlaySongList[index].artists[0].name}} ></p>
          </div>
          <span class="iconfont icon-fenxiang1 fs-xxxl"></span>
        </div>
        <div class="circle_img">
          <img :src="PlaySongList[index].album.picUrl" alt="" v-if="PlaySongList.length !== 0">
        </div>
        <div class="operate_option d-flex jc-around">
          <span class="iconfont icon-aixin"></span>
          <span class="iconfont icon-xiazai1"></span>
          <span class="iconfont icon-vip"></span>
          <span class="iconfont icon-pinglun"></span>
          <span class="iconfont icon-xuanxiang"></span>
        </div>
        <div class="progress_bar my-3"></div>
        <div id="Broadcaster">
          <audio :src="SongUrl" ref="song"></audio>
          <div class="musicplay_option d-flex jc-around ai-center">
            <span class="iconfont icon-xunhuan"></span>
            <span class="iconfont icon-double-arrow-left"></span>
            <span class="iconfont"
            :class="PlayingState ? 'icon-bofang' : 'icon-zanting'"
            @click="play"></span>
            <span class="iconfont icon-double-arro-right"></span>
            <span class="iconfont icon-xuanxiangcharu"></span>
          </div>
        </div>
      </div>
      <div class="Mosaic_Bg" :style="{backgroundImage: BigImg}"></div>
      <div class="Mosaic"></div>
    </div>
</transition>

</template>

<script>
export default {
  name: 'MusicPlay',
  props: {
    index: {
      type: Number
    },
    PlaySongList: {
      type: Array
    }
  },
  data () {
    return {
      SongUrl: '',
      ifshowMusicPlay: false,
      PlayingState: true
    }
  },
  watch: {
    index () {
      this.FetchMusicSong(this.PlaySongList[this.index].id)
    }
  },
  computed: {
    BigImg () {
      if (this.PlaySongList.length > 0) {
        return `url(${this.PlaySongList[this.index].album.picUrl})`
      }
      return 'url(#ccc)'
    }
  },
  mounted () {
  },
  methods: {
    async FetchMusicSong (id) {
      // 单个歌曲数据请求, 通过id号
      await this.$http.get(`/song/url?id=${id}`).then(res => {
        if (res.status === 200 && res.data.data.length >= 1) {
          this.SongUrl = res.data.data[0].url
        }
      })
    },
    play () {
      if (this.$refs.song.paused) {
        // 如果是暂停, 就继续播放
        this.$refs.song.play()
        this.PlayingState = false
      } else {
        this.$refs.song.pause()
        this.PlayingState = true
      }
    },
    hide () {
      this.ifshowMusicPlay = false
    },
    show () {
      this.ifshowMusicPlay = true
    }
  }
}
</script>
<style lang="scss">
@import '@scss/mixin.scss';
.MusicPlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  overflow: hidden;
  .Page {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 120;
    .circle_img {
      margin: pxtorem(100) 0;
      display: flex;
      justify-content: center;
      img {
        width: pxtorem(250);
        height: pxtorem(250);
        border-radius: 50%;
        background: #fff;
      }
    }
    .operate_option, .musicplay_option {
      span {
        font-size: pxtorem(30);
        color: rgb(221, 221, 221);
      }
    }
    .musicplay_option {
      span {
        &:nth-child(1), &:nth-child(5) {
          font-size: pxtorem(22);
        }
      }
    }
    .progress_bar {
      height: pxtorem(4);
      background: #fff;
    }
  }
  .Mosaic_Bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: 120% 120%;
    background-position: center center;
    background-repeat: no-repeat;
    filter: blur(12px);
    z-index: 103;
  }
  .Mosaic {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 105;
    background:rgba(0,0,0,0.4);
  }
}
</style>
