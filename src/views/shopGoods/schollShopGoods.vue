<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="mainBody">
      <div class="lineHead">
        <div class="left">分类</div>
        <input class="rightSearch" type="search">
      </div>
      <div class="mainScrollBody">
        <div class="left">
          <div class="sortItem" v-for="count in 120">
            海鲜水产
          </div>
        </div>
        <div class="right">
          <div class="topHead vux-1px-b">
            <div class="paramsItemActive">综合</div>
            <div class="paramsItem">销量</div>
            <div class="paramsItem">价格</div>
          </div>
          <div class="shoppingItemScrollBody">
            <div class="shoppingItem">
              <div class="shoppingItemLeft">
                <img :src="require('../../assets/images/accountCoupon/coupon_icon.png')" alt="">
              </div>
              <div class="shoppingItemRight vux-1px-b">
                <div class="shoppingItemTop">XXXXXXX</div>
                <div class="shoppingItemBottom">
                  <div class="leftPrice">￥45</div>
                  <div class="addToCar">加入购物车</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <shopping-car></shopping-car>
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
    }
  }
}
</script>

