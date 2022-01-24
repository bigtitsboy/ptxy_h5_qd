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
        <input class="search" @keypress.enter="" type="search" v-model="searchValue" placeholder="搜索">
      </div>
      <div class="sortPart">
        <div class="sortItemActive">电子产品</div>
        <div class="sortItem">电子产品</div>
        <div class="sortItem">电子产品</div>
        <div class="sortItem">电子产品</div>
        <div class="sortItem">电子产品</div>
        <div class="sortItem">电子产品</div>
        <div class="sortItem">电子产品</div>
      </div>
    </div>
    <div class="scrollBody" ref="scrollBody">
      <span class="boxItem" v-for="count in countNum" :key="'itemBox'+count">
        <div class="line1">
          <img :src="require('../../assets/images/test.jpg')" alt="">
        </div>
        <div class="line2">
          <span>全新</span>
          阿玛阿玛尼阿玛尼阿玛尼阿玛尼阿玛尼阿玛尼尼</div>
        <div class="line3">
          <span>&yen;</span>
          <div
            style="font-family: cursive;font-size: 0.34rem">{{
              66666 > 10000 ? parseInt(66666 / 10000) + '.' + 66666 % 10000 + '万' : 66666
            }}</div>
          <span class="visitedNum">{{ 127 > 99 ? 99 + '+' : 127 }}条浏览量</span>
          </div>
        <div class="line4">
          <img :src="require('../../assets/images/img.png')" alt="">
          <span>山东</span>
        </div>
      </span>
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
      countNum: 2
    }
  },
  methods: {
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
    // 瀑布排序
    await this.pullList()
    this.$nextTick(() => {
      this.$refs.scrollBody.style.height = document.documentElement.clientHeight - this.$refs.searchoutside.clientHeight + 'px'
    })



  }
}
</script>

<style scoped>

</style>
