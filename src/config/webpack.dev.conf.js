'use strict'

module.exports = {
  proxyTable: {
    '/bilibili': {
      target: 'http://passport.bilibili.com',
      changeOrigin: true,
      pathRewrite: {
        '^/bilibili': ''
      }
    },
    '/localhost': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/localhost': ''
      }
    }
  },
  port: 8888
}
