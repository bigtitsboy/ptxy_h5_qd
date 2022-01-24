<template>
  <!--      底部导航栏-->
  <div :class="['outbox',activePath==='index'?'index':'userCenter']" ref="outbox">
    <transition name="fade" mode="out-in">
      <div v-show="AddMenuShow" class="shadowPage">
        <div class="shadowItem" @click="goPath('/addGoods')">
          <div class="left">
            <img :src="require('../../assets/images/index/媒体发布.png')" alt="">
          </div>
          <div class="right">
            <div class="line1">发闲置</div>
            <div class="line2">30s发布宝贝</div>
          </div>
        </div>
      </div>
    </transition>
    <div class="bottomBar" ref="bottomBar">
      <div class="bottomBarItem" @click="goPath('/index')">
        <div class="line1">
          <img v-if="activePath==='index'" :src="require('../../assets/images/index/index_active.png')" alt="">
          <img v-else :src="require('../../assets/images/index/index.png')" alt="">
        </div>
        <div v-if="activePath==='index'" class="line2Active">首页</div>
        <div v-else class="line2">首页</div>
      </div>
      <div class="bottomBarItem center">
        <transition>
          <img @click="showAddMenu" ref="centerImg" class="normalImg" :src="require('../../assets/images/index/加.png')"
               alt="">
        </transition>
        <!--      <img style="height: 80%" v-show="AddMenuShow" :src="require('../../assets/images/index/操作-关闭.png')" alt="">-->
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
  </div>
</template>

<script>
export default {
  name: "indexBottomBar",
  data: function () {
    return {
      AddMenuShow: false
    }
  },
  props: ['activePath'],
  methods: {
    goPath(val) {
      this.$router.push(val)
    },
    showAddMenu() {
      this.AddMenuShow = !this.AddMenuShow
      if (this.AddMenuShow) {
        this.$refs.centerImg.className = 'rotateImg'
        // this.$refs.outbox.style.background = 'rgb(51, 51, 51)'
        this.$refs.bottomBar.className += ' rotate'
      } else {
        this.$refs.centerImg.className = 'normalImg'
        // this.$refs.outbox.style.background = '#f5f5f5'
        this.$refs.bottomBar.className = 'bottomBar'
      }
    }
  }
}
</script>

<style lang="less">

.index {

  background: #f5f5f5;
  //height: 100%;
  //padding: 0 0.5rem;
  display: flex;
  height: 100%;
  //overflow: visible;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.userCenter {
  box-sizing: border-box;
}

.outbox {

  ////padding-bottom: 0.2rem;
  //overflow: hidden;


  .bottomBar {
    padding: 0 1rem;
    //transition: all 0.5s ease-in;
    position: relative;
    z-index: 2;
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
          width: 0.45rem;
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
      width: 1rem;
      margin-bottom: 0.2rem;
      margin-top: -0.3rem;
      padding: 0.1rem 0.2rem;
      background-color: ghostwhite;
      border-radius: 50px 50px 0 0;
      border: 5px solid transparent;
      border-bottom: none;


      .normalImg {
        transition: all 1s ease;
        height: 100%;
        width: auto;
      }

      .rotateImg {
        position: relative;
        z-index: 4;
        transition: all 1s ease;
        height: 80%;
        width: auto;
        transform: rotate(45deg);
      }
    }

  }


  .bottomBar.rotate {
    //transition: all 0.5s ease-in;
    background: rgb(51, 51, 51);
    z-index: 4;

    .bottomBarItem {
      display: none;
      //display: flex;
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
      //transition: all 0.5s ease-in;
      display: flex;
      background: rgb(51, 51, 51);
      margin-top: -0.3rem;
      padding: 0.1rem 0.2rem;
      //background-color: ghostwhite;
      border-radius: 50px 50px 0 0;
      border: 5px solid transparent;
      border-bottom: none;


      .normalImg {
        transition: all 1s ease;
        height: 100%;
        width: auto;
      }

      .rotateImg {
        position: relative;
        z-index: 4;
        transition: all 1s ease;
        height: 80%;
        width: auto;
        transform: rotate(45deg);
      }
    }

  }

  .shadowPage {
    display: flex;
    position: absolute;
    height: calc(100% - 1rem);
    width: 100%;
    z-index: 3;
    top: 0;
    justify-content: center;
    align-items: flex-end;
    background: rgb(51, 51, 51);

    .shadowItem {
      display: flex;
      color: red;
      margin-bottom: 0.5rem;
      justify-content: center;
      align-items: center;

      .left {
        border-radius: 50%;
        background: rgb(91, 199, 245);
        padding: 0.18rem;
        margin-right: 0.2rem;

        img {
          height: 0.8rem;
          width: 0.8rem;
        }
      }

      .right {
        display: flex;
        flex-direction: column;

        .line1 {
          font-size: 0.3rem;
          color: whitesmoke;
        }

        .line2 {
          margin-top: 0.1rem;
          font-size: 0.14rem;
          color: rgb(135, 135, 135);
        }
      }
    }
  }


}

</style>
