var voucher = [
  {
    path: '/voucher/create',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 凭证登记
      component: resolve => require(['../module/voucher/create/index.vue'], resolve)
    }]
  },
  {
    path: '/voucher/draft',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 待提交凭证
      component: resolve => require(['../module/voucher/draft/index.vue'], resolve)
    },
    {
      path: 'edit',
      component: resolve => require(['../module/voucher/draft/edit.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/commited',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 已提交凭证
      component: resolve => require(['../module/voucher/commited/index.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/bounced',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 已退回凭证
      component: resolve => require(['../module/voucher/bounced/index.vue'], resolve)
    },
    {
      path: 'commit',
      component: resolve => require(['../module/voucher/bounced/edit.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/deleted', // 已删除凭证
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '',
      component: resolve => require(['../module/voucher/deleted/index.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/approving',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 待审批凭证
      component: resolve => require(['../module/voucher/approving/index.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/approved',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 已审批凭证 - 通过
      component: resolve => require(['../module/voucher/approved/tab.vue'], resolve),
      children: [{
        path: 'pass', // 已审批凭证 - 退回
        component: resolve => require(['../module/voucher/approved/pass.vue'], resolve)
      }, {
        path: 'bounced', // 已审批凭证 - 退回
        component: resolve => require(['../module/voucher/approved/bounced.vue'], resolve)
      }]
    },
    {
      path: 'pass/detail',
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    },
    {
      path: 'bounced/detail',
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  /**
  * 供应链企业
  */
  {
    path: '/voucher/sign',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 凭证签收
      component: resolve => require(['../module/voucher/sign/index.vue'], resolve)
    },
    {
      path: 'sign',
      component: resolve => require(['../module/voucher/sign/sign.vue'], resolve)
    },
    {
      path: 'detail', // 凭证详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/assign-apply', // 凭证签收
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '',
      component: resolve => require(['../module/voucher/assign-apply/tab.vue'], resolve),
      children: [{
        path: 'index', // 凭证记录
        component: resolve => require(['../module/voucher/assign-apply/index.vue'], resolve)
      },
      {
        path: 'record', // 凭证记录
        component: resolve => require(['../module/voucher/assign-apply/record.vue'], resolve)
      }]
    },
    {
      path: 'apply', // 凭证记录
      component: resolve => require(['../module/voucher/assign-apply/apply.vue'], resolve)
    },
    {
      path: 'index/detail', // 凭证详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    },
    {
      path: 'record/detail', // 凭证详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/assign-approve', // 凭证签收
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '',
      component: resolve => require(['../module/voucher/assign-approve/tab.vue'], resolve),
      children: [{
        path: 'index', // 凭证记录
        component: resolve => require(['../module/voucher/assign-approve/index.vue'], resolve)
      },
      {
        path: 'record', // 凭证记录
        component: resolve => require(['../module/voucher/assign-approve/record.vue'], resolve)
      }]
    },
    {
      path: 'approve', // 凭证记录
      component: resolve => require(['../module/voucher/assign-approve/approve.vue'], resolve)
    },
    {
      path: 'index/detail', // 凭证详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    },
    {
      path: 'record/detail', // 凭证详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  },
  {
    path: '/voucher/query', // 凭证查询
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '',
      component: resolve => require(['../module/voucher/query/index.vue'], resolve)
    },
    {
      path: 'detail', // 凭证详情
      component: resolve => require(['../module/voucher/detail.vue'], resolve)
    }]
  }
]

export default voucher
