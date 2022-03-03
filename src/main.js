// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './config/router'
import {
  WechatPlugin
} from 'vux'

Vue.use(WechatPlugin)

import Cube from 'cube-ui'

Vue.use(Cube)


import axios from 'axios'

Vue.prototype.$axios = axios

import ReturnTop from './components/ReturnTop/'

Vue.use(ReturnTop);
import 'animate.css';

import md5 from 'js-md5';

Vue.prototype.$md5 = md5;

import 'swiper/dist/css/swiper.css'

// 图片检测指令 v-real-img
import './utils/real.img.js';
// import axios from "axios";

require('./assets/less/ctl.less') // 引入样式

// 设置axios携带token
// localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjQxNmFhNWFlLTI0ODEtNDZlMy04MDE2LWJkMDIzZTZmODI2MSJ9.VbSfYYoAv7yDt9jymWL_0Nhj8p9wELYhkhwPzL34HL7RP_TcAdMQTnLsofxgCkFmDvTS6-nMQHdmB8o5ZxXe1w')
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

// 添加实例属性
Object.assign(Vue.prototype, {
  $define: require('./config/define').default, // 常量
  $api: require('./config/api').default, // 接口
  $eventBus: require('./assets/js/event_bus').default, // event bus
  $func: require('./assets/js/func').default // 方法
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
