<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="topSwiper">
      <!-- 轮播图 -->
      <swiper style="height: 3rem;border-radius:0.2rem;margin-bottom: 0.3rem;" :options="bannerSwiperOptions"
              ref="bannerSwiper">
        <swiper-slide v-for="(item,index) in indexImgList" :key="'indexImgList'+index">
          <img :src="item.icon"/>
          <!--              :src="imgHead + item.menuLogo"-->
          <!--              v-real-img="'/static/images/default_user_photo.png'"-->
        </swiper-slide>
        <!--        <swiper-slide>-->
        <!--          <img :src="require('../assets/images/index/turnImg2.jpg')"/>-->
        <!--          &lt;!&ndash;              :src="imgHead + item.menuLogo"&ndash;&gt;-->
        <!--          &lt;!&ndash;              v-real-img="'/static/images/default_user_photo.png'"&ndash;&gt;-->
        <!--        </swiper-slide>-->
      </swiper>

      <!--      菜单栏-->
      <div class="menus" v-if="menuList.length!==0">
        <div @click="goPath(item.component)" class="menusItem" v-for="(item,index) in menuList"
             :key="'menusItem'+index">
          <div class="line1">
            <img :src="item.icon" alt="">
          </div>
          <div class="line2">{{ item.menuName }}</div>
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
      indexImgList: [],
      menuList: [],
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
  },
  created() {
    // 获取菜单栏
    this.$func.axios(this.$api.getIndexMenus, {
      parentId: 504,
    }, {
      type: "get",
      openLoad: true,
      closeLoad: true,
      // flag: 2,
    }).then(res => {
      this.menuList = res.data
      // console.log(res)
    })
    // 获取轮播图
    this.$func.axios(this.$api.getIndexMenus, {
      parentId: 514,
    }, {
      type: "get",
      openLoad: true,
      closeLoad: true,
      // flag: 2,
    }).then(res => {
      this.indexImgList = res.data
      // console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
