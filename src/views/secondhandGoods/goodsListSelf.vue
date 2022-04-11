<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="topHead">
      <div class="left">已发布商品</div>
    </div>
    <div class="outBox" v-if="itemList.length!==0">
      <div class="goodsItem" v-for="(item,index) in itemList" :key="'itemList'+index">
        <div class="detailLine1">
          <div class="leftImg">
            <img :src="item.imageList[0]" alt="">
          </div>
          <div class="rightDetail">
            <div class="line1Name">{{ item.goodsName }}</div>
            <div class="line2Price">
              <span>￥</span>
              <span style="font-weight: bolder;font-size: 0.4rem">{{ item.goodsPrice }}</span>
            </div>
            <div class="line3Other">
              <div>{{ "浏览 " + item.goodsCount }}</div>
            </div>
          </div>
        </div>
        <div class="detailLine2">
          <cube-button :light="true" @click="editObj(item)">编辑</cube-button>
          <cube-button :light="true" @click="delObj(item)">删除</cube-button>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: "goodsListSelf",
  data: function () {
    return {
      axiosed: true,
      itemList: []
    }
  },
  methods: {
    editObj(item) {
      this.$router.push({
        path: '/addGoods',
        query: {
          goodsId: item.goodsId
        }
      })
    },
    delObj(item) {
      this.$func.axios(this.$api.addSecondhandGoods + '/' + item.goodsId, {}, {
        type: 'DELETE',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        if (res.code == 200) {
          this.$func.openToast('删除成功')
          this.$func.axios(this.$api.getSecondhandGoodsListSelf, {}, {
            type: 'get',
            openLoad: true,
            closeLoad: true,
            flag: 1
          }).then(res => {
            this.itemList = (res.rows)
            // console.log(res.rows)
          })
          // this.$router.back()
        } else {
          this.$func.openToast('删除失败')
        }
      })
    }
  },
  created() {
    this.$func.axios(this.$api.getSecondhandGoodsListSelf, {}, {
      type: 'get',
      openLoad: true,
      closeLoad: true,
      flag: 1
    }).then(res => {
      this.itemList = (res.rows)
      // console.log(res.rows)
    })
  }
}
</script>

<style scoped>

</style>
