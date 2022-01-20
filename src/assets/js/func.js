import Vue from 'vue'

import axios from 'axios'
import qs from 'qs'

require('../../config/axios.interceptor')
import axiosResManage from '../../config/axios.res.manage'

import $eventBus from './event_bus'
import $define from '../../config/define'

/**
 * 手机号 —— iphone
 * 密码 —— password
 * 身份证 —— IdCard
 * 邮箱 —— email
 * 验证码 —— msgCode
 * QQ —— qq
 * 微信 —— weixin
 * 正整数 —— positiveInteger（不含0）
 * 自然数 —— naturalNumber（含0）
 * 车牌号 —— plateNumber
 * 中文名 —— ChineseName
 */
const regularList = {
  'iphone': {
    rule: /^1[3456789]\d{9}$/,
    text: '请正确输入您的手机号'
  },
  'password': {
    rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    text: '请正确输入6-16位字符的密码(数字和字母组成)'
  },
  'IdCard': {
    rule: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    text: '请正确输入您的身份证号码'
  },
  'email': {
    rule: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    text: '请正确输入您的邮箱地址'
  },
  'msgCode': {
    rule: /^\d{6}$/,
    text: '请正确输入短信验证码'
  },
  'qq': {
    rule: /^\d{5,13}$/,
    text: '请正确输入您的QQ号'
  },
  'weixin': {
    rule: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
    text: '请正确输入您的微信号'
  },
  'positiveInteger': { // 正整数（不含0）
    rule: /^[1-9]*[1-9][0-9]*$/,
    text: '请输入正整数'
  },
  'naturalNumber': { // 自然数（含0）
    rule: /^\d+$/,
    text: '请输入非负整数'
  },
  'plateNumber': {
    rule: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    text: '请正确输入您的车牌号'
  },
  'ChineseName': {
    rule: /[\u4E00-\u9FA5]/,
    text: '请正确输入您的真实姓名'
  }
}

const func = {
  flexible() {
    let screenWidth = window.screen.width
    screenWidth = screenWidth < 320 ? 320 : (screenWidth > 540 ? 540 : screenWidth)
    let ua = navigator.userAgent
    if (ua.indexOf('Android') == -1 && ua.indexOf('Linux') == -1 && ua.indexOf('iPhone') == -1) {
      screenWidth = 540
    }
    document.getElementsByTagName('html')[0].style.fontSize = (screenWidth / 10) * (1000 / $define.PSDWIDTH) + 'px'
  },
  isAppClient() {
    return window.navigator.userAgent.toLowerCase().match(/Vui/) !== null
  },
  isWechatClient() {
    return window.navigator.userAgent.toLowerCase().match(/micromessenger/) !== null
  },
  getPhoneSystem() {
    let ua = navigator.userAgent
    if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {
      return "Android"
    } else if (ua.indexOf('iPhone') > -1) {
      return "iPhone"
    }
  },
  openLoad() {
    $eventBus.$emit('vux-load', {
      state: true
    })
  },
  closeLoad() {
    $eventBus.$emit('vux-load', {
      state: false
    })
  },
  openToast(text, type = "text") {
    $eventBus.$emit('vux-toast', {
      state: true,
      text: text,
      type: type
    })
  },
  openAlert(text, title = "Tips", btn = "OK") {
    $eventBus.$emit('vux-alert', {
      state: true,
      text: text,
      tit: title,
      btn: btn
    })
  },
  objTransArr(object) {
    let arr = []
    for (let i in object) {
      arr.push([i, object[i]])
    }
    return arr
  },
  isEmptyObj(object) {
    for (let key in object) {
      return false
    }
    return true
  },
  arrTransObj(array) {
    let obj = {}
    array.forEach(function (item) {
      obj[item[0]] = item[1]
    })
    return obj
  },
  isEmptyArr(array) {
    if (!array || (Array.isArray(array) && array.length === 0)) {
      return true
    }
    return false
  },
  arrDistinct(array) {
    let obj = {},
      resArr = []

    array.forEach(function (item) {
      item = JSON.stringify(item)
      if (!obj[item]) {
        obj[item] = true
        resArr.push(JSON.parse(item))
      }
    })
    return resArr
  },
  delFromArr(array, target) {
    for (let i = 0; i < array.length; i++) {
      if (target === array[i]) {
        array.splice(i, 1)
        break
      }
    }
    return array
  },
  getThatDate(space = 0) {
    let date = new Date()
    date.setTime(date.getTime() + 86400000 * space)
    return this.assemblyDate({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    })
  },
  splitDate(date) {
    date = date ? date : this.getThatDate()
    let year = Number(date.substring(0, 4))
    let month = Number(date.substring(5, 7)) - 1
    let day = Number(date.substring(8, 10))
    return {
      'year': year,
      'month': month,
      'day': day
    }
  },
  assemblyDate(data) {
    let year = data.year.toString()
    data.month = Number(data.month + 1)
    let month = this.complement(data.month)
    let day = this.complement(data.day)
    return year + '-' + month + '-' + day
  },
  formatDate(date, delimiter = '-') {
    date = date.replace(/[^\d]/ig, '')
    return date.substring(0, 4) + delimiter + date.substring(4, 6) + delimiter + date.substring(6, 8)
  },
  getTimestamp(date) {
    if (date) {
      date = this.splitDate(date)
      return new Date(date.year, date.month, date.day).getTime()
    }
    return new Date().getTime()
  },
  timestampTransDate(timestamp) {
    let date = new Date()
    date.setTime(timestamp)
    return this.assemblyDate({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate()
    })
  },
  getDateSpace(startDate, endDate) {
    startDate = this.getTimestamp(startDate)
    endDate = this.getTimestamp(endDate)
    let stampSpace = startDate > endDate ? startDate - endDate : endDate - startDate
    return Math.floor(stampSpace / 86400000)
  },
  spaceFewMonths(date, few) {
    date = date ? date : this.getThatDate()
    date = this.splitDate(date)

    let multiple = Math.floor(Math.abs(few) / 12)
    if (few < 0) {
      multiple = multiple * (-1)
    }
    date.year = date.year + multiple

    let remainder = few % 12
    date.month = date.month + remainder
    if (date.month > 11) {
      date.month = date.month - 12
      date.year++
    } else if (date.month < 0) {
      date.month = date.month + 12
      date.year--
    }
    let cache = new Date(date.year, date.month + 1, 0).getDate()
    if (date.date > cache) {
      date.date = cache
    }
    let length = new Date(date.year, date.month + 1, 0).getDate()
    if (length < date.day) {
      date.day = length
    }
    return this.assemblyDate(date)
  },
  getWeek(date) {
    date = date ? date : this.getThatDate()
    let week = null
    if (date) {
      date = this.splitDate(date)
      week = new Date(date.year, date.month, date.day).getDay()
    } else {
      week = new Date().getDay()
    }
    switch (week) {
      case 0:
        return '日'
      case 1:
        return '一'
      case 2:
        return '二'
      case 3:
        return '三'
      case 4:
        return '四'
      case 5:
        return '五'
      case 6:
        return '六'
    }
  },
  complement(value, digit = 2) {
    value = Number(value)
    if (value < Math.pow(10, digit - 1)) {
      let text = ''
      for (let i = 0; i < digit - value.toString().length; i++) {
        text = text + '0'
      }
      return text + value
    } else {
      return value.toString()
    }
  },
  getFloatData(value, digit = 2) {
    let splitResult = value.toString().split('.')
    if (splitResult.length === 1) {
      let addText = '.'
      for (let i = 0; i < digit; i++) {
        addText = addText + '0'
      }
      return value + addText
    } else {
      let text = splitResult[1]
      if (text.length < digit) {
        let addText = '.' + text
        for (let i = 0; i < (digit - text.length); i++) {
          addText = addText + '0'
        }
        return splitResult[0] + addText
      } else {
        return splitResult[0] + '.' + text.substring(0, digit)
      }
    }
  },
  regTest(value, type, msg) {
    value = value.toString()
    if (!regularList[type].rule.test(value)) {
      msg = msg ? msg : regularList[type].text
      this.openToast(msg)
      return false
    }
    return true
  },
  checkFileSize(file, max = 10) {
    let maxM = max;
    max = max * 1024 * 1024
    if (file.size <= max) {
      return true
    }
    this.openToast('文件大小超出' + maxM + 'M，请重新选择')
    return false
  },
  checkFileType(file, range, msg = '文件类型不支持，请重新选择') {
    if (range === undefined) {
      return true
    }
    for (let i = 0; i < range.length; i++) {
      if (file.type === range[i]) {
        return true
      }
    }
    this.openToast(msg);
    return false
  },
  storageSet(obj, type) {
    let storageType = (type == undefined) ? $define.STORAGETYPE : window.localStorage;

    for (let i in obj) {
      cacheItem(i, obj[i])
    }

    function cacheItem(key, val) {
      key = $define.STORAGEPREFIX + key
      let valType = typeof (val)

      if (val !== null && val !== undefined) {
        var valConstructor = val.constructor
      }
      if (valType === 'string' || valType === 'number' || valType === 'boolean') {
        if (valConstructor === String) {
          val = val + '|String'
        } else if (valConstructor === Number) {
          val = val + '|Number'
        } else if (valConstructor === Boolean) {
          val = val + '|Boolean'
        }
        storageType.setItem(key, val)
      } else if (valType === 'object') {
        if (val === null) {
          val = JSON.stringify(val) + '|Null'
          storageType.setItem(key, val)
        } else {
          if (valConstructor === Array) {
            val = JSON.stringify(val) + '|Array'
          } else if (valConstructor === Object) {
            val = JSON.stringify(val) + '|Object'
          }
          storageType.setItem(key, val)
        }
      } else if (valType === 'undefined') {
        val = JSON.stringify(val) + '|Undefined'
        storageType.setItem(key, val)
      }
    }
  },
  storageGet(key, type) {
    let storageType = (type == undefined) ? $define.STORAGETYPE : window.localStorage;

    key = $define.STORAGEPREFIX + key
    let keyName = storageType.getItem(key)
    if (keyName === null) {
      return null
    }
    let valArr = keyName.split('|')
    let getDataType = valArr[valArr.length - 1]
    valArr.splice(valArr.length - 1, 1)
    let val = valArr.join('')
    if (getDataType === 'Number') {
      val = parseInt(val)
    } else if (getDataType === 'Boolean') {
      if (val === 'true') {
        val = true
      } else {
        val = false
      }
    } else if (getDataType === 'Array' || getDataType === 'Object' || getDataType === 'Null') {
      val = JSON.parse(val)
    } else if (getDataType === 'Undefined') {
      val = undefined
    }
    return val
  },
  storageRemove(key, type) {
    let storageType = (type == undefined) ? $define.STORAGETYPE : window.localStorage;
    storageType.removeItem($define.STORAGEPREFIX + key)
  },
  storageClear(type) {
    let storageType = (type == undefined) ? $define.STORAGETYPE : window.localStorage;
    for (let i in storageType) {
      if (i.indexOf($define.STORAGEPREFIX) !== -1) {
        storageType.removeItem(i)
      }
    }
  },
  axios(url, param = {}, conf, carryKey = true) {
    conf = Object.assign({
      openLoad: true,
      closeLoad: true,
      type: 'POST'
    }, conf)

    let headers = {}
    if (param instanceof FormData) {
      Object.assign(headers, {
        'Content-Type': 'multipart/form-data'
      })
    } else {
      Object.assign(headers, (conf.type === 'POST' ? {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      } : {
        'X-Requested-With': 'XMLHttpRequest'
      }))

      // 携带token
      // if (carryKey) {
      //   let ls = window.localStorage;

      //   Object.assign(param, {
      //     'token': ls.getItem('jkb_key')
      //   })
      // }
    }

    return axios({
      headers: headers,
      method: conf.type,
      baseURL: $define.AXIOSBASEURL,
      timeout: $define.AXIOSTIMEOUT,
      url: url,
      data: (param instanceof FormData) ? param : (conf.type === 'POST' ? qs.stringify(param) : param),
      openLoad: conf.openLoad,
      closeLoad: conf.closeLoad
    }).then((res) => {
      return axiosResManage.dealSuc(res)
    }).catch((err) => {
      if ($define.ROOT) {
        let message = err.message
        if (message.indexOf('timeout') !== (-1)) {
          this.openAlert(`报错：${url}接口请求超时`, '请注意')
        } else if (message.indexOf('Network Error') !== (-1)) {
          this.openAlert(`报错：${url}接口请求跨域`, '请注意')
        } else {
          this.openAlert(`报错：${url}接口${ err.response.status}`, '请注意')
        }
      } else {
        console.log('!!!接口报错!!!');
        this.openToast('网络异常，请刷新重试');
      }
      return false
    })
  },
  customWechatShare() {
    if (!this.isWechatClient) {
      return
    }

    let wechat = Vue.wechat,
      conf = wechat.custom ? wechat.custom : $define.DEFAULTWECHATSHARECONF

    wechat.ready(function () {
      wechat.onMenuShareAppMessage({ // 分享给朋友
        title: conf.title,
        desc: conf.desc,
        link: conf.link,
        imgUrl: conf.imgUrl,
        success: function () {},
        cancel: function () {}
      })
      wechat.onMenuShareTimeline({ // 分享到朋友圈
        title: conf.title,
        link: conf.link,
        imgUrl: conf.imgUrl,
        success: function () {},
        cancel: function () {}
      })
    })

    wechat.error(function () {
      console.log("!!!微信验签失败!!!");
    })
  },
  selectDictLabel(options, selected, name = "name", value = 'value') {
    let res;

    Object.keys(options).some((key) => {
      if (options[key][value] == selected) {
        res = options[key][name];
        return true;
      }
    })
    return res;
  }
}

export default func
