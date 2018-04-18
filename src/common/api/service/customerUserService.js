// 企业用户关系管理服务
import Vue from 'vue'
const vue = new Vue()

const customerUserService = {
  userQuery: { // 查询当前企业用户列表
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/customeruser/query', param, function (response) {
        callback(response.data.data)
      })
      return result
    }
  }
}

export default customerUserService
