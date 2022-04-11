<template>
  <div id="app">
    <router-view v-if="showView" class="view-wrap"></router-view>
    <loading :show="vuxLoad.state" :text="vuxLoad.text"></loading>
    <toast v-model="vuxToast.state" :type="vuxToast.type">{{
        vuxToast.text
      }}
    </toast>
    <alert
      v-model="vuxAlert.state"
      :title="vuxAlert.tit"
      :button-text="vuxAlert.btn"
      :hide-on-blur="true"
    >{{ vuxAlert.text }}
    </alert
    >
  </div>
</template>

<script>
import {
  Loading,
  Toast,
  Alert,
  TransferDomDirective as TransferDom,
} from "vux";

export default {
  name: "App",
  data() {
    return {
      showView: false,

      vuxLoad: {
        // loading
        state: false,
      },
      vuxToast: {
        // toast
        state: false,
      },
      vuxAlert: {
        // alert
        state: false,
      },
    };
  },
  directives: {
    TransferDom,
  },
  created() {
    this.$func.flexible();
    this.updateHtmlFile(); // 更新html文件
    this.showView = true;
    // this.getSystemVersion(); // 获取系统版本号
  },
  mounted() {
    this.$eventBus.$on("vux-load", (conf) => {
      this.vuxLoad = conf;
    });
    this.$eventBus.$on("vux-toast", (conf) => {
      this.vuxToast = conf;
    });
    this.$eventBus.$on("vux-alert", (conf) => {
      this.vuxAlert = conf;
    });
  },
  methods: {
    // 更新html文件
    updateHtmlFile() {
      let originalParameter = JSON.parse(JSON.stringify(this.$route.query)); // 原路由参数

      // 增加时间戳
      Object.assign(originalParameter, {
        v: new Date().valueOf(),
      });

      this.$router.push({
        query: originalParameter,
      });
    },
    // 获取系统版本号
    // async getSystemVersion() {
    //   let res = await this.$func.axios(
    //     this.$api.test, // 示例接口
    //     {},
    //     {
    //       type: "GET",
    //       openLoad: true,
    //       closeLoad: false,
    //     }
    //   );
    //   if (!res) {
    //     return;
    //   }
    //
    //   this.$func.closeLoad();
    //   this.showView = true;
    //
    //   // 本地版本号
    //   let lsSystemVersion = this.$func.storageGet("system_version", "ls");
    //
    //   if (isNaN(parseFloat(lsSystemVersion))) {
    //     this.$func.storageSet(
    //       {
    //         system_version: res.result,
    //       },
    //       "ls"
    //     ); // 存储版本号
    //   } else {
    //     if (parseFloat(lsSystemVersion) !== parseFloat(res.result)) {
    //       this.$func.storageSet(
    //         {
    //           system_version: res.result,
    //         },
    //         "ls"
    //       ); // 更新版本号
    //       window.location.reload(); // 项目重载
    //     }
    //   }
    // },
  },
  components: {
    Loading,
    Toast,
    Alert,
  },
};
</script>
<style>
.cube-toast-icon {
  height: auto !important;
}

.cubeic-phone {
  display: flex !important;
  align-items: center;
  justify-content: center;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
