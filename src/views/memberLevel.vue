<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <!-- 模板内容开始 -->
    <div class="level-info-wrap">
      <div class="top-hand">
        <div class="left-area">
          <div class="left-side">
            <img src="../assets/images/memberLevel/level_medal.png" alt="" />
          </div>
          <div class="right-side">
            <div class="stage">LV3</div>
            <div class="growth-value">成长值:1600</div>
          </div>
        </div>
        <div class="right-area">等级说明</div>
      </div>
      <div class="bottom-hand">
        <div class="top-area">
          <div class="left-side">下一等级还需要200成长值</div>
          <div class="right-side">1600/1800</div>
        </div>
        <div class="bottom-area">
          <span class="real-value"></span>
        </div>
      </div>
    </div>

    <div class="growth-progress-wrap">
      <div class="modular-title">成长体系</div>
      <div class="modular-cont">
        <div class="item">
          <span class="lv">LV1</span>
          <em class="icon"></em>
          <strong class="min-value">500</strong>
        </div>
        <div class="item">
          <span class="lv">LV2</span>
          <em class="icon"></em>
          <strong class="min-value">1000</strong>
        </div>
        <div class="item">
          <span class="lv">LV3</span>
          <em class="icon"></em>
          <strong class="min-value">1500</strong>
        </div>
        <div class="item">
          <span class="lv">LV4</span>
          <em class="icon"></em>
          <strong class="min-value">2000</strong>
        </div>
        <div class="item">
          <span class="lv">LV5</span>
          <em class="icon"></em>
          <strong class="min-value">2500</strong>
        </div>
      </div>
    </div>
    <div class="level-reward-wrap">
      <div class="modular-title">等级奖励</div>
      <div class="modular-body">
        <div class="item">
          <div class="left-hand">
            <div class="left-area">
              <span class="money">50</span>
              <span class="unit">元</span>
            </div>
            <div class="right-area">
              <div class="top-side">满500减50</div>
              <div class="bottom-side">有效期至 2020.07.31 23:59</div>
            </div>
          </div>
          <div class="right-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <span class="btn">领取</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="left-hand">
            <div class="left-area">
              <span class="money">100</span>
              <span class="unit">元</span>
            </div>
            <div class="right-area">
              <div class="top-side">满500减100</div>
              <div class="bottom-side">有效期至 2020.07.31 23:59</div>
            </div>
          </div>
          <div class="right-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <span class="btn">领取</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="left-hand">
            <div class="left-area">
              <span class="money">50</span>
              <span class="unit">元</span>
            </div>
            <div class="right-area">
              <div class="top-side">满500减50</div>
              <div class="bottom-side">有效期至 2020.07.31 23:59</div>
            </div>
          </div>
          <div class="right-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <span class="btn received">已领取</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="left-hand">
            <div class="left-area">
              <img
                class="commodity-picture"
                src="https://c-ssl.duitang.com/uploads/item/201412/07/20141207181317_VxPQJ.thumb.1000_0.gif"
                v-real-img="'/static/image/default_user_photo.png'"
              />
            </div>
            <div class="right-area">
              <div class="top-side">iPhone 12 Pro Max</div>
            </div>
          </div>
          <div class="right-hand">
            <div class="left-area"></div>
            <div class="right-area">
              <span class="btn received">已领取</span>
            </div>
          </div>
        </div>
        <div class="no-more-data-tip">没有更多了</div>
      </div>
    </div>
    <!-- 模板内容结束 -->
  </main>
</template>

<script>
export default {
  name: "memberLevel",
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
  },
};
</script>
