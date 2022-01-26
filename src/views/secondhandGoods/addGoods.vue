<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div @click="priceBlur" class="outBox" ref="addGoods_outBox">
      <div class="topHead">
        <div class="left">取消</div>
        <div class="right" @click="addGood">发布</div>
      </div>
      <group>
        <x-input style="padding: 10px 0" title="商品标题" placeholder="请输入商品标题" v-model="goodTitle"></x-input>
      </group>
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
        <popup-picker :show-name="true" :columns="3" :data="sortList"
                      v-model="checkSort">
          <template slot="title" slot-scope="props">
            <span class="sortPart">
              <img :src="require('../../assets/images/分类.png')" alt="">
              <span>
                商品分类
              </span>
            </span>
          </template>
        </popup-picker>
        <div class="goodStatue">
          <div class="left">
            <img :src="require('../../assets/images/3.1 全部商品.png')" alt="">
            <div>新旧程度</div>
          </div>
          <div class="right">
            <checker v-model="goodStatue" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
              <checker-item value="0">{{ '全新' }}</checker-item>
              <checker-item value="1">{{ '二手' }}</checker-item>
            </checker>
          </div>
        </div>
        <x-input
          @on-focus="priceFocus"
          :show-clear="false" :max="13" v-model="goodPrice"
          placeholder="0.00"
          placeholder-align="right"
          text-align="right">
          <div slot="label" class="left">
            <img :src="require('../../assets/images/价格.png')" alt="">
            <div>价格</div>
          </div>
          <div slot="right">元</div>
        </x-input>
      </group>
    </div>
    <user-key-board ref="addGoods_Keyboard"></user-key-board>
  </main>
</template>

<script>
import {XInput, Group, PopupPicker, Checker, CheckerItem} from 'vux'
import UserKeyBoard from "../../components/userKeyBoard/userKeyBoard";

export default {
  name: "addGoods",
  data: function () {
    return {
      axiosed: true,
      goodsDetail: '',
      goodsDetailRows: 5,
      uploadImgList: [],
      goodPrice: null,
      sortList: [],
      checkSort: [],
      goodStatue: '',
      goodTitle: '',
      showKeyboard: false
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
    },
    addGood() {
    },
    priceFocus() {
      this.$refs.addGoods_Keyboard.showKeyboardInsideShow()
      this.$nextTick(() => {
        this.$refs['addGoods_main_ref'].scrollTop = (this.$refs['addGoods_Keyboard'].$el.clientHeight + this.$refs['addGoods_outBox'].clientHeight) - this.$refs['addGoods_main_ref'].clientHeight
      })
      document.activeElement.blur()
    },
    priceBlur() {
      this.$refs.addGoods_Keyboard.showKeyboardInsideHide()
    }
  },
  watch: {
    goodsDetail: function (newval) {
      // console.log(newval)
    },
  },
  mounted() {
    this.$refs.goodsDetail.innerText = ''
    this.goodsDetail = this.$refs.goodsDetail.innerText
  },
  components: {
    UserKeyBoard,
    XInput,
    Group,
    PopupPicker,
    Checker,
    CheckerItem
  },
  created() {
    this.$func.axios(this.$api.getSortList, {}, {
      type: 'Get',
      openLoad: true,
      closeLoad: true
    }).then(res => {
      res.rows.forEach(x => {
        var obj = {}
        obj.name = x.categoryName
        obj.value = x.categoryId.toString()
        this.sortList.push(obj)
      })
      // this.sortList = res.rows
      // console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
