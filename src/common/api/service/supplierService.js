// 供应商相关服务
import Vue from 'vue'
const vue = new Vue()
const supplierService = {
  upstreamList: {  // 获取上游供应商列表
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/supplier/relation/upstream/list', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  upstreamAuth: { // 获取上游供应商实名信息
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/supplier/relation/get/upstream/auth/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  downstreamList: {  // 获取下游供应商列表
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/supplier/relation/list', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  downstreamInfo: { // 获取下游供应商账户信息
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/supplier/relation/get/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  downstreamAuth: { // 获取下游供应商实名信息
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/supplier/relation/get/auth/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  downstreamSon: { // 获取下游供应商实名信息
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/supplier/relation/get/account/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  createdUser: { // 创建用户
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/supplier/relation', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  bankCard: { // 获取当前登录人所属企业的默认银行卡
    remote (param, callback, data) {
      callback = callback || function () {}
      const result = vue.$http.post('/service/bank/card/query/current', param, function (response) {
        callback(response.data)
      })
      return result
    }
  },
  bankCardDetail: { // 获取当前登录人所属企业的默认银行卡详情
    remote (param, callback, data) {
      callback = callback || function () {}
      const baseUrl = '/service/bank/card/detail/'
      const url = baseUrl + param
      const result = vue.$http.get(url, function (response) {
        callback(response.data)
      })
      return result
    }
  }
}

export default supplierService
