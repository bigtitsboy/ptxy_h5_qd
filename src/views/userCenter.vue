<template>
  <main
    :class="[$route.name + '-main']"
    :ref="$route.name + '_main_ref'"
    v-show="axiosed"
  >
    <div class="mainBody">
      <!-- 模板内容开始 -->
      <div class="user-info-wrap" v-if="userInfo!==null">
        <div class="base-info-wrap">
          <div class="left-hand" @click="seeUserInfo">
            <img
              class="user-photo"
              :src="userInfo.avatar"
              v-real-img="require('../assets/images/profile.jpg')"
            />
          </div>
          <div class="right-hand" @click="seeUserInfo">
            <div class="left-area">
              <div class="user-name">{{ userInfo.nickName }}</div>
              <div class="append-info">
              <span class="tag">
                <em class="icon"></em>
                <strong class="text">LV1</strong>
              </span>
              </div>
            </div>
            <div class="right-area"></div>
          </div>
        </div>
        <div class="member-level-wrap">
          <div class="left-hand">
            <div class="label">
              <em class="icon"></em>
              <strong class="text">会员等级</strong>
            </div>
            <div class="progress-bar">
              <span class="real-val"></span>
            </div>
            <div class="next-lv-tip">
              <em>下一级</em>
              <strong>2500/5000</strong>
            </div>
          </div>
          <div class="right-hand">
            <router-link to="/memberLevel">
              <em class="text">查看权益</em>
              <strong class="icon"></strong>
            </router-link>
          </div>
        </div>
        <!--        <div class="digital-assets-wrap">-->
        <!--          <div class="col">-->
        <!--            <router-link to="/accountBalance">-->
        <!--              <em class="value">12.00</em>-->
        <!--              <strong class="label">余额</strong>-->
        <!--            </router-link>-->
        <!--          </div>-->
        <!--          <div class="col">-->
        <!--            <router-link to="/accountRedPacket">-->
        <!--              <em class="value">12.00</em>-->
        <!--              <strong class="label">红包</strong>-->
        <!--            </router-link>-->
        <!--          </div>-->
        <!--          <div class="col">-->
        <!--            <router-link to="/accountPoints">-->
        <!--              <em class="value">12</em>-->
        <!--              <strong class="label">积分</strong>-->
        <!--            </router-link>-->
        <!--          </div>-->
        <!--          <div class="col">-->
        <!--            <router-link to="/accountCoupon">-->
        <!--              <em class="value">5</em>-->
        <!--              <strong class="label">优惠券</strong>-->
        <!--            </router-link>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="recommend-friend-wrap">
        <div class="left-hand">
          <div class="label">推荐好友</div>
          <div class="des">
            <span class="btn">立即邀请</span>
            <span class="text">一次邀请终身受益</span>
          </div>
        </div>
        <div class="right-hand">
          <img
            src="@/assets/images/userCenter/recommend_friend_illustration.png"
            alt=""
          />
        </div>
      </div>
      <div class="common-tools-wrap">
        <div class="modular-title">常用工具</div>
        <div class="modular-cont">
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
          <div class="col">
            <router-link to="">
              <em class="icon"></em>
              <strong class="label">收藏关注</strong>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 模板内容结束 -->
    </div>
    <index-bottom-bar :active-path="'userCenter'"></index-bottom-bar>

  </main>
</template>

<script>
import indexBottomBar from "../components/indexBottomBar/indexBottomBar";

export default {
  name: "userCenter",
  data() {
    return {
      axiosed: false, // 页面盒模型显示状态
      axiosSucNum: 0, // 接口请求成功数量
      userInfo: null
    };
  },
  created() {
    this.$func.axios(this.$api.getUserInfo, {}, {
      type: 'Get',
      openLoad: true,
      closeLoad: true
    }).then(res => {
      if (res.code == 401) {
        this.$func.openToast('登录异常，请重新登陆')
        this.$router.push({
          path: '/login', query: {
            surl: this.$route.path
          }
        })
      } else {
        this.userInfo = res.member
      }
    })
    // if (this.$define.ROOT) {
    //   this.axiosed = true;
    // }

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
    // 查看用户信息
    seeUserInfo() {
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
      this.$router.push({path: "/userInfo"});
    },
  },
  components: {
    indexBottomBar
  }
};
</script>
