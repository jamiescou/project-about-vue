var financing = [
  {
    path: '/financing/intention', // 融资意向
    component: resolve => require(['../module/App.vue'], resolve),
    children: [
      {
        path: 'add', // 添加融资意向
        component: resolve => require(['../module/financing/intention/add.vue'], resolve)
      }
    ]
  },
  {
    path: '/financing/intention-apply', // 融资意向
    component: resolve => require(['../module/App.vue'], resolve),
    children: [
      {
        path: '',
        component: resolve => require(['../module/financing/intention-apply/index.vue'], resolve),
        children: [
          {
            path: 'pending',
            component: resolve => require(['../module/financing/intention-apply/pending.vue'], resolve)
          },
          {
            path: 'pass',
            component: resolve => require(['../module/financing/intention-apply/pass.vue'], resolve)
          },
          {
            path: 'reject',
            component: resolve => require(['../module/financing/intention-apply/reject.vue'], resolve)
          }
        ]
      },
      {
        path: 'pending-detail',
        component: resolve => require(['../module/financing/intention-apply/pending-detail.vue'], resolve)
      },
      {
        path: 'pass-detail',
        component: resolve => require(['../module/financing/intention-apply/pass-detail.vue'], resolve)
      },
      {
        path: 'reject-detail',
        component: resolve => require(['../module/financing/intention-apply/reject-detail.vue'], resolve)
      }
    ]
  },
  {
    path: '/financing/financing', // 融资
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '',
      component: resolve => require(['../module/financing/financing/tab.vue'], resolve),
      children: [{
        path: '',
        component: resolve => require(['../module/financing/financing/apply.vue'], resolve)
      },
      {
        path: 'record', // 申请记录
        component: resolve => require(['../module/financing/financing/record.vue'], resolve)
      }]
    },
    {
      path: 'do', // 申请记录
      component: resolve => require(['../module/financing/financing/do.vue'], resolve)
    },
    {
      path: 'voucher/detail', // 申请记录
      component: resolve => require(['../module/financing/detail.vue'], resolve)
    }]
  },
  {
    path: '/financing/query', // 融资查询
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '',
      component: resolve => require(['../module/financing/query/index.vue'], resolve)
    },
    {
      path: 'detail', // 融资详情
      component: resolve => require(['../module/financing/query/detail.vue'], resolve)
    },
    {
      path: 'voucher/detail', // 融资详情
      component: resolve => require(['../module/financing/detail.vue'], resolve)
    }]
  },
  {
    path: '/financing/financing-pay', // 还款
    component: resolve => require(['../module/App.vue'], resolve),
    children: [
      {
        path: '',
        component: resolve => require(['../module/financing/financing-pay/index.vue'], resolve),
        children: [
          {
            path: '', // 首页
            component: resolve => require(['../module/financing/financing-pay/list.vue'], resolve)
          },
          {
            path: 'record', // 还款记录
            component: resolve => require(['../module/financing/financing-pay/repay-record.vue'], resolve)
          }
        ]
      },
      {
        path: 'repay', // 还款
        component: resolve => require(['../module/financing/financing-pay/repay.vue'], resolve)
      },
      {
        path: 'repay-record-detail', // 还款详情
        component: resolve => require(['../module/financing/financing-pay/repay-record-detail.vue'], resolve)
      }
    ]
  },

  // 金融机构 - 融资管理 - 意向审批 **/
  {
    path: '/financing/intention-approve',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 融资意向列表
      component: resolve => require(['../module/financing/intention-approve/index.vue'], resolve),
      children: [{
        path: 'pending',
        component: resolve => require(['../module/financing/intention-approve/pending.vue'], resolve)
      },
      {
        path: 'pass',
        component: resolve => require(['../module/financing/intention-approve/pass.vue'], resolve)
      },
      {
        path: 'reject',
        component: resolve => require(['../module/financing/intention-approve/reject.vue'], resolve)
      }]
    },
    {
      path: 'pending-detail',
      component: resolve => require(['../module/financing/intention-approve/pending-detail.vue'], resolve)
    },
    {
      path: 'pass-detail',
      component: resolve => require(['../module/financing/intention-approve/pass-detail.vue'], resolve)
    },
    {
      path: 'reject-detail',
      component: resolve => require(['../module/financing/intention-approve/reject-detail.vue'], resolve)
    }]
  },

  // 金融机构 - 融资管理 - 融资审批 **/
  {
    path: '/financing/financing-approve',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 融资申请列表
      component: resolve => require(['../module/financing/financing-approve/index.vue'], resolve),
      children: [{
        path: 'pending',
        component: resolve => require(['../module/financing/financing-approve/pending.vue'], resolve)
      },
      {
        path: 'pass',
        component: resolve => require(['../module/financing/financing-approve/pass.vue'], resolve)
      },
      {
        path: 'reject',
        component: resolve => require(['../module/financing/financing-approve/reject.vue'], resolve)
      }]
    },
    {
      path: 'pending-detail',
      component: resolve => require(['../module/financing/financing-approve/pending-detail.vue'], resolve)
    },
    {
      path: 'pass-detail',
      component: resolve => require(['../module/financing/financing-approve/pass-detail.vue'], resolve)
    },
    {
      path: 'reject-detail',
      component: resolve => require(['../module/financing/financing-approve/reject-detail.vue'], resolve)
    },
    {
      path: 'success',
      component: resolve => require(['../module/financing/financing-approve/success.vue'], resolve)
    }]
  }
]

export default financing
