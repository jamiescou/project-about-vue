var customer = [
  // 核心企业 - 供应商管理、供应商 - 下游供应商
  {
    path: '/customer/downstream',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 供应商列表
      component: resolve => require(['../module/customer/downstream/index.vue'], resolve)
    },
    {
      path: 'create', // 创建账号
      component: resolve => require(['../module/customer/downstream/create.vue'], resolve)
    },
    {
      path: 'detail', // 创建账号
      component: resolve => require(['../module/customer/downstream/detail.vue'], resolve)
    }]
  },

  // 供应商 - 上游供应商
  {
    path: '/customer/upstream',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 供应商列表
      component: resolve => require(['../module/customer/upstream/index.vue'], resolve)
    },
    {
      path: 'detail', // 详情
      component: resolve => require(['../module/customer/upstream/detail.vue'], resolve)
    }]
  },

  // 金融机构 - 核心企业 **/
  {
    path: '/customer/f-core-enterprise',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 核心企业
      component: resolve => require(['../module/customer/f-core-enterprise/index.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/customer/f-core-enterprise/detail.vue'], resolve)
    }]
  },

  // 金融机构 - 供应商 **/
  {
    path: '/customer/f-supplier',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 供应商
      component: resolve => require(['../module/customer/f-supplier/index.vue'], resolve)
    },
    {
      path: 'detail',
      component: resolve => require(['../module/customer/f-supplier/detail.vue'], resolve)
    }]
  }
]

export default customer
