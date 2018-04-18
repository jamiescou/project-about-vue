import Vue from 'vue'
import Router from 'vue-router'
import voucherRouter from 'router/voucher.js'
import paymentRouter from 'router/payment.js'
import customerRouter from 'router/customer.js'
import accountRouter from 'router/account.js'
import creditRouter from 'router/credit.js'
import managerRouter from 'router/manager.js'
import userRouter from 'router/user.js'
import financingRouter from 'router/financing.js'

Vue.use(Router)
var baseRouter = [
  {
    path: '/',
    component: resolve => require(['../module/index.vue'], resolve)
  },
  {
    path: '/noaccess',
    component: resolve => require(['../module/noaccess/noaccess.vue'], resolve),
    children: [{
      path: '', // 成功
      component: resolve => require(['../module/noaccess/error.vue'], resolve)
    }]
  },
  {
    path: '/login',
    component: resolve => require(['../module/login.vue'], resolve)
  },
  {
    path: '/member/register', // 注册
    component: resolve => require(['../module/member/register/register.vue'], resolve)
  },
  {
    path: '/assistant',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: 'success', // 成功
      component: resolve => require(['../module/assistant/success.vue'], resolve)
    },
    {
      path: 'error', // 错误
      component: resolve => require(['../module/assistant/error.vue'], resolve)
    }]
  },
  {
    path: '/assistant/supplier',
    component: resolve => require(['../module/assistant/supplier/App.vue'], resolve),
    children: [{
      path: 'success', // 成功
      component: resolve => require(['../module/assistant/supplier/success.vue'], resolve)
    }, {
      path: 'error', // 错误
      component: resolve => require(['../module/assistant/supplier/error.vue'], resolve)
    }]
  },
  {
    path: '/assistant/finance',
    component: resolve => require(['../module/assistant/finance/App.vue'], resolve),
    children: [{
      path: 'success', // 成功
      component: resolve => require(['../module/assistant/finance/success.vue'], resolve)
    }, {
      path: 'error', // 错误
      component: resolve => require(['../module/assistant/finance/error.vue'], resolve)
    }]
  }
]

baseRouter.push.apply(baseRouter, voucherRouter)
baseRouter.push.apply(baseRouter, paymentRouter)
baseRouter.push.apply(baseRouter, customerRouter)
baseRouter.push.apply(baseRouter, accountRouter)
baseRouter.push.apply(baseRouter, creditRouter)
baseRouter.push.apply(baseRouter, managerRouter)
baseRouter.push.apply(baseRouter, userRouter)
baseRouter.push.apply(baseRouter, financingRouter)

function join (base, linkgroup) {
  linkgroup.forEach((value) => {
    base.push(value)
  })
}
join(baseRouter, [])
export default new Router({
  routes: baseRouter
})
