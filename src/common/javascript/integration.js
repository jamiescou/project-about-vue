import tools from 'common/javascript/tools/tools'
import stringTools from 'common/javascript/tools/stringTools'
import moneyTools from 'common/javascript/tools/moneyTools'
import dateTools from 'common/javascript/tools/dateTools'
import cookieTools from 'common/javascript/tools/cookieTools'
import Vue from 'vue'
import Axios from 'axios'
// import dateTools from 'common/javascript/tools/dateTools'
// 添加工具
Vue.prototype.$tools = tools
Vue.prototype.$stringt = stringTools
Vue.prototype.$moneyt = moneyTools
Vue.prototype.$datet = dateTools
Vue.prototype.$cookie = cookieTools

Vue.$tools = tools
Vue.$stringt = stringTools
Vue.$moneyt = moneyTools
Vue.$datet = dateTools
Vue.$cookie = cookieTools

Vue.prototype.$vue = Vue// 挂在组件工具

let isLogout = false
function showError (response, _this) {
  if (!response || !response.data || !response.data.error) return true
  const isTrue = response.data.success
  const code = response.data.error.errorCode
  let info = {
    message: ''
  }
  if (!isTrue && code === 1501) { // 1501不提示
    return true
  }
  if (!isTrue && code === 103001) {
    // info.message = response.data.error.errorMessage
    // new Vue().$bus.$emit('message-error', info)// 获取授信信息失败
    return true
  }
  if (code === 401 && !isLogout) { // session过期异常处理
    info.message = response.data.error.errorMessage
    isLogout = true
    cookieTools.deleteCookie('role')
    cookieTools.deleteCookie('step-register')
    cookieTools.deleteCookie('certificationStatus')
    localStorage.clear()
    sessionStorage.clear()
    location.href = '#/login'
    return false
  }

  if (!isTrue && code !== 5000) { // 非系统级别的错误
    info.message = response.data.error.errorMessage
    new Vue().$bus.$emit('message-error', info)

    return false
  }

  if (!isTrue && code === 5000) { // 系统级别的错误！
    info.message = '系统错误！'
    new Vue().$bus.$emit('message-error', info)
    return false
  }

  return false
}
Vue.prototype.$http = {
  get: function (url) {
    const me = this
    const length = arguments.length
    let callback = function () {}
    let error = function () {}
    let data = {}

    if (length === 4) { // 参数包含错误方法
      error = arguments[3]
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 3) { // 参数不包含错误方法
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 2) { // 参数包含参数对象
      callback = arguments[1]
    } else {
      throw new Error('参数个数错误！')
    }

    // url += '?rand=' + Math.random()
    data.ts = new Date().getTime()
    let instance = Axios.get(url, {params: data, headers: {'Cache-Control': 'no-cache, no-store', 'Expires': '-1'}})
    .then(function (response) {
      // 处理error
      if (showError(response, me)) {
        callback(response)
      }
    })
    .catch(function (response) {
      error(response)
    })
    return instance
  },
  post: function (url) {
    const length = arguments.length
    let callback = function () {}
    let error = function () {}
    let data = {}

    if (length === 4) { // 参数包含错误方法
      error = arguments[3]
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 3) { // 参数不包含错误方法
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 2) { // 参数包含参数对象
      callback = arguments[1]
    } else {
      throw new Error('参数个数错误！')
    }

    let instance = Axios.post(url, data, {headers: {}})
    .then(function (response) {
      // 处理error
      if (showError(response)) {
        callback(response)
      }
    })
    .catch(function (response) {
      error(response)
    })
    return instance
  },
  put: function (url) {
    const length = arguments.length
    let callback = function () {}
    let error = function () {}
    let data = {}

    if (length === 4) { // 参数包含错误方法
      error = arguments[3]
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 3) { // 参数不包含错误方法
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 2) { // 参数包含参数对象
      callback = arguments[1]
    } else {
      throw new Error('参数个数错误！')
    }

    let instance = Axios.put(url, data)
    .then(function (response) {
      // 处理error
      if (showError(response)) {
        callback(response)
      }
    })
    .catch(function (response) {
      error(response)
    })
    return instance
  },
  delete: function (url) {
    const length = arguments.length
    let callback = function () {}
    let error = function () {}
    let data = {}

    if (length === 4) { // 参数包含错误方法
      error = arguments[3]
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 3) { // 参数不包含错误方法
      callback = arguments[2]
      data = arguments[1]
    } else if (length === 2) { // 参数包含参数对象
      callback = arguments[1]
    } else {
      throw new Error('参数个数错误！')
    }

    let instance = Axios.delete(url, {params: data})
    .then(function (response) {
      // 处理error
      if (showError(response)) {
        callback(response)
      }
    })
    .catch(function (response) {
      error(response)
    })
    return instance
  }
}
function constract () {
}
export default constract
