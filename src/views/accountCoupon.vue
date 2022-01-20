<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <!-- 模板内容开始 -->
    <div class="nav-wrap">
      <popup-picker
        ref="nav_range_ref"
        :data="navOptions"
        v-model="activedNavValue"
        @on-change="changeNavEvent"
      ></popup-picker>
      <div class="picked-nav-name" v-if="activedNavName != undefined">
        <em class="label">{{ activedNavName }}</em>
        <strong class="icon"></strong>
      </div>
    </div>
    <div class="tool-wrap" ref="tool_wrap_ref">
      <div :class="['real-dom', { 'module-fixed': toolFixed }]">
        <div class="left-hand">
          <!-- <popup-picker
            ref="type_range_ref"
            :data="typeOptions"
            v-model="activedTypeValue"
            @on-change="changeTypeEvent"
          ></popup-picker> -->
          <div
            class="picked-type-name"
            v-if="activedTypeName != undefined"
            @click="openTypePopup"
          >
            <em class="label">{{ activedTypeName }}</em>
            <strong class="icon"></strong>
          </div>
        </div>
        <!-- <div class="right-hand" @click="exchangeCouponEvent">口令激活</div> -->
      </div>
      <div class="substitute" v-if="toolFixed"></div>
    </div>
    <div class="cont-wrap">
      <div class="item" v-for="item in dataCellList" :key="item.id">
        <div class="top-hand">
          <img
            class="logo"
            src="https://c-ssl.duitang.com/uploads/item/201711/06/20171106174641_Jzau3.jpeg"
            v-real-img="'/static/images/default_user_photo.png'"
          />
          <strong class="text">鸿星尔克官方旗舰店</strong>
        </div>
        <div class="bottom-hand">
          <div class="left-area">
            <div class="left-side">
              <strong class="money">9</strong>
              <em class="unit">折</em>
            </div>
            <div class="right-side">
              <div class="coupon-name">满1000可用</div>
              <div class="des">袜子不参与折扣</div>
              <div class="last-time">有效期至 2021.11.11 23:59</div>
            </div>
          </div>
          <div class="right-area">
            <router-link to="">去使用</router-link>
          </div>
          <div class="type-state">店铺优惠券</div>
        </div>
        <div class="bottom-hand">
          <div class="left-area">
            <div class="left-side">
              <strong class="money">500</strong>
              <em class="unit">元</em>
            </div>
            <div class="right-side">
              <div class="coupon-name">满2000可用</div>
              <div class="last-time">有效期至 2021.11.11 23:59</div>
            </div>
          </div>
          <div class="right-area used"></div>
          <div class="type-state">店铺优惠券</div>
        </div>
        <div class="bottom-hand overdue">
          <div class="left-area">
            <div class="left-side">
              <strong class="money">7.5</strong>
              <em class="unit">折</em>
            </div>
            <div class="right-side">
              <div class="coupon-name">满500可用</div>
              <!-- <div class="des">不含大宝剑商品</div> -->
              <div class="last-time">有效期至 2021.11.11 23:59</div>
            </div>
          </div>
          <div class="right-area overdue"></div>
          <div class="type-state">店铺优惠券</div>
        </div>
      </div>
    </div>
    <div
      class="whole-module-load"
      v-if="total == undefined && dataCellList.length == 0"
    ></div>
    <div
      class="module-no-data-tip"
      v-if="total == 0 && dataCellList.length == 0"
    >
      <span class="text">暂无数据</span>
    </div>
    <div class="load-more-data-tip" v-if="loadMoreDataStatus">
      <span class="text">加载中...</span>
    </div>
    <div
      class="no-more-data-tip"
      v-if="total > 0 && total == dataCellList.length"
    >
      没有更多了
    </div>
    <div class="view-diy-footer" ref="diy_footer_ref"></div>
    <popup-select
      :status="typePopupStatus"
      :options="typeOptions"
      :actived="activedTypeValue"
      title="请选择类型"
      label="name"
      value="value"
      @close="closeTypePopup"
      @ok="getTypeValue"
    ></popup-select>
    <return-top></return-top>
    <!-- 模板内容结束 -->
  </main>
</template>

<script>
import { PopupPicker } from "vux";
import PopupSelect from "@/components/PopupSelect/PopupSelect";
export default {
  name: "accountCoupon",
  components: {
    PopupPicker,
    PopupSelect,
  },
  data() {
    return {
      axiosed: false, // 页面盒模型显示状态
      axiosSucNum: 0, // 接口请求成功数量

      navOptions: [],
      activedNavValue: [],
      activedNavName: undefined,

      typePopupStatus: false,
      typeOptions: [],
      activedTypeValue: "",
      activedTypeName: "",

      toolFixed: false, // 工具栏悬浮

      pageNum: 1, // 页码
      pageSize: 10, // 每页数量

      total: undefined,
      dataCellList: [],
      loadMoreDataStatus: false, // 加载更多数据标识

      scrollBottomOffset: 60, // 距离底部多长距离时触发事件
    };
  },
  created() {
    let getNav = this.getNav(); // 示例请求
    let getType = this.getType(); // 示例请求

    // 待所有请求执行完毕后执行回调函数
    Promise.all([getNav, getType]).then(() => {
      this.$func.closeLoad();
      if (this.axiosSucNum == 2) {
        this.getList();
        this.axiosed = true;
      }
    });
  },
  mounted() {
    this.$refs["accountCoupon_main_ref"].addEventListener(
      "scroll",
      this.handleViewScroll
    );
  },
  methods: {
    // 请求示例函数
    async getNav() {
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
      let cache = [
        {
          name: "待使用",
          value: "1",
        },
        {
          name: "已使用",
          value: "2",
        },
        {
          name: "已失效",
          value: "3",
        },
      ];
      this.$set(this.navOptions, 0, cache);
      this.$nextTick(() => {
        this.$set(this.activedNavValue, 0, "1");
      });

      this.axiosSucNum++; // 接口请求成功数量标识+1
    },
    async getType() {
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
      let cache = [
        {
          name: "全部类型",
          value: "0",
        },
        {
          name: "平台券",
          value: "1",
        },
        {
          name: "品类券",
          value: "2",
        },
        {
          name: "店铺券",
          value: "3",
        },
        {
          name: "商品券",
          value: "4",
        },
        {
          name: "其他",
          value: "5",
        },
      ];
      this.typeOptions = cache;
      this.getTypeValue("0");

      this.axiosSucNum++; // 接口请求成功数量标识+1
    },
    // 获取列表
    async getList() {
      let res = await this.$func.axios(
        this.$api.test, // 示例接口
        {
          range: this.activedNavValue[0],
          type: this.activedTypeValue,
          page: this.pageNum,
          size: this.pageSize,
        },
        {
          type: "POST",
          openLoad: false,
          closeLoad: false,
        }
      );
      if (!res) {
        return;
      }

      let cache = {
        total: 40,
        list: [88, 88, 88, 88, 88, 88, 88, 88, 88, 88],
      };

      // let cache = {
      //   total: 0,
      //   list: [],
      // };

      this.total = cache.total;
      this.dataCellList = this.dataCellList.concat(cache.list);

      if (this.dataCellList.length < this.total) {
        this.pageNum++;
      }

      this.$nextTick(() => {
        this.loadMoreDataStatus = false;
      });
    },
    // 修改了检索条件
    changeNavEvent(val) {
      this.activedNavName = this.$refs["nav_range_ref"].getNameValues();

      if (!this.axiosed) {
        return;
      }
      this.reset();
    },
    // 获取到变更的类型（id）
    getTypeValue(res) {
      this.activedTypeValue = res;
      this.activedTypeName = this.$func.selectDictLabel(this.typeOptions, res);

      if (!this.axiosed) {
        return;
      }
      this.reset();
    },
    // 显示类型弹窗
    openTypePopup() {
      this.typePopupStatus = true;
    },
    // 隐藏类型弹窗
    closeTypePopup() {
      this.typePopupStatus = false;
    },
    // 重置条件
    reset() {
      this.$refs["accountCoupon_main_ref"].scrollTop = 0;
      this.pageNum = 1;
      this.total = undefined;
      this.dataCellList = [];
      this.loadMoreDataStatus = false;
      this.getList();
    },
    // 处理页面滚动
    handleViewScroll() {
      let viewScrollTop = this.$refs["accountCoupon_main_ref"].scrollTop;
      let toolOffsetTop = this.$refs["tool_wrap_ref"].offsetTop;
      this.toolFixed = viewScrollTop >= toolOffsetTop;

      if (this.loadMoreDataStatus) {
        return;
      }

      let viewContHeight = this.$refs["diy_footer_ref"].offsetTop;
      let viewClientHeight = this.$refs["accountCoupon_main_ref"].clientHeight;
      if (
        viewScrollTop >=
        viewContHeight - viewClientHeight - this.scrollBottomOffset
      ) {
        if (this.total > this.dataCellList.length) {
          this.loadMoreDataStatus = true;

          this.getList();
        }
      }
    },
  },
  destroyed() {
    try {
      this.$refs["accountCoupon_main_ref"].removeEventListener(
        "scroll",
        this.handleViewScroll
      );
    } catch (error) {}
  },
};
</script>
