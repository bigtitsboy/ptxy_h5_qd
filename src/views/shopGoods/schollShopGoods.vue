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
        <div class="left" v-if="sortList.length!==0">
          <div :class="[nowChangeSortListItem===index?'sortItemActive':'sortItem']" v-for="(item,index) in sortList"
               :key="'sortListItem'+index"
               @click="changeSortListItem(index)">
            {{ item.name }}
          </div>
        </div>
        <div class="right">
          <div class="topHead vux-1px-b">
            <div class="paramsItemActive">综合</div>
            <div class="paramsItem">销量</div>
            <div class="paramsItem">价格</div>
          </div>
          <cube-scroll
            style="height: calc(100% - 0.4rem)"
            ref="contentScroll"
            :options="options"
            :data="shoppingItemList"
            @pulling-up="onPullingUp"
          >
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
          </cube-scroll>
        </div>
      </div>
    </div>
    <div v-show="mainBodyShadowClick" class="mainBodyShadow">
      <div class="shoppingCarList">
        <div class="shoppingCarListItem">123</div>
      </div>
    </div>
    <shopping-car @mainBodyShadowClick="mainBodyShadowChange" :shoppingCarList="carList"></shopping-car>
  </main>
</template>

<script>
import ShoppingCar from "../../components/shoppingCarBottomBar/shoppingCar";

export default {
  name: "schollShopGoods",
  components: {ShoppingCar},
  data: function () {
    return {
      options: {
        pullDownRefresh: false,
        pullUpLoad: true
      },
      nowChangeSortListItem: 0,
      axiosed: true,
      shoppingItemList: [1111, 2222, 3333],
      sortList: [],
      carList: [],
      mainBodyShadowClick: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        goodsName: null,
        goodsContent: null,
        goodsPrice: null,
        goodsNumber: null,
        categoryId: null,
        userId: null,
        phonenumber: null,
        imagePathId: null,
        goodsCount: null,
        status: null
      },
    }
  },
  methods: {
    // cube ui 下拉
    onPullingUp() {
      // let load = Toast.$create({txt: '', type: 'loading', time: 100000, mask: true}).show()
      // let load = this.$createToast({txt: '', type: 'loading', time: 100000, mask: true}).show()//加载信息
      // console.log(123)
      // this.query.pageIndex++

      setTimeout(()=>{
        this.$refs.contentScroll.forceUpdate()
        // load.hide();//关闭加载
      },1000)


    },
    changeSortListItem(index) {
      this.nowChangeSortListItem = index
    },
    addToCar(item) {
      this.carList.push(item)
    },
    mainBodyShadowChange() {
      this.mainBodyShadowClick = !this.mainBodyShadowClick
    },
    /** 查询店铺商品列表 */
    getList() {
      this.$func.axios(this.$api.listShopGoods, this.queryParams, {
        type: 'Get',
        openLoad: true,
        closeLoad: true
      }).then(response => {
        console.log(response)
      })
    },
  },
  created() {
    // 获取分类
    this.$func.axios(this.$api.getSortList, {}, {
      type: 'Get',
      openLoad: true,
      closeLoad: true
    }).then(res => {
      if (res.code == 401) {
        this.$func.openToast('登录异常，请重新登陆')
        this.$router.push({
          path: '/login', query: {
            surl: this.$route.path
          }
        })
      }
      res.rows.forEach(x => {
        var obj = {}
        obj.name = x.categoryName
        obj.value = x.categoryId.toString()
        this.sortList.push(obj)
      })
      // this.sortList = res.rows
      // console.log(res)
    })
    // 列表查询
    this.getList()
  }
}
</script>

