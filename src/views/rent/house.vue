<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <cube-tab-bar style="background: #FFFFFF" v-model="selectedLabel"
                  @click="clickHandler"
                  @change="changeHandler"
                  show-slider>
      <cube-tab :id="item.label" v-for="(item, index) in tabs" :label="item.label" :key="item.label">
        <!-- 默认插槽 -->
        <i slot="icon" :class="item.icon"></i>
        {{ item.label }}
      </cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="(item, index) in tabs" :label="item.label" :key="item.label" >
        <div class="outBox">
          <div class="insideItem" v-for="(itemxs, indexs) in item.items" :key="indexs" @click="goDetailPath(itemxs)">
            <div class="topImg">
              <img :src="itemxs.rentHouseImageList[0].imagePath" alt="">
              <span>{{ itemxs.rentWay == 0 ? '直租' : '转租' }}</span>
            </div>
            <div class="line2Title">
              {{ itemxs.houseContent }}
            </div>
            <div class="line3HouseDetail">
              <span>{{ JSON.parse(itemxs.houseAddress).join("") }}</span>
              |
              <span>{{ itemxs.houseArea }}</span>m²
              |
              <span>{{ itemxs.goodsName }}</span>
            </div>
            <div class="line4Price">
              <span>￥</span>
              <span style="font-size: 0.45rem">{{ itemxs.housePrice }}</span>
              <span>/月</span>
            </div>
          </div>
        </div>
      </cube-tab-panel>
    </cube-tab-panels>
    <div v-drag class="dragButton" @click="loadUp">
      <img :src="require('../../assets/images/house.png')" alt="">
    </div>
  </main>
</template>

<script>
export default {
  name: "house",
  data: function () {
    return {
      axiosed: true,
      selectedLabel: '找房源',
      tabs: [{
        label: '找房源',
        icon: 'cubeic-location',
        items: []
      }, {
        label: '找合租',
        icon: 'cubeic-home',
        items: []
      }]
    }
  },
  methods: {
    goDetailPath(item) {
      // console.log(item)
      this.$router.push({
        path: '/houseDetail',
        query: {
          houseId: item.houseId
        }
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
        path: '/addHouse'
      })
    },
    queryRemark() {
      this.$func.axios(this.$api.listRent, {}, {
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

  },
  created() {
    this.queryRemark()
  }
}
</script>

<style scoped>

</style>
