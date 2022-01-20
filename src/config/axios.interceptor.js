import axios from 'axios'
import $eventBus from '../assets/js/event_bus'

// Axios请求拦截器
axios.interceptors.request.use(function (conf) {
  if (conf.openLoad) {
    $eventBus.$emit('vux-load', {
      state: true
    })
  }
  // 在发送请求之前做些什么
  return conf
}, function (error) {
  $eventBus.$emit('vux-load', {
    state: false
  })
  // 对请求错误做些什么
  return Promise.reject(error)
})

// Axios响应拦截器
axios.interceptors.response.use(function (res) {
  if (res.config.closeLoad) {
    $eventBus.$emit('vux-load', {
      state: false
    })
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  $eventBus.$emit('vux-load', {
    state: false
  })
  // 对响应错误做点什么
  return Promise.reject(error)
})
