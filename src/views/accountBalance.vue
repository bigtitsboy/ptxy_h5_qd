<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <!-- 模板内容开始 -->
    <div class="currency-info-wrap">
      <div class="left-hand">
        <div class="top-area">剩余</div>
        <div class="bottom-area">16000</div>
      </div>
      <div class="right-hand">
        <router-link class="top-area" to="">说明</router-link>
        <div class="bottom-area">充值</div>
      </div>
      <div class="money-state-icon"></div>
    </div>
    <div class="currency-bill-wrap" ref="currency_bill_ref">
      <div :class="['tab-navs', { 'tab-navs-fixed': tabNavFixed }]">
        <div
          v-for="(option, index) in navOptions"
          :key="option.id"
          :class="['nav', { active: index == navActiveIndex }]"
          @click="changeActiveNav(index)"
        >
          <span class="text">{{ option.label }}</span>
        </div>
      </div>
      <div v-if="tabNavFixed" class="tab-navs-substitute"></div>
      <div class="tab-conts" v-if="axiosed">
        <div
          v-for="(option, index) in navOptions"
          :key="option.id"
          :class="['tab-cont', { active: index == navActiveIndex }]"
        >
          <div class="item" v-for="item in navItems[index].list" :key="item.id">
            <div class="top-hand">
              <div class="left-area">数量{{ index }}</div>
              <div class="right-area">-500</div>
            </div>
            <div class="center-hand">
              <div class="left-area">时间</div>
              <div class="right-area">2021-07-16 18:06:06</div>
            </div>
            <div class="bottom-hand">
              <div class="left-area">方式</div>
              <div class="right-area">订单消费，订单尾号：761129</div>
            </div>
          </div>
          <div
            class="whole-module-load"
            v-if="
              navItems[index].total == undefined &&
              navItems[index].list.length == 0
            "
          ></div>
          <div
            class="module-no-data-tip"
            v-if="
              navItems[index].total == 0 && navItems[index].list.length == 0
            "
          >
            <span class="text">暂无数据</span>
          </div>
          <div
            class="no-more-data-tip"
            v-if="
              navItems[index].total > 0 &&
              navItems[index].total == navItems[index].list.length
            "
          >
            没有更多了
          </div>
        </div>
      </div>
      <div class="load-more-data-tip" v-if="loadMoreDataStatus">
        <span class="text">加载中...</span>
      </div>
    </div>
    <div class="view-diy-footer" ref="diy_footer_ref"></div>
    <!-- 模板内容结束 -->
    <return-top></return-top>
  </main>
</template>

<script>
export default {
  name: "accountBalance",
  data() {
    return {
      axiosed: false, // 页面盒模型显示状态
      axiosSucNum: 0, // 接口请求成功数量

      navOptions: [],
      navActiveIndex: 0,
      tabNavFixed: false, // tab切换导航栏悬浮

      navItems: [],

      loadMoreDataStatus: false,

      viewClientHeight: undefined, // 页面容器高度
      scrollBottomOffset: 60, // 距离底部多长距离时触发事件
    };
  },
  created() {
    let doAxiosDemo = this.doAxiosDemo();
    let getNav = this.getNav();
    // 待所有请求执行完毕后执行回调函数
    Promise.all([doAxiosDemo, getNav]).then(() => {
      this.$func.closeLoad();
      if (this.axiosSucNum == 2) {
        this.axiosed = true;
        this.$nextTick(() => {
          this.$refs["accountBalance_main_ref"].addEventListener(
            "scroll",
            this.handleViewScroll
          );

          this.viewClientHeight =
            this.$refs["accountBalance_main_ref"].clientHeight;
        });
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
      this.axiosSucNum++;
      console.log("获取到页面其他信息");
    },
    // 获取Tab导航列表
    async getNav() {
      let res = await this.$func.axios(
        this.$api.test, // 示例接口
        {},
        {
          type: "GET",
          openLoad: false,
          closeLoad: false,
        }
      );
      if (!res) {
        return;
      }
      this.navOptions = [
        {
          id: 1,
          label: "消费记录",
        },
        {
          id: 2,
          label: "充值记录",
        },
        {
          id: 3,
          label: "冻结记录",
        },
      ];

      // 创建对应数量的tab内容项
      let cache = [];
      this.navOptions.forEach(() => {
        cache.push({
          total: undefined,
          list: [],
        });
      });
      this.navItems = cache;

      this.axiosSucNum++;
      this.getList(this.navActiveIndex);
    },
    async getList(targetIndex) {
      let res = await this.$func.axios(
        this.$api.test, // 示例接口
        { id: this.navOptions[targetIndex].id },
        {
          type: "GET",
          openLoad: false,
          closeLoad: false,
        }
      );
      if (!res) {
        return;
      }

      // 模拟数据
      let cache = {
        total: 40,
        list: [88, 88, 88, 88, 88, 88, 88, 88, 88, 88],
      };
      if (this.navOptions[targetIndex].id == 3) {
        Object.assign(this.navItems[targetIndex], {
          total: 0,
          list: [],
        });
      } else {
        Object.assign(this.navItems[targetIndex], {
          total: cache.total,
          list: this.navItems[targetIndex].list.concat(cache.list),
        });
      }

      this.$nextTick(() => {
        this.loadMoreDataStatus = false;
      });
    },
    // 变更激活的导航栏
    changeActiveNav(optionIndex) {
      if (optionIndex == this.navActiveIndex) {
        return;
      }
      this.navActiveIndex = optionIndex;

      if (this.tabNavFixed) {
        this.$refs["accountBalance_main_ref"].scrollTop =
          this.$refs["currency_bill_ref"].offsetTop;
      }

      if (this.navItems[this.navActiveIndex].total == undefined) {
        this.getList(this.navActiveIndex);
      }
    },
    // 处理页面滚动
    handleViewScroll() {
      let viewScrollTop = this.$refs["accountBalance_main_ref"].scrollTop;
      let billOffsetTop = this.$refs["currency_bill_ref"].offsetTop;
      this.tabNavFixed = viewScrollTop >= billOffsetTop;

      if (this.loadMoreDataStatus) {
        console.log("正在加载中，禁止重复加载！");
        return;
      }

      let viewContHeight = this.$refs["diy_footer_ref"].offsetTop;

      if (
        viewScrollTop >=
        viewContHeight - this.viewClientHeight - this.scrollBottomOffset
      ) {
        // 数据量长度比对
        let item = this.navItems[this.navActiveIndex];

        if (item.total > item.list.length) {
          this.loadMoreDataStatus = true;

          this.getList(this.navActiveIndex);
        }
      }
    },
  },
  destroyed() {
    try {
      this.$refs["accountBalance_main_ref"].removeEventListener(
        "scroll",
        this.handleViewScroll
      );
    } catch (error) {}
  },
};
</script>
