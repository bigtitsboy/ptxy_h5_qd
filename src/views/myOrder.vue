<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <tab>
      <tab-item selected @on-item-click="onItemClick">全部订单</tab-item>
      <tab-item @on-item-click="onItemClick">派送中</tab-item>
      <tab-item @on-item-click="onItemClick">已完成</tab-item>
    </tab>
    <div class="scrollBody">
      <div class="orderItem" v-for="(item,index) in orderList" :key="'orderList'+index">
        <div class="topHead">
          <div class="left">
            <div class="logo">
              <img :src="require('../assets/images/小卖部，商店，建筑，房子.png')" alt="">
            </div>
            <div class="shopName">宿舍小卖铺</div>
          </div>
          <div class="right">
            <div :class="{'sending':item.status === '0'}">{{ formatter(item) }}</div>
          </div>
        </div>
        <div class="orderDetailItem" v-for="(itemx,indexs) in  item.orderGoodsList"
             :key="'orderGoodsList'+index+indexs">
          <div class="left">
            <img :src="itemx.remark" alt="">
          </div>
          <div class="center overhide">
            {{ itemx.status.split('&&')[0] }}
          </div>
          <div class="right">
            <div class="price">
              <span style="font-size: 0.05rem">￥</span>
              {{ itemx.status.split('&&')[1] }}
            </div>
            <div class="itemSum">
              {{ 'x' + itemx.goodsNumber }}
            </div>
          </div>
        </div>
        <div class="bottomLineTotal">
          {{ '共' + computedTotalNum(item.orderGoodsList) + '件商品 合计:￥' + item.orderPrice }}
        </div>
        <div class="bottomLineLocal">
          <div class="left">
            <img :src="require('../assets/images/index/电话.png')" alt="">
            {{ item.phonenumber }}
          </div>
          <div class="right">
            <img :src="require('../assets/images/index/定位.png')" alt="">
            <div v-html="item.addressContent"></div>
          </div>
        </div>
        <div class="bottomLineButton" v-if="item.status === '0'">
          <x-button @click.native="cancelOrder(item)" style="margin-left: auto;margin-right: 0;" plain mini
                    type="primary">取消订单
          </x-button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {Tab, TabItem, XButton} from 'vux'

export default {
  name: "myOrder",
  data: function () {
    return {
      axiosed: true,
      myTimeOut: null,
      orderList: [],
      orderTypeList: [
        {
          "searchValue": null,
          "createBy": "admin",
          "createTime": "2022-03-19 03:33:10",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "params": {},
          "dictCode": 102,
          "dictSort": 0,
          "dictLabel": "派送中",
          "dictValue": "0",
          "dictType": "order_type",
          "cssClass": null,
          "listClass": "default",
          "isDefault": "N",
          "status": "0",
          "default": false
        },
        {
          "searchValue": null,
          "createBy": "admin",
          "createTime": "2022-03-19 03:33:26",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "params": {},
          "dictCode": 103,
          "dictSort": 0,
          "dictLabel": "已取消",
          "dictValue": "2",
          "dictType": "order_type",
          "cssClass": null,
          "listClass": "default",
          "isDefault": "N",
          "status": "0",
          "default": false
        },
        {
          "searchValue": null,
          "createBy": "admin",
          "createTime": "2022-03-19 03:33:33",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "params": {},
          "dictCode": 104,
          "dictSort": 0,
          "dictLabel": "已完成",
          "dictValue": "1",
          "dictType": "order_type",
          "cssClass": null,
          "listClass": "default",
          "isDefault": "N",
          "status": "0",
          "default": false
        }
      ]
    }
  },
  components: {
    Tab,
    TabItem,
    XButton
  },
  methods: {
    cancelOrder(item) {
      let data = item
      data.status = '2'
      this.$func.axios(this.$api.updateShopOrder, data, {
        type: 'put',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        if (res.code === 200) {
          const toast = this.$createToast({
            txt: '取消成功',
            type: 'correct'
          })
          toast.show()
          // this.myTimeOut = setTimeout(() => {
          this.listShopOrder()
          // }, 2000)
        }
      })
    },
    formatter(row) {
      // console.log(row.status)
      return this.orderTypeList[this.orderTypeList.findIndex(x => x.dictValue === row.status)].dictLabel
      // return row.dictLabel
    },
    computedTotalNum(arr) {
      let totalNum = 0
      arr.forEach(x => {
        totalNum += x.goodsNumber
      })
      return totalNum
    },
    onItemClick(index) {
      switch (index) {
        case 0:
          this.listShopOrder()
          break
        case 1:
          this.listShopOrder('0')
          break
        case 2:
          this.listShopOrder('1')
          break
      }
    },
    listShopOrder(status) {
      if (!status) {
        this.$func.axios(this.$api.listShopOrder, {}, {
          type: 'get',
          openLoad: true,
          closeLoad: true,
          flag: 1
        }).then(res => {
          this.orderList = (res.rows)
        })
      } else {
        this.$func.axios(this.$api.listShopOrder, {status: status}, {
          type: 'get',
          openLoad: true,
          closeLoad: true,
          flag: 1
        }).then(res => {
          this.orderList = (res.rows)
        })
      }
    }
  },
  created() {
    this.listShopOrder()
  },
  // destroyed() {
  //   // console.log('销毁定时器')
  //   window.clearTimeout(this.myTimeOut)
  // }
}
</script>

<style scoped>

</style>
