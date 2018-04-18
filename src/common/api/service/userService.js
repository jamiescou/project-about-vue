// 用户管理服务
import Vue from 'vue'
const vue = new Vue()

const userService = {
  createstaff: { // 添加企业员工
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/user/createstaff', param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default userService
