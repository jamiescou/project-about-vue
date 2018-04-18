// 凭证处理服务
import Vue from 'vue'
// import cookieTools from 'common/javascript/tools/cookieTools'
const vue = new Vue()
const accessControlService = {

  // 通过证书ID获取权限
  getAccessByCertId: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/certificateprivilege/query/' + params.id, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  save: { // 获取核心企业关联的供应商
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/certificateprivilege/save', param, response => {
        callback(response.data)
      })
      return result
    }
  },

  // 获取用户权限
  getUserAccess: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/user/get/staticresource', function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default accessControlService
