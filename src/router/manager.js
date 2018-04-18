var manager = [
  // 企业管理 ***/
  {
    path: '/manager',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: 'index', // 用户列表
      component: resolve => require(['../module/manager/index.vue'], resolve)
    },
    {
      path: 'add', // 添加用户
      component: resolve => require(['../module/manager/add.vue'], resolve)
    }]
  },
  {
    path: '/manager/cert',
    component: resolve => require(['../module/App.vue'], resolve),
    children: [{
      path: 'index', // 证书列表
      component: resolve => require(['../module/manager/cert/index.vue'], resolve)
    },
    {
      path: 'add', // 添加证书
      component: resolve => require(['../module/manager/cert/add.vue'], resolve)
    },
    {
      path: 'set-access', // 添加用户
      component: resolve => require(['../module/manager/cert/set-access.vue'], resolve)
    }]
  }
]

export default manager
