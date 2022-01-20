// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './config/router'
import {
  WechatPlugin
} from 'vux'
Vue.use(WechatPlugin)

import ReturnTop from './components/ReturnTop/'
Vue.use(ReturnTop);

import 'swiper/dist/css/swiper.css'

// 图片检测指令 v-real-img
import './utils/real.img.js';

require('./assets/less/ctl.less') // 引入样式

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
