<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="outBox" ref="searchoutside">
      <div class="searchoutside">
      <span style="width: 1rem" @click="goPath('/index')">
        <img style="height: 0.6rem;" :src="require('../../assets/images/chevron-back-outline.svg')" alt="">
      </span>
        <input class="search" @keypress.enter="goSearch" type="search" v-model="searchValue" placeholder="搜索">
      </div>
      <div class="sortPart">
        <!--        <div class="sortItemActive">电子产品</div>-->
        <div @click="siwtchBar(item,index)" :class="{'sortItem':true,'sortItemActive':sortItemActiveIndex===index}"
             v-for="(item,index) in sortList"
             :key="'sortItem'+index">{{ item.categoryName }}
        </div>

      </div>
    </div>
    <div @scroll="loadMore" ref="scrollBody" class="scrollBody">
      <div ref="itemList" style="flex: 1;display: flex;flex-direction: row;flex-wrap: wrap;height: min-content">
           <span class="boxItem" v-for="(item,index) in itemDeatil" :key="'itemBox'+index">
        <div class="line1">
          <img :src="item.imageList[0]" alt="">
        </div>
        <div class="line2">
          <span :class="[item.remark==0?'new':'old']">{{ item.remark==0?'全新':'二手' }}</span>
          {{ item.goodsName }}</div>
        <div class="line3">
          <span>&yen;</span>
          <div
            style="font-family: cursive;font-size: 0.34rem">{{
              item.goodsPrice > 10000 ? parseInt(item.goodsPrice / 10000) + '.' + item.goodsPrice % 10000 + '万' : item.goodsPrice
            }}</div>
          <span class="visitedNum">{{ item.goodsCount > 99 ? 99 + '+' : item.goodsCount }}条浏览量</span>
          </div>
             <!--        <div class="line4">-->
             <!--          <img :src="require('../../assets/images/img.png')" alt="">-->
             <!--          <span>山东</span>-->
             <!--        </div>-->
      </span>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: "secondhandGoods",
  data: function () {
    return {
      axiosed: true,
      bodyWidth: null,
      searchValue: '',
      countNum: 10,
      sortItemActiveIndex: 0,
      sortList: [],
      itemDeatil: [],
      loadMoreStatus: true,
      queryParam: {
        pageNum: 1,
        pageSize: 10,
        categoryId: null,
        goodsName: null
      }
    }
  },
  methods: {
    async goSearch() {
      this.sortItemActiveIndex = null
      this.restQueryParam()
      this.queryParam.goodsName = this.searchValue
      await this.getItemList()
    },
    restQueryParam() {
      this.queryParam = {
        pageNum: 1,
        pageSize: 10,
        categoryId: null,
        goodsName: null
      }
    },
    async siwtchBar(item, index) {
      this.searchValue = ''
      this.sortItemActiveIndex = index
      this.restQueryParam()
      this.queryParam.categoryId = item.categoryId
      await this.getItemList()
    },
    async loadMore() {
      if (this.$refs.scrollBody.scrollTop + this.$refs.scrollBody.clientHeight >= this.$refs.itemList.clientHeight - 100 && this.loadMoreStatus) {
        console.log('more')
        await this.getItemList()
      }
    },
    getItemList() {
      this.loadMoreStatus = false
      this.$func.axios(this.$api.getSecondhandGoodsList, this.queryParam, {
        type: 'get',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        if (this.queryParam.pageNum === 1) {
          this.itemDeatil = res.rows
        } else {
          res.rows.forEach(x => {
            this.itemDeatil.push(x)
          })

        }
        if (res.rows.length < 10) {
          this.$forceUpdate()
        } else {
          this.$forceUpdate()
          this.$nextTick(() => {
            this.queryParam.pageNum = this.queryParam.pageNum + 1
            this.loadMoreStatus = true
          })
        }
        // console.log(res)
      })

    },
    pullList() {
      // 瀑布排序
      this.bodyWidth = (document.documentElement.offsetWidth) - parseInt(document.documentElement.style.fontSize)
      this.$nextTick(() => {
        let oddHeight = null
        let evenHeight = null
        for (let key = 0; key < this.$refs.scrollBody.children.length; key++) {
          this.$refs.scrollBody.children[key].style.marginBottom = 0.2 + 'rem'
          this.$refs.scrollBody.children[key].style.width = this.bodyWidth / 2 - 0.25 * parseInt(document.documentElement.style.fontSize) + 'px'
          if (key % 2 === 0 && key !== 0) {
            evenHeight = this.$refs.scrollBody.children[key - 2].clientHeight + (this.$refs.scrollBody.children[key - 2].style.marginTop !== '' ? parseInt(this.$refs.scrollBody.children[key - 2].style.marginTop) : 0)
            oddHeight = this.$refs.scrollBody.children[key - 1].clientHeight + (this.$refs.scrollBody.children[key - 1].style.marginTop !== '' ? parseInt(this.$refs.scrollBody.children[key - 1].style.marginTop) : 0)
            if (evenHeight - oddHeight < 0) {
              this.$refs.scrollBody.children[key].style.marginTop = evenHeight - oddHeight + 0.2 * parseInt(document.documentElement.style.fontSize) + 'px'
            } else {
              // this.$refs.scrollBody.children[key].style.marginTop = 0.2 + 'rem'
            }
          } else if (key % 2 !== 0 && key !== 1) {
            evenHeight = this.$refs.scrollBody.children[key - 3].clientHeight + (this.$refs.scrollBody.children[key - 3].style.marginTop !== '' ? parseInt(this.$refs.scrollBody.children[key - 3].style.marginTop) : 0)
            oddHeight = this.$refs.scrollBody.children[key - 2].clientHeight + (this.$refs.scrollBody.children[key - 2].style.marginTop !== '' ? parseInt(this.$refs.scrollBody.children[key - 2].style.marginTop) : 0)
            if (evenHeight - oddHeight > 0 && key !== 1) {
              this.$refs.scrollBody.children[key].style.marginTop = oddHeight - evenHeight + 0.2 * parseInt(document.documentElement.style.fontSize) + 'px'
            } else {
              // this.$refs.scrollBody.children[key].style.marginTop = 0.2 + 'rem'
            }
          }
        }
      })
    },
    goPath(val) {
      this.$router.push({path: val})
    }
  },
  async created() {
    this.getItemList()

    // 瀑布排序
    await this.pullList()
    this.$nextTick(() => {
      this.$refs.scrollBody.style.height = document.documentElement.clientHeight - this.$refs.searchoutside.clientHeight - 30 + 'px'
    })

    this.$func.axios(this.$api.getSortList, {}, {
      type: 'get',
      openLoad: true,
      closeLoad: true,
      flag: 1
    }).then(res => {
      if (res.code == 401) {
        this.$func.openToast('登录异常，请重新登陆')
        this.$router.push({
          path: '/login', query: {
            surl: this.$route.path
          }
        })
      } else {
        this.sortList = res.rows
        this.sortList.unshift({
          categoryId: null,
          categoryName: '全部',
        })
      }


    })

  }
}
</script>

<style scoped>

</style>
