// 核心企业相关服务
import Vue from 'vue'
const vue = new Vue()
const accountService = {
  userCurrent: {
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/user/current', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  supplierList: { // 获取核心企业关联的供应商
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
  myCredit: { // 我的授信列表
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/credit/queryprovider', param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default accountService
