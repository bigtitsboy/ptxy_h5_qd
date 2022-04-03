<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="topHead">
      <div class="left">常用地址</div>
      <div class="right" @click="goPath('添加收货地址')">
        <img :src="require('../../assets/images/userCenter/新建地址.png')" alt="">
        添加新地址
      </div>
    </div>
    <div class="scrollBody" v-if="addressList.length!==0">
      <div @click="checkLocal(item)" class="localItem"
           v-for="(item,index) in addressList"
           :key="'addressListItem'+index">
        <div class="line1">
          <div class="name">姓名：{{ item.consignee }}</div>
          <div class="phone">{{ item.phonenumber }}</div>
        </div>
        <div class="line2" v-html="item.addressContent">
        </div>
        <div class="line3">
          <div class="line3Item" @click.stop="putAddress('编辑收货地址',item)">
            <img :src="require('../../assets/images/userCenter/编辑.png')" alt="">
            编辑
          </div>
          <div class="line3Item" @click.stop="delAddress(item.addressId)">
            <img :src="require('../../assets/images/userCenter/删除.png')" alt="">
            删除
          </div>
        </div>
      </div>
    </div>
    <div class="scrollBody" style="align-items: center;" v-if="addressList.length===0">
      <img style="width: auto;height: 5.5rem" :src="require('../../assets/images/缺省页_暂无地址.png')" alt="">
      <div style="font-size: 0.5rem">暂无地址</div>
    </div>
  </main>
</template>

<script>
export default {
  name: "localtionPage",
  data: function () {
    return {
      axiosed: true,
      addressList: []
    }
  },
  methods: {
    checkLocal(item) {
      if (this.$route.query.from === 'orderPage') {
        this.$router.push({
          path: "/createNewOrder",
          query: {
            local: JSON.stringify(item),
          }
        })
      } else {
        this.$router.push({
          path: "/shopGoods",
        })
      }
    },
    delAddress(addressId) {
      this.$func.axios(this.$api.delAddress + addressId, {}, {
        type: 'delete',
        openLoad: true,
        closeLoad: true,
      }).then(res => {
        const toast = this.$createToast({
          txt: '删除成功',
          type: 'correct'
        })
        toast.show()
        this.getList()
      })
    },
    getList() {
      this.$func.axios(this.$api.listAddress, {}, {
        type: 'get',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        this.addressList = res.rows
        // console.log(res)
      })
    },
    goPath(val) {
      if (this.$route.query.from === 'orderPage') {
        this.$router.push({
          path: '/createNewLocaltion',
          query: {
            title: val,
            from: 'orderPage'
          }
        })
      } else {
        this.$router.push({
          path: '/createNewLocaltion',
          query: {
            title: val
          }
        })
      }
    },
    putAddress(val, item) {
      if (this.$route.query.from !== undefined) {
        this.$router.push({
          path: '/createNewLocaltion',
          query: {
            from: 'orderPage',
            title: val,
            addressId: item.addressId
          }
        })
      } else {
        this.$router.push({
          path: '/createNewLocaltion',
          query: {
            title: val,
            addressId: item.addressId
          }
        })
      }


    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>

</style>
