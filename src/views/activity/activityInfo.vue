<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="infoItem" @click="goDetail(item)" v-for="(item,index) in lists" :key="'listItem'+index">
      <div class="lineTitle">{{ item.activityName }}</div>
      <div class="lineTime">{{ item.createTime.split(' ')[0] }}</div>
      <div class="lineImg">
        <img :src="item.activityInfoImageList[0].imagePath" alt="">
      </div>
      <div class="lineBottom">
        <div class="itemLeft">阅读全文</div>
        <div class="itemRight">
          <img :src="require('../../assets/images/展开.png')" alt="">
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "activityInfo",
  data: function () {
    return {
      axiosed: true,
      lists: []
    }
  },
  methods: {
    listInfo() {
      this.$func.axios(this.$api.listInfo, {}, {
        type: 'Get',
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
          this.lists = res.rows
        }
      })
    },
    goDetail(item) {
      this.$router.push({
        path: '/activityInfoDetail', query: {
          activityId: item.activityId
        }
      })
    }
  },
  created() {
    this.listInfo()
  }
}
</script>

<style scoped>

</style>
