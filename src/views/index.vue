<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="topSwiper">
      <!-- 轮播图 -->
      <swiper style="height: 3rem;border-radius:0.2rem" :options="bannerSwiperOptions" ref="bannerSwiper">
        <swiper-slide>
          <img :src="require('../assets/images/index/turnImg1.jpg')"/>
          <!--              :src="imgHead + item.menuLogo"-->
          <!--              v-real-img="'/static/images/default_user_photo.png'"-->
        </swiper-slide>
        <swiper-slide>
          <img :src="require('../assets/images/index/turnImg2.jpg')"/>
          <!--              :src="imgHead + item.menuLogo"-->
          <!--              v-real-img="'/static/images/default_user_photo.png'"-->
        </swiper-slide>
      </swiper>

      <!--      菜单栏-->
      <div class="menus">
        <div @click="goPath('/secondhandGoods')" class="menusItem" v-for="count in 8" :key="'menusItem'+count">
          <div class="line1"></div>
          <div class="line2">{{ count }}</div>
        </div>
      </div>
    </div>

    <index-bottom-bar :active-path="'index'"></index-bottom-bar>

  </main>
</template>

<script>
import {swiper, swiperSlide} from "vue-awesome-swiper";
import IndexBottomBar from "../components/indexBottomBar/indexBottomBar";

export default {
  name: "index",
  data: function () {
    return {
      axiosed: true,
      bannerSwiperOptions: {
        pagination: {
          //   el: ".swiper-pagination",
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        // spaceBetween: 15,
      },
    }
  },
  methods: {
    goPath(val) {
      this.$router.push(val)
    }
  },
  components: {
    IndexBottomBar,
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>

</style>
