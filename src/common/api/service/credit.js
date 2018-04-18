// 授信管理相关服务 cl*/
import Vue from 'vue'
const vue = new Vue()
const credit = {
  myCredit: { // 企业分页查询自己的授信记录
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/credit/queryprovider', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  allot: { // 查询当前企业某条授信的授信分配情况
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/credit/allot', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  creditUsed: { // 查询供应商在某机构下的授信额度使用情况
    remote (callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/credit/supplier/current', function (response) {
        callback(response.data)
      })
      return result
    }
  },
  detailQuery: { // 授信额度使用详情
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/financing/info/credit/line/detail/query', param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default credit
