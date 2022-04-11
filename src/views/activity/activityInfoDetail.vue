<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed&&lists!==null"
  >
    <div class="topHead">
      <div class="line1">{{lists.activityName}}</div>
      <div class="line2">{{lists.createTime}}</div>
    </div>
    <div style="margin-top: 0.2rem" class="ql-container ql-snow">
      <div class="ql-editor" v-html="lists.activityContent">
      </div>
    </div>

  </main>
</template>

<script>
export default {
  name: "activityInfoDetail",
  data: function () {
    return {
      axiosed: true,
      lists: null
    }
  },
  methods: {
    listInfo() {
      this.$func.axios(this.$api.getListInfo + this.$route.query.activityId, {}, {
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
          // console.log(res)
          this.lists = res.data
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
