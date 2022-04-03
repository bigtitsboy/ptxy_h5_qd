<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div ref="topLocal" class="topLocal">
      <div class="leftImg">
        <img :src="require('../../assets/images/wxb定位.png')" alt="">
      </div>
      <div class="centerDetail" v-if="address!==null">
        <div class="line1">
          <div class="left">{{ address.consignee }}</div>
          <div class="right">{{ address.phonenumber }}</div>
        </div>
        <div class="line2">
          <div class="local">{{ address.addressContent }}</div>
        </div>
      </div>
      <div class="rightImg" @click="goPath()">
        <img :src="require('../../assets/images/展开.png')" alt="">
      </div>
    </div>
    <div ref="orderDetail" class="orderDetail" :style="{'height':orderDetailHeight}">
      <div class="topHead">
        <div class="logo">
          <img :src="require('../../assets/images/小卖部，商店，建筑，房子.png')" alt="">
        </div>
        <div class="shopName">宿舍小卖铺</div>
      </div>
      <div class="scrollBody">
        <div class="orderItem" v-for="(item,index) in shoppingCarList" :key="'shoppingCarListItem'+index">
          <div class="itemName">{{ item.goodsName }}</div>
          <div class="itemNum">{{ 'x ' + item.itemNum }}</div>
          <div class="itemTotal">{{ '￥' + cost(item.goodsPrice, item.itemNum) }}</div>
        </div>
      </div>
    </div>
    <div ref="bottomCheck" class="bottomCheck">
      <div class="left">{{ '总价￥' + carTotal }}</div>
      <div class="right" @click="checkOrder">确认下单</div>
    </div>
  </main>
</template>

<script>
export default {
  name: "createNewOrder",
  data: function () {
    return {
      axiosed: true,
      orderDetailHeight: 0,
      address: null,
      shoppingCarList: [],
      carTotal: 0,
      orderGoodsList: [],
      form: {},
      myTimeOut: null
    }
  },
  methods: {
    checkOrder() {
      this.form.orderPrice = this.carTotal
      this.form.consignee = this.address.consignee
      this.form.addressContent = this.address.addressContent
      this.form.phonenumber = this.address.phonenumber

      this.shoppingCarList.forEach(x => {
        let obj = {}
        obj.goodsId = x.categoryId
        obj.goodsNumber = x.itemNum
        obj.status = x.goodsName + '&&' + x.goodsPrice
        obj.remark = x.imageList[0]
        this.orderGoodsList.push(obj)
      })

      this.form.orderGoodsList = this.orderGoodsList;
      this.$func.axios(this.$api.addShopOrder, this.form, {
        type: 'POST',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        if (res.code === 200) {
          const toast = this.$createToast({
            txt: '下单成功',
            type: 'correct'
          })
          toast.show()
          this.myTimeOut = setTimeout(() => {
            this.$router.push('/myOrder')
          }, 2000)
        }
      })
    },
    cost(itemPrice, itemNum) {
      return itemPrice * itemNum
    },
    getList() {
      this.$func.axios(this.$api.listAddress, {}, {
        type: 'get',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        this.address = res.rows[0]
        // console.log(res)
      })
    },
    goPath() {
      this.$router.push({
        path: '/localtionPage',
        query: {
          from: 'orderPage'
        }
      })
    }
  },
  created() {
    this.$nextTick(() => {
      this.orderDetailHeight = document.body.clientHeight - this.$refs.topLocal.clientHeight - this.$refs.bottomCheck.clientHeight - 21 + 'px'
    })

    this.shoppingCarList = JSON.parse(localStorage.getItem('shoppingCarList'))
    this.carTotal = JSON.parse(localStorage.getItem('carTotal'))

    if (this.$route.query.local !== undefined) {
      this.address = (JSON.parse(this.$route.query.local))
    } else {
      this.getList()
    }
  },
  destroyed() {
    // console.log('销毁定时器')
    window.clearTimeout(this.myTimeOut)
  }
}
</script>

<style scoped>

</style>
