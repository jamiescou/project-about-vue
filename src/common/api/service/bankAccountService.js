import Vue from 'vue'
const vue = new Vue()
const bankAccountService = {
  // 查询当前企业银行卡
  queryBank: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/bank/account/card/query'
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 获取总行列表
  bankList: {
    remote (callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/cnaps/headbanklist', function (response) {
        callback(response.data)
      })
      return result
    }
  },

  queryProvince: { // 获取省列表
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/cnaps/query/province/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  queryCity: { // 获取城市列表
    remote (param1, param2, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/cnaps/query/city/'
      const url = baseUrl + param1 + '/' + param2
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  querySubBank: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/cnaps'
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 查询银行账户详情
  queryDetail: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/bank/account/card/get/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  updateremark: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/bank/account/card/updateremark'
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  cardAdd: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/bank/account/card/add'
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  cardCheck: { // 检查银行卡是否被绑定过
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/bank/account/card/check'
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default bankAccountService
