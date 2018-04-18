var account = [
  {
    path: '/account/sub-account',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 子账户
      component: resolve => require(['../module/account/sub-account/index.vue'], resolve)
    },
    {
      path: 'trade-record', // 所有账单记录
      component: resolve => require(['../module/account/sub-account/trade-record.vue'], resolve)
    }
    // {
    //   path: 'cash', // 提现
    //   component: resolve => require(['../module/account/sub-account/cash.vue'], resolve)
    // },
    // {
    //   path: 'trade-record-recharge', // 充值记录
    //   component: resolve => require(['../module/account/sub-account/trade-record-recharge.vue'], resolve)
    // },
    // {
    //   path: 'trade-record-cash', // 提现记录
    //   component: resolve => require(['../module/account/sub-account/trade-record-cash.vue'], resolve)
    // }
    ]
  },
  // 账户管理 ***/
  {
    path: '/account/bank-account',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 银行账户
      component: resolve => require(['../module/account/bank-account/index.vue'], resolve)
    },
    {
      path: 'add',
      component: resolve => require(['../module/account/bank-account/add.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/account/bank-account/detail.vue'], resolve)
    }]
  }
]

export default account
