<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <!-- 模板内容开始 -->
    <div class="points-info-wrap">
      <div class="modular-box-model">
        <div class="top-hand">
          <div class="left-area">
            <div class="top-side">
              <em class="text">可用积分</em>
              <strong class="icon"></strong>
            </div>
            <div class="bottom-side">16000</div>
          </div>
          <div class="right-area">
            <router-link class="top-side" to="/pointsDetails">明细</router-link>
            <!-- <div class="bottom-side">充值</div> -->
          </div>
        </div>
        <div class="bottom-hand">20个积分将在2021-08-08 18:00:00过期</div>
      </div>
    </div>
    <div class="gain-way-wrap">
      <div class="modular-title">获取更多积分</div>
      <div class="modular-cont">
        <div class="cell">
          <div class="left-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <div class="top-side">在线下单</div>
              <div class="bottom-side">下单可获得积分</div>
            </div>
          </div>
          <div class="right-hand">
            <router-link to="">去下单</router-link>
          </div>
        </div>
        <div class="cell">
          <div class="left-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <div class="top-side">订单评价</div>
              <div class="bottom-side">评价可获得积分</div>
            </div>
          </div>
          <div class="right-hand">
            <router-link to="">去评价</router-link>
          </div>
        </div>
        <div class="cell">
          <div class="left-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <div class="top-side">充值奖励</div>
              <div class="bottom-side">充值可获得积分</div>
            </div>
          </div>
          <div class="right-hand">
            <router-link to="">去充值</router-link>
          </div>
        </div>
        <div class="cell">
          <div class="left-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <div class="top-side">分享给好友</div>
              <div class="bottom-side">分享可获得积分</div>
            </div>
          </div>
          <div class="right-hand">
            <router-link to="">去分享</router-link>
          </div>
        </div>
        <div class="cell">
          <div class="left-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <div class="top-side">推荐奖励</div>
              <div class="bottom-side">推荐可获得积分</div>
            </div>
          </div>
          <div class="right-hand">
            <router-link to="">去推荐</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-exchange-wrap">
      <div class="modular-title">热门商品兑换</div>
      <div class="modular-cont">
        <div class="item">
          <div class="top-hand">
            <img
              src="https://c-ssl.duitang.com/uploads/item/201808/02/20180802064639_ABWAK.thumb.1000_0.jpeg"
              v-real-img="'/static/images/default_user_photo.png'"
            />
            <span class="surplus-status">剩余100张</span>
          </div>
          <div class="bottom-hand">
            <div class="top-area">大西瓜一片</div>
            <div class="bottom-area">
              <div class="left-side">消耗300积分</div>
              <div class="right-side" @click="exchangeGoodsEvent">兑换</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="top-hand">
            <img
              src="https://c-ssl.duitang.com/uploads/item/201808/02/20180802064639_ABWAK.thumb.1000_0.jpeg"
              v-real-img="'/static/images/default_user_photo.png'"
            />
            <span class="surplus-status">剩余0张</span>
          </div>
          <div class="bottom-hand">
            <div class="top-area">大西瓜一片</div>
            <div class="bottom-area">
              <div class="left-side">消耗300积分</div>
              <div class="right-side loot-all">已抢光</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="top-hand">
            <img
              src="https://c-ssl.duitang.com/uploads/item/201808/02/20180802064639_ABWAK.thumb.1000_0.jpeg"
              v-real-img="'/static/images/default_user_photo.png'"
            />
            <span class="surplus-status">剩余100张</span>
          </div>
          <div class="bottom-hand">
            <div class="top-area">大西瓜一片</div>
            <div class="bottom-area">
              <div class="left-side">消耗300积分</div>
              <div class="right-side" @click="exchangeGoodsEvent">兑换</div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="top-hand">
            <img
              src="https://c-ssl.duitang.com/uploads/item/201808/02/20180802064639_ABWAK.thumb.1000_0.jpeg"
              v-real-img="'/static/images/default_user_photo.png'"
            />
            <span class="surplus-status">剩余100张</span>
          </div>
          <div class="bottom-hand">
            <div class="top-area">大西瓜一片</div>
            <div class="bottom-area">
              <div class="left-side">消耗300积分</div>
              <div class="right-side" @click="exchangeGoodsEvent">兑换</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模板内容结束 -->
  </main>
</template>

<script>
export default {
  name: "tpl",
  data() {
    return {
      axiosed: false, // 页面盒模型显示状态
      axiosSucNum: 0, // 接口请求成功数量
    };
  },
  created() {
    let doAxiosDemo = this.doAxiosDemo(); // 示例请求
    // 待所有请求执行完毕后执行回调函数
    Promise.all([doAxiosDemo]).then(() => {
      this.$func.closeLoad();
      if (this.axiosSucNum == 1) {
        this.axiosed = true;
      }
    });
  },
  methods: {
    // 请求示例函数
    async doAxiosDemo() {
      let res = await this.$func.axios(
        this.$api.test, // 示例接口
        {},
        {
          type: "GET",
          openLoad: true,
          closeLoad: false,
        }
      );
      if (!res) {
        return;
      }
      this.axiosSucNum++; // 接口请求成功数量标识+1
    },
    // 兑换商品
    exchangeGoodsEvent() {
      this.$func.openToast("兑换失败");
    },
  },
};
</script>
