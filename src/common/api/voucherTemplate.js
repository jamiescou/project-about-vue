let model = {
  '/service/template/voucher/no': function (response, vueInstance) {
    return response.data
  },
  '/service/supplier/relation/query': function (response, vueInstance) {
    return response.data
  },
  '/service/company/:id': function (response, vueInstance) {
    let data = response.data
    data.bankCard = data.subAccount
    return data
  },
  '/service/template/voucher': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/savecommit': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/query': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/query/scratched': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/query/forapprovaled': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/delete': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/commit': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/recover': function (response, vueInstance) {
    return response.data
  },
  '/service/template/voucher/:id': function (response, vueInstance) {
    var res = response.data
    res.data.createdCompany.bankCard = {
      no: res.data.createdCompany.subAccount.no,
      bankName: res.data.createdCompany.subAccount.bankName
    }
    res.data.company.bankCard = {
      no: res.data.company.subAccount.no,
      bankName: res.data.company.subAccount.bankName
    }
    return res
  },
  '/service/template/voucher/approve': function (response, vueInstance) { // 凭证模版审核通过
    return response.data
  },
  '/service/template/voucher/reject': function (response, vueInstance) { // 凭证模版审核不通过
    return response.data
  },
  '/service/company/current': function (response, vueInstance) { // 当前登录企业信息查询
    if (response.data.success === false) {
      throw new Error('获取当前企业失败！')
    }
    return response.data
  },
  '/service/voucher/no': function (response, vueInstance) {
    return response.data
  },
  '/service/voucher/topay': function (response, vueInstance) { // 凭证查询
    return response.data
  },
  '/service/clearingrule/query': function (response, vueInstance) { // 凭证查询
    return response.data
  },
  '/service/voucher/query': function (response, vueInstance) { // 凭证查询
    return response.data
  },
  '/service/voucher/supplier/query': function (response, vueInstance) {
    return response.data
  },
  '/service/voucher/queryHistory': function (response, vueInstance) { // 凭证查询
    return response.data
  },
  '/service/voucher/transfer': function (response, vueInstance) { // 凭证查询
    return response.data
  },
  '/service/voucher/receive': function (response, vueInstance) { // 供应商接受凭证
    return response.data
  },
  '/service/voucher/reject/:id': function (response, vueInstance) { // 供应商凭证拒收
    return response.data
  },
  '/service/voucher/:id': function (response, vueInstance) { // 通过id查询凭证详情
    var res = response.data
    res.data.createdCompany.bankCard = {
      no: res.data.createdCompany.subAccount.no,
      bankName: res.data.createdCompany.subAccount.bankName
    }
    res.data.company.bankCard = {
      no: res.data.company.subAccount.no,
      bankName: res.data.company.subAccount.bankName
    }
    return res
  },
  '/service/credit/current': function (response, vueInstance) { // 获取当前登陆企业的信用
    if (response.data.success === false) {
      throw new Error('获取当前企业授信失败！')
    }
    return response.data
  },

  // 核心企业-付款管理 start **/
  '/service/payapply/queryList': function (response, vueInstance) {
    return response.data
  },
  '/service/payapply/queryRecord': function (response, vueInstance) {
    return response.data
  },
  '/service/approval/query': function (response, vueInstance) {
    return response.data
  },
  '/service/payapply/:id': function (response, vueInstance) {
    return response.data
  },
  // 核心企业-付款管理 end **/

  // 核心企业-供应商管理 start **/
  '/service/supplier/relation/list': function (response, vueInstance) {
    return response.data
  },
  '/service/supplier/relation/get/:id': function (response, vueInstance) {
    return response.data
  },
  '/service/supplier/relation/get/auth/:id': function (response, vueInstance) {
    return response.data
  },
  '/service/supplier/relation/get/account/:id': function (response, vueInstance) {
    return response.data
  },
  '/service/supplier/relation': function (response, vueInstance) { // 创建用户
    return response.data
  },
  // 核心企业-供应商管理 end **/

  // 供应商-客户管理 start **/
  '/service/supplier/relation/upstream/list': function (response, vueInstance) {
    return response.data
  },
  '/service/supplier/relation/get/upstream/auth/:id': function (response, vueInstance) {
    return response.data
  }
  // 供应商-客户管理 end **/

}
export default model
