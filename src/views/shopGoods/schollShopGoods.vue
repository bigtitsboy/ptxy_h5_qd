<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="mainBody">
      <div class="lineHead">
        <div class="left">分类</div>
        <input class="rightSearch" type="text">
      </div>
      <div class="mainScrollBody">
        <div class="left">
          <div class="sortItem" v-for="(item,index) in sortList" :key="'sortListItem'+index">
            {{ item }}
          </div>
        </div>
        <div class="right">
          <div class="topHead vux-1px-b">
            <div class="paramsItemActive">综合</div>
            <div class="paramsItem">销量</div>
            <div class="paramsItem">价格</div>
          </div>
          <div class="shoppingItemScrollBody">
            <div class="shoppingItem" v-for="(item,index) in shoppingItemList" :key="'shoppingItemListItem'+index">
              <div class="shoppingItemLeft">
                <img :src="require('../../assets/images/accountCoupon/coupon_icon.png')" alt="">
              </div>
              <div class="shoppingItemRight vux-1px-b">
                <div class="shoppingItemTop overhide">
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                </div>
                <div class="shoppingItemBottom">
                  <div class="leftPrice">￥45</div>
                  <div class="addToCar" @click="addToCar(item)">加入购物车</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shopping-car :shoppingCarList="carList"></shopping-car>
  </main>
</template>

<script>
import ShoppingCar from "../../components/shoppingCarBottomBar/shoppingCar";

export default {
  name: "schollShopGoods",
  components: {ShoppingCar},
  data: function () {
    return {
      axiosed: true,
      shoppingItemList: [1111, 2222, 3333],
      sortList: [1111],
      carList: []
    }
  },
  methods: {
    addToCar(item) {
      this.carList.push(item)
    }
  }
}
</script>

