import Vue from 'vue'
const vue = new Vue()
const subAccountService = {
  // 基础信息
  getBaseInfo: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/account/company/message'
      const url = baseUrl
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 资金信息
  getAccount: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/account/company/account'
      const url = baseUrl
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 余额同步
  synAccBalance: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/account/company/synAccBalance'
      const url = baseUrl
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 交易记录
  getTxRecord: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/account/company/queryAccount'
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 充值记录
  getRechargeRecord: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/account/company/queryRecharge'
      const url = baseUrl
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 提现记录
  getWithdrawJournalRecord: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const url = '/service/account/company/queryWithdrawJournal'
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default subAccountService
