// 供应商融资管理相关服务
import Vue from 'vue'
const vue = new Vue()

const supplierService = {
  queryApplying: { // 供应商查询申请中的融资意向
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/applicant/query/applying', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  queryPassed: { // 供应商查询申请通过的融资意向
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/applicant/query/passed', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  queryRejected: { // 供应商查询审批退回的融资意向
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/applicant/query/rejected', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  detail: { // 意向详情
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/financing/enquiry/reply/get/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  create: { // 添加融资意向
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/create', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  queryBank: { // 乙方列表
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/company/scope/query', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 融资查询
  financingQuery: { // 融资查询列表
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/info/query', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  financeDetail: { // 某条融资详情
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/financing/info/get/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  voucherDetail: { // 融资凭证的详情
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/voucher/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 凭证融资-融资
  bankQuery: { // 贷款方列表
    remote (callback, data) {
      callback = callback || function () {}
      const url = '/service/financing/info/company/query'
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  financingCreate: { // 创建融资
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/info/create', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  voucherQuery: { // 创建融资
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/voucher/financing/info/query', param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default supplierService
