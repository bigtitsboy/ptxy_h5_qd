<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <cube-tab-bar style="background: #FFFFFF" v-model="selectedLabel"
                  @click="clickHandler"
                  @change="changeHandler">
      <cube-tab :id="item.label" v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <!-- 默认插槽 -->
        <i slot="icon" :class="item.icon"></i>
        {{ item.label }}
      </cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <div class="tabPanelItem" v-for="(itemx, index) in item.items" :key="item.helpName">
          <div class="itemLine1">
            <div class="leftText">
              <img v-show="itemx.remark === '0'" style="margin-right: 0.2rem"
                   :src="require('../../assets/images/心 (1).png')" alt="">
              <img v-show="itemx.remark === '1'" style="margin-right: 0.2rem"
                   :src="require('../../assets/images/找活动.png')" alt="">
              <img v-show="itemx.remark === '2'" style="margin-right: 0.2rem"
                   :src="require('../../assets/images/组队.png')" alt="">
              <div>{{ itemx.helpName }}</div>
            </div>

            <!--            <div class="rightText">-->
            <!--              <div v-show="itemx.remark === '0'"> {{ itemx.remark === '0' ? '捡到如下物品' : '寻找如下物品' }}</div>-->
            <!--              <div v-show="itemx.remark === '1'"> {{ itemx.remark === '0' ? '捡到如下物品' : '寻找如下物品' }}</div>-->
            <!--              <div v-show="itemx.remark === '2'"> {{ itemx.remark === '0' ? '捡到如下物品' : '寻找如下物品' }}</div>-->
            <!--            </div>-->
          </div>
          <div class="line2Content" v-html="itemx.helpContent">
          </div>
          <div class="line3Img" v-if="itemx.lostFoundImageList.length!==0">
            <cube-slide ref="slide" :data="itemx.lostFoundImageList">
              <cube-slide-item v-for="(itemxs, index) in itemx.lostFoundImageList" :key="index">
                <img :src="itemxs.imagePath">
              </cube-slide-item>
            </cube-slide>

            <!--            <img :src="itemx.lostFoundImageList[0].imagePath" alt="">-->
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
      <img :src="require('../../assets/images/心.png')" alt="">
    </div>
  </main>
</template>

<script>
export default {
  name: "friend",
  data: function () {
    return {
      axiosed: true,
      selectedLabel: '脱单',
      tabs: [{
        label: '脱单',
        icon: 'cubeic-like',
        items: []
      }, {
        label: '求组队',
        icon: 'cubeic-game',
        items: []
      }, {
        label: '找Ta',
        icon: 'cubeic-person',
        items: []
      }
      ]
    }
  },
  methods: {
    queryRemark() {
      this.$func.axios(this.$api.listFriends, {}, {
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
          this.$set(this.tabs[2], 'items', res.rows.filter(x => x.remark === '2'))
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
        path: '/addHelp'
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
