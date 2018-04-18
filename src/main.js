// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import 'common/css/lib/theme-bubi/index.css'
// import cookieTools from 'common/javascript/tools/cookieTools'
// import moneyTools from 'common/javascript/tools/moneyTools'
import integration from 'common/javascript/integration'
import vfilter from 'common/javascript/vfilter'
import dispatch from 'module/member/service/dispatch'
import cookieTools from 'common/javascript/tools/cookieTools'
import accessControl from 'common/javascript/tools/accessControl.js'

// 添加vue整合
integration()
// 添加vueFilter
vfilter()

import {
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Form,
  FormItem,
  Autocomplete,
  Table,
  TableColumn,
  Tree,
  Tag,
  Pagination,
  Select,
  Option,
  Dialog,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  ButtonGroup,
  Tabs,
  TabPane,
  Tooltip,
  Upload,
  Loading,
  Collapse,
  CollapseItem,
  Steps,
  Step,
  MessageBox,
  Message
} from 'element-ui'

Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Autocomplete)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(ButtonGroup)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Steps)
Vue.use(Step)
// Vue.use(VueBus)

Vue.config.productionTip = false
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading
// vue bus
function vueBus (Vue) {
  var bus = new Vue()
  bus.data = {
    host: 'glob'
  }
  Object.defineProperty(Vue.prototype, '$bus', {
    get: function () {
      return bus
    }
  })
}
vueBus(Vue)

// 处理错误信息

// 请求前拦截
let payInfo = {}
Axios.interceptors.request.use((config) => {
  payInfo.url = config.url
  payInfo.method = config.method
  payInfo.params = config.data
  payInfo.href = location.href
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截
Axios.interceptors.response.use(function (response) {
  const info = {
    message: ''
  }
  if (response.status === 403) {
    info.message = '用户无权限！'
    new Vue().$bus.$emit('message-error', info)
  }
  if (response.status === 302) {
    info.message = '请登录！'
    cookieTools.deleteCookie('role')
    cookieTools.deleteCookie('step-register')
    cookieTools.deleteCookie('certificationStatus')
    localStorage.clear()
    sessionStorage.clear()
    location.href = '#/login'
    new Vue().$bus.$emit('message-error', info)
  }
  // 需支付密码的响应拦截
  if (response.data.error) {
    let code = response.data.error.errorCode
    if (code === 1991) {
      new Vue().$bus.$emit('pay-popup', payInfo)
      return
    }
  }
  setTimeout(() => {
    new Vue().$bus.$emit('left-resize')
  }, 500)
 // 处理响应数据
  return response
}, function (error) {
 // 处理响应失败
  if (error.response.status === 403) {
    Message.error('没有权限访问该资源')
  }
  return Promise.reject(error)
})

// 删除
function removeElement (_element) {
  var _parentElement = _element.parentNode
  if (_parentElement) {
    _parentElement.removeChild(_element)
  }
}
// set page title
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    removeElement(el)
  }
})
/* 过滤器 end */

// router 跳转动画
let loading = null
router.beforeEach((to, from, next) => {
  var path = to.path
  console.log(path)
  console.log(dispatch.isRealName())
  console.log(path.indexOf('/member/register'))
  // var regx = null
  // 未完成实名，请实名
  if (!dispatch.isRealName() && path.indexOf('/member/register') === -1) {
    // Message('请实名')
    // next('/member/register')
    // setTimeout(function () {
    //   location.href = '/#/noaccess'
    // }, 50)
    next({
      path: '/member/register'
    })
    // return
  } else {
    if (path.indexOf('?') !== -1) {
      path = path.substring(0, path.indexOf('?'))
    }
    // if (path.indexOf('/voucher') !== -1 && (path.indexOf('/detail') !== -1 || path.indexOf('/edit') !== -1)) {
    //   regx = /\/voucher\/.*?\/detail/g
    //   var regx2 = /\/voucher\/.*?\/edit/g
    //   if (regx.exec(path) === null && regx2.exec(path) === null) {
    //     Message.error('没有权限访问!')
    //     setTimeout(function () {
    //       location.href = '/#/noaccess'
    //     }, 50)
    //   }
    // } else if (path.indexOf('/payment') !== -1 && path.indexOf('/detail') !== -1) {
    //   regx = /\/payment\/.*?\/detail/g
    //   if (regx.exec(path) === null) {
    //     Message.error('没有权限访问!')
    //     setTimeout(function () {
    //       location.href = '/#/noaccess'
    //     }, 50)
    //   }
    // } else
    //
    if (path !== '/' && path !== '/login' && path !== '/member/register' && path.indexOf('/assistant/success') === -1 && path !== '/noaccess' && !accessControl.checkAccess(path)) {
      Message.error('没有权限访问!')
      setTimeout(function () {
        location.href = '/#/noaccess'
      }, 50)
    }
    next()
  }
  loading = Loading.service({
    fullscreen: true
  })
})
router.afterEach(route => {
  document.getElementById('app').scrollTop = 0
  if (loading !== null) {
    setTimeout(function () {
      loading.close()
    }, 50)
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
