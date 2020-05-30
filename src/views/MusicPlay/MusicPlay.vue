<template>
  <transition name="slide-right">
    <div class="MusicPlay" v-show="ifshowMusicPlay">
      <div class="Page py-2 px-1">
        <div class="top d-flex text-white ai-center jc-between">
          <span class="iconfont icon-arrow-lift fs-xxxl" @click="hide"></span>
          <div class="song_info ml-2 text-center px-2" v-if="PlaySongList.length > 0 && currentIndex >= 0">
            <p class="song_name text-h">{{PlaySongList[currentIndex].name}}</p>
            <p class="song_author fs-xxxs mt-0 text-h">{{PlaySongList[currentIndex].artists[0].name}} ></p>
          </div>
          <span class="iconfont icon-fenxiang1 fs-xxxl"></span>
        </div>
        <div class="circle_img">
          <img :src="PlaySongList[currentIndex].album.picUrl" alt="" v-if="PlaySongList.length !== 0 && currentIndex >= 0">
        </div>
        <div class="operate_option d-flex jc-around">
          <span class="iconfont icon-aixin"></span>
          <span class="iconfont icon-xiazai1"></span>
          <span class="iconfont icon-vip"></span>
          <span class="iconfont icon-pinglun"></span>
          <span class="iconfont icon-xuanxiang"></span>
        </div>
        <div class="progress_bar my-3 d-flex ai-center">
          <span class="fs-xxs text-white">{{currentTime}}</span>
          <ProgressBg class="flex-1 mx-1" :currentTime="currentTime" :totalTime="totalTime"></ProgressBg>
          <span class="fs-xxs text-white">{{totalTime}}</span>
          <div></div>
          <span></span>
        </div>
        <div id="Broadcaster">
          <audio :src="SongUrl" ref="song" @timeupdate="timeupdate"></audio>
          <div class="musicplay_option d-flex jc-around ai-center">
            <span class="iconfont icon-xunhuan"></span>
            <span class="iconfont icon-double-arrow-left" @click="preplay"></span>
            <span class="iconfont"
             :class="PlayingState ? 'icon-bofang' : 'icon-zanting'"
             @click="play(currentIndex)"></span>
            <span class="iconfont icon-double-arro-right" @click="nextplay"></span>
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
import ProgressBg from './components/ProgressBg'
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
      PlayingState: true,
      currentTime: '0',
      totalTime: '0',
      currentIndex: -1
    }
  },
  watch: {
    index () {
      if (this.index >= 0) {
        this.currentIndex = this.index
        this.FetchMusicSong(this.PlaySongList[this.currentIndex].id)
      }
    },
    SongUrl () {
      if (this.SongUrl) {
        this.$nextTick(() => {
          this.play(this.currentIndex)
        })
      }
    },
    currentTime () {
      if (this.totalTime !== '00:00') {
        if (this.currentTime === this.totalTime) {
          console.log('next')
          this.nextplay()
        }
      }
    }
  },
  computed: {
    BigImg () {
      if (this.PlaySongList.length > 0 && this.currentIndex >= 0) {
        return `url(${this.PlaySongList[this.currentIndex].album.picUrl})`
      }
      return 'url(#ccc)'
    }
  },
  components: {
    ProgressBg
  },
  mounted () {
  },
  methods: {
    async FetchMusicSong (id) {
      // 单个歌曲数据请求, 通过id号
      console.log(id, this.currentIndex)
      await this.$http.get(`/song/url?id=${id}`).then(res => {
        if (res.status === 200 && res.data.data.length >= 1) {
          this.SongUrl = res.data.data[0].url
        }
      })
    },
    play (index) {
      if (this.currentIndex === index) {
        // this.$refs.song.load()
        if (this.$refs.song.paused) {
        // 如果是暂停, 就继续播放
          this.$refs.song.play().catch(error => {
            console.log(error)
          })
          this.PlayingState = false
        } else {
          this.$refs.song.pause()
          this.PlayingState = true
        }
      } else {
        this.FetchMusicSong(this.PlaySongList[index].id)
        // this.$refs.song.load()
        this.$refs.song.play().catch((error) => {
          console.log(error)
        })
        this.currentIndex = index
      }
    },
    hide () {
      this.ifshowMusicPlay = false
    },
    show () {
      this.ifshowMusicPlay = true
    },
    timeupdate () {
      const currentPlayTime = Math.floor(this.$refs.song.currentTime)
      const totalPlayTime = Math.floor(this.$refs.song.duration)
      // 分
      let minute = currentPlayTime >= 60 ? Math.floor(currentPlayTime / 60) : '0'
      let totalminute = totalPlayTime >= 60 ? Math.floor(totalPlayTime / 60) : '0'
      // 秒
      let second = currentPlayTime >= 60 ? Math.floor(currentPlayTime - minute * 60) : (currentPlayTime | 0)
      let totalsecond = totalPlayTime >= 60 ? Math.floor(totalPlayTime - totalminute * 60) : (totalPlayTime | 0)
      minute = minute >= 10 ? minute : '0' + minute
      second = second >= 10 ? second : '0' + second
      totalminute = totalminute >= 10 ? totalminute : '0' + (totalminute | null)
      totalsecond = totalsecond >= 10 ? totalsecond : '0' + (totalsecond | null)
      this.currentTime = `${minute}:${second}`
      this.totalTime = `${totalminute}:${totalsecond}`
    },
    nextplay () {
      // 播放下一首
      let index = this.currentIndex + 1
      console.log(index, this.PlaySongList.length - 1)
      if (this.currentIndex >= this.PlaySongList.length - 1) {
        index = 0
      }
      this.play(index)
    },
    preplay () {
      // 播放上一首
      let index = this.currentIndex - 1
      if (index < 0) {
        index = this.PlaySongList.length - 1
      }
      this.play(index)
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
    .top {
      .song_info {
        p {
          width: pxtorem(250);
        }
      }
    }
    @keyframes Spin {
      0% {
        transform: rotate(0)
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .circle_img {
      margin: pxtorem(100) 0;
      display: flex;
      justify-content: center;
      img {
        width: pxtorem(250);
        height: pxtorem(250);
        border-radius: 50%;
        background: #fff;
        border: 4px solid #adadad31;
        animation: Spin 15s linear infinite;
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
    }
  }
  .Mosaic_Bg {
    position: absolute;
    top: pxtorem(-100);
    bottom: pxtorem(-100);
    left: pxtorem(-100);
    right: pxtorem(-100);
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    filter: blur(20px);
    z-index: 103;
  }
  .Mosaic {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 105;
    background:rgba(0,0,0,0.2);
  }
}
</style>
