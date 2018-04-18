// 供应商相关服务
import Vue from 'vue'
const vue = new Vue()
const companyService = {
  // 获取公司信息
  getCompanyById: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/company/' + params.id
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 获取登录企业的信息
  getCurrentCompany: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/company/current'
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 获取登录企业的授信信息
  getCurrentCompanyCredit: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/credit/current'
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 获取核心企业关联的供应商
  supplierList: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/supplier/relation/query', param, response => {
        Array.map(response.data.data, function (item) {
          item.value = item.name
        })
        callback(response.data.data)
      })
      return result
    }
  },

  // 获取付款函
  paymentLetter: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/paymentletter/create'
      const url = baseUrl
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  paymentUpdate: { // 付款函甲方更新接口
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/paymentletter/update'
      const url = baseUrl
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  payUpdate: { // 付款函乙方更新接口
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/paymentletter/update4PartyB'
      const url = baseUrl
      const result = vue.$http.post(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default companyService
