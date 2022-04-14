<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="headLine">
      <span class="back" @click="$router.back()">
        <img :src="require('../../assets/images/返回 (1).png')" alt="">
      </span>
      <span class="title">详情</span>
      <!--      <span class="share">-->
      <!--        <img :src="require('../../assets/images/分享.png')" alt="">-->
      <!--      </span>-->
    </div>
    <div class="scrollBody" v-if="itemDetail!==null">
      <cube-slide style="height: fit-content" v-if="imgList.length!==0" ref="slide" :data="imgList">
        <cube-slide-item v-for="(item,index) in imgList" :key="'imgList'+index">
          <img @click="showImagePreview" style="height: 5rem" :src="item.image" alt="">
        </cube-slide-item>
      </cube-slide>
      <div class="goodsDetail">
        <div class="goodsName">{{ itemDetail.goodsName }}</div>
        <div class="goodsPrice">{{ '￥' + itemDetail.housePrice + '元 /月' }}</div>
        <div class="otherMsg">
          <div class="status">
            <img :src="require('../../assets/images/06商品.png')" alt="">
            {{ itemDetail.rentWay == 0 ? '直租' : '转租' }}
          </div>
          <div class="time">
            <img :src="require('../../assets/images/时间.png')" alt="">
            {{ itemDetail.createTime.split(' ')[0] }}
          </div>
        </div>
        <div class="sendDetail">
          <div class="items">
            <img :src="require('../../assets/images/house.png')" alt="">
            <span>{{ JSON.parse(itemDetail.houseAddress).join("") }}</span>
            <span style="margin-left: 0.2rem">面积：{{ itemDetail.houseArea }}</span>m²
          </div>
        </div>
        <div class="goodsContent">
          <div style="font-size: 0.4rem;font-weight: bold">商品描述</div>
          <div style="text-indent: 0.2rem;font-size: 0.3rem;color: #666;font-weight: inherit">
            {{ itemDetail.houseContent }}
          </div>
        </div>
      </div>
    </div>
    <div class="bottomLine">
      <div class="like">
        <img @click="like=!like" v-if="!like" :src="require('../../assets/images/喜欢.png')" alt="">
        <img @click="like=!like" v-else :src="require('../../assets/images/喜欢 (1).png')" alt="">
        <div>点赞</div>
      </div>
      <div class="chat" @click="showAlert">查看联系方式</div>
    </div>
  </main>
</template>

<script>
export default {
  name: "sencondHandGoodsDetail",
  data: function () {
    return {
      axiosed: false,
      itemDetail: null,
      imgList: [],
      like: false
    }
  },
  methods: {
    share() {

    },
    showAlert() {
      this.$createDialog({
        type: 'alert',
        title: '联系方式',
        content: this.itemDetail.phonenumber,
        icon: 'cubeic-phone'
      }).show()
    },
    showImagePreview() {
      this.$createImagePreview({
        imgs: this.itemDetail.imageList
      }).show()
    }
  },
  created() {
    this.$func.axios(this.$api.addRent + '/' + this.$route.query.houseId, {}, {
      type: 'get',
      openLoad: true,
      closeLoad: true,
      flag: 1
    }).then(res => {
      this.itemDetail = res.data
      res.data.rentHouseImageList.forEach(x => {
        this.imgList.push({
          image: x.imagePath
        })
      })

      this.axiosed = true
      // console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
