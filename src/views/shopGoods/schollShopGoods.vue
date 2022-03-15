<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="mainBody">
      <div class="lineHead">
        <div class="left">宿舍小卖铺</div>
        <!--        <input class="rightSearch" type="text">-->
      </div>
      <div class="mainScrollBody">
        <div class="left" v-if="sortList.length!==0">
          <div :class="[nowChangeSortListItem===index?'sortItemActive':'sortItem']" v-for="(item,index) in sortList"
               :key="'sortListItem'+index"
               @click="changeSortListItem(item,index)">
            {{ item.name }}
          </div>
        </div>
        <div class="right">
          <div class="topHead vux-1px-b">
            <div class="paramsItemActive">综合</div>
            <!--            <div class="paramsItem">销量</div>-->
            <!--            <div class="paramsItem">价格</div>-->
          </div>
          <cube-scroll
            v-if="shoppingItemList.length!==0"
            style="height: calc(100% - 0.4rem)"
            ref="contentScroll"
            :options="options"
            :data="shoppingItemList"
            @pulling-up="onPullingUp"
          >
            <div class="shoppingItemScrollBody">
              <div class="shoppingItem" v-for="(item,index) in shoppingItemList" :key="'shoppingItemListItem'+index">
                <div class="shoppingItemLeft">
                  <img :src="item.imageList[0]" alt="">
                </div>
                <div class="shoppingItemRight vux-1px-b">
                  <div class="shoppingItemTop overhide">
                    {{ item.goodsName }}
                  </div>
                  <div class="shoppingItemTop overhide" style="font-weight: normal">
                    {{ '剩余数量：' + item.goodsNumber }}
                  </div>
                  <div class="shoppingItemBottom">
                    <div class="leftPrice">
                      <span style="font-size:0.35rem ">￥</span>
                      {{ item.goodsPrice }}
                    </div>
                    <div class="addToCar" @click="addToCar(item)">加入购物车</div>
                  </div>
                </div>
              </div>
            </div>
          </cube-scroll>
          <div v-else style="height: calc(100% - 0.4rem);text-align: center">
            <img :src="require('../../assets/images/缺省页_暂无动态.png')" alt="">
            <div style="font-size: 0.4rem">暂无商品</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="mainBodyShadowClick" class="mainBodyShadow">
      <div class="shoppingCarList">
        <div class="shoppingCarListItemDown" v-for="(item,index) in carList" :key="'shoppingCarListItemDown'+index">
          <div style="width: 3.4rem;text-overflow: ellipsis;overflow: hidden;white-space: nowrap">{{ item.goodsName }}
          </div>
          <div class="itemNumSwitch">
            <div style="width: 0.4rem" @click="item.itemNum!==1&&itemNumChange(item,'less')">
              <img :src="require('../../assets/images/302减-线性方框.png')" alt="">
            </div>
            <div style="margin: 0 0.2rem;width: 0.3rem;text-align: center">{{ item.itemNum }}</div>
            <div style="width: 0.4rem" @click="itemNumChange(item,'more')">
              <img :src="require('../../assets/images/301加-线性方框.png')" alt="">
            </div>
          </div>
          <div style="width: 0.5rem;" @click="delShoppingCarListItem(item)">
            <img :src="require('../../assets/images/删除 (3).png')" alt="">
          </div>
        </div>
      </div>
    </div>
    <shopping-car @mainBodyShadowClick="mainBodyShadowChange" :carTotal="carTotal()"
                  :shoppingCarList="carList"></shopping-car>
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
      shoppingItemList: [],
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
    carTotal() {
      let total = 0
      this.carList.forEach(x => {
        total += x.goodsPrice * x.itemNum
      })
      return total
    },
    itemNumChange(item, val) {
      if (val === 'less') {
        // item.itemNum--
        item.itemNum--
        this.$forceUpdate()
        // this.$set(item, 'itemNum', item.itemNum--)
      } else {
        item.itemNum++
        this.$forceUpdate()

        // item.itemNum++
        // this.$set(item, 'itemNum', item.itemNum++)

      }
    },
    // cube ui 下拉
    async onPullingUp() {
      // let load = Toast.$create({txt: '', type: 'loading', time: 100000, mask: true}).show()
      // let load = this.$createToast({txt: '', type: 'loading', time: 100000, mask: true}).show()//加载信息
      // console.log(123)
      // this.query.pageIndex++
      this.queryParams.pageNum++
      await this.getList()

      setTimeout(() => {
        this.$refs.contentScroll.forceUpdate()
        // load.hide();//关闭加载
      }, 1000)


    },
    changeSortListItem(item, index) {
      this.nowChangeSortListItem = index
      this.queryParams.categoryId = item.value
      this.queryParams.pageNum = 1
      this.getList()
    },
    addToCar(item) {
      // console.log(item)
      if (this.carList.findIndex(x => x.goodsId === item.goodsId) === -1) {
        item.itemNum = 1
        this.carList.push(item)
      } else {
        this.carList[this.carList.findIndex(x => x.goodsId === item.goodsId)].itemNum++
        this.$forceUpdate()
      }
    },
    delShoppingCarListItem(item) {
      this.carList.splice(this.carList.findIndex(x => x.goodsId === item.goodsId), 1)
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
        // console.log(response)
        this.shoppingItemList = response.rows
      })
    },
  },
  async created() {
    // 获取分类
    await this.$func.axios(this.$api.getSortList, {}, {
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
    this.queryParams.categoryId = this.sortList[0].value
    await this.getList()
  },
  computed: {

  }
}
</script>

