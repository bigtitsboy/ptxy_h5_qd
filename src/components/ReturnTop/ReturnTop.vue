<template>
  <div
    :class="$options._componentTag + '-main'"
    :style="{ bottom: bottom, right: right }"
    v-show="state"
    @click="execute"
  ></div>
</template>

<script>
export default {
  name: "ReturnTop",
  props: {
    bottom: {
      type: String,
      default: "0.5rem",
    },
    right: {
      type: String,
      default: "0.5rem",
    },
  },
  data() {
    return {
      refEle: undefined,
      state: false,

      criticalValue: 800,
    };
  },
  mounted() {
    let _this = this;

    _this.refEle = _this.$options.parent.$refs[_this.$route.name + "_main_ref"];
    _this.refEle.addEventListener("scroll", _this.listenScroll, false);
  },
  methods: {
    /**
     * 监听滚动事件
     */
    listenScroll() {
      this.state = this.refEle.scrollTop > this.criticalValue;
    },
    /**
     * 执行返回顶部
     */
    execute() {
      this.refEle.scrollTop = 0;
    },
  },
  beforeDestroy() {
    this.refEle.removeEventListener("scroll", this.listenScroll, false);
  },
};
</script>

<style lang="less">
.ReturnTop-main,
.return-top-main {
  position: fixed;
  width: 0.74rem;
  height: 0.74rem;
  border-radius: 50%;
  background: url("./images/return_top_icon.png") no-repeat center center;
  background-size: 100% auto;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.3);
  z-index: 99;
}
</style>
