<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="outBox" ref="addGoods_outBox">
      <div class="topHead">
        <div class="left" @click="$router.back()">取消</div>
        <div class="right" @click="addGood">发布</div>
      </div>
      <group>
        <x-input style="padding: 10px 0" title="标题" placeholder="请输入标题" v-model="goodTitle"></x-input>
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
          <label v-show="uploadImgList.length<3" class="uploadImgLabel" for="goodsUpload">
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
                发布类型
              </span>
            </span>
          </template>
        </popup-picker>
        <!--        <div class="goodStatue">-->
        <!--          <div class="left">-->
        <!--            <img :src="require('../../assets/images/3.1 全部商品.png')" alt="">-->
        <!--            <div>新旧程度</div>-->
        <!--          </div>-->
        <!--          <div class="right">-->
        <!--            <checker v-model="goodStatue" default-item-class="demo1-item" selected-item-class="demo1-item-selected">-->
        <!--              <checker-item value="0">{{ '全新' }}</checker-item>-->
        <!--              <checker-item value="1">{{ '二手' }}</checker-item>-->
        <!--            </checker>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <x-input-->
        <!--          class="priceInput"-->
        <!--          @on-focus="priceFocus"-->
        <!--          :show-clear="false" v-model="goodPrice"-->
        <!--          placeholder="0.00"-->
        <!--          placeholder-align="right"-->
        <!--          text-align="right">-->
        <!--          <div slot="label" class="left">-->
        <!--            <img :src="require('../../assets/images/价格.png')" alt="">-->
        <!--            <div>价格</div>-->
        <!--          </div>-->
        <!--          <div slot="right">元</div>-->
        <!--        </x-input>-->
        <x-input
          mask="999 9999 9999"
          style="color: #202020"
          :show-clear="false" v-model="phonenumber"
          placeholder-align="right"
          text-align="right">
          <div slot="label" class="left">
            <img :src="require('../../assets/images/手机.png')" alt="">
            <div>联系方式</div>
          </div>
        </x-input>
      </group>
    </div>
    <!--    <user-key-board @delkeyboarditem="delKeyBoard" :inputTxtLength="FinputTxtLength" @clickboard="clickKeyBoard"-->
    <!--                    ref="addGoods_Keyboard"></user-key-board>-->
  </main>
</template>

<script>
import {XInput, Group, PopupPicker, Checker, CheckerItem} from 'vux'
// import UserKeyBoard from "../../components/userKeyBoard/userKeyBoard";

export default {
  name: "addHelp",
  data: function () {
    return {
      axiosed: true,
      putState: false,
      goodsDetail: '', //详情
      goodsDetailRows: 5,
      uploadImgList: [], // 上传图片list
      goodPrice: '', //价格
      sortList: [],
      checkSort: [], //商品分类
      goodStatue: '', //新旧程度
      goodTitle: '', // 标题
      goodId: null,
      showKeyboard: false,
      FinputTxtLength: 0,
      phonenumber: '',//联系电话
      form: {
        helpName: null,
        helpContent: null,
        remark: null,
        phonenumber: null,
        lostFoundImageList: []
      }
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
          // this.activityInfoImageList.push({imagePath: file.response.url})

          // console.log(res)
        }
      })
    },
    delImg(item) {
      this.uploadImgList.splice(this.uploadImgList.findIndex(x => x === item)
        , 1)
    },
    addGood() {
      let activityInfoImageList = []
      if (this.uploadImgList.length !== 0) {
        this.uploadImgList.forEach(x => {
          activityInfoImageList.push({imagePath: x})
        })
      }
      this.form = {
        helpName: this.goodTitle,
        helpContent: this.goodsDetail,
        remark: this.checkSort[0],
        phonenumber: this.phonenumber.replace(/\ +/g, ''),
        lostFoundImageList: activityInfoImageList
      }
      this.$func.axios(this.$api.addFriends, this.form, {
        type: 'POST',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        if (res.code == 200) {
          this.$func.openToast('发布成功')
          this.$router.back()
        } else {
          this.$func.openToast('发布失败')
        }
      })
    }
    // priceFocus() {
    //   this.$refs.addGoods_Keyboard.showKeyboardInsideShow()
    //   this.$nextTick(() => {
    //     this.$refs['addGoods_main_ref'].scrollTop = (this.$refs['addGoods_Keyboard'].$el.clientHeight + this.$refs['addGoods_outBox'].clientHeight) - this.$refs['addGoods_main_ref'].clientHeight
    //   })
    //   document.activeElement.blur()
    // },
    // priceBlur() {
    //   this.$refs.addGoods_Keyboard.showKeyboardInsideHide()
    // }
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
    // UserKeyBoard,
    XInput,
    Group,
    PopupPicker,
    Checker,
    CheckerItem
  },
  created() {
    // this.$func.axios(this.$api.getSortList, {}, {
    //   type: 'Get',
    //   openLoad: true,
    //   closeLoad: true
    // }).then(res => {
    //   if (res.code == 401) {
    //     this.$func.openToast('登录异常，请重新登陆')
    //     this.$router.push({
    //       path: '/login', query: {
    //         surl: this.$route.path
    //       }
    //     })
    //   }
    //   res.rows.forEach(x => {
    this.sortList = [
      {
        name: '脱单',
        value: '0'
      },
      {
        name: '求组队',
        value: '1'
      },
      {
        name: '找Ta',
        value: '2'
      }
    ]
    // })
    //   // this.sortList = res.rows
    //   // console.log(res)
    // })
    //
    // if (this.$route.query.goodsId !== undefined) {
    //   this.putState = true
    //   this.$func.axios(this.$api.addSecondhandGoods + '/' + this.$route.query.goodsId, {}, {
    //     type: 'Get',
    //     openLoad: true,
    //     closeLoad: true
    //   }).then(res => {
    //     this.form = res.data
    //     this.goodId = res.data.goodsId
    //     this.goodTitle = res.data.goodsName
    //     this.$refs.goodsDetail.innerHTML = res.data.goodsContent
    //     this.goodsDetail = res.data.goodsContent
    //     this.goodPrice = res.data.goodsPrice
    //     this.$set(this.checkSort, 0, res.data.categoryId.toString())
    //     // this.checkSort[0] = res.data.categoryId.toString()
    //     this.phonenumber = res.data.phonenumber
    //
    //     this.uploadImgList = res.data.imageList
    //     this.goodStatue = res.data.status
    //     // this.$forceUpdate()
    //     //  console.log(res)
    //   })
  }
}
</script>

<style scoped>

</style>
