// 资金方融资管理相关服务
import Vue from 'vue'
const vue = new Vue()

const bankService = {
  queryToapprove: { // 资金方查询待审批的融资意向
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/funding/query/toapprove', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  queryPassed: { // 资金方查询审批通过的融资意向
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/funding/query/passed', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  queryRejected: { // 资金方查询审批退回的融资意向
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/funding/query/rejected', param, function (response) {
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
  replyCreate: { // 融资意向审批-通过
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/reply/create', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  taskReject: { // 融资意向审批-退回
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/enquiry/task/reject', param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default bankService
