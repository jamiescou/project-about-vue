var credit = [
  // 授信管理-核心企业 ***/
  {
    path: '/credit/enterprise',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 我的授信
      component: resolve => require(['../module/credit/enterprise/index.vue'], resolve)
    }, {
      path: 'allot', // 查看授信分配
      component: resolve => require(['../module/credit/enterprise/allot.vue'], resolve)
    }, {
      path: 'detail', // 查看授信分配
      component: resolve => require(['../module/credit/enterprise/detail.vue'], resolve)
    }, {
      path: 'supplier', // 查看授信分配
      component: resolve => require(['../module/credit/supplier/index.vue'], resolve)
    }]
  },
  // 授信管理-供应商 ***/
  {
    path: '/credit/supplier',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: '', // 查看授信分配
      component: resolve => require(['../module/credit/supplier/index.vue'], resolve)
    }]
  }
]

export default credit
