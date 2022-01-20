<template>
  <div v-transfer-dom>
    <popup
      v-model="state"
      :class="$options._componentTag + '-main'"
      @on-hide="closeEvent"
    >
      <!-- group already has a top border, so we need to hide header's bottom border-->
      <popup-header
        left-text="取消"
        right-text="确定"
        title="请选择"
        :show-bottom-border="false"
        @on-click-left="closeEvent"
        @on-click-right="sureEvent"
      ></popup-header>
      <div class="vux-popup-body">
        <div
          v-for="item in options"
          :key="item.id"
          :class="['item vux-1px', { actived: item[value] == selected }]"
          @click="changeEvent(item)"
        >
          <em class="label">{{ item[label] }}</em>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import { PopupHeader, Popup, TransferDom } from "vux";
export default {
  name: "PopupSelect",
  directives: {
    TransferDom,
  },
  components: {
    PopupHeader,
    Popup,
  },
  props: {
    status: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    actived: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "请选择",
    },
    label: {
      type: String,
      default: "label",
    },
    value: {
      type: String,
      default: "value",
    },
  },
  data() {
    return {
      state: undefined,

      selected: undefined,
    };
  },
  methods: {
    changeEvent(item) {
      this.selected = item[this.value];
    },
    closeEvent() {
      this.$emit("close");
    },
    sureEvent() {
      if (this.actived != this.selected) {
        this.$emit("ok", this.selected);
      }
      this.closeEvent();
    },
  },
  watch: {
    status: function (nVal) {
      if (nVal) {
        this.selected = this.actived;
      }

      this.state = this.status;
    },
  },
};
</script>

<style lang="less">
.PopupSelect-main,
.popup-select-main {
  .vux-popup-header {
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    background-color: #fbf9fe;

    .vux-popup-header-left,
    .vux-popup-header-right {
      padding: 0 15px;
      display: flex;
      align-items: center;
    }

    .vux-popup-header-left {
      color: #828282;
    }

    .vux-popup-header-right {
      color: #11b367;
    }

    .vux-popup-header-title {
      font-size: 16px;
      color: #666;
      width: calc(60%);
      text-align: center;
      line-height: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .vux-popup-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 15px 15px 0 0;
    background: #fff;

    .item {
      width: 100px;
      height: 50px;
      padding: 0 15px;
      box-sizing: border-box;
      margin: 0 0 15px 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 18px;
      color: #333;
      overflow: hidden;

      &.actived {
        background: #11b367;
        color: #fff;
        border-radius: 6px;

        &:before {
          border-color: #11b367 !important;
        }
      }

      &:before {
        box-sizing: border-box;
        border-color: #ddd !important;
        border-radius: 12px;
      }
    }
  }
}
</style>
