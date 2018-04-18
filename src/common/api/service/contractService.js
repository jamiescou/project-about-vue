import Vue from 'vue'
const vue = new Vue()
const contractService = {
  getContract: { // 证书绑定接口
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/user/contract/create', param, function (response) {
        if (response.data.data) {
          callback(response.data)
        }
      })
      return result
    }
  },
  getContractSign: { // 获取当前企业
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/user/contract/sign/'
      const url = baseUrl + param.id
      const result = vue.$http.get(url, param, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default contractService
