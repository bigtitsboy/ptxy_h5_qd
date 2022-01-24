<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="outBox">
      <div class="topHead">
        <div class="left">取消</div>
        <div class="right">发布</div>
      </div>
      <div class="goodsDetailInput">
        <div ref="goodsDetail" class="goodsDetail" contenteditable="true" @input="bindDivValue"></div>
        <input v-show="false" id="goodsUpload" type="file">
        <label for="goodsUpload">
          123
        </label>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "addGoods",
  data: function () {
    return {
      axiosed: true,
      goodsDetail: '',
      goodsDetailRows: 5,
    }
  },
  methods: {
    bindDivValue(e) {
      this.goodsDetail = e.target.innerText
    }
  },
  watch: {
    goodsDetail: function (newval) {
      // console.log(newval)
    }
  },
  mounted() {
    this.$refs.goodsDetail.innerText = '123456'
    this.goodsDetail = this.$refs.goodsDetail.innerText
  }
}
</script>

<style scoped>

</style>
