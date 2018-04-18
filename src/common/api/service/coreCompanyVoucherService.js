// 凭证处理服务
import Vue from 'vue'
// import cookieTools from 'common/javascript/tools/cookieTools'
const vue = new Vue()
const coreCompanyVoucherService = {
  getVoucherForDelete: { // 证书绑定接口
    remote (params, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/template/voucher/queryForDelete', params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 获取暂存凭证
  getScratchedVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/query/scratched'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 删除凭证
  delete: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/delete'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 编辑凭证
  editSave: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/save'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 修改提交
  saveandcommit: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/saveandcommit'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 申请审批
  applyApproval: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/commit'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 已删除凭证数据
  getDeletedVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/query/deleted'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 已tijiao凭证数据 待审批凭证
  getSubmittedVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/query/commited'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // approve
  approveVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/approve'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // reject
  rejectVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/rejectvoucher'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  returnedVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/query/rejected'
      const result = vue.$http.post(url, params, function (response) {
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

  getReturnedVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/query/bounced'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 待审批凭证
  getToapproveVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/query/toapprove'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  },

  // 已审批凭证
  getApprovedVoucher: {
    remote (params, callback, data) {
      callback = callback || function () {}
      const url = '/service/voucher/query/approved'
      const result = vue.$http.post(url, params, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default coreCompanyVoucherService
