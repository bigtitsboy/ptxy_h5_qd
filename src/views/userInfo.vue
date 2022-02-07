<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <!-- 模板内容开始 -->
    <div class="cell-wrap">
      <div class="cell pr">
        <img
          class="user-photo"
          src="https://c-ssl.duitang.com/uploads/item/201803/17/20180317125750_rwjth.thumb.1000_0.jpg"
          v-real-img="'/static/images/default_user_photo.png'"
        />
        <span class="value arrow">更换头像</span>
        <input
          class="awaken-img-file"
          type="file"
          accept="image/*"
          @change="changeAvatarEvent"
        />
      </div>
      <div class="cell">
        <span class="label">用户账号</span>
        <span class="value">365897123</span>
      </div>
      <div class="cell">
        <span class="label">用户昵称</span>
        <span class="value arrow">哈哈哈</span>
      </div>
      <div class="cell">
        <span class="label">手机号码</span>
        <span class="value arrow">166****6666</span>
      </div>
      <div class="cell">
        <span class="label">实名认证</span>
        <span class="value arrow">未认证</span>
      </div>
    </div>
    <div class="cell-wrap">
      <div class="cell">
        <span class="label">推荐人</span>
        <span class="value">无</span>
      </div>
    </div>
    <div class="cell-wrap">
      <div class="cell" style="text-align: center;justify-content: center;color: red;font-weight: bolder"
           @click="loginOut">
        退出
      </div>
    </div>
    <!-- 模板内容结束 -->
  </main>
</template>

<script>
export default {
  name: "userInfo",
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
    // 变更用户头像
    changeAvatarEvent(e) {
      let file = e.target.files[0];

      if (!this.$func.checkFileSize(file)) {
        return;
      }

      if (
        !this.$func.checkFileType(file, [
          "image/gif",
          "image/jpg",
          "image/jpeg",
          "image/png",
        ])
      ) {
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        console.log(e.target.result); // base64
      };
    },
    loginOut() {
      this.$func.axios(this.$api.loginOut, {}, {
        type: 'POST',
        openLoad: true,
        closeLoad: true
      }).then(res => {
        if (res.code == 200) {
          this.$func.openToast('退出成功')
          localStorage.removeItem('appToken')
          this.$router.replace('/index')
        }
      })
    }
  },
};
</script>
