import Vue from 'vue'
const vue = new Vue()
const infoManageService = {
  // 系统账户信息
  getSysInfo: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/user/current'
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 获取供应商实名信息
  getRealName: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/company/auth/current'
      const url = baseUrl
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 获取协议列表
  getProtocolList: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/user/contract/list'
      const url = baseUrl
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 获取证书信息
  getCertInfo: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/user/verify/current'
      const url = baseUrl
      const result = vue.$http.get(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  modifyLoginPassword: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/user/modify/password'
      const url = baseUrl
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  modifyPayPassword: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/user/pay/modify/password'
      const url = baseUrl
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default infoManageService
