<template>
  <div class="MusicPlay">
    <div class="top">
      <span class="iconfont arrow-lift"></span>
      <div class="song_info">
        <p class="song_name">My Friend</p>
        <p class="song_author">SPYAIR ></p>
      </div>
      <div></div>
    </div>
    <div class="circle_img">
      <img src="" alt="">
    </div>
    <div class="operate_option">
      <span class="iconfont icon-aixin"></span>
      <span class="iconfont icon-xiazai1"></span>
      <span class="iconfont icon-vip"></span>
      <span class="iconfont icon-pinglun"></span>
      <span class="iconfont icon-xuanxiang"></span>
    </div>
    <div id="Broadcaster">
      <audio :src="SongUrl" ref="song"></audio>
      <div class="progress_bar"></div>
      <div class="musicplay_option">
        <span class="iconfont icon-xunhuan"></span>
        <span class="iconfont icon-double-arro-left"></span>
        <span class="iconfont icon-bofang"></span>
        <span class="iconfont icon-double-arro-right"></span>
        <span class="iconfont icon-xuanxiangcharu"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicPlay',
  data () {
    return {
      SongUrl: ''
    }
  },
  computed: {
  },
  mounted () {
    this.FetchMusicSong(this.$route.params.id)
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
      } else {
        this.$refs.song.pause()
      }
    }
  }
}
</script>
<style lang="scss">
</style>
// /song/url?id=33894312 /song/url?id=405998841,33894312
// 79563958
// 1335899405
