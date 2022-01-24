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
        <input @change="uploadImg" v-show="false" id="goodsUpload" type="file">
        <div class="uploadImgBottomBar">
          <div v-if="uploadImgList.length!==0" class="uploadImgListItem" v-for="(item,index) in uploadImgList"
               :key="'uploadImgList'+index">
            <img :src="item" alt="">
            <span class="closeIco" @click="delImg(item)">
              <img :src="require('../../assets/images/删除.png')" alt="">
            </span>
          </div>
          <label class="uploadImgLabel" for="goodsUpload">
            <div class="line1">+</div>
            <div class="line1">上传图片</div>
          </label>
        </div>
      </div>
      <group class="goodPrice">
        <x-input required max="10" v-model="goodPrice" placeholder="￥ 0.00" placeholder-align="right" text-align="right">
          <div slot="label" class="left">
            <img :src="require('../../assets/images/价格.png')" alt="">
            <div>价格</div>
          </div>
        </x-input>
      </group>
    </div>
  </main>
</template>

<script>
import {XInput, Group} from 'vux'

export default {
  name: "addGoods",
  data: function () {
    return {
      axiosed: true,
      goodsDetail: '',
      goodsDetailRows: 5,
      uploadImgList: [],
      goodPrice: null
    }
  },
  methods: {
    bindDivValue(e) {
      this.goodsDetail = e.target.innerText
    },
    uploadImg(e) {
      let param = new FormData()
      param.append('file', e.target.files[0])
      this.$func.axios(this.$api.uploadUrl, param, {
        type: 'POST',
        openLoad: true,
        closeLoad: true
      }).then(res => {
        if (res) {
          this.uploadImgList.push(res.url)
          // console.log(res)
        }
      })
    },
    delImg(item) {
      this.uploadImgList.splice(this.uploadImgList.findIndex(x => x === item)
        , 1)
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
  },
  components: {
    XInput,
    Group
  }
}
</script>

<style scoped>

</style>
