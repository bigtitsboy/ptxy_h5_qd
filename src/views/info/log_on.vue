<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="welcome-module">
      <div class="msg">123</div>
      <div class="des">456</div>
    </div>
    <ul class="tab-nav">
      <li
        :class="{ selected: item.code === tabNavActiveCode }"
        v-for="item in tabNavItems"
        :key="item.id"
        @click="onTabNavClick(item.code)"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <div class="tab-cont">
      <!-- 手机号 -->
      <div class="iphone cell">
        <em></em>
        <input
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          v-model.trim="iphone"
        />
        <strong v-show="iphone.length" @click="iphone = ''"></strong>
      </div>
      <transition name="slide-fade" mode="out-in">
        <!-- 密码 -->
        <div
          class="password cell"
          v-if="tabNavActiveCode == 'password-login'"
          key="password-login"
        >
          <em></em>
          <input
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="请输入密码"
            maxlength="16"
            v-model.trim="password"
          />
          <strong
            :class="passwordVisible ? 'visible' : 'invisible'"
            @click="passwordVisible = !passwordVisible"
          ></strong>
        </div>
        <!-- 验证码 -->
        <div class="message cell" v-else key="message-code-login">
          <em></em>
          <input
            type="tel"
            placeholder="请输入验证码"
            maxlength="6"
            v-model="messageCode"
          />
          <div :class="['get-message-btn', { disabled: !messageBtnUsable }]">
            <span @click="getMessage">{{ messageBtnText }}</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="login-btn">
      <input
        :class="{ disabled: !loginState }"
        type="button"
        value="登录"
        @click="doLogin"
      />
    </div>
    <div class="subline">
      <router-link to="/account_register">立即注册</router-link>
      <router-link to="/account_reset_password">忘记密码</router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "log_on",
  data: function () {
    return {
      axiosed: true,


      tabNavItems: [
        {
          name: "密码登录",
          code: "password-login",
        },
        {
          name: "验证码登录",
          code: "message-code-login",
        },
      ],
      tabNavActiveCode: "password-login",

      iphone: "",

      password: "",
      passwordVisible: false,

      messageCode: "",
      messageBtnUsable: true,
      messageBtnText: "获取验证码",

      loginState: false,

      sucState: false,
      isWechatClient: true,

    }
  },
  methods: {
    // tab导航切换
    onTabNavClick(activeCode) {
      if (activeCode == this.tabNavActiveCode) {
        return;
      }
      this.tabNavActiveCode = activeCode;
      if (activeCode == "password-login") {
        this.messageCode = "";
      } else {
        this.password = "";
      }
    },
    // 登录
    async doLogin() {
      let _this = this;

      if (this.sucState) {
        return;
      }
      if (!this.loginState) {
        return;
      }
      if (!this.$func.regTest(this.iphone, "iphone")) {
        return;
      }
      if (this.tabNavActiveCode == "password-login") {
        if (!this.$func.regTest(this.password, "password")) {
          return;
        }
      } else {
        if (!this.$func.regTest(this.messageCode, "msgCode")) {
          return;
        }
      }

      let api,
        obj = {
          username: this.iphone,
        };
      if (this.tabNavActiveCode == "password-login") {
        api = this.$api.phonePwdLogin;
        Object.assign(obj, {
          password: this.password,
        });
      } else {
        api = this.$api.phoneCodeLogin;
        Object.assign(obj, {
          msgCode: this.messageCode,
        });
      }

      let res = await this.$func.axios(api, obj, {
        flag: 1,
        type: "POST",
        openLoad: true,
        closeLoad: true,
      });
      if (!res) {
        return;
      }

      this.sucState = true;
      this.$func.openToast("登录成功");

      window.localStorage.setItem("appToken", res.token);

      // 回调函数 -- 返回原链接
      function doCallback() {
        let sourceUrl = _this.$route.query.surl;
        if (sourceUrl == undefined) {
          _this.$router.replace("/");
        } else if (sourceUrl === '/account_log_on?surl=/peoples_list?et=0') {
          _this.$router.replace('/questionnaire_ask');
        } else {
          _this.$router.replace(sourceUrl);
        }
      }

      setTimeout(function () {
        doCallback();
      }, 2000);
    },
    // 获取验证码
    async getMessage() {
      let _this = this;
      if (!_this.messageBtnUsable) {
        return;
      }
      if (!_this.$func.regTest(this.iphone, "iphone")) {
        return;
      }
      let res = await _this.$func.axios(
        _this.$api.sendLoginMsg,
        {
          userPhone: this.iphone,
          ifSend: true,
        },
        {
          flag: 2,
          type: "POST",
          openLoad: true,
          closeLoad: true,
        }
      );
      if (!res) {
        return;
      }

      if (this.$define.ROOT) {
        console.log(`验证码：${res.result.message}`);
      }

      let second = 60;
      _this.messageBtnUsable = false;
      _this.messageBtnText = "已发送(" + second + "s)";

      function countDown() {
        second--;
        if (second == 0) {
          _this.messageBtnUsable = true;
          _this.messageBtnText = "重新发送";
          clearInterval(timer);
        } else {
          _this.messageBtnText = "已发送(" + second + "s)";
        }
      }

      let timer = setInterval(countDown, 1000);
    },
    // 校验登录状态
    judgeLoginState() {
      if (this.tabNavActiveCode == "password-login") {
        this.loginState = this.iphone && this.password;
      } else {
        this.loginState = this.iphone && this.messageCode;
      }
    },
  },
  watch: {
    iphone(val) {
      this.judgeLoginState();
    },
    password(val) {
      this.judgeLoginState();
    },
    messageCode(val) {
      this.judgeLoginState();
    },
  },
}
</script>

<style scoped>

</style>
