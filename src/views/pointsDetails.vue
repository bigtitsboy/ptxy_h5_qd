<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <!-- 模板内容开始 -->
    <div class="nav-wrap">
      <popup-picker
        ref="retrieval_range_ref"
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
        <div class="data-range">
          <datetime
            v-model="dateTimeRange"
            format="YYYY-MM"
            @on-change="changeDateTimeRange"
          ></datetime>
        </div>
        <div class="statistics">
          <span>收入30</span>
          <span>支出30</span>
          <span>失效0</span>
        </div>
      </div>
      <div class="substitute" v-if="toolFixed"></div>
    </div>
    <div class="cont-wrap">
      <div class="item" v-for="(item, index) in dataCellList" :key="item.id">
        <div class="left-hand">
          <div class="top-area">标题{{ index + 1 }}</div>
          <div class="bottom-area">2021-07-21 18:06:32</div>
        </div>
        <div class="right-hand add">+500</div>
      </div>
    </div>
    <div
      class="whole-module-load"
      v-if="axiosed && total == undefined && dataCellList.length == 0"
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
    <return-top></return-top>
    <!-- 模板内容结束 -->
  </main>
</template>

<script>
import {PopupPicker, Datetime} from "vux";

export default {
  name: "pointsDetails",
  components: {
    PopupPicker,
    Datetime,
  },
  data() {
    return {
      axiosed: false, // 页面盒模型显示状态
      axiosSucNum: 0, // 接口请求成功数量

      navOptions: [],
      activedNavValue: [],
      activedNavName: undefined,

      dateTimeRange: undefined,
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
    // 初始化月份
    this.dateTimeRange = this.$func.getThatDate().substring(0, 7);
    this.getNav(); // 示例请求
  },
  mounted() {
    this.$refs["pointsDetails_main_ref"].addEventListener(
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
          name: "全部记录",
          value: "0",
        },
        {
          name: "收入记录",
          value: "1",
        },
        {
          name: "支出记录",
          value: "2",
        },
        {
          name: "失效记录",
          value: "3",
        },
      ];
      this.$set(this.navOptions, 0, cache);
      this.$nextTick(() => {
        this.$set(this.activedNavValue, 0, "0");
      });

      this.axiosSucNum++; // 接口请求成功数量标识+1
    },
    // 获取列表
    async getList() {
      let res = await this.$func.axios(
        this.$api.test, // 示例接口
        {
          date: this.dateTimeRange,
          type: this.activedNavValue[0],
          page: this.pageNum,
          size: this.pageSize,
        },
        {
          type: "POST",
          openLoad: false,
          closeLoad: !this.axiosed && this.pageNum == 1,
        }
      );
      if (!res) {
        return;
      }

      if (!this.axiosed && this.pageNum == 1) {
        this.axiosed = true;
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
      this.activedNavName = this.$refs["retrieval_range_ref"].getNameValues();

      this.reset();
    },
    // 修改了日期范围
    changeDateTimeRange(val) {
      this.reset();
    },
    // 重置条件
    reset() {
      this.$refs["pointsDetails_main_ref"].scrollTop = 0;

      this.pageNum = 1;

      this.total = undefined;
      this.dataCellList = [];

      this.loadMoreDataStatus = false;

      this.getList();
    },
    // 处理页面滚动
    handleViewScroll() {
      let viewScrollTop = this.$refs["pointsDetails_main_ref"].scrollTop;
      let toolOffsetTop = this.$refs["tool_wrap_ref"].offsetTop;
      this.toolFixed = viewScrollTop >= toolOffsetTop;

      if (this.loadMoreDataStatus) {
        return;
      }

      let viewContHeight = this.$refs["diy_footer_ref"].offsetTop;
      let viewClientHeight = this.$refs["pointsDetails_main_ref"].clientHeight;
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
      this.$refs["pointsDetails_main_ref"].removeEventListener(
        "scroll",
        this.handleViewScroll
      );
    } catch (error) {
    }
  },
};
</script>
