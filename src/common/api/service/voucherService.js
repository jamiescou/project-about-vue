// 凭证处理服务
import Vue from 'vue'
// import cookieTools from 'common/javascript/tools/cookieTools'
const vue = new Vue()
const voucherService = {

  // 获取凭证编号
  getVoucherNo: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.get('/service/voucher/no', function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 凭证详情
  getVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/' + params.id
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 证书绑定接口
  getVoucherForDelete: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/template/voucher/queryForDelete', params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 流转信息
  downstream: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/voucher/downstream/'
      const url = baseUrl + params.id
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 溯源信息
  upstream: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/voucher/upstream/'
      const url = baseUrl + params.id
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 操作日志
  getOperationLog: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/history/voucher/query'
      const url = baseUrl
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 付款记录
  getpayRecord: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/paymenthistory/' + params.voucherId
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 删除凭证文件
  deleteVoucherFile: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/voucher/file/delete'
      const url = baseUrl
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default voucherService
