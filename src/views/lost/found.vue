<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <cube-tab-bar style="background: #FFFFFF" v-model="selectedLabel" :data="tabs"
                  @click="clickHandler"
                  @change="changeHandler" show-slider>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <div class="tabPanelItem" v-for="(itemx, index) in item.items" :key="item.lostName">
          <div class="itemLine1">
            <div class="leftText">
              <img style="margin-right: 0.2rem" :src="require('../../assets/images/失物招领 (1).png')" alt="">
              <div>{{ itemx.lostName }}</div>
            </div>

            <div class="rightText">
              {{ itemx.remark === '0' ? '捡到如下物品' : '寻找如下物品' }}
            </div>
          </div>
          <div class="line2Content" v-html="itemx.lostContent">
          </div>
          <div class="line3Img" v-if="itemx.lostFoundDXImageList.length!==0">
            <img :src="itemx.lostFoundDXImageList[0].imagePath" alt="">
          </div>
          <div class="line4Time">
            <div style="display: flex;flex-direction: row;align-items: center">
              <img :src="require('../../assets/images/人物.png')" alt="">
              {{ itemx.phonenumber }}
            </div>
            <div style="display: flex;flex-direction: row;align-items: center">
              <img :src="require('../../assets/images/时间戳.png')" alt="">
              {{ itemx.createTime }}
            </div>
          </div>
        </div>
        <!--        <ul>-->
        <!--          <li class="tab-panel-li" v-for="(itemx, index) in item.items">-->
        <!--            {{ itemx }}-->
        <!--          </li>-->
        <!--        </ul>-->
      </cube-tab-panel>
    </cube-tab-panels>
    <div v-drag class="dragButton" @click="loadUp">
      <img :src="require('../../assets/images/失物招领.png')" alt="">
    </div>
  </main>
</template>

<script>
export default {
  name: "found",
  data: function () {
    return {
      axiosed: true,
      selectedLabel: '捡到的物品',
      tabs: [{
        label: '捡到的物品',
        items: []
      }, {
        label: '丢失的物品',
        items: []
      }]
    }
  },
  methods: {
    queryRemark() {
      this.$func.axios(this.$api.listFound, {}, {
        type: 'get',
        openLoad: true,
        closeLoad: true
      }).then(res => {
        if (res.code == 401) {
          this.$func.openToast('登录异常，请重新登陆')
          this.$router.push({
            path: '/login', query: {
              surl: this.$route.path
            }
          })
        } else {
          this.$set(this.tabs[0], 'items', res.rows.filter(x => x.remark === '0'))
          this.$set(this.tabs[1], 'items', res.rows.filter(x => x.remark === '1'))
        }
        // this.tabs[0].items = )
        // this.tabs[1].items = (res.rows.filter(x => x.remark === '1'))
      })
    },
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      // console.log(label)
    },
    changeHandler(label) {
      this.queryRemark()
      // if you clicked different tab, this methods can be emitted
    },
    loadUp() {
      // console.log(123)
      this.$router.push({
        path: '/addLostGoods'
      })
    }
  },
  created() {
    this.queryRemark()
  }
}
</script>

<style scoped>

</style>
