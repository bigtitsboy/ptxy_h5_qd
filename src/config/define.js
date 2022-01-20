export default {
  ROOT: Boolean(['localhost', '192.168.16.166'].indexOf(window.location.hostname) !== -1), // 搬砖者
  AXIOSBASEURL: process.env.NODE_ENV === 'production' ? `http://${window.location.host}` : '/localhost', // 接口前缀
  PSDWIDTH: 750, // PSD设计稿宽度
  STORAGEPREFIX: 'Vui_', // 本地存储key前缀
  STORAGETYPE: window.sessionStorage, // 本地存储方式 默认sessionStorage 方法
  AXIOSTIMEOUT: 60000, // 超时时间设置，单位毫秒
  DEFAULTWECHATSHARECONF: { // 微信自定义分享默认配置
    title: '分享标题',
    desc: '分享相关描述',
    link: window.location.href,
    imgUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }
}
