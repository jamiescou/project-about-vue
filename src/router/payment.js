var payment = [
  {
    path: '/payment/apply', // 付款申请
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 标签
      component: resolve => require(['../module/payment/apply/tab.vue'], resolve),
      children: [{
        path: 'index', // 付款申请列表
        component: resolve => require(['../module/payment/apply/index.vue'], resolve)
      },
      {
        path: 'record', // 申请记录
        component: resolve => require(['../module/payment/apply/record.vue'], resolve)
      }]
    },
    {
      path: 'apply', // 申请
      component: resolve => require(['../module/payment/apply/apply.vue'], resolve)
    },
    {
      path: 'index/detail', // 详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    },
    {
      path: 'record/detail', // 详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/payment/approve', // 付款审批
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 标签
      component: resolve => require(['../module/payment/approve/tab.vue'], resolve),
      children: [{
        path: 'index', // 付款申请审批
        component: resolve => require(['../module/payment/approve/index.vue'], resolve)
      },
      {
        path: 'record', // 审批记录
        component: resolve => require(['../module/payment/approve/record.vue'], resolve)
      }]
    },
    {
      path: 'approve', // 审批记录
      component: resolve => require(['../module/payment/approve/approve.vue'], resolve)
    },
    {
      path: 'index/detail', // 付款记录
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    },
    {
      path: 'record/detail', // 付款记录
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  }
]

export default payment
