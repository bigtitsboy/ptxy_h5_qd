<template>
  <!--      底部导航栏-->

  <div class="bottomBar">
    <div class="bottomBarItem" @click="goPath('/index')">
      <div class="line1">
        <img v-if="activePath==='index'" :src="require('../../assets/images/index/index_active.png')" alt="">
        <img v-else :src="require('../../assets/images/index/index.png')" alt="">
      </div>
      <div v-if="activePath==='index'" class="line2Active">首页</div>
      <div v-else class="line2">首页</div>
    </div>
    <div class="bottomBarItem center">
      <img :src="require('../../assets/images/index/二手回收.png')" alt="">
    </div>
    <div class="bottomBarItem" @click="goPath('/userCenter')">
      <div class="line1">
        <img v-if="activePath==='userCenter'" :src="require('../../assets/images/index/mine_active.png')" alt="">
        <img v-else :src="require('../../assets/images/index/mine.png')" alt="">
      </div>
      <div v-if="activePath==='userCenter'" class="line2Active">我的</div>
      <div v-else class="line2">我的</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexBottomBar",
  props: ['activePath'],
  methods: {
    goPath(val) {
      this.$router.push(val)
    }
  }
}
</script>

<style lang="less">

.bottomBar {
  position: relative;
  z-index: 99999;
  background: ghostwhite;
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  margin-bottom: 0;
  height: 1rem;

  .bottomBarItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .line1 {

      img {
        margin-top: 0.1rem;
        height: 0.45rem;
        //height: 100%;
        //width: 100%;
      }
    }

    .line2 {
      font-size: 0.14rem;
      color: #a0a5ab;
    }

    .line2Active {
      font-size: 0.14rem;
      color: #0eb985;
    }
  }

  .bottomBarItem.center {
    margin-top: -0.3rem;
    padding: 0.1rem 0.2rem;
    background-color: ghostwhite;
    border-radius: 50px 50px 0 0;
    border: 5px solid transparent;
    border-bottom: none;

    img {
      height: 130%;
      width: auto;
    }
  }
}

</style>
