// 认证服务类
import Vue from 'vue'
import cookieTools from 'common/javascript/tools/cookieTools'
const vue = new Vue()
const authorityService = {
  logout: { // 证书绑定接口
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/logout', param, function (response) {
        callback(response.data)
        cookieTools.deleteCookie('role')
        cookieTools.deleteCookie('step-register')
      })
      return result
    }
  },
  onece: { // 证书绑定接口
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/nonce', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  getSession: { // 证书绑定接口
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/user/get/sessionid', param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default authorityService
