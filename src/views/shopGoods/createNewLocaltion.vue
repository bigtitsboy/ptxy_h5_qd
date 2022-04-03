<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="topHead">
      <div class="back" @click="$router.back()">
        <img :src="require('../../assets/images/返回.png')" alt="">
      </div>
      <div class="center">{{ $route.query.title }}</div>
      <div class="saveInfo" @click="saveLocal">保存</div>
    </div>
    <div class="form">
      <div class="line1" :contenteditable="true" placeholdere="收货人" v-text="consignee"
           @input="formChange($event,1)"></div>
      <div class="line2" :contenteditable="true" placeholdere="手机号码" v-text="phonenumber"
           @input="formChange($event,2)"></div>
      <div class="line3" :contenteditable="false" placeholdere="所在楼栋" v-text="form.addressContent"
           @click="showPicker"></div>
    </div>
  </main>
</template>

<script>
// const column1 = [{text: '剧毒', value: '剧毒'}, {text: '蚂蚁', value: '蚂蚁'},
//   {text: '幽鬼', value: '幽鬼'}]
export default {
  name: "createNewLocaltion",
  data: function () {
    return {
      axiosed: true,
      myTimeOut: null,
      consignee: '',
      phonenumber: '',
      form: {
        consignee: '',
        addressContent: '',
        phonenumber: ''
      },
      options1: [{text: '凤达A', value: '凤达A'}, {text: '凤达B', value: '凤达B'}, {text: '凤达C', value: '凤达C'},
        {text: '凤达D', value: '凤达D'}, {text: '凤达E', value: '凤达E'}, {text: '凤达F', value: '凤达F'}],
      options2: [{text: '楼层1', value: '楼层1'}, {text: '楼层2', value: '楼层2'}, {text: '楼层3', value: '楼层3'},
        {text: '楼层4', value: '楼层4'}, {text: '楼层5', value: '楼层5'}, {text: '楼层6', value: '楼层6'},
        {text: '楼层7', value: '楼层7'}, {text: '楼层8', value: '楼层8'}, {text: '楼层9', value: '楼层9'}, {
          text: '楼层10',
          value: '楼层10'
        }],
      options3: [{text: '01宿舍', value: '01宿舍'}, {text: '02宿舍', value: '02宿舍'}, {text: '03宿舍', value: '03宿舍'},
        {text: '04宿舍', value: '04宿舍'}, {text: '05宿舍', value: '05宿舍'}, {text: '06宿舍', value: '06宿舍'},
        {text: '07宿舍', value: '07宿舍'}, {text: '08宿舍', value: '08宿舍'}, {text: '09宿舍', value: '09宿舍'},
        {
          text: '10宿舍',
          value: '10宿舍'
        },
        {
          text: '11宿舍',
          value: '11宿舍'
        }, {
          text: '12宿舍',
          value: '12宿舍'
        }, {
          text: '13宿舍',
          value: '13宿舍'
        }]
    }
  },
  methods: {
    getList(val) {
      this.$func.axios(this.$api.getAddress + val, {}, {
        type: 'get',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        this.form = res.data
        this.consignee = res.data.consignee
        this.phonenumber = res.data.phonenumber
      })
    },
    saveLocal() {
      if (this.$route.query.addressId !== undefined) {
        if (this.form.addressContent !== '' && this.form.consignee !== '' && this.form.phonenumber !== '') {
          this.$func.axios(this.$api.addAddress, this.form, {
            type: 'put',
            openLoad: true,
            closeLoad: true,
            flag: 1
          }).then(res => {
            const toast = this.$createToast({
              txt: '提交成功',
              type: 'correct'
            })
            toast.show()
            this.myTimeOut = setTimeout(() => {
              if (this.$route.query.from === 'orderPage') {
                this.$router.push({
                  path: '/localtionPage',
                  query: {
                    from: 'orderPage'
                  }
                })
              } else {
                this.$router.push('/localtionPage')
              }
            }, 2000)
          })
        } else {
          const toast = this.$createToast({
            txt: '请完整填写',
            type: 'error',
          })
          toast.show()
        }
      } else {
        let flag = true
        for (let i in this.form) {
          if (this.form[i] === '') {
            const toast = this.$createToast({
              txt: '请完整填写',
              type: 'error',
            })
            toast.show()
            flag = false
            break
          }
        }
        if (flag) {
          this.$func.axios(this.$api.addAddress, this.form, {
            type: 'POST',
            openLoad: true,
            closeLoad: true,
            flag: 1
          }).then(res => {
            const toast = this.$createToast({
              txt: '提交成功',
              type: 'correct'
            })
            toast.show()
            this.myTimeOut = setTimeout(() => {
              if (this.$route.query.from === 'orderPage') {
                this.$router.push({
                  path: '/localtionPage',
                  query: {
                    from: 'orderPage'
                  }
                })
              } else {
                this.$router.push('/localtionPage')
              }
            }, 2000)
          })
        }
      }
    },
    formChange(e, val) {
      switch (val) {
        case 1:
          // console.log(e.target.innerText)
          this.$set(this.form, 'consignee', e.target.innerText)
          // this.form.consignee = e.target.innerText
          break
        case 2:
          // this.form.phonenumber = e.target.innerText
          this.$set(this.form, 'phonenumber', e.target.innerText)

          break

      }
      // console.log(e.target.innerText)
    },
    showPicker() {
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '楼栋信息',
          data: [this.options1, this.options2, this.options3],
          onSelect: this.selectHandle,
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal) {
      // console.log(selectedVal)
      this.form.addressContent = selectedVal[0] + '-' + selectedVal[1] + '-' + selectedVal[2]
    },
  }
  ,
  created() {
    if (this.$route.query.addressId !== undefined) {
      this.getList(this.$route.query.addressId)
    }
  },
  destroyed() {
    // console.log('销毁定时器')
    window.clearTimeout(this.myTimeOut)
  }

}
</script>

<style scoped>

</style>
