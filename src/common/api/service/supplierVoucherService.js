// 凭证处理服务
import Vue from 'vue'
// import cookieTools from 'common/javascript/tools/cookieTools'
const vue = new Vue()
const supplierVoucherService = {

  // 待签收凭证
  getSigningVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/voucher/query/tosign', params, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 转让申请
  getTransferApplyRecord: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/voucher/query/applyrecord', params, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  // 转让待审批
  getTransferToapproval: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/voucher/query/applyrtoapproval', params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 转让待审批
  getTransferApprovalRecord: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/voucher/query/approvalrecord', params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 获取待签收凭证
  getAssignVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/voucher/query/totransfer', params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 凭证搜索
  getVouchers: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/voucher/query', params, function (response) {
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

  // 接收凭证
  receiveVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/receive'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 拒收凭证
  rejectVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/reject'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  applyPass: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/applypass'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  applyReject: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/applyreject'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 转让凭证
  transferVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/transfer'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default supplierVoucherService
