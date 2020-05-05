<template>
  <div class="Banner mx-2">
    <swiper ref="BannerSwiper" :options="swiperOptions">
      <swiper-slide v-for="item in BannerImgs" :key="item.bannerId">
        <img :src="item.pic" alt="" class="w-100">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      BannerImgs: []
    }
  },
  mounted () {
    this.getchBannerImg()
  },
  methods: {
    async getchBannerImg () {
      const res = await this.$http.get('/banner?type=2')
      if (res.status === 200) {
        this.BannerImgs = res.data.banners
      }
    }
  }
}
</script>
<style lang='scss'>
@import '@scss/_variable.scss';
@import '@scss/mixin.scss';
.Banner {
  img {
    border-radius: pxtorem(5);
  }
  .swiper-pagination {
    .swiper-pagination-bullet {
      background: #aaa;
      &.swiper-pagination-bullet-active {
        background: map-get($colors, 'red');
      }
    }
  }
}
</style>
