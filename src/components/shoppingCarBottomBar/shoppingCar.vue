<template>
  <div class="shoppingCarOutBox">
    <div class="left" @click="showCar">
      <div class="top">
        <img v-show="!carClick" :src="require('../../assets/images/购物车 (1).png')" alt="">
        <img v-show="carClick" :src="require('../../assets/images/购物车 (2).png')" alt="">
        <div class="redPoint">{{ shoppingCarList.length }}</div>
      </div>
      <div class="bottom">购物车</div>
    </div>
    <div @click="carTotal!==0&&goPath()" :class="[carTotal!==0?'rightActive':'right']">
      <div :class="['shoppingCarPrice']">￥{{ carTotal }} 去下单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shoppingCar",
  props: ['shoppingCarList', 'carTotal'],
  data: function () {
    return {
      carClick: false
    }
  },
  methods: {
    getList() {
      this.$func.axios(this.$api.listAddress, {}, {
        type: 'get',
        openLoad: true,
        closeLoad: true,
        flag: 1
      }).then(res => {
        // this.addressList = res.rows
        if (res.rows.length !== 0) {
          localStorage.setItem('shoppingCarList', JSON.stringify(this.shoppingCarList))
          localStorage.setItem('carTotal', JSON.stringify(this.carTotal))
          this.$router.push('/createNewOrder')
        } else {
          this.$func.openToast('请先添加地址')
          setTimeout(() => {
            this.$router.push({
              path:'/localtionPage',
              query:{
                from:'shoppingCar'
              }
            })
          }, 1500)
        }
      })
    },
    showCar() {
      this.carClick = !this.carClick
      this.$emit('mainBodyShadowClick')
    },
    goPath() {
      this.getList()
    }
  },
  computed: {}
}
</script>

<style lang="less">
.shoppingCarOutBox {
  margin-top: auto;
  margin-bottom: 0;
  border-top: 1px solid #bababa;
  height: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #FFFFFF;
  padding: 0.2rem 0.3rem 0.2rem 0.2rem;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1rem;

    .top {
      position: relative;

      img {
        height: 0.5rem;
        width: 0.5rem;
      }

      .redPoint {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: absolute;
        width: 0.3rem;
        height: 0.3rem;
        right: -50%;
        top: -25%;
        transform: scale(0.8);
        background: #FF2E2E;
        border-radius: 50%;
        font-size: 0.1rem;
        font-family: Hiragino Sans GB;
        font-weight: normal;
        color: #FFFFFF;
      }
    }

    .bottom {
    }
  }

  .right {
    border-radius: 9999999px;
    margin-left: 0.3rem;
    height: 75%;
    flex: 1;
    background: rgb(218, 219, 224);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .shoppingCarPrice {
      color: #FFFFFF;
    }
  }

  .rightActive {
    border-radius: 9999999px;
    margin-left: 0.3rem;
    height: 75%;
    flex: 1;
    background: #f86337;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .shoppingCarPrice {
      color: #FFFFFF;
    }
  }
}
</style>
